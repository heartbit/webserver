define('tweet', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

	var Tweet = Backbone.Model.extend({

		defaults: {},

	});

	return Tweet;
});