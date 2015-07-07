var DataSocket = require('DataSocketManager');

var Ticker = Backbone.Model.extend({
	defaults: {
		timestamp: 0,
		item: 'BTC',
		currency: 'USD',
		high: 0,
		low: 0,
		open: 0,
		close: 0
	},
	changeParams: function(params) {
		this.channel = params || "BITSTAMP:BTC:USD:TCK";
		var self = this;
		DataSocket.on(this.channel, function(data) {
			self.model = data.data;
			self.trigger('change');
		})
	}
});

module.exports = Ticker;