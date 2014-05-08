define('controllerView', ['text!controllerView.html', 'text!./application/views/controller/searchView.html', 'ParametersManager', 'config', 'items', 'itemsView', 'platforms', 'platformsView', 'currencies', 'currenciesView', 'FormatUtils'], function(ControllerViewTemplate, SearchViewTemplate, ParametersManager, config, Items, ItemsView, Platforms, PlatformsView, Currencies, CurrenciesView, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-controller',

        events: {
            'click #js-showItemsView': 'showItemsView',
            'click #js-showPairsView': 'showPairsView',
            'click #js-showPlatformsView': 'showPlatformsView',

            'click .js-item': 'changeGlobalItem',
            'click .js-pair': 'changeGlobalPair',
            'click .js-platform': 'changeGlobalPlatform',

            'keyup #js-searchbar': 'search'
        },

        template: _.template(ControllerViewTemplate),
        templateSearch: _.template(SearchViewTemplate),

        initialize: function() {
            _.bindAll(
                this,
                'render',
                'update'
            );

            this.itemsView = new ItemsView();
            this.currenciesView = new CurrenciesView();
            this.platformsView = new PlatformsView();
        },

        render: function(params) {
            var currentParams = ParametersManager.getCurrentParams();
            var tplVars = {
                selectedPlatform: currentParams.platform,
                selectedItem: currentParams.item,
                selectedPair: currentParams.pair
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

        // updateInternalParams: function(params) {
        //     this.items = params.items || this.items || [];

        //     this.item = _.find(this.items.models, function(item) {
        //         return item.id == params.item;
        //     });

        //     this.currency = params.currency;
        //     this.compatibleCurrencies = _.keys(this.item.currencies);

        //     this.compatiblePlatforms = this.item.currencies[params.currency];
        //     this.platform = _.find(this.compatiblePlatforms, function(platform) {
        //         return platform == params.platform;
        //     });
        // },

        update: function(params) {
            var self = this;
            this.render(params);
        },

        search: function() {
            var query = $('#js-searchbar').val();
            if (query && query != "") {
                var matchItems = _.uniq(ParametersManager.getItems().search(query), function(item) {
                    return item.id;
                });
                var matchPlatforms = _.uniq(ParametersManager.getPlatforms().search(query), function(platform) {
                    return platform.id;
                });

                var matchPairs = _.uniq(ParametersManager.getPairs().search(query), function(pair) {
                    return pair.id;
                });

                var tplVariables = {
                    platforms: matchPlatforms,
                    items: matchItems,
                    pairs: matchPairs
                };

                var htmlResults = this.templateSearch(tplVariables);
                $('#js-searchResults').html(htmlResults);
            } else {
                $('#js-searchResults').html("");
            }
            return true;
        },

        showSearchView: function() {
            $('#js-searchResults').show();
            return false;
        },

        hideSearchView: function() {
            $('#js-searchResults').hide();
            return false;
        },

        changeGlobalItem: function(event) {
            var itemId = $(event.target).attr('id');
            var url = this.constructUrl(itemId);
            // $('#js-itemSearchbar').val('');
            // $('#js-searchItemList').html('');
            // $('#itemModal').foundation('reveal', 'close');
            Backbone.history.navigate(url, true);
            return false;
        },

        changeGlobalPair: function(event) {
            var $a = $(event.target);
            var currencyId = $a.attr('id');
            var params = {
                platform: this.platform,
                item: this.item.id,
                currency: currencyId
            };
            var url = this.constructUrl(params);
            Backbone.history.navigate(url, false);
            return false;
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
            return false;
        },

        showPlatformsView: function() {
            $('#js-platformsViewModal').foundation('reveal', 'open');
            return false;
        },

        showPairsView: function() {
            $('#js-currenciesViewModal').foundation('reveal', 'open');
            return false;
        },

        showItemsView: function() {
            $('#js-itemsViewModal').foundation('reveal', 'open');
            return false;
        },

        constructUrl: function(item) {
            var url = "/market?";
            // url += "platform=" + params.platform;
            url += "item=" + item;
            // url += "&currency=" + params.currency;
            return url;
        }

    });

});