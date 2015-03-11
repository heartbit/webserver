var RippleExchangerate = require('rippleexchangerate');
var config = require('config');


var RippleExchangerates = Backbone.Collection.extend({
	model: RippleExchangerate,

	initialize: function() {

	},

	getExchangerates: function(accountslines,range) {
		var self = this;
		this.reset();

		// request formating
		var ratesqueries ={};
		accountslines.forEach(function(accountlines) {
	
			var pairs = _.map(accountlines.lines, function(line)  {

				pair = {};
				pair["base"]= { currency:line.currency, issuer:line.account };
				pair["counter"]= { currency:"XRP" };

				return pair;
			});
			ratesqueries[accountlines.id] = {};
			ratesqueries[accountlines.id]["pairs"]=pairs;
			ratesqueries[accountlines.id]["range"] = range;
			ratesqueries[accountlines.id]["id"] = accountlines.id;
		});

		
		var xhrs = _.map(ratesqueries, function(ratesquery) {
			var model = new RippleExchangerate({id:ratesquery.id},ratesquery);
			var xhr = model.fetch({
				success: function(model,response) {
					self.add(model);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);
	    // sync.then(function() {
	    //     self.trigger('someshit');
	    // });

	    return sync;

	}
});

module.exports = RippleExchangerates;