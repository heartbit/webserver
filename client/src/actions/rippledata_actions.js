var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleexchangerates = require('rippleexchangerates');
var rippleexchangerate = require('rippleexchangerate');

var RippledataActions = {

	exchangerates: function(accountslines,range) {
		// console.log("exchangerates_action",accountslines);
		// var lines = accountinfo.attributes.lines;
		var range = range;
		var exchangeratescollection = new rippleexchangerates();
		exchangeratescollection.getExchangerates(accountslines,range).then(function() {

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES,
				result: exchangeratescollection
			});
		
		});
	
	}


};


module.exports = RippledataActions;