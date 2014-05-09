define('marketcaps', ['config','marketcap'], function(config, Marketcap) {

    var Marketcaps = Backbone.Collection.extend({

        model: Marketcap,
        url: config.marketcap.urlModel

    });

    return Marketcaps;

});