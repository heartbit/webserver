define('NewsSocketManager', ['socketio'], function(io) {

    var instance = null;

    var SocketManager = function() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one SocketManager, use SocketManager.getInstance()  ");
        }
    };

    SocketManager.getInstance = function() {
        if (instance === null) {
            instance = io('/news');

            instance.off = function(name, fn) {
                if (this.$events && this.$events[name]) {
                    var list = this.$events[name];
                    if (io.util.isArray(list)) {
                        var pos = -1;
                        for (var i = 0, l = list.length; i < l; i++) {
                            if (list[i].toString() === fn.toString() || (list[i].listener && list[i].listener === fn)) {
                                pos = i;
                                break;
                            }
                        }
                        if (pos < 0) {
                            return this;
                        }
                        list.splice(pos, 1);
                        if (!list.length) {
                            delete this.$events[name];
                        }
                    } else {
                        if (list.toString() === fn.toString() || (list.listener && list.listener === fn)) {
                            delete this.$events[name];
                        }
                    }
                }
                return this;
            };

            instance.on('connect', function() {
                console.log('news socket connected!')
            });
            instance.on('disconnect', function() {
                console.log('news socket disconnected!')
            });
        }
        return instance;
    };
    
    return SocketManager.getInstance();

});