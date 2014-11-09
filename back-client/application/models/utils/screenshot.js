define('screenshot', ['backbone', 'config'], function(Backbone, config) {

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