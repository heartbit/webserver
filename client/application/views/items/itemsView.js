define('itemsView', ['config', 'text!itemsView.html', 'ParametersManager'], function(config, ItemTemplate, ParametersManager) {

    return Backbone.View.extend({

        template: _.template(ItemTemplate),

        // events: {
        //     'click .js-item': 'changeItem',
        // },

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
        },

        render: function() {
            this.$el.html(this.template({
                items: ParametersManager.getItems().models,
            }));
            $(document).foundation();
            return this;
        }

    });

});