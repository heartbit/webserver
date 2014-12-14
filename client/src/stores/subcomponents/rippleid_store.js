var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleIddatas = {};


function registerId(result) {

	var addresses = result.toJSON();

	_.each(addresses, function(addr) {
		_RippleIddatas[addr.id] = addr;
	});
	// console.log("_RippleIddatas",_RippleIddatas);
};

var RippleidStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleIddatas;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleIddatas[key];
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
  		 case Constants.ActionTypes.ASK_RIPPLEID:	 
  		 	registerId(action.result);	 		
  		 	break;
  	}

  	RippleidStore.emitChange();

  	return true;
});


module.exports = RippleidStore;