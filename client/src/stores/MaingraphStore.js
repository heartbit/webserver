var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var CandleStore = require('CandleStore');
var VolumeStore = require('VolumeStore');

var CHANGE_EVENT = 'change';
var _MaingraphStore = {};

function registerMainGraph() {
	// console.log("_MaingraphStore",_MaingraphStore);
};

var MaingraphStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _MaingraphStore;
	},

	getSpecific:function(key) {
		return _MaingraphStore[key];
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

MaingraphStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  	     case Constants.ActionTypes.ASK_CANDLE:	
  	    	Dispatcher.waitFor([
              CandleStore.dispatcherIndex
            ]);
  	    	_MaingraphStore.candles = CandleStore.getAll()
		 	break;
  	     case Constants.ActionTypes.ASK_VOLUME:	
 	    	Dispatcher.waitFor([
              VolumeStore.dispatcherIndex
            ]);
 	    	_MaingraphStore.volumes = VolumeStore.getAll()
		 	break;
  		 case Constants.ActionTypes.FILL_MAINGRAPH:	
  			console.log("_MaingraphStore",_MaingraphStore);
  		 	MaingraphStore.emitChange();
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			MaingraphStore.emitLoading('isloading');
			break;
  	}
  	return true;
});

module.exports = MaingraphStore;