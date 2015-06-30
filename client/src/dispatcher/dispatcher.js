var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var Constants = require('Constants');
var async = require('async');

var PayloadSources = Constants.PayloadSources;

var dispatcher = new Dispatcher();

var queue = async.queue( function (task, callback) {
	var payload = {
		source:PayloadSources[task.source],
		action: task.action
	};
	AppDispatcher.dispatch(payload);
	callback();

}, 1);

AppDispatcher = assign(dispatcher, {
    handleServerAction: function (action) {
        queue.push({source : 'SERVER_ACTION', action : action});
        // console.log(queue);
    },
    handleViewAction: function (action) {
        queue.push({source: 'VIEW_ACTION', action : action});
		// console.log(queue);
    }
});


module.exports = AppDispatcher;