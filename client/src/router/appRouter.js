var DashboardActions = require('DashboardActions');
var TickerActions = require('TickerActions');
var SelectorActions = require('SelectorActions');

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
        	params = getJsonFromUrl(params);
            SelectorActions.initSelector(params);
        } 
        else {
        	/**
             * Base params
             * Interval : 15min
             * TimeFrame : 2 Weeks
             * platform : Bitstamp
             * Item: BTC
             * currency: USD
             */
        	var dateEnd = Math.floor(new Date().getTime()/1000);
        	var dateStart = dateEnd - (86400 * 14)
        	defaultParams = {
        			dateStart: dateStart,
        			dateEnd: dateEnd,
        			agregat_type: '1h',
        			platform:'BITSTAMP',
        			item:'BTC',
        			currency:'USD'
        	}
            SelectorActions.initSelector(defaultParams)
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