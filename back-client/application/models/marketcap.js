define('marketcap', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

	var Marketcap = Backbone.Model.extend({

		// url: config.marketcap.urlModel,
		// defaults: {
		// 	currencyName:"",
		// 	marketcap: {
		// 		date: "",
		// 		difficulty: "",
		// 		totalcoin: 0
		// 	}
		// },
		// initialize: function() {}

	});

	return Marketcap;
});