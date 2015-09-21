var Orderbook = require('Orderbook');
var OrderbookSocket = require('OrderbookSocket');
var OrderbookRequest = require('OrderbookRequest');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');

var WebsocketActions = {

	updateOrderbook: function(params) {
		var ws = OrderbookSocket.getInstance();
		ws.onopen = function(e) {
			var request = OrderbookRequest.request(params);
			ws.send(request);
		}
		ws.onclose = function(e) {
			console.log(" WS has been closed: ",e);
		}

		ws.onmessage = function(e) {
			var data = JSON.parse(e.data);
			if(data.result) {
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_ORDERBOOK,
					result: data
				})
			} else {
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.UPDATE_ORDERBOOK,
					result: data
				})
			}
		}
	}


}


module.exports = WebsocketActions;