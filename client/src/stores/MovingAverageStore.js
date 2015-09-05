var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _MaStore = {};


function registerCandles(result) {
	_MaStore= {};
	_.each(result.candles, function(candle) {
		_MaStore[candle.timestamp] = candle;
	});
	_MaStore.interval = 0;
	var i;
	var count = 0;
	for (i in _MaStore){
		_MaStore.interval = i - _MaStore.interval; 
		count++;
		if(count == 2){
			break;
		}
	}
	console.log("_MovingAverageStore",_MaStore,result);
};

var MovingAverageStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _MaStore;
	},

	getSpecific:function(key) {
		return _MaStore[key];
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(candle,callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


MovingAverageStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_MA:	
  		 	registerCandles(action.result); 	
  		 	MovingAverageStore.emitChange();
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			MovingAverageStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = MovingAverageStore;