define('currencies', ['config', 'currency', 'fuse'], function(config, Currency, Fuse) {

	var Currencies = Backbone.Collection.extend({

		initFromIds: function(ids) {
			var self = this;
			_.each(ids, function(id) {
				self.add(new Currency(id));
			});

			var options = {
				keys: ['id'],
			};
			this.searchIndex = new Fuse(this.models, options);
		},

		findByName: function(name) {
			return _.find(this.models, function(platform) {
				return platform.get('name') === name;
			});
		}

	});

	return Currencies;

});