
var Platform = Backbone.Model.extend({
    defaults: {
	    platformname: 'BITSTAMP',
	    pairs:['BTC-USD']
	},
	initialize: function() {
		
	}

});


module.exports = Platform;