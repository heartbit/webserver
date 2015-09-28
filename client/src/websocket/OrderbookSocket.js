
var Config = require('Config');
var parser = require('OrderbookParser');
var metaparser = require('ripple-lib-transactionparser');


var OrderbookSocket = (function() {
	var instance;
	function init() {
		//Private var: ws connection
		var webSocket = window.WebSocket || window.MozWebSocket;
		var ws = new webSocket(Config.websocketurl.ripple);

		return  ws

	}
	
	return {
		getInstance: function() {
			if( !instance ) {
				console.log("new instance!");
				instance = init();
			}
			return instance;
		}
	};


})();




module.exports = OrderbookSocket;