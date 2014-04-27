define('currency', ['config', 'moment'], function(config, moment) {

	var Currency = Backbone.Model.extend({

		initialize: function(id) {
			this.set('id', id);
		},

	});

	return Currency;
});