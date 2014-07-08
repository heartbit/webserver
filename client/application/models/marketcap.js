define('marketcap', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

	var Marketcap = Backbone.Model.extend({

		url: config.marketcap.urlModel,

		defaults: {
		
			marketcap: {
				name: "",
				currencyId: "",
				marketcap: 0,
				price: 0,
				supply: 0,
				volume_24: 0,
				priceChange: 0,
				volumeChange: 0
			}
		},

		initialize: function() {}


	});

	return Marketcap;
});