define('pair', ['config', 'moment'], function(config, moment) {

	var Pair = Backbone.Model.extend({

		initialize: function(id) {
			this.set('id', id);
		},

	});

	return Pair;
});