var _ = require('underscore');
var WebSocket = require('ws');
var parser = require('../helpers/orderbookParser');
var metaparser = require('ripple-lib-transactionparser');

function RippleSocketService() {
 //   	if (RippleSocketService.caller != RippleSocketService.getInstance) {
	// 	throw new Error("This object cannot be instanciated");
	// }
	var self = this;
	this.parser = new parser();
	this.uri = 'wss://s1.ripple.com:443'
	var ws = new WebSocket('wss://s-east.ripple.com:443');
	this.pair = ['XRP','USD'];
	this.currencyIssuer = "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B";
	this.itemIssuer = null;
	var reqob = {
	   "command": "subscribe",
	   "books": [
	       {
	           "taker_pays": {
	               "currency": this.pair[0]
	           },
	           "taker_gets": {
	               "currency": this.pair[1],
	               "issuer": this.currencyIssuer
	           },
	           "snapshot": true,
	           "both": true
	       }
	   ]
	};

	ws.on('open', function() {
		console.log("RIPPLE WEBSOCKET IS CONNECTED");
		reqob = JSON.stringify(reqob);
		ws.send(reqob);
	});

	ws.on('message', function(data,flags) {
		var data = JSON.parse(data);
		if(data.result) {
			// PARSING DE L'ORDERBOOK INITIAL
			var asks = data.result.asks;
			var bids = data.result.bids;
			var initialRaw = [asks,bids];

			var thinAsks = self.parser.filterInit(asks,'ask');
			var thinBids = self.parser.filterInit(bids, 'bid');			 
		} else {
			// PARSING DES ORDRES QUI ARRIVENT (utile pour voir les canceled/partiallyexecuted....) ! Parsing différent, manque une fonction pour merger avec orderbook existant !
			console.log(metaparser.parseOrderbookChanges(data.meta));
		}
			
	});
       
};

RippleSocketService.prototype.getInstance = function() {
	return this;
}


module.exports = RippleSocketService;