define('currenciesView', ['backbone', 'config', 'text!currenciesView.html'], function(Backbone, config, CurrenciesTemplate) {

    return Backbone.View.extend({

        template: _.template(CurrenciesTemplate),

        // events: {
        //     'click .js-currency': 'changeCurrency',
        // },

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
        },

        changeCurrencies: function(event) {
            var currencyId = $(event.target).attr('id');
            // var url = this.constructUrl(itemId);
            // $('#js-itemSearchbar').val('');
            // $('#js-searchItemList').html('');
            $('#js-currenciesViewModal').foundation('reveal', 'close');
            Backbone.history.navigate(url, true);
        },

        render: function(params) {
            if (!params) params = {};
            // this.currentItem = params.item || this.currentItem;
            this.$el.html(this.template({
                // items: this.items.models,
                // currentItem: this.currentItem
            }));
            // $('.js-item').on('click', this.changeItem);
            $(document).foundation();
            return this;
        }

    });

});