var OrderbookSocket = require('OrderbookSocket');
var OrderbookRequest = require('OrderbookRequest');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var config = require('Config');
var currentBooks = [];



var WebsocketActions = {

	updateOrderbook: function(params) {
		console.log("updateorderbook",currentBooks);
		var self = this;
		bookSubscribe();

		function bookSubscribe() {
			if(currentBooks.length) {
				currentBooks[0].removeListener('model', handle_bids);
				currentBooks[0].unsubscribe();
				currentBooks[1].removeListener('model', handle_asks);
				currentBooks[1].unsubscribe();
			} 

			var remote = OrderbookSocket.getInstance();
			var options_bid = {
				currency_pays: params.item,
				// issuer_pays: null,
				currency_gets: params.currency,
				issuer_gets: config.platforms.address[params.platform],

			}
			var options_ask = {
				currency_pays: params.currency,
				issuer_pays: config.platforms.address[params.platform],

				currency_gets: "XRP"

			}
			remote._books = {};
    		remote._events.prepare_subscribe = [];


			var mybook_ask = remote.book(options_ask);
			mybook_ask.offersSync();
			mybook_ask.on("model", handle_asks);
			function handle_asks(model) {
				// console.log("ASKS===>",model);
				var data = {
					result: {
						asks:model,
						params:params
					}
				}
				Dispatcher.handleViewAction({
							actionType: Constants.ActionTypes.ASK_ORDERBOOK,
							result: data
				});

			}

			var mybook_bid = remote.book(options_bid);
			mybook_bid.offersSync();
			mybook_bid.on("model", handle_bids);
			function handle_bids(model) {
				// console.log("BIDS===>",model);
				var data = {
					result: {
						bids:model,
						params:params
					}
				}
				Dispatcher.handleViewAction({
								actionType: Constants.ActionTypes.ASK_ORDERBOOK,
								result: data
				});
			}
			currentBooks = [mybook_bid, mybook_ask];
		}
	}


}


module.exports = WebsocketActions;
		// var ws = OrderbookSocket.getInstance();

		// if(ws.readyState === 1) {
		// 	console.log('unsubscribe WS',currentParams);
		// 	var request = OrderbookRequest.request(currentParams, 'unsubscribe');
		// 	ws.send(request);
		// }

		// ws.onopen = function(e) {
		// 	console.log("WS OPEN !!!");
		// 	var request = OrderbookRequest.request(params,'subscribe');
		// 	ws.send(request);
		// 	currentParams = _.clone(params);
		// }
		// ws.onclose = function(e) {
		// 	console.log(" WS has been closed: ",e);
		// }

		// ws.onmessage = function(e) {
		// 	var data = JSON.parse(e.data);
		// 	data.params = params;
		// 	console.log(data);
			// if(data.result && !_.isEmpty(data.result)) {
			// 	Dispatcher.handleViewAction({
			// 		actionType: Constants.ActionTypes.ASK_ORDERBOOK,
			// 		result: data
			// 	})
			// } else if(data.meta) {
			// 	Dispatcher.handleViewAction({
			// 		actionType: Constants.ActionTypes.UPDATE_ORDERBOOK,
			// 		result: data
			// 	})
			// } else if(data.id == 'unsubscribe'){	
			// 	console.log("RESUBSCRIBE!!");
			// 	var request = OrderbookRequest.request(params,'subscribe');
			// 	ws.send(request);
			// 	currentParams = _.clone(params);
			// }
		// }