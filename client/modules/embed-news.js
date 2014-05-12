requirejs(['common'], function() {
    require(['embedNewsRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedNewsRouter, _ , Backbone, foundation) {
        new EmbedNewsRouter();
    });
});