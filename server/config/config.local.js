var config = require('./config.global');

config.sockets = {};
config.sockets.client = {};
config.sockets.client.port = 9091;

// config.db.mongo.url = "mongodb://localhost/heartbit";//"mongodb://admin:fraise95@kahana.mongohq.com:10099/app24430464"
config.db.mongo.url = "mongodb://176.31.114.161:27017/heartbit";
module.exports = config;