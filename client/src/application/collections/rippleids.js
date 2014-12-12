var RippleId = require('rippleid');
var config = require('config');


var RippleIds = Backbone.Collection.extend({
	model: RippleId,

	initialize: function() {

	},

	createIdList: function(toresolves,gridsterKeys) {
		var self = this;
		this.reset();

		xhrs = _.map(toresolves, function(toresolve,i) {

		
			var model = new RippleId({id:gridsterKeys[i]},toresolve);
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

module.exports = RippleIds;