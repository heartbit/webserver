define('EventManager', ['backbone'], function(Backbone) {

    var instance = null;

    function EventManager() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one EventManager, use EventManager.getInstance() faggot ;-) ");
        }
    };

    EventManager.getInstance = function() {
        if (instance === null) {
            instance = _.extend({}, Backbone.Events);
        }
        return instance;
    };

    return EventManager.getInstance();

});