var volume = require('Volume');
var config = require('Config');


var volumes = Backbone.Collection.extend({
	model: volume,
	url:config.volumes.url,
	initialize: function() {

	},

	/*
	 * params: {platform,item,currency,aggregatType,dateStart,dateEnd}
	 */
	buildUrl: function(params){
		return this.url + "/"+params.platform + "/" + params.item + "/" + params.currency + "/" + params.interval + "/" + params.dateStart + "/" + params.dateEnd
		//BITSTAMP/BTC/USD/1h/1434754800/1435359600
	},
	fetchVolumes: function(params,interval) {
		this.url = this.buildUrl(params)
		var self = this;
		this.reset();
		
		var xhr = this.fetch({
			success: function(models,response) {
				this.interval = interval.interval;
				self.add(models);
			},
			error: function(error) {
				console.log("Error fetching volumes",error);
			}
		});       
       return xhr;
	}
});

module.exports = volumes;