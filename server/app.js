var moment = require('moment');
var _ = require('underscore');
var Q = require('q');

var App = function() {};

App.prototype.start = function(options) {

    var self = this;
    this.options = options;
    this.config = require(this.options.serverPath + 'config/');

    this.initManagers()
        .then(function() {
            self.initExpressServer();
        })
        .then(function() {
            self.initProxies();
            self.initSockets();
            self.initClientRoutes();
            self.initStaticContentManager();
            self.initFourtyFourPage();
        })
        .then(function() {
            self.run();
        })
        .done();
};

App.prototype.initManagers = function() {
    this.exceptionManager = require(this.options.serverPath + 'managers/ExceptionManager');
    this.apiManager = require(this.options.serverPath + 'managers/APIManager');
    this.apiManager.init(this.config.apiproxy);

    // this.cronJobManager = require(this.options.serverPath + 'managers/CronJobsManager');
    // this.cronJobManager.start();

    return Q.all([
        this.initEventManager(),
        // this.initKafkaManager()
        this.initRedisAndCacheManager(),
        // this.initMongoManager()
    ]);
};

App.prototype.initEventManager = function() {
    var deferred = Q.defer();

    var EventManager = require('./managers/EventManager');
    EventManager.once('test', function() {
        console.log('Event manager...OK')
        deferred.resolve();
    });
    EventManager.emit('test');

    return deferred.promise;
};

App.prototype.initMongoManager = function() {
    this.mongoManager = require(this.options.serverPath + '/managers/MongoManager');
    return this.mongoManager.init();
};

App.prototype.initKafkaManager = function() {
    this.kafkaManager = require(this.options.serverPath + '/managers/KafkaManager');
    return this.kafkaManager.init();
};

App.prototype.initRedisAndCacheManager = function() {
    var self = this;
    var deferred = Q.defer();

    var redisParams = {
        isDeployed: this.options.isDeployed,
        url: this.config.db.redis.url,
        password: this.config.db.redis.password
    };
    this.redisManager = require(this.options.serverPath + '/managers/RedisManager');
    this.cacheManager = require(this.options.serverPath + '/managers/CacheManager');

    this.redisManager.init(redisParams)
        .then(function() {
            self.cacheManager.init(redisParams);
        })
        .done(function() {
            self.redisManager.subscribeToChannels(function() {
                deferred.resolve();
            });
        });

    return deferred.promise;
};

App.prototype.initExpressServer = function() {
    var deferred = Q.defer();

    this.app = require('express')();
    this.server = require('http').Server(this.app);

    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var compress = require('compression');
    this.app.use(bodyParser.urlencoded({
        extended: true,
        limit: '15mb'
    }));
    this.app.use(bodyParser.json({
        limit: '15mb'
    }));
    this.app.use(methodOverride());
    this.app.use(compress());
    if (this.options.mode != 'prod') {
        this.app.use(morgan('dev'));
    }

    this.app.set('options', this.options);
    this.app.enable('trust proxy');
    console.log('Express server...OK');
    setTimeout(function() {
        deferred.resolve();
    }, 100);
    return deferred.promise;
};

App.prototype.initSockets = function() {
    var self = this;
    var socketsPath = this.options.serverPath + 'sockets/';

    var ClientSocket = require(socketsPath + 'clientSocket');
    var socketParams = {
        isDebug: this.options.isDebug,
        server: this.server,
        dataPath: this.options.clientPath + 'data/',
        apiUrl: this.config.apiproxy.apiUrl
    };
    this.clientSocket = new ClientSocket(socketParams);

    var initSocketCallback = function() {
        console.log('Client sockets...OK');
    };

    this.clientSocket.run(initSocketCallback);
};

App.prototype.initStaticContentManager = function() {
    var StaticContentManager = require(this.options.serverPath + 'middlewares/staticContentManager');
    var params = {
        app: this.app,
        clientPath: this.options.clientPath
    };
    this.staticContentManager = new StaticContentManager(params);
    var initStaticContentManagerCallback = function() {
        console.log('Static content...OK');
    };
    this.staticContentManager.init(initStaticContentManagerCallback);

    if (this.options.isDev) {
        console.log('WEBPACK middlewares');
        var proxy = require('proxy-middleware');
        var url = require('url');
        this.app.use('/js', proxy(url.parse('http://localhost:8081/dist/js/')));
        this.app.use('/dist', proxy(url.parse('http://localhost:8081/dist/')));
        var webpack = require('webpack');
        var WebpackDevServer = require('webpack-dev-server');
        var config = require('../client/webpack.config');
        var server = new WebpackDevServer(webpack(config), {
            contentBase: __dirname + '/client/',
            hot: true,
            quiet: false,
            // noInfo: true,
            publicPath: "/dist/js/",
            stats: {
                colors: true
            }
        });
        server.listen(8081, "localhost", function() {});
    }
};

App.prototype.initProxies = function() {
    var proxiesPath = this.options.serverPath + 'middlewares/proxy/';

    var ApiProxy = require(proxiesPath + 'apiProxy');
    var apiProxyParams = {
        apiProxyHost: this.config.apiproxy.hostUrl,
        apiProxyApiUrl: this.config.apiproxy.apiUrl,
        app: this.app
    };
    this.apiproxy = new ApiProxy(apiProxyParams);

    var NewsProxy = require(proxiesPath + 'newsProxy');
    var newsProxyParams = {
        newsProxyHost: this.config.newsproxy.hostUrl,
        app: this.app
    };
    this.newsproxy = new NewsProxy(newsProxyParams);

    var RippleaccountProxy = require(proxiesPath + 'rippleaccountProxy');
    var rippleaccountProxyParams = {
        rippleaccountProxyHost: this.config.rippleaccountproxy.hostUrl,
        rippleaccountRemoteServer: this.config.rippleaccountproxy.remoteserver,
        app: this.app
    };
    this.rippleaccountProxy = new RippleaccountProxy(rippleaccountProxyParams);

    var RippledataapiProxy = require(proxiesPath + 'rippledataapiProxy');
    var rippledataapiProxyParams = {
        rippledataapiProxyHost: this.config.rippledataapiproxy.hostUrl,
        app: this.app
    };
    this.rippledataapiProxy = new RippledataapiProxy(rippledataapiProxyParams);

    var initProxyCallback = function() {
        console.log('Api proxy...OK');
    };

    this.apiproxy.init(initProxyCallback);

    var initNewsProxyCallback = function() {
        console.log('News proxy...OK');
    };

    this.newsproxy.init(initNewsProxyCallback);

    var initRippleaccountProxyCallback = function() {
        console.log('RippleAccount proxy...OK');
    };

    this.rippleaccountProxy.init(initRippleaccountProxyCallback);

    var initRippledataapiProxyCallback = function() {
        console.log('RippleDataApi proxy ... OK');
    }

    this.rippledataapiProxy.init(initRippledataapiProxyCallback);
};

App.prototype.initClientRoutes = function() {
    var params = {
        app: this.app,
        filename: this.options.serverPath + this.config.clientproxy.urlRoutes,
        clientPath: this.options.clientPath,
        serverPath: this.options.serverPath,
    };

    var initRoutesCallback = function() {
        console.log('Client routes...OK');
    };

    var ClientRoutes = require(this.options.serverPath + 'middlewares/clientRoutes');
    this.clientRoutes = new ClientRoutes();
    this.clientRoutes.init(params, initRoutesCallback);
};

App.prototype.initFourtyFourPage = function() {
    var self = this;
    this.app.use(function(err, req, res, next) {
        if (err.status == 404 || typeof err === typeof PageNotFoundError) {
            res.status(404).sendfile(self.options.clientPath + "templates/404.html");
        } else {
            res.send(500, 'unexpected error');
        }
    });
};

App.prototype.run = function() {
    var self = this;
    var port = self.options.port;
    self.server.listen(port);
    console.log('');
    console.log('Webapp listening on port ' + port);
    console.log('Webapp ready!');
    console.log('');
};

module.exports = App;