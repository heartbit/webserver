var Dispatcher = require('Dispatcher');
//var GridStore = require('GridStore');
// var Account = require('Account');
var React = require('react');
var Candles = require('Candles');
var Volumes = require('Volumes');
var IntervalTranslate = require('IntervalTranslate');
var RangeTranslate = require('RangeTranslate');

var Constants = require('Constants')
var Q = require('q')

var DashboardActions = {

	displayMainGraph: function(params) {
		var self = this 
		var updateFrequency = IntervalTranslate(params.interval);
		display();
		function display() {
			var range = RangeTranslate(params.range, params);
			var newParams = _.extend(params, range);
			var promiseCandle = self.populeCandle(newParams);
			var promiseVolume = self.populeVolume(newParams);
			Q.all([promiseCandle,promiseVolume]).then(function(){
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.FILL_MAINGRAPH,
					result: {}
				});
			});
		}
		setInterval(display, updateFrequency.interval*1000);
	},
	
    populeCandle : function(params){
    	var deferred = Q.defer();
    	var candles = new Candles();
		candles.fetchCandles(params).then(function(result) {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_CANDLE,
				result: {candles:result}
			});
	        deferred.resolve(result);
		});
		return deferred.promise;
    },
    
    populeVolume: function(params){
    	var self = this;
    	var deferred = Q.defer();
    	var volumes = new Volumes();

    	this.interval = IntervalTranslate(params.interval);

		volumes.fetchVolumes(params,self.interval).then(function(result) {	
			result['interval'] = interval;
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_VOLUME,
				result: {volumes:result}
			});
	        deferred.resolve(result);
		});
		return deferred.promise;
    },

	updateMainGraphParams: function(params) {

		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.UPDATE_MAINGRAPHPARAMS,
			result: params
		})
	},

	updateMovingAverage: function(params) {
		var candles = new Candles();
		candles.fetchCandles(params).then(function(result) {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_MA,
				result: {candles:result, params: params}
			});
		});
	}


}

module.exports = DashboardActions;