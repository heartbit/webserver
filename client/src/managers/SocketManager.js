var io = require('socketio');
var instance = null;

var DataSocketManager = function() {
    if (instance !== null) {
        throw new Error("Cannot instantiate more than one DataSocketManager, use DataSocketManager.getInstance()  ");
    }
};

DataSocketManager.getInstance = function() {
    if (instance === null) {
        instance = io();

        instance.on('connect', function() {
            console.log('data socket connected!')
        });
        
        instance.on('disconnect', function() {
            console.log('data socket disconnected!')
        });
    }
    return instance;
};

module.exports = DataSocketManager.getInstance();