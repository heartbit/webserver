
var Config = require('Config');
var parser = require('OrderbookParser');
// var metaparser = require('ripple-lib-transactionparser');
var Remote = require('ripplelib').Remote;


var OrderbookSocket = (function() {
	var instance;
	function init() {
		//Private var: ws connection
		// var webSocket = window.WebSocket || window.MozWebSocket;
		// var ws = new webSocket(Config.websocketurl.ripple);

		remote = new Remote({
			servers: [ Config.websocketurl.ripple ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + Config.websocketurl.ripple);
		});

		remote.on('disconnect' ,function() {
			console.log('ripple remote WSS has been disconnected');
		});



		return  remote;

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