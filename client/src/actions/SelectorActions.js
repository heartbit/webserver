var Dispatcher = require('Dispatcher');
var React = require('react');
var Constants = require('Constants');
var Q = require('q');
var DashboardActions = require('DashboardActions');
var TickerActions = require('TickerActions');
var WebsocketActions = require('WebsocketActions');
var DataapiActions = require('DataapiActions');
var Platforms = require('Platforms');
var RangeTranslate = require('RangeTranslate');
var DataSocketManager = require('DataSocketManager');

var SelectorActions = {

	initSelector: function(params) {
		var platforms = new Platforms();
		platforms.fetchPlatform().then(function(result){
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_PLATFORM,
				result:{platforms:result}
			});
		});
		DataSocketManager.once('roomlist', function(roomlist) {
	        this.roomlist = roomlist;
	    });
	    DataSocketManager.emit('roomlist');
	    // init store maingraph params
	    // DashboardActions.updateMainGraphParams(null);
		this.changeSelector(params);
	},
	changeSelector: function(params) {
		var range = RangeTranslate(params.range, params);
		var newParams = _.extend(params, range);
	    this.joinDataRoom(params);
		this.refreshGraphAndKeyfact(newParams);
		this.refreshOrderbook(newParams);
		this.refreshMarketTraders(newParams);
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.REGISTER_SELECTOR,
			result: newParams
		});
		
	},
	refreshGraphAndKeyfact:function(params){
		DashboardActions.displayMainGraph(params);
        var channel = params.platform+":"+params.item+":"+params.currency+":TCK";
        TickerActions.displayTicker(channel);
	},

	refreshOrderbook: function(params) {
		WebsocketActions.updateOrderbook(params);
	},

	refreshMarketTraders: function(params) {
		DataapiActions.updateMarketTraders(params,true);
	},

	joinDataRoom: function(params) {
		var dataroom = params.item + ':' + params.currency;
		DataSocketManager.emit('enter-dataroom', dataroom)
	}

	
}

module.exports = SelectorActions;