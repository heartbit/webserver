var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleInfos = {};


function registerInfo(result) {
	var infos = result.toJSON();

	_.each(infos, function(info) {
		_RippleInfos[info.id] = info;
	});
	// console.log("RippleInfos",_RippleInfos);
	// console.log("REGISTERINFO_result",result);
};

var RippleinfosStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleInfos;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleInfos[key];
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
 
  		 case Constants.ActionTypes.ASK_RIPPLEINFOS:	
  		 	registerInfo(action.result); 	 		
  		 	break;
  	}

  	RippleinfosStore.emitChange();
  	
  	return true;

});


module.exports = RippleinfosStore;