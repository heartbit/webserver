var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleids =  require('rippleids');
var ripplelines = require('ripplelines');
var rippleinfos = require('rippleinfos');
var RippledataActions = require("RippledataActions");


var AccountActions = {


	loadinggif: function(toresolves) {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.LOADING_GIF,
				toresolves:toresolves
			});
	},
	
	rippleid: function(toresolve,gridsterKeys) {
		var self = this;
		// self.storeB();

		toresolves = toresolve;

		var rippleidcollection = new rippleids();

		rippleidcollection.createIdList(toresolves,gridsterKeys).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEID,
				result: rippleidcollection
			});
			self.rippleaccountoverview();
		
			self.ripplelines(rippleidcollection);
			self.rippleinfos(rippleidcollection);
		});
	},

	ripplelines: function(toresolve) {
		var self=this;
		var ripplelinescollection = new ripplelines();

		ripplelinescollection.createLinesList(toresolve.toJSON()).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLELINES,
				result: ripplelinescollection
			});
			RippledataActions.exchangerates(ripplelinescollection.toJSON(),"month");
		});	

	},

	rippleinfos: function(toresolve) {
		var self = this;
		var rippleinfoscollection = new rippleinfos();
		// console.log("TORESOLVE_actionINFOS",toresolve);
		rippleinfoscollection.createInfosList(toresolve.toJSON()).then(function() {	

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEINFOS,
				result: rippleinfoscollection
			});
		
		});	
	},

	rippleaccountoverview: function() {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTOVERVIEW,
			result:{}
		});
	}

}

module.exports = AccountActions;