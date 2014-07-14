define('marketcaps', ['config', 'marketcap'], function(config, Marketcap) {

	var Marketcaps = Backbone.Collection.extend({

		model: Marketcap,
		url: config.marketcap.urlCollection,

		parse: function(response) {
			//console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
			
			responseFilter=[];
			_.each(response, function(response) {
				
				//console.log(response);
				if(response!=null) {
					//FIX TEMPORAIRE pour corriger data ber non parsée (BTC) ou buguée pour l'instant (DRK)
					if(response.currencyId=="BTC") {
						response.totalCoin=response.totalCoin*Math.pow(10,-8);
					}else if(response.currencyId=="DRK") {
						response.totalCoin=response.totalCoin/2*Math.pow(10,-4);
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