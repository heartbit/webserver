define('itemsView', ['config', 'text!itemsView.html'], function(config, ItemTemplate) {

    return Backbone.View.extend({

        template: _.template(ItemTemplate),

        events: {
            'click .js-item': 'changeItem',
        },

        initialize: function() {
            var self = this;
            // this.items = new Items();
            // this.items.fetch({
            //     data: {},
            //     type: 'POST',
            //     success: function() {
            //         self.render();
            //     },
            //     error: function(error) {
            //         console.log('error', error);
            //     }
            // });
            _.bindAll(this,
                'render',
                'changeItem'
            );
        },

        changeItem: function(event) {
            var itemId = $(event.target).attr('id');
            // var url = this.constructUrl(itemId);
            // $('#js-itemSearchbar').val('');
            // $('#js-searchItemList').html('');
            // $('#itemModal').foundation('reveal', 'close');
            // Backbone.history.navigate(url, true);
        },

        render: function(params) {
            if (!params) params = {};
            // this.currentItem = params.item || this.currentItem;
            this.$el.html(this.template({
                // items: this.items.models,
                // currentItem: this.currentItem
            }));
            // $('.js-item').on('click', this.changeItem);
            return this;
        }

    });

});