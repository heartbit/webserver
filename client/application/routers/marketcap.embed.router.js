define('embedMarketCapRouter', ['config',  'marketcapView','DataSocketManager'], function(config, MarketCapView,DataSocketManager) {

	var Router = Backbone.Router.extend({


		initialize: function() {
			var self = this;
			var params = [{
				currency: 'USD',
				item: 'BTC'
			}, {
				currency: 'EUR',
				item: 'BTC'
			}, {
				currency: 'CNY',
				item: 'BTC'
			}]
			this.marketCapView = new MarketCapView(params);
			var datarooms = new Array();
			_.each(params, function(param) {
				console.log('dataroom', param.item + ":" + param.currency);
				DataSocketManager.emit('dataroom',  param.item + ":" + param.currency);
			})
		}

	});

	return Router;

});