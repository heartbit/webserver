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


ClientSocket.prototype.initDataNamespace = function() {
    var self = this;
    var max_num_rooms = 5

    generateRoomnames(function(roomlist) {
        self.io
            .of('/data')
            .use(function(socket, next) { 
                if(socket) {
                    console.log('SOCKET DATA CONNECTION MIDDLEWARE');
                    return next();
                }
                next(new Error('AUTHENTICATION error'));
            })
            .on('connection', function(socket) {
                socket.datarooms = [];

                socket.on('roomlist', function() {
                    console.log('client want to have the rooms list');
                    socket.emit('roomlist', roomlist);
                });

                socket.on('enter-dataroom', function(dataroom) {
                    var checkDataroomRequest = function(dataroom) {
                        var room = _.find(roomlist, function(room) {
                            return room.id == dataroom;
                        });
                        // console.log('SELECTED ROOM:', room);
                        return room;
                    }
                    // check if dataroom exists
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

                    // _.each(room.channels, function(channel) {
                    //     CacheManager.get(channel, function(data) {
                    //         var payload = {
                    //             key: channel,
                    //             data: data,
                    //             dataroom: dataroom
                    //         };
                    //         // console.log('Send cache : ', channel, payload);
                    //         socket.emit(channel, payload)
                    //     });
                    // });

                    socket.join(dataroom, function(err) {
                        if (err) {
                            var payload = {
                                error: err
                            };
                            console.log('err dataroom join : ', err);
                            socket.emit('enter-dataroom', payload);
                        } else {
                            socket.emit('enter-dataroom', {
                                result: 'success',
                                dataroom: dataroom
                            });
                        }
                    });

                });
               
        });
        
        _.each(roomlist, function(room) {
            _.each(room.channels, function(channel) {
                EventManager.on(channel, function(data) {
                    // console.log('event redis on channel, send to room /data BTC:USD');
                    var payload = {
                        key: channel,
                        data: data,
                        dataroom: room.id
                    };
                    self.io
                        .of('/data')
                        .to(room.id)
                        // .volatile
                        .emit(channel, payload);
                });
            });
        });
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
                var item = pair.split(';')[0];
                var currency = pair.split(';')[1];
                var channels = []
                _.each(config.measures, function(measure) {
                    channels.push(platform.platformname + sep + item + sep + currency + sep + measure.key);
                });

                var roomid = item + sep + currency;
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
        // console.log("ROOMS",rooms);
        callback(rooms);

    });
};




// ClientSocket.prototype.initNewsfeedNamespace = function() {
//     var self = this;

//     var dataNamespace = this.io.of("/news");
//     // .use(function(socket, next) {
//     //     if (socket) {
//     //         console.log('SOCKET NEWS CONNECTION MIDDLEWARE')
//     //         return next();
//     //     }
//     //     next(new Error('Authentication error'));
//     // })
//     dataNamespace.on('connection', function(socket) {
//         socket.on('news', function(params) {
//             console.log('ask for news')
//             CacheManager.get('news', function(articles) {
//                 socket.emit('news', articles);
//             });
//         });
//     });

//     EventManager.on('news', function(data) {
//         self.io
//             .of("/news")
//             .volatile
//             .emit('news', data);
//     });
// };


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