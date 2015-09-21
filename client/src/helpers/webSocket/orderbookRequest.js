var config = require('Config');

var forge = {
	request: function(params) {
		var req = {
		   "command": "subscribe",
		   "books": [
		       {
		           "taker_pays": {
		               "currency": params.item
		           },
		           "taker_gets": {
		               "currency": params.currency,
		               "issuer": config.platforms.address[params.platform]
		           },
		           "snapshot": true,
		           "both": true
		       }
		   ]
		};
		req = JSON.stringify(req);
		return req;
	}
}

module.exports = forge;