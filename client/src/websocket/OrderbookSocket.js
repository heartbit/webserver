
var Config = require('Config');
var parser = require('OrderbookParser');
var metaparser = require('ripple-lib-transactionparser');
var Remote = require('ripple-lib').Remote;

var OrderbookSocket = (function() {
	var instance;
	function init() {
		//Private var: ws connection
		// var webSocket = window.WebSocket || window.MozWebSocket;
		// var ws = new webSocket(Config.websocketurl.ripple);
		remote = new Remote({
			servers: [ "wss://s1.ripple.com:443" ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
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