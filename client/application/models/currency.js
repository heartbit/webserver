define('currency', ['backbone','config', 'moment'], function(Backbone, config, moment) {

	var Currency = Backbone.Model.extend({

		initialize: function(id) {
			this.set('id', id);
		},

	});

	return Currency;
});