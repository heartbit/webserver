var express = require('express');
var http = require('http');
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
            self.initApiProxy();
            self.initSockets();
            self.initClientRoutes();
            self.initServicesRoutes();
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
    return Q.all([
        this.initEventManager(),
        // this.initRedisAndCacheManager()
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

App.prototype.initRedisAndCacheManager = function() {
    var self = this;
    var deferred = Q.defer();

    var redisParams = {
        isDeployed: this.options.isDeployed,
        url: this.config.db.redis,
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
    this.app = express();
    this.server = http.createServer(this.app);
    // if (this.options.isDebug) {
    // this.app.use(express.logger());
    // }
    this.app.use(express.compress());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(express.methodOverride());
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

    switch (this.options.mode) {
        case "online":
            var ClientSocket = require(socketsPath + 'clientSocket');
            var socketParams = {
                isDebug: this.options.isDebug,
                server: this.server,
                dataPath: this.options.clientPath + 'data/',
                apiUrl: this.config.apiproxy.apiUrl
            };
            this.clientSocket = new ClientSocket(socketParams);
            break;

        case "offline":
        default:
            var OfflineClientSocket = require(socketsPath + 'offlineClientSocket');
            var socketParams = {
                server: this.server,
                dataPath: this.options.clientPath + 'data/'
            };
            this.clientSocket = new OfflineClientSocket(socketParams);
            break;
    }

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
};

App.prototype.initApiProxy = function() {
    var proxiesPath = this.options.serverPath + 'middlewares/proxy/';

    switch (this.options.mode) {
        case "online":
            var ApiProxy = require(proxiesPath + 'apiProxy');
            var proxyParams = {
                apiProxyHost: this.config.apiproxy.hostUrl,
                app: this.app
            };
            this.apiproxy = new ApiProxy(proxyParams);
            break;

        case "offline":
        default:
            var proxyParams = {
                app: this.app,
                dataPath: this.options.clientPath + 'data/'
            };
            var OfflineApiProxy = require(proxiesPath + 'offlineApiProxy.js');
            this.apiproxy = new OfflineApiProxy(proxyParams);
            break;
    }

    var initProxyCallback = function() {
        console.log('Api proxy...OK');
    };

    this.apiproxy.init(initProxyCallback);
};

App.prototype.initServicesRoutes = function() {
    this.app.use('/services', require('./routers/servicesRouter'));
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
    this.app.use(function(req, res, next) {
        res.sendfile(self.options.clientPath + "templates/404.html");
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