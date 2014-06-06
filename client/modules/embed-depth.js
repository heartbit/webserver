requirejs(['common'], function() {
    require(['embedDepthRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedDepthRouter, _ , Backbone, foundation) {
        new EmbedDepthRouter();
    });
});