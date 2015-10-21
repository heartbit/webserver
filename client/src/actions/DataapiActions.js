var Dispatcher = require('Dispatcher');
var React = require('react');
var Constants = require('Constants');
var Market_Trader = require('Market_Trader');
var repeat;
var Config = require('Config');

var DataapiActions = {

	updateMarketTraders: function(params) {
		var isBitcoin = _.find(Config.strictbitcoin, function(platform) {
			return platform == params.platform;
		});
		console.log("PArams && isBitcoin",params, isBitcoin);

		if(isBitcoin) {
			bitcoinMM();
		} else {
			rippleMM();
		}

		function rippleMM() {
		    clearInterval(repeat);
	    	var mt = new Market_Trader(params);
	    	fetchModel();
	    	function fetchModel() {
		    	mt.fetch({
		    		success: function(model) {
		    			model['params'] = params;
		    			Dispatcher.handleViewAction({
							actionType: Constants.ActionTypes.ASK_MARKETTRADERS,
							result: model
						});
		    		}
		    	});
		    	Dispatcher.handleViewAction({
		    		actionType: Constants.ActionTypes.LOADING_ORDERBOOK,
		    		result:null
		    	});
		    }
		    repeat = setInterval(fetchModel, 60000);
		}

		function bitcoinMM() {
			clearInterval(repeat);
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_MARKETTRADERS,
				result: { msg: "unavailable"}
			})
		}

	}


}

module.exports = DataapiActions;