define('marketcap', ['moment'], function(moment) {

	var Marketcap = Backbone.Model.extend({

		defaults: {
			currencyName: "",
			marketcap: {
				date: new Date(),
				difficulty: 0,
				totalCoin: 0
			}
		},

		parse: function(json) {
			// Parse timestamp to Date
			if (json.marketcap) {
				json.marketcap.date = new Date(+json.marketcap.date * 1000);
				json.marketcap.difficulty = +json.marketcap.difficulty;
				json.marketcap.totalCoin = +json.marketcap.totalCoin;
			}
			return json;
		},

	});

	return Marketcap;
});