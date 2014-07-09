define('marketcaps', ['config', 'marketcap'], function(config, Marketcap) {

	var Marketcaps = Backbone.Collection.extend({

		model: Marketcap,
		url: config.marketcap.urlCollection,

		parse: function(response) {
			console.log('Collection - parse');
			this.reset(response);
			return response;
		}
		
	});

	return Marketcaps;
});