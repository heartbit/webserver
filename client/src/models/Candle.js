
var Candle = Backbone.Model.extend({
    defaults: {
	    timestamp: 0,
	    item: 'BTC',
	    currency: 'USD',
	    high:0,
	    low:0,
	    open:0,
	    close:0,
	    nbTrade:0
	},
	initialize: function() {
		
	}

});


module.exports = Candle;