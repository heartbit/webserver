requirejs(['common'], function() {
    require(['embedKeyfactsRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedKeyfactsRouter, _ , Backbone, foundation) {
        new EmbedKeyfactsRouter();
    });
});