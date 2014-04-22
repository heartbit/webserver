define('maingraphe', ['config', 'moment'], function(config, moment) {

	var Maingraphe = Backbone.Model.extend({

		defaults: {
			candle: {
				high: 1000,
				low: 500,
				open: 600,
				close: 800,
				startDate: 1356998400,
				endDate: 1357084800
			},
			volume: {
				amount: 10,
				startDate: 1356998400,
				endDate: 1357084800
			}
		},

		parse: function(json) {
			// Parse timestamp to Date
			json.candle.startDate = new Date(+json.candle.startDate * 1000);
			json.candle.endDate = new Date(+json.candle.endDate * 1000);
			json.volume.startDate = new Date(+json.volume.startDate * 1000);
			json.volume.endDate = new Date(+json.volume.endDate * 1000);
			return json;
		},

	});

	return Maingraphe;
});