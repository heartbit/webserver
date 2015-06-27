var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var RippleexchangeratesStore = require('RippleexchangeratesStore');

var CHANGE_EVENT = 'change';
var _RippleInfos = {};


function registerInfo(result) {
	console.log('infos_result',result);
	var infos = result.toJSON();
	// console.log(infos);

	_.each(infos, function(info) {
		_RippleInfos[info.id] = info;
	});
	// console.log("_RippleInfosStore",_RippleInfos);
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

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


RippleinfosStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEINFOS:	
  		 	registerInfo(action.result); 	
  		 	RippleinfosStore.emitChange(action.result); 		
  		 	break;
  	}


  	
  	return true;

});


module.exports = RippleinfosStore;