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
    // this.initNewsfeedNamespace();
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
            .volatile
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

                var channels = []
                _.each(config.measures, function(measure) {
                    channels.push(platform.name + sep + pair.item + sep + pair.currency + sep + measure.key);
                });

                var roomid = pair.item + sep + pair.currency;
                var room = _.find(rooms, function(room) {
                    return room.id == roomid;
                });

                // Room already exists
                if (room) {
                    room.channels = _.union(room.channels, channels);
                } else {
                    rooms.push({
                        id: roomid,
                        channels: channels
                    });
                }

            });
        });

        callback(rooms);

    });
};

ClientSocket.prototype.initDataNamespace = function() {
    var self = this;

    var channel = "BITSTAMP:BTC:USD:TRD";
    
    this.io.on('connection', function(socket) {
        console.log('a user connected');
    });

    this.io
        .of("/data")
        .use(function(socket, next) {
            if (socket) {
                console.log('SOCKET DATA CONNECTION MIDDLEWARE')
                return next();
            }
            next(new Error('Authentication error'));
        })
        .on('connection', function(socket) {
            console.log('SOCKET NEW CONNECTION');
            socket.join("BTC:USD", function(err) {
                if (err) {
                    var payload = {
                        error: err
                    };
                    console.log('err dataroom join : ', err);
                    socket.emit('enter-dataroom: BTC:USD; err: ', payload);
                } else {
                    socket.emit('enter-dataroom: BTC:USD: success!!');
                }
            });

            socket.on('disconnect', function() {
                console.log('socket disconnected');
            });

        });

    EventManager.on(channel, function(data) {
        console.log('event kafka on channel, send to room /data BTC:USD');
        var payload = {
            key: channel,
            data: data,
            dataroom: 'BTC:USD'
        };
        self.io
            .of("/data")
            .to('BTC:USD')
            // .volatile
            .emit(channel, payload);
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