var DashboardActions = require('DashboardActions');
var TickerActions = require('TickerActions');
var SelectorActions = require('SelectorActions');
var RangeTranslate = require('RangeTranslate');

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
            defaultParams = {
                    interval: '15m',
                    platform:'BITSTAMP',
                    item:'XRP',
                    currency:'USD'
            }
            var range = RangeTranslate('1d');
            _.extend(defaultParams,range);

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