define('embedKeyfactsRouter', ['config', 'EventManager', 'keyFactsView'], function(config, EventManager, keyFactsView) {

	var Router = Backbone.Router.extend({

		routes: {
			"": "displayKeyfacts"
		},

		initialize: function() {
			var self = this;
			this.keyFactsView = new keyFactsView();

			var params = {
				platform: 'Bitstamp',
				currency: 'USD',
				item: 'BTC'
			}

			this.keyFactsView.render(params);

			Backbone.history.start({
				pushState: true
			});
		},

		// displayKeyfacts: function(params) {
		// 	// params = params ? this.sanitizeParams(params) : config.defaultparams;
		// 	// var homeViewRenderCallback = function() {
		// 	// 	self.$homeloader.hide();
		// 	// 	self.joinDataRoom(params);
		// 	// };
		// 	// if (this.homeView) {
		// 	// 	this.homeView.update(params, homeViewRenderCallback);
		// 	// } else {
		// 	// 	this.homeView = new HomeView();
		// 	// 	this.homeView.setElement(this.appEl).render(params, homeViewRenderCallback);
		// 	// }
		// }

	});

	return Router;

});