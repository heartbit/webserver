define('platform', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

	var Platform = Backbone.Model.extend({

		initialize: function(params) {
			this.set('id', params.id);
		},

	});

	return Platform;
});