define('dashboardView', ['backbone', 'text!dashboardView.html', 'gridster'], function(Backbone, DashboardTemplate, gridster) {

    // require('gridster');

    return Backbone.View.extend({

        events: {
            'click #js-toggleDragDrop': 'toggleDragDrop'
        },

        template: _.template(DashboardTemplate),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template());

            this.grid = $('.gridster ul')
                .gridster({
                    min_cols: 6,
                    widget_margins: [10, 10],
                    widget_base_dimensions: [100, 100]
                })
                .data('gridster');

            this.grid.disable();
            this.isGridEnable = false;
            return this;
        },

        toggleDragDrop: function(event) {
            if (this.isGridEnable) {
                this.grid.disable();
                this.isGridEnable = false;
            } else {
                this.grid.enable();
                this.isGridEnable = true;
            }
            return false;
        }

    });

});