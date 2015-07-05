var DashboardActions = require('DashboardActions');
var TickerActions = require('TickerActions');
var React = require("react");
var App = require('App');

var AppRouter = Backbone.Router.extend({

    routes: {
        "app": "app",
    },

    initialize: function(params) {
        Backbone.history.start({
            pushState: true
        });
        this.datarooms = [];
    },

    app: function(params) {
        React.render(<App/>, document.getElementById('app'));
        if(params) {
            var params = this.getJsonFromUrl(params);
            DashboardActions.displayMainGraph(params);
            TickerActions.displayTicker();//params);
        }
    },

    getJsonFromUrl: function () {
	  var query = location.search.substr(1);
	  var result = {};
	  query.split("&").forEach(function(part) {
	    var item = part.split("=");
	    result[item[0]] = decodeURIComponent(item[1]);
	  });
	  return result;
	}

});

module.exports = AppRouter;