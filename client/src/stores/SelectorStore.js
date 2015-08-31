var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _SelectorStore = {
	platforms:{}
};

function registerSelector(result){
	_SelectorStore=result;
};
var SelectorStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _SelectorStore;
	},

	getSpecific:function(key) {
		return _SelectorStore[key];
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(candle,callback) {
		this.on(candle, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

SelectorStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  	     case Constants.ActionTypes.REGISTER_SELECTOR:	
  	   	    registerSelector(action.result); 	
		 	SelectorStore.emitChange();
		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			SelectorStore.emitLoading('isloading');
			break;
  	}
  	return true;
});

module.exports = SelectorStore;