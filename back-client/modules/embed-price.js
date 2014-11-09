requirejs(['common'], function() {
    require(['embedPriceRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedPriceRouter, _ , Backbone, foundation) {
        new EmbedPriceRouter();
    });
});