define('itemsView', ['config', 'text!itemsView.html', 'ParametersManager'], function(config, ItemTemplate, ParametersManager) {

    return Backbone.View.extend({

        template: _.template(ItemTemplate),

        events: {
            'click .js-item': 'changeGlobalItems',
        },

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
        },

        render: function() {
            this.$el.html(this.template({
                items: ParametersManager.getItems().models
            }));
            $(document).foundation();
            return this;
        },

        changeGlobalItems: function(event) {
            var itemId = $(event.target).attr('id');
            ParametersManager.changeGlobalItem(itemId);
            this.$el.foundation('reveal', 'close');
            return false;
        },

    });

});