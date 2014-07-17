define('calculator', ['config', 'moment', 'backbone'], function(config, moment, Backbone) {

    var Calculator = Backbone.Model.extend({

        // url: config.marketcap.urlModel,
        // defaults: {
        //  currencyName:"",
        //  marketcap: {
        //      date: "",
        //      difficulty: "",
        //      totalcoin: 0
        //  }
        // },
        // initialize: function() {}

    });

    return Calculator;
});