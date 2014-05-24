define('platforms', ['config', 'platform', 'fuse'], function(config, Platform, Fuse) {

	var Platforms = Backbone.Collection.extend({

		initFromIds: function(ids) {
			var self = this;
			_.each(ids, function(id) {
				var params = {
					id: id
				}
				self.add(new Platform(params));
			});

			var options = {
				keys: ['id'],
			};
			this.searchIndex = new Fuse(this.models, options);
		},

		search: function(query) {
			var results = this.searchIndex.search(query);
			return results;
		},

		findByName: function(name) {
			return _.find(this.models, function(platform) {
				return platform.get('id') === name;
			});
		}

	});

	return Platforms;

});