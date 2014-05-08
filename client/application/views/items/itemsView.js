define('itemsView', ['config', 'text!itemsView.html'], function(config, ItemTemplate) {

    return Backbone.View.extend({

        template: _.template(ItemTemplate),

        events: {
            'click .js-item': 'changeItem',
        },

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render',
                'changeItem'
            );
        },

        changeItem: function(event) {
            var itemId = $(event.target).attr('id');
        },

        render: function(params) {
            if (!params) params = {};
            this.$el.html(this.template({
                // items: this.items.models,
                // currentItem: this.currentItem
            }));
            return this;
        }

    });

});