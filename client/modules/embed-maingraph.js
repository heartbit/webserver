requirejs(['common'], function() {
    require(['embedMaingraphRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedMaingraphRouter, _ , Backbone, foundation) {
        new EmbedMaingraphRouter();
    });
});