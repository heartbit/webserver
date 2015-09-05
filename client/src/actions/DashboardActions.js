var Dispatcher = require('Dispatcher');
//var GridStore = require('GridStore');
// var Account = require('Account');
var React = require('react');
var Candles = require('Candles')
var Volumes = require('Volumes')

var Constants = require('Constants')
var Q = require('q')

var DashboardActions = {

	displayMainGraph: function(params) {
		var promiseCandle = this.populeCandle(params)
		var promiseVolume = this.populeVolume(params)
		Q.all([promiseCandle,promiseVolume]).then(function(){
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.FILL_MAINGRAPH,
				result: {}
			});
		})
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
    	var deferred = Q.defer();
    	var volumes = new Volumes();
		volumes.fetchVolumes(params).then(function(result) {	
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