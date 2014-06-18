var optimist = require('optimist');
var os = require('os');
var cluster = require('cluster');

var argv = optimist.usage('\n node webserver.js -port port -d yes/no -m online')
    .alias('h', 'help')
    .alias('h', '?')
    .options('port', {
        alias: "p",
        string: true,
        describe: 'Http Port',
        default: 9090
    })
    .options('deployed', {
        string: true,
        alias: "d",
        describe: 'reserved for compiled & deployed',
        default: "no"
    })
    .options('mode', {
        string: true,
        alias: "m",
        describe: 'mode online/offline',
        default: "online"
    })
    .argv;

if (argv.help) {
    optimist.showHelp();
}

var port = process.env.PORT || argv.port || 9090;
var env = argv.env;
var isDeployed = (argv.deployed === 'yes');
var isDebug = (argv.debug === 'yes');
var mode = argv.mode;

console.log('');
console.log('Webserver - Heartbit');
console.log('');
console.log('Port #', port);
console.log('Debug ?', isDebug);
console.log('Deployed ?', isDeployed);
console.log('Mode ?', mode);

var webapp = process.cwd() + '/';
var webapp_server_path = webapp + 'server/';

var webapp_client_path = webapp + 'build/client/';
// var webapp_client_path = webapp + 'client/';

console.log('');
console.log('Client path : ', webapp_client_path, '\nServer path : ', webapp_server_path);
console.log('');

if (cluster.isMaster && isDeployed) {
    var noOfWorkers = os.cpus().length;
    for (i = 0; i < noOfWorkers; i += 1) {
        console.log('Starting worker thread #' + i);
        cluster.fork();
    }
    cluster.on('death', function(worker) {
        console.log('Worker ' + worker.pid + ' died. Restarting worker thread...');
        cluster.fork();
    });
} else {
    var App = require(webapp_server_path + 'app');
    var app = new App();

    var options = {
        port: port,
        mode: mode,
        isDebug: isDebug,
        isDeployed: isDeployed,
        serverPath: webapp_server_path,
        clientPath: webapp_client_path
    };

    app.start(options);
}