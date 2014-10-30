define(function(require) {

    var DashboardView = require('dashboardView');

    var Router = Backbone.Router.extend({

        initialize: function() {
            this.dashboardView = new DashboardView();
            this.dashboardView
                .setElement('#js-dashboard')
                .render();
            $(document).foundation();
        }

    });

    return Router;

});