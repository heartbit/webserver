var config = require('Config');

var forge = {
	request: function(params, command) {
		var req = {
			"id":command,
			"command": command,
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
				},
				{
					"taker_pays": {
					   	"currency": params.currency,
					   	"issuer": config.platforms.address[params.platform]
					},
					"taker_gets": {
					   	"currency": params.item
					},
					// "snapshot": true,
					// "both": true
				}
		   ]
		};
		req = JSON.stringify(req);
		return req;
	}
}

module.exports = forge;