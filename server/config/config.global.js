var config = {};

config.apiproxy = {};
// config.apiproxy.host = "http://176.31.126.113";
config.apiproxy.host = "http://37.187.112.123";
config.apiproxy.port = "9090";
config.apiproxy.hostUrl = config.apiproxy.host + ":" + config.apiproxy.port + "/front-api";
config.apiproxy.apiUrl = config.apiproxy.hostUrl + 'api/';

config.apiproxy.platforms = config.apiproxy.apiUrl + 'documentation/platform';
config.apiproxy.items = config.apiproxy.apiUrl + 'documentation/item';
config.apiproxy.criteria = config.apiproxy.apiUrl + 'documentation/criteria';
config.apiproxy.methods = config.apiproxy.apiUrl + 'documentation/methods';

config.newsproxy = {};
// config.newsproxy.host = "http://localhost";
// config.newsproxy.port = "9091";
config.newsproxy.host = "http://cryptonews.herokuapp.com";
config.newsproxy.port = "80";
config.newsproxy.hostUrl = config.newsproxy.host + ":" + config.newsproxy.port;
config.newsproxy.apiUrl = config.newsproxy.hostUrl + '/news/';

config.rippleaccountproxy = {};
config.rippleaccountproxy.host = "https://id.ripple.com/v1/user/";
config.rippleaccountproxy.port = "";
config.rippleaccountproxy.hostUrl = config.rippleaccountproxy.host;
config.rippleaccountproxy.remoteserver = "wss://s1.ripple.com:443";

config.rippledataapiproxy = {};
config.rippledataapiproxy.host = "http://api.ripplecharts.com/api/exchange_rates";
config.rippledataapiproxy.port = "";
config.rippledataapiproxy.hostUrl = config.rippledataapiproxy.host;

config.db = {};
config.db.redis = {};
// config.db.redis.url = "redis://176.31.114.161:6379";
config.db.redis.url = "redis://37.187.112.123:6379";
config.db.redis.password = "secret";

config.db.mongo = {};
config.db.mongo.url = "mongodb://176.31.114.161:27017/heartbit";
config.db.mongo.password = "";

config.db.kafka = {};
config.db.kafka.url = "176.31.126.113:32772";
config.db.kafka.tradeTopic = "bitstamp-trade";
config.db.kafka.groupId = "front-node-consumer";

config.measures = [{
	key: 'TCK',
	name: 'ticker'
}, {
	key: 'TRD',
	name: 'trade'
}, {
	key: 'DEPTH',
	name: 'depth'
}];

config.clientproxy = {};
config.clientproxy.urlRoutes = 'config/client-proxy-routes.json';

module.exports = config;