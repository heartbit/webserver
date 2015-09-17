var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _PlatformsStore = {
	platforms:{}
};

function registerPlatforms(result){
	_.each(result.platforms, function(platform) {
		_PlatformsStore.platforms[platform.platformname] = platform.pairs;
	});
	// _PlatformsStore.params=result.params;
};
var PlatformsStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _PlatformsStore;
	},

	getSpecific:function(key) {
		return _PlatformsStore[key];
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

PlatformsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  	     case Constants.ActionTypes.ASK_PLATFORM:	
  	   	    registerPlatforms(action.result); 	
		 	PlatformsStore.emitChange();
		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			PlatformsStore.emitLoading('isloading');
			break;
  	}
  	return true;
});

module.exports = PlatformsStore;