define('itemControllerView', ['config', 'text!itemControllerView.html', 'items'], function(config, ItemTemplate, Items) {

    return Backbone.View.extend({

        template: _.template(ItemTemplate),

        events: {
            'click .js-item': 'changeItem',
            'keyup #js-itemSearchbar': 'searchItem',
            'click #js-currentItem': 'show',
        },

        initialize: function() {
            var self = this;
            this.items = new Items();
            this.items.fetch({
                data: {},
                type: 'POST',
                success: function() {
                    self.render();
                },
                error: function(error) {
                    console.log('error', error);
                }
            });
            _.bindAll(this,
                'render',
                'searchItem',
                'changeItem'
            );
        },

        show: function() {
            $('#itemModal').foundation('reveal', 'open');
        },

        changeItem: function(event) {
            var itemId = $(event.target).attr('id');
            var url = this.constructUrl(itemId);
            $('#js-itemSearchbar').val('');
            $('#js-searchItemList').html('');
            $('#itemModal').foundation('reveal', 'close');
            Backbone.history.navigate(url, true);
        },

        constructUrl: function(itemId) {
            var url = '/market?item=' + itemId;
            return url;
        },

        render: function(params) {
            if (!params) params = {};
            this.currentItem = params.item || this.currentItem;
            this.$el.html(this.template({
                items: this.items.models,
                currentItem: this.currentItem
            }));
            $('.js-item').on('click', this.changeItem);
            return this;
        },

        searchItem: function() {
            var query = $('#js-itemSearchbar').val();
            var matchItems = _.uniq(this.items.search(query),function(item){
                return item.id;
            });
            var itemList = "";
            _.each(matchItems, function(matchItem) {
                var link = "<a href='#' class='js-item' id=" + matchItem.id + ">" + matchItem.name + " - " + matchItem.id + "</a>";
                itemList += "<li class='js-item item'>" + link + "</li>";
            });
            $('#js-searchItemList').html(itemList);
            return true;
        }

    });

});