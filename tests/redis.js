var Q = require('q');

var CacheManager = require('../server/managers/CacheManager');
var RedisManager = require('../server/managers/RedisManager');
var EventManager = require('../server/managers/EventManager');
var ApiManager = require('../server/managers/APIManager');

var config = require("../server/config/config.global");
ApiManager.init(config);

var params = {
	isDeployed: true,
	url: 'redis://ber:fraisefrqise95@insightfulcointrader.com:6379'
};

RedisManager.init(params)
	.then(function() {
		RedisManager.subscribeToChannels(function() {
			EventManager.on('KRAKEN:BTC:DOGE:TCK', function(data) {
				console.log(data);
			});
		});
	})
	.done();

// CacheManager.init(params)
// 	.then(function() {
// 		console.log('redis')
// 		CacheManager.get("KRAKEN:BTC:DOGE:TCK", function(data) {
// 			console.log('data', data);
// 		})

// 	})