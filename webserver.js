var os = require('os');
var cluster = require('cluster');

var port = process.env.PORT || 9090;
var isDev = false;
var isDeployed = false;
process.argv.forEach(function(val, index, array) {
    if (val == "dev")
        isDev = true;
    if (val == "dep")
        isDeployed = true;
});

console.log('');
console.log('Webserver - Heartbit');
console.log('');
console.log('Port #', port);
console.log('Deployed ?', isDeployed);
console.log('Dev ?', isDev);

var webapp = process.cwd() + '/';
var webapp_server_path = webapp + 'server/';

var webapp_client_path = webapp + 'newclient/';

console.log('');
console.log('Client path : ', webapp_client_path, '\nServer path : ', webapp_server_path);
console.log('');

var App = require(webapp_server_path + 'app');
var app = new App();

var options = {
    port: port,
    isDev: isDev,
    isDeployed: isDeployed,
    serverPath: webapp_server_path,
    clientPath: webapp_client_path
};

app.start(options);
