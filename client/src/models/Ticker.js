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
	}
});

Ticker.prototype.changeParams = function(params) {
	this.channel = params || "BITSTAMP:BTC:USD:TCK";
	DataSocket.on(this.channel, function(data) {
		this.model = data;
		this.emit('change');
	})
};

module.exports = Ticker;