define('pair', ['backbone','config', 'moment'], function(Backbone, config, moment) {

	var Pair = Backbone.Model.extend({

		initialize: function(id) {
			this.set('id', id);
		},

	});

	return Pair;
});