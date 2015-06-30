var candle = require('Candle');
var config = require('Config');

var candles = Backbone.Collection.extend({
	model: candle,
    url: config.candles.url,
	initialize: function() {

	},
	/*
	 * params: {platform,item,currency,aggregatType,dateStart,dateEnd}
	 */
	buildUrl: function(params){
		return this.url + "/"+params.platform + "/" + params.item + "/" + params.currency + "/" + params.aggregatType + "/" + params.dateStart + "/" + params.dateEnd
		//BITSTAMP/BTC/USD/1h/1434754800/1435359600
	},
	fetchCandles: function(params) {
		this.url = this.buildUrl(params)
		var self = this;
		this.reset();
		
		var xhr = this.fetch({
			success: function(models,response) {
				self.add(models);
			},
			error: function(error) {
				console.log("Error fetching candles",error);
			}
		});       
	    return xhr;
	}
});

module.exports = candles;