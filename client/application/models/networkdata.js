define('networkdata', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

	var Networkdata = Backbone.Model.extend({

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

	return Networkdata;
});