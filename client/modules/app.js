requirejs(['backbone-params', 'd3', 'foundation'], function() {
    require(['indexRouter'], function(IndexRouter) {
        var router = new IndexRouter();
    });
});