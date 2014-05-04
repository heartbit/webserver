requirejs(['common'], function() {
    require(['appRouter', 'underscore', 'backbone-params'], function(AppRouter, _ , Backbone) {
        new AppRouter();
    });
});