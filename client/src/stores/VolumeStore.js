var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _VolumeStore = {};


function registerVolumes(result) {
	_.each(result.volumes, function(volume) {
		_VolumeStore[volume.timestamp] = volume;
	});
	console.log("_VolumeStore",_VolumeStore);
};

var VolumeStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _VolumeStore;
	},

	getSpecific:function(key) {
		return _VolumeStore[key];
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


VolumeStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_VOLUME:	
  		 	registerVolumes(action.result); 	
  		 	VolumeStore.emitChange();
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			VolumeStore.emitLoading('isloading');
			break;
  	}
  	
  	return true;
});


module.exports = VolumeStore;