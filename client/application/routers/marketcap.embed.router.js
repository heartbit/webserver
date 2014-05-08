define('embedMarketCapRouter', ['config',  'marketcapView','DataSocketManager'], function(config, MarketCapView,DataSocketManager) {

	var Router = Backbone.Router.extend({


		initialize: function() {
			var self = this;
			var params = {
				currency: 'USD',
				item: 'BTC'
			}
			this.marketCapView = new MarketCapView(params);
			var dataroom = params.item + ":" + params.currency;
			console.log('dataroom', dataroom);
			DataSocketManager.emit('dataroom', dataroom);
		}

	});

	return Router;

});