var Dispatcher = require('Dispatcher');
var React = require('react');
var Constants = require('Constants')
var Ticker = require('../models/Ticker');
var ticker = new Ticker();

var TickerActions = {
	displayTicker: function(params) {
		ticker.changeParams(params);
		ticker.on("change", function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.RECEIVE_TICKER,
				result: ticker.model
			});
		})
	},
	changeTickerParams:function(params){
		ticker.changeParams(params);
	}
}

module.exports = TickerActions;