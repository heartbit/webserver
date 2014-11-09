define('embedKeyfactsRouter', ['config', 'EventManager', 'DataSocketManager', 'keyFactsView'], function(config, EventManager, DataSocketManager, keyFactsView) {

	var Router = Backbone.Router.extend({

		// routes: {
		// 	"": "displayKeyfacts"
		// },

		initialize: function() {
			var self = this;
			this.keyFactsView = new keyFactsView();

			var params = {
				platform: 'BITSTAMP',
				currency: 'USD',
				item: 'BTC'
			}

			this.keyFactsView.render(params);

			var sep = ':';
			var dataroom = params.item + sep + params.currency;
			console.log('dataroom', dataroom);
			DataSocketManager.emit('dataroom', dataroom);

			Backbone.history.start({
				pushState: true
			});
		}

	});

	return Router;

});