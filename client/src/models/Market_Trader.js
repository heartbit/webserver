var config = require('Config');


var Platform = Backbone.Model.extend({
    
	initialize: function(params) {
		var query = {
		    "base": {
		        "currency": params.item
		    },
		    "counter": {
		        "currency": params.currency,
		        "issuer": config.platforms.address[params.platform]
		    },
		    "transactions": false,
		    "format": "json"
		}

		this.url =config.dataapi.market_traders+JSON.stringify(query);
	}

});


module.exports = Platform;