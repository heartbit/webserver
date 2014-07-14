define('networkdatas', ['config', 'networkdata'], function(config, Networkdata) {

	var Networkdatas = Backbone.Collection.extend({

		model: Networkdata,
		url: config.networkdata.urlCollection,

		parse: function(response) {
		
			responseFilter=[];
			
			_.each(response, function(response,i) {
				if(response.marketcap!=null) {
					if(response.currencyName=="BTC") {
						// console.log(response);
					}
					//responseFilter[response.currencyName]=response;
					responseFilter.push(response);
					

				}
			});
			
			this.reset(responseFilter);
			return responseFilter;
		}
		
	});

	return Networkdatas;
});