var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var MaingraphStore = require('MaingraphStore');
var IntervalTranslate = require('IntervalTranslate');

var CHANGE_EVENT = 'change';
var _MaStore = {};


function calculMa(result) {
	var calculatedMa = {};
	var params = result.params;
	var originalData = MaingraphStore.getAll().candles;
	var originalStart = params.dateOriginalStart;
	var ma = params.ma;
	var interval = params.interval;
	var intervalT = params.intervalT;

	calculatedMa =[];

	var totalOriginal = 0;
	_.each(originalData, function(candle, key) {
		if(key != 'interval') {
			var firsttimestamp = candle.timestamp-(intervalT*params.ma);
			var key = parseInt(key);

			totalOriginal ++;
			var count = 0;
			newPoint = {};
			newPoint['close'] = 0;
			_.each(result.candles, function(macandle, matimestamp) {
				if(firsttimestamp<=macandle.timestamp && macandle.timestamp < key) {
					newPoint['close'] += macandle.close;
					count++;
				}
			});

			newPoint['timestamp'] = key;
			if(newPoint['close'] == 0) {
				newPoint['close'] = candle.close;
			} else {
				newPoint['close'] = newPoint['close']/count;
			}
			calculatedMa.push(newPoint);
			count = 0;
		}
	});

	return calculatedMa;
}

function registerCandles(result) {
	_MaStore= {};
	_MaStore['candles'] = {};
	_.each(result.candles, function(candle) {
		_MaStore['candles'][candle.timestamp] = candle;
	});
	_MaStore['params'] = result.params;
	_MaStore['calculated'] = calculMa(_MaStore);
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