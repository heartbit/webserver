var Dispatcher = require('Dispatcher');
var React = require('react');
var Constants = require('Constants');
var Q = require('q');
var DashboardActions = require('DashboardActions');
var TickerActions = require('TickerActions');
var Platforms = require('Platforms');

var SelectorActions = {

	initSelector: function(params) {
		var platforms = new Platforms();
		platforms.fetchPlatform().then(function(result){
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_PLATFORM,
				result:{platforms:result,params:params}
			});
		});
		this.refreshGraphAndKeyfact(params);
	},
	refreshGraphAndKeyfact:function(params){
		DashboardActions.displayMainGraph(params);
        var channel = params.platform+":"+params.item+":"+params.currency+":TCK";
        TickerActions.displayTicker(channel);
	}

	
}

module.exports = SelectorActions;