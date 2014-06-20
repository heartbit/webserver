var optimist = require('optimist');
var os = require('os');
var cluster = require('cluster');

var argv = optimist.usage('\n node webserver.js -port port')
    .alias('h', 'help')
    .alias('h', '?')
    .options('port', {
        alias: "p",
        string: true,
        describe: 'Http Port',
        default: 9090
    })
    .argv;

if (argv.help) {
    optimist.showHelp();
}

var port = argv.port || process.env.PORT || 9090;
var isDeployed = process.env.LOCAL ? false : true;

console.log('');
console.log('Webserver - Heartbit');
console.log('');
console.log('Port #', port);
console.log('Deployed ?', isDeployed);

var webapp = process.cwd() + '/';
var webapp_server_path = webapp + 'server/';
var webapp_client_path = isDeployed ? webapp + 'build/client/' : webapp + 'client/';

console.log('');
console.log('Client path : ', webapp_client_path, '\nServer path : ', webapp_server_path);
console.log('');

// if (cluster.isMaster && isDeployed) {
//     var noOfWorkers = os.cpus().length;
//     for (i = 0; i < noOfWorkers; i += 1) {
//         console.log('Starting worker thread #' + i);
//         cluster.fork();
//     }
//     cluster.on('death', function(worker) {
//         console.log('Worker ' + worker.pid + ' died. Restarting worker thread...');
//         cluster.fork();
//     });
// } else {
var App = require(webapp_server_path + 'app');
var app = new App();

var options = {
    port: port,
    mode: "online",
    isDebug: false,
    isDeployed: isDeployed,
    serverPath: webapp_server_path,
    clientPath: webapp_client_path
};

app.start(options);
// }