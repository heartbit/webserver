define('marketcaps', ['config', 'marketcap'], function(config, Marketcap) {

	var Marketcaps = Backbone.Collection.extend({

		model: Marketcap,
		url: config.marketcap.urlCollection,

		parse: function(response) {
			console.log('Collection - parse');
			
			responseFilter=[];
			_.each(response, function(response) {
				
				console.log(response);
				if(response!=null) {
					//ugly trick pour corriger data ber non parsée
					if(response.currencyId=="BTC") {
						response.totalCoin=response.totalCoin*Math.pow(10,-8);
					}
				
					responseFilter.push(response);
				}
			});
			
			this.reset(responseFilter);
			return responseFilter;
		}
		
	});

	return Marketcaps;
});