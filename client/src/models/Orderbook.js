var OrderbookSocket = require('OrderbookSocket');


var Orderbook = Backbone.Model.extend({
	init: function() {

	},

	changeParams: function(params) {

	}
});

		// var request = {
		//    "command": "subscribe",
		//    "books": [
		//        {
		//            "taker_pays": {
		//                "currency": this.pair[0]
		//            },
		//            "taker_gets": {
		//                "currency": this.pair[1],
		//                "issuer": this.currencyIssuer
		//            },
		//            "snapshot": true,
		//            "both": true
		//        }
		//    ]
		// };
// // if(ws !== null) {
// 	// 	throw new Error("Cannot instantiate Orderbooksocket twice, use .getinstance()");
// 	// } 
// 	// var self = this;
// 	// this.parser = new parser();

// 	OrderbookSocket.create = function(params) {
// 	var self = this;
// 	this.pair = ['XRP','USD'];
// 	this.currencyIssuer = "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B";
// 	this.itemIssuer = null;
	
// 	var reqob = {
// 	   "command": "subscribe",
// 	   "books": [
// 	       {
// 	           "taker_pays": {
// 	               "currency": this.pair[0]
// 	           },
// 	           "taker_gets": {
// 	               "currency": this.pair[1],
// 	               "issuer": this.currencyIssuer
// 	           },
// 	           "snapshot": true,
// 	           "both": true
// 	       }
// 	   ]
// 	};

// 	// ws.onopen = function() {
// 	// 	console.log("RIPPLE WEBSOCKET IS CONNECTED");
// 	// 	reqob = JSON.stringify(reqob);
// 	// 	ws.send(reqob);
// 	// };

// 	// ws.onmessage = function(e) {
// 	// 	var data = JSON.parse(e.data);
// 	// 	if(data.result) {
// 	// 		// PARSING DE L'ORDERBOOK INITIAL
// 	// 		var asks = data.result.asks;
// 	// 		var bids = data.result.bids;
// 	// 		var initialRaw = [asks,bids];

// 	// 		var thinAsks = self.parser.filterInit(asks,'ask');
// 	// 		var thinBids = self.parser.filterInit(bids, 'bid');		
// 	// 		console.log(thinAsks, thinBids);	 
// 	// 	} else {
// 	// 		// PARSING DES ORDRES QUI ARRIVENT (utile pour voir les canceled/partiallyexecuted....) ! Parsing différent, manque une fonction pour merger avec orderbook existant !
// 	// 		// console.log(metaparser.parseOrderbookChanges(data.meta));
// 	// 	}
			
// 	// };
       
// }

// OrderbookSocket.prototype.update = function() {

// }

// OrderbookSocket.easy = function() {

// }


// OrderbookSocket.getInstance = function() {
// 	// var uh = new test2("roger","eurk");
// 	// console.log(uh, uh.current);
// 	return OrderbookSocket;
// }

module.exports = Orderbook;