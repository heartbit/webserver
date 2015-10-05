var Dispatcher = require('Dispatcher');
var React = require('react');
var Constants = require('Constants');
var Market_Trader = require('Market_Trader');
var repeat;

var DataapiActions = {

	updateMarketTraders: function(params) {
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
	    }
	    repeat = setInterval(fetchModel, 60000);
	}


}

module.exports = DataapiActions;