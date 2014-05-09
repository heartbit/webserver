var request = require('request');
var fs = require('fs');
var _ = require('underscore');
var EventManager = require('../managers/EventManager');
var APIManager = require('../managers/APIManager');
var CacheManager = require('../managers/CacheManager');
var config = require('../config/');

function ClientSocket(params) {
	this.isDebug = params.isDebug;
	this.server = params.server;
	this.apiUrl = params.apiUrl;
	this.dataPath = params.dataPath;
	// this.news = {};
};

ClientSocket.prototype.run = function(callback) {
	var self = this;
	var params;
	if (!this.isDebug) {
		params = {
			log: false
		};
	}
	this.io = require('socket.io').listen(this.server, params);
	this.initDataNamespace();
	this.initNewsfeedNamespace();
	// this.initChatNamespace();
	if (callback) {
		callback();
	}
};

ClientSocket.prototype.initNewsfeedNamespace = function() {
	var self = this;

	this.io
		.of("/news")
		.on('connection', function(socket) {
			socket.on('news', function(params) {
				CacheManager.get('news', function(articles) {
					socket.emit('news', articles)
				})
			});
		});

	EventManager.on('news', function(data) {
		self.io
			.of("/news")
			.emit('news', data);
	});
};

ClientSocket.prototype.initDataNamespace = function() {
	var self = this;
	var sep = ":";
	this.datarooms = [];
	this.io
		.of("/data")
		.on('connection', function(socket) {
			socket.on('dataroom', function(dataroom) {
				console.log('client want to join dataroom : ' + dataroom);
				 socket.get('dataroom', function(err, nameroom) {
				 	if (nameroom === dataroom) {
				 		socket.leave(nameroom);
				 	}
				 	else {
				 	 	self.datarooms.push(dataroom);
				 	}
				 });

				// Send cached data :
				_.each(self.platforms, function(platform) {
					_.each(platform.pairs, function(pair) {
						if (pair.item + sep + pair.currency == dataroom) {
							_.each(config.measures, function(measure) {
								var cacheKey = platform.name + sep + pair.item + sep + pair.currency + sep + measure.key;
								console.log('Cachekey ', cacheKey);
								CacheManager.get(cacheKey, function(data) {
									var payload = {
										key: cacheKey,
										data: data,
										dataroom: dataroom
									};
									console.log('Send cache : ', cacheKey);
									socket.emit(cacheKey, payload)
								});
							});
						}
					});
				});

				socket.join(dataroom);
				socket.set('dataroom', dataroom);
			});

			socket.on('disconnect', function() {
				var rooms = self.io.sockets.manager.roomClients[socket.id];
				for (var room in rooms) {
					socket.leave(room);
				}
			});

		});

	APIManager.getPlatforms(function(platforms) {
		self.platforms = platforms;
		_.each(platforms, function(platform) {
			_.each(platform.pairs, function(pair) {
				_.each(config.measures, function(measure) {
					var channel = platform.name + sep + pair.item + sep + pair.currency + sep + measure.key;
					var room = pair.item + sep + pair.currency;

					EventManager.on(channel, function(data) {
						var payload = {
							key: channel,
							data: data,
							room: room
						}
						self.io
							.of("/data")
							. in (room)
							.emit(channel, payload);
					});
				});
			});
		});
	});
};

// ClientSocket.prototype.initChatNamespace = function() {
// 	this.io
// 		.of("/chat")
// 		.on('connection', function(socket) {
// 			// socket.emit('welcome', {
// 			// 	test: "blatte"
// 			// });
// 		});
// };

// ClientSocket.prototype.initServices = function(socket) {
// 	var self = this;
// 	socket.on('subscribe:ticker:last', function(params) {
// 		console.log('client subscribe!');
// 		self.initTickerService(socket, params);
// 		self.initTradeService(socket, params);
// 	});
// 	socket.on('disconnect', function() {
// 		console.log('client disconnected !! ');
// 	});
// };

// ClientSocket.prototype.initTradeService = function(socket, params) {
// 	var self = this;
// 	var sep = ":";
// 	_.each(self.platforms, function(platform) {
// 		_.each(platform.pairs, function(pair) {
// 			var sendNewTrade = function(ticker) {
// 				var eventIdUpdate = function(ticker) {
// 					var sep = ":";
// 					return "ticker" + sep + ticker.platform + sep + ticker.item + sep + ticker.currency + sep + 'last';
// 				};
// 				try {
// 					var objTicker = ticker;
// 					objTicker.platform = platform.id;
// 					objTicker.item = pair.item.id;
// 					objTicker.currency = pair.currency.id;
// 					// console.log('SendNewTrade trade', JSON.stringify(objTicker));
// 					socket.emit(eventIdUpdate(objTicker), objTicker);
// 				} catch (r) {
// 					console.log('err', r);
// 				}
// 			};
// 			EventManager.on(platform.id + sep + pair.item.id + sep + pair.currency.id + sep + 'TRD', sendNewTrade);

// 		});
// 	});
// };

// ClientSocket.prototype.initTickerService = function(socket, params) {
// 	var self = this;
// 	var sep = ":";
// 	_.each(self.platforms, function(platform) {
// 		_.each(platform.pairs, function(pair) {
// 			var sendNewTicker = function(ticker) {
// 				var eventIdUpdate = function(ticker) {
// 					var sep = ":";
// 					return "ticker" + sep + ticker.platform + sep + ticker.item + sep + ticker.currency + sep + 'last';
// 				};
// 				try {
// 					var objTicker = ticker;
// 					objTicker.platform = platform.id;
// 					objTicker.item = pair.item.id;
// 					objTicker.currency = pair.currency.id;
// 					socket.emit(eventIdUpdate(objTicker), objTicker);
// 				} catch (r) {
// 					console.log('err', r);
// 				}
// 			};
// 			EventManager.on(platform.id + sep + pair.item.id + sep + pair.currency.id + sep + 'TCK', sendNewTicker)
// 		});
// 	});
// };

module.exports = ClientSocket;