define('embedMarketCapRouter', ['config',  'marketcapView','DataSocketManager','ParametersManager'], function(config, MarketCapView,DataSocketManager,ParametersManager) {

	var Router = Backbone.Router.extend({


		initialize: function() {
			var self = this;
			
			if(! ParametersManager.isInit ) {
               ParametersManager.init(this.finishInitialize);
            }
        },
        finishInitialize : function(){
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
			});
			return this;
		}

	});

	return Router;

});