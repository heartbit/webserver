define('platforms', ['config', 'platform'], function(config, Platform) {

	var Platforms = Backbone.Collection.extend({

		url: config.platform.urlCollection,

		findByName: function(name) {
			return _.find(this.models, function(platform) {
				return platform.get('name') === name;
			});
		}

	});

	return Platforms;

});