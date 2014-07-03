var request = require('request');
var fs = require('fs');
var _ = require('underscore');
var io = require('socket.io');

var EventManager = require('../managers/EventManager');
var APIManager = require('../managers/APIManager');
var CacheManager = require('../managers/CacheManager');
var config = require('../config/');

function ClientSocket(params) {
	this.isDebug = params.isDebug;
	this.server = params.server;
	this.apiUrl = params.apiUrl;
	this.dataPath = params.dataPath;
};

ClientSocket.prototype.run = function(callback) {
	var self = this;
	var params;
	if (!this.isDebug) {
		params = {
			log: false
		};
	}
	this.io = io(this.server, params);
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
		.use(function(socket, next) {
			if (socket) {
				console.log('SOCKET NEWS CONNECTION MIDDLEWARE')
				return next();
			}
			next(new Error('Authentication error'));
		})
		.on('connection', function(socket) {
			socket.on('news', function(params) {
				console.log('ask for news')
				CacheManager.get('news', function(articles) {
					socket.emit('news', articles);
				});
			});
		});

	EventManager.on('news', function(data) {
		self.io
			.of("/news")
			.emit('news', data);
	});
};

var generateRoomnames = function(callback) {
	var self = this;
	var sep = ":";
	APIManager.getPlatforms(function(platforms) {

		var rooms = [];

		self.platforms = platforms;
		_.each(platforms, function(platform) {
			_.each(platform.pairs, function(pair) {
				var room = {
					id: pair.item + sep + pair.currency,
					channels: []
				};

				_.each(config.measures, function(measure) {
					var channel = platform.name + sep + pair.item + sep + pair.currency + sep + measure.key;
					room.channels.push(channel);
				});

				rooms.push(room);
			});
		});

		callback(rooms);

	});
};

ClientSocket.prototype.initDataNamespace = function() {
	var self = this;
	var max_num_rooms = 5;

	generateRoomnames(function(roomlist) {

		self.io
			.of("/data")
			.use(function(socket, next) {
				if (socket) {
					console.log('SOCKET DATA CONNECTION MIDDLEWARE')
					return next();
				}
				next(new Error('Authentication error'));
			})
			.on('connection', function(socket) {

				socket.datarooms = [];

				socket.on('roomlist', function() {
					console.log('client want to have the rooms list');
					socket.emit('roomlist', roomlist);
				});

				socket.on('enter-dataroom', function(dataroom) {
					console.log('client want to join dataroom : ' + dataroom);

					var checkDataroomRequest = function(dataroom) {
						return _.contains(_.pluck(roomlist, 'id'), dataroom);
					};

					// Check if dataroom exists
					if (!checkDataroomRequest(dataroom)) {
						var payload = {
							error: dataroom + ' is not available :/'
						};
						socket.emit('enter-dataroom', payload);
						return false;
					}

					if (socket.datarooms && socket.datarooms.length > max_num_rooms) {
						var payload = {
							error: 'Max connections socket reached :/'
						};
						socket.emit('enter-dataroom', payload);
						return false;
					}

					var room = _.find(roomlist, function(room) {
						return room.id == dataroom;
					});

					_.each(room.channels, function(channel) {
						CacheManager.get(channel, function(data) {
							var payload = {
								key: channel,
								data: data,
								dataroom: dataroom
							};
							console.log('Send cache : ', channel);
							console.log(data);
							socket.emit(channel, payload)
						});
					});

					socket.join(dataroom, function(err) {
						console.log('err dataroom join : ', err);
					});
					socket.datarooms.push(dataroom);

					console.log(socket.rooms);

				});

				socket.on('leave-dataroom', function(dataroom) {
					if (_.contains(socket.datarooms, dataroom)) {
						socket.emit('leave-dataroom', 'success');
						socket.leave(dataroom);
						console.log('rooms : ', socket.rooms);
					} else {
						socket.emit('leave-dataroom', 'error');
					}
				});

				socket.on('disconnect', function() {
					console.log('socket disconnected');
				});

			});

		_.each(roomlist, function(room) {
			_.each(room.channels, function(channel) {
				EventManager.on(channel, function(data) {
					if (channel == 'BTCCHINA:BTC:CNY:TRD') {
						console.log(channel);
						console.log(room);
					}
					var payload = {
						key: channel,
						data: data,
						dataroom: room.id
					};
					self.io
						.of("/data")
						.to(room.id)
						.emit(channel, payload);
				});

			})
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

module.exports = ClientSocket;