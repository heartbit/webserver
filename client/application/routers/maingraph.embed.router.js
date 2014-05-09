define('embedMaingraphRouter', ['config', 'EventManager', 'mainView'], function(config, EventManager, MainView) {

	var Router = Backbone.Router.extend({

		initialize: function() {
			var self = this;
			this.mainView = new MainView();

			var params = {
				platform: 'BITSTAMP',
				currency: 'USD',
				item: 'BTC'
			}
			
			this.mainView.render(params);
		}

	});

	return Router;

});