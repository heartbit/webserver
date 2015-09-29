var OrderbookSocket = require('OrderbookSocket');
var OrderbookRequest = require('OrderbookRequest');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var config = require('Config');
var currentBooks = [];





var WebsocketActions = {

	updateOrderbook: function(params) {
		console.log(currentBooks, currentBooks.length);
		var self = this;
		if(currentBooks.length) {
			console.log("UNSUBSCIBE!", currentBooks);
			currentBooks[0].unsubscribe();
			currentBooks[1].unsubscribe();
			// remote.on('unsubscribe', bookSubscribe);
			bookSubscribe();
		} else  {
			bookSubscribe();
		}

		function bookSubscribe() {
			console.log("subscribe!",params);
			var remote = OrderbookSocket.getInstance();
			var mybook_ask = remote.book(params.item, null, params.currency, config.platforms.address[params.platform]);
			mybook_ask.on("model", handle_asks);
			function handle_asks(model) {
				// console.log("ASKS===>",model);
				var data = {
					result: {
						asks:model
					}
				}
				Dispatcher.handleViewAction({
							actionType: Constants.ActionTypes.ASK_ORDERBOOK,
							result: data
				});
				// console.log(model);
				// mybook_ask.unsubscribe();
			}

			var mybook_bid = remote.book(params.currency, config.platforms.address[params.platform], params.item ,null);
			mybook_bid.on("model", handle_bids);
			function handle_bids(model) {
				// console.log("BIDS===>",model);
				var data = {
					result: {
						bids:model
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