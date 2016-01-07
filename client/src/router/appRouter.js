var SelectorActions = require('SelectorActions');
var RangeTranslate = require('RangeTranslate');
var DataapiActions = require('DataapiActions');
var Config =require('Config');

var React = require("react");
var App = require('App');

var AppRouter = Backbone.Router.extend({

    routes: {
        "app": "app",
        "marketmakers": "marketMakers"
    },

    initialize: function(params) {
        Backbone.history.start({
            pushState: true
        });
        this.datarooms = [];
    },

    app: function(params) {
        React.render(<App conf='app'/>, document.getElementById('app'));
             
        if(params) {
        	params = getJsonFromUrl(params);
            SelectorActions.initSelector(params);
        } 
        else {
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

    marketMakers: function() {
        React.render(<App conf='marketMakers'/>, document.getElementById('app'));
        var params = []
        _.each(Config.platformsParams, function(param)  {
            DataapiActions.updateMarketTraders(param);
        })
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