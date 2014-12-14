var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleLines = {};


function registerAccount(result) {
	var accounts = result.toJSON();

	_.each(accounts, function(account) {
		_RippleLines[account.id] = account;
	});
	// console.log(_RippleLines);
};

var RipplelinesStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleLines;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleLines[key];
		return res;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	

});


Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
 
  		 case Constants.ActionTypes.ASK_RIPPLELINES:	
  		 	registerAccount(action.result); 	 		
  		 	break;
  	}

  	RipplelinesStore.emitChange();
  	
  	return true;

});


module.exports = RipplelinesStore;