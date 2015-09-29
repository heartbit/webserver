var OrderbookSocket = require('OrderbookSocket');
var OrderbookRequest = require('OrderbookRequest');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var currentParams;





var WebsocketActions = {

	updateOrderbook: function(params) {
		// var self = this;
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
		var remote = OrderbookSocket.getInstance();
		var mybook_ask = remote.book('XRP', null, 'USD', 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B');
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

		var mybook_bid = remote.book('USD','rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B','XRP',null);
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
	}


}


module.exports = WebsocketActions;