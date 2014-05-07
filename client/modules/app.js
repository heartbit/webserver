requirejs(['common'], function() {
    require(['appRouter', 'underscore', 'backbone', 'foundation'], function(AppRouter, _ , Backbone, foundation) {
        new AppRouter();
    });
});