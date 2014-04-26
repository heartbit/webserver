define('controllerView', ['text!controllerView.html', 'config', 'items', 'itemsView', 'platforms', 'platformsView', 'currencies', 'currenciesView', 'FormatUtils'], function(ControllerViewTemplate, config, Items, ItemsView, Platforms, PlatformsView, Currencies, CurrenciesView, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-controller',

        events: {
            'keyup #js-searchbar': 'search',

            'click #js-showItemsView': 'showItemsView',
            'click #js-showCurrenciesView': 'showCurrenciesView',
            'click #js-showPlatformsView': 'showPlatformsView',

            'click .js-item': 'changeGlobalItem',
            'click .js-currency': 'changeGlobalCurrency',
            'click .js-platform': 'changeGlobalPlatform'
        },

        template: _.template(ControllerViewTemplate),

        initialize: function() {
            _.bindAll(
                this,
                'render',
                'update'
            );
            this.items = new Items();
            this.itemsView = new ItemsView();
            this.currenciesView = new CurrenciesView();
            this.platformsView = new PlatformsView();
        },

        render: function(params) {
            this.items = params.items;

            this.updateInternalParams(params);

            var tplVars = {
                compatiblePlatforms: this.compatiblePlatforms,
                compatibleCurrencies: this.compatibleCurrencies,
                selectedPlatform: this.platform,
                selectedCurrency: this.currency,
            };
            this.$el.html(this.template(tplVars));

            this.itemsView
                .setElement('#js-itemsViewModal')
                .render(params);

            this.platformsView
                .setElement('#js-platformsViewModal')
                .render(params);

            this.currenciesView
                .setElement('#js-currenciesViewModal')
                .render(params);

            $(document).foundation();
            return this;
        },

        updateInternalParams: function(params) {
            this.items = params.items || this.items || [];

            this.item = _.find(this.items.models, function(item) {
                return item.id == params.item;
            });

            this.currency = params.currency;
            this.compatibleCurrencies = _.keys(this.item.currencies);

            this.compatiblePlatforms = this.item.currencies[params.currency];
            this.platform = _.find(this.compatiblePlatforms, function(platform) {
                return platform == params.platform;
            });
        },

        update: function(params) {
            var self = this;
            this.render(params);
        },

        search: function() {
            var query = $('#js-searchbar').val();
            var matchItems = _.uniq(this.items.search(query), function(item) {
                return item.id;
            });
            var itemList = "";
            _.each(matchItems, function(matchItem) {
                var link = "<a href='#' class='js-item' id=" + matchItem.id + ">" + matchItem.name + " - " + matchItem.id + "</a>";
                itemList += "<li class='js-item item'>" + link + "</li>";
            });
            $('#js-searchItemList').html(itemList);
            return true;
        },

        changeGlobalCurrency: function(event) {
            var $a = $(event.target);
            var currencyId = $a.attr('id');
            var params = {
                platform: this.platform,
                item: this.item.id,
                currency: currencyId
            };
            var url = this.constructUrl(params);
            Backbone.history.navigate(url, false);
        },

        changeGlobalPlatform: function(event) {
            var $a = $(event.target);
            var platformId = $a.attr('id');
            var params = {
                platform: platformId,
                item: this.item.id,
                currency: this.currency
            }
            var url = this.constructUrl(params);
            Backbone.history.navigate(url, false);
        },

        showPlatformsView: function() {
            $('#js-platformsViewModal').foundation('reveal', 'open');
        },

        showCurrenciesView: function() {
            $('#js-currenciesViewModal').foundation('reveal', 'open');
        },


        showItemsView: function() {
            $('#js-itemsViewModal').foundation('reveal', 'open');
        },

        constructUrl: function(params) {
            var url = "/market?";
            url += "platform=" + params.platform;
            url += "&item=" + params.item;
            url += "&currency=" + params.currency;
            return url;
        }

    });

});