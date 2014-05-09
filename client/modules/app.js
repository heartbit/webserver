requirejs(['common'], function() {
    require(['appRouter', 'underscore', 'backbone-params', 'foundation', 'backbone'], function(AppRouter, _ , Backbone, foundation) {
        new AppRouter();
    });
});