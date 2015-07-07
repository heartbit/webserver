var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _TickerStore = {};

function registerTicker(result) {
	if(result) {
		_TickerStore = result;
	}
};

var TickerStore = assign({}, EventEmitter.prototype, {

	get: function() {
		return _TickerStore;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(ticker, callback) {
		this.on(ticker, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

TickerStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
	var result;
	switch (action.actionType) {
		case Constants.ActionTypes.RECEIVE_TICKER:
			registerTicker(action.result);
			TickerStore.emitChange();
			break;
	}
	return true;
});

module.exports = TickerStore;