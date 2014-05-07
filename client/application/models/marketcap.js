define('marketcap', ['config','moment'], function(config,moment) {

	var Marketcap = Backbone.Model.extend({
        url: config.marketcap.urlCollection,
		defaults: {
			currencyName: "",
			marketcap: {
				price: 0,
				volume: 0,
				totalCoin: 0,
				marketcap: 0
			}
		},
		initialize: function(props){
		    this.url = props.url;
		} 
	});

	return Marketcap;
});