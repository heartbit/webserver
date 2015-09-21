var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var parser = require('OrderbookParser');
parser = new parser();
var metaparser = require('ripple-lib-transactionparser');

var CHANGE_EVENT = 'change';
var _OrderbookStore = {
	ask:{},
	bid: {}
};

function update(data) {
	var result = metaparser.parseOrderbookChanges(data.meta);
	console.log("UPDATE ORDERBOOk!",result);
	// merge
	// register(result);
}

function register(data){
	var asks = data.result.asks;
	var bids = data.result.bids;
	var initialRaw = [asks,bids];
	var thinAsks = parser.filterInit(asks,'ask');
	var thinBids = parser.filterInit(bids, 'bid');	
	_OrderbookStore = {
		ask: thinAsks,
		bid: thinBids
	};
	console.log("REGISTER STATE ORDERBOOK", _OrderbookStore);
}

var OrderbookStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _OrderbookStore;
	},

	getSpecific:function(key) {
		return _OrderbookStore[key];
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},

	emitCustom: function(event) {
		this.emit(event);
	},

	addChangeListener: function(candle,callback) {
		this.on(candle, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

OrderbookStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  	    case Constants.ActionTypes.ASK_ORDERBOOK:	
  	   		register(action.result); 	
		 	OrderbookStore.emitChange();
		 	break;
		case Constants.ActionTypes.UPDATE_ORDERBOOK:	
  	   	    update(action.result); 	
		 	// OrderbookStore.emitChange();
		 	break;
  		case Constants.ActionTypes.ISLOADING:
  			OrderbookStore.emitCustom('isloading');
			break;
  	}
  	return true;
});

module.exports = OrderbookStore;