define('platform', ['config', 'moment'], function(config, moment) {

	var Platform = Backbone.Model.extend({

		initialize: function(params) {
			this.set('id', params.id);
		},

	});

	return Platform;
});