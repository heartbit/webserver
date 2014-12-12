var RippleLine = require('rippleline');
var config = require('config');


var RippleLines = Backbone.Collection.extend({
	model: RippleLine,

	initialize: function() {

	},

	createLinesList: function(toresolves) {
		var self = this;
		this.reset();
		
		xhrs = _.map(toresolves, function(toresolve,i) {
			var model = new RippleLine({id:toresolve.id},toresolve.address);
			var xhr = model.fetch({
				success: function(model,response) {
					// var modelid = gridsterKeys[i];
					// model.set("id",modelid);
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

module.exports = RippleLines;