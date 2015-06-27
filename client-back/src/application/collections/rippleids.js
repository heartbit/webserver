var RippleId = require('rippleid');
var config = require('config');



var RippleIds = Backbone.Collection.extend({
	model: RippleId,

	initialize: function() {

	},

	createIdList: function(toresolves) {
		var AccountActions = require('AccountActions');
		var self = this;
		this.reset();

		AccountActions.loadinggif(toresolves);

		var xhrs = _.map(toresolves, function(toresolve,i) {
				var model = new RippleId({id:"address"+i},toresolve);
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

module.exports = RippleIds;