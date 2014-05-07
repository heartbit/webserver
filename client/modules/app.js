requirejs(['common'], function() {
    require(['appRouter', 'underscore', 'backbone-params', 'foundation'], function(AppRouter, _ , Backbone, foundation) {
        new AppRouter();
    });
});