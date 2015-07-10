var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _CandleStore = {};


function registerCandles(result) {
	_CandleStore= {};
	_.each(result.candles, function(candle) {
		_CandleStore[candle.timestamp] = candle;
	});
	_CandleStore.interval = 0;
	var i;
	var count = 0;
	for (i in _CandleStore){
		_CandleStore.interval = i - _CandleStore.interval; 
		count++;
		if(count == 2){
			break;
		}
	}
	console.log("_CandleStore interval",_CandleStore.interval);
};

var CandleStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _CandleStore;
	},

	getSpecific:function(key) {
		return _CandleStore[key];
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


CandleStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_CANDLE:	
  		 	registerCandles(action.result); 	
  		 	CandleStore.emitChange();
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			CandleStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = CandleStore;