define('screenshot', ['config'], function(config) {

    var Screenshot = Backbone.Model.extend({

        defaults: {
        	canvas: undefined
        },

        initialize: function(canvas) {
        	this.set('canvas', canvas);
        }

    });

    return Screenshot;

});