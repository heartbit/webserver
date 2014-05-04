reqrequirejs(['common'], function() {
    require(['embedKeyfactsRouter', 'underscore', 'backbone-params'], function(EmbedKeyfactsRouter, _ , Backbone) {
        new EmbedKeyfactsRouter();
    });
});