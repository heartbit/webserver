define('ChatSocketManager', ['socketio'], function() {

    var instance = null;

    var SocketManager = function() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one SocketManager, use SocketManager.getInstance() faggot ;-) ");
        }
    };

    SocketManager.getInstance = function() {
        if (instance === null) {
            instance = io.connect('/chat');
            instance.on('connect', function() {
                console.log('chat socket connected!')
            });
            instance.on('disconnect', function() {
                console.log('chat socket disconnected!')
            });
        }
        return instance;
    };

    return SocketManager.getInstance();

});