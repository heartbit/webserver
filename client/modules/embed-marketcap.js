requirejs(['common'], function() {
    require(['embedMarketCapRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedMarketCapRouter, _ , Backbone, foundation) {
        new EmbedMarketCapRouter();
    });
});