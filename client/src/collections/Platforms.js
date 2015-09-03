var platform = require('Platform');
var config = require('Config');

var platforms = Backbone.Collection.extend({

	model: platform,
	url: config.platforms.url,

	initialize: function() {},

	/*
	 * params: {platform,item,currency,aggregatType,dateStart,dateEnd}
	 */
	buildUrl: function(params) {
		return this.url + '/all'; 
	},

	fetchPlatform: function(params) {
		this.url = this.buildUrl(params)
		var self = this;
		this.reset();

		var xhr = this.fetch({
			success: function(models, response) {
				self.add(models);
			},
			error: function(error) {
				console.log("Error fetching platforms", error);
			}
		});
		return xhr;
	}

});

module.exports = platforms;