define('embedMarketCapRouter', ['config', 'EventManager', 'marketcapView'], function(config, EventManager, MarketCapView) {

	var Router = Backbone.Router.extend({


		initialize: function() {
			var self = this;
			var params = {
				currency: 'USD',
				item: 'BTC'
			}
			this.marketCapView = new MarketCapView(params);
		}

	});

	return Router;

});