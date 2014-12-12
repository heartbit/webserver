var React = require("react");
var App = require('App');
var config = require('config');

var Router = Backbone.Router.extend({

    routes: {
        "app": "app"
    },

    initialize: function(params) {
   
	    Backbone.history.start({
            pushState: true
        });
    },

    app: function(params) {

        var dashboard_config = config.dashboards.main;

    	React.render(<App dashboard_config={ dashboard_config } />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {

    }

});


module.exports = Router;