var request = require('request');

function RippledataapiProxy(params) {
	this.app = params.app;
	this.rippledataapiProxyHost = params.rippledataapiProxyHost;
};

RippledataapiProxy.prototype.init = function(callback) {
	var self = this;

	this.app.get('/ripple/dataapi/exchange_rates/*',function(req,res) {
		console.log(req.query.pairs);
	
		var parameters = req.query.pairs;
		// // console.log(JSON.stringify(parameters));
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost + 'exchange_rates',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters
		};

		var callback = function(error, response, body) {
			// var body = JSON.parse(body);

			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			} 			
			res.send(response.statusCode, body);
		};
		request(options, callback);
		// res.send(JSON.stringify(parameters));

	});

	this.app.get('/ripple/dataapi/market_traders/*', function(req, res) {
		var parameters = req.query.market;
		console.log("market_traders parameters", parameters);
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost + 'market_traders',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters
		};

		var callback = function(error, response, body) {
			// var body = JSON.parse(body);

			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			} 			
			res.send(response.statusCode, body);
		};
		request(options, callback);

	});

	if(callback) {
		callback();
	}

}

module.exports = RippledataapiProxy;