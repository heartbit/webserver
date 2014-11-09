define('embedNewsRouter', ['config', 'newsView', 'NewsSocketManager'], function(config, NewsView, DataSocketManager) {

	var Router = Backbone.Router.extend({


		initialize: function() {
			var self = this;
			this.newsView = new NewsView();
			

		}

	});

	return Router;

});