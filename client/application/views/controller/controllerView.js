define('controllerView', ['text!controllerView.html', 'text!./application/views/controller/searchView.html', 'ParametersManager', 'config', 'items', 'itemsView', 'platforms', 'platformsView', 'currencies', 'currenciesView', 'pairs', 'pairsView', 'FormatUtils'], function(ControllerViewTemplate, SearchViewTemplate, ParametersManager, config, Items, ItemsView, Platforms, PlatformsView, Currencies, CurrenciesView, Pairs, PairsView, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-controller',

        events: {
            'click #js-showItemsView': 'showItemsView',
            'click #js-showPairsView': 'showPairsView',
            'click #js-showPlatformsView': 'showPlatformsView',

            'click .js-item': 'changeGlobalItem',
            'click .js-pair': 'changeGlobalPair',
            'click .js-platform': 'changeGlobalPlatform',
            
            
            'click .js-item-search': 'changeGlobalItem',
            'click .js-pair-search': 'changeGlobalPair',
            'click .js-platform-search': 'changeGlobalPlatform',

            'keyup #js-searchbar': 'search',
            'click #js-searchbar': 'showSearchView'
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
            this.pairsView = new PairsView();
            this.platformsView = new PlatformsView();
        },

        render: function(params) {
            var currentParams = ParametersManager.getCurrentParams();
            var tplVars = {
                selectedPlatform: currentParams.platform,
                selectedItem: currentParams.item,
                selectedPair: currentParams.item + '/' + currentParams.currency
            };
            this.$el.html(this.template(tplVars));

            this.itemsView
                .setElement('#js-itemsViewModal')
                .render();

            this.platformsView
                .setElement('#js-platformsViewModal')
                .render();

            this.pairsView
                .setElement('#js-pairsViewModal')
                .render();

            $(document).foundation();
            return this;
        },

        update: function(params) {
            var self = this;
            this.render(params);
        },

        search: function() {
            var self = this;
            var query = $('#js-searchbar').val();
            if (query && query != "") {
                self.matchItems = _.uniq(ParametersManager.getItems().search(query), function(item) {
                    return item.id;
                });
                self.matchPlatforms = _.uniq(ParametersManager.getPlatforms().search(query), function(platform) {
                    return platform.id;
                });

                self.matchPairs = _.uniq(ParametersManager.getPairs().search(query), function(pair) {
                    return pair.id;
                });

                var tplVariables = {
                    platforms: self.matchPlatforms,
                    items: self.matchItems,
                    pairs: self.matchPairs
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
            return true;
        },

        hideSearchView: function(e) {
            setTimeout(function() {
                $('#js-searchResults').hide();
            }, 2000);
            return true;
        },

        changeGlobalItem: function(event) {
            var itemId = $(event.target).attr('id');
            ParametersManager.changeGlobalItem(itemId);
            return true;
        },

        changeGlobalPair: function(event) {
            var pairId = $(event.target).attr('id');
            var currentPlatform =  ParametersManager.getCurrentPlatformPairs();
            var platformId = currentPlatform.id;
            if ( !_.contains(currentPlatform.pairs,pairId) ){
                platformId = ParametersManager.getPlatformByPairId(pairId);
            }
            ParametersManager.changeGlobalPair(pairId,platformId);
                    $('#js-pairsViewModal').foundation('hide', 'close');
            return false;
        },

        changeGlobalPlatform: function(event) {
            var platformId = $(event.target).attr('id');
            var currentPlatform =  ParametersManager.getCurrentPlatformPairs();
            var pairId = ParametersManager.getCurrentParams().item+"/"+ParametersManager.getCurrentParams().currency;
            if ( !_.contains(currentPlatform.pairs,pairId) ){
                pairId = null;
            }
            ParametersManager.changeGlobalPlatform(platformId,pairId);
            return false;
        },

        showPlatformsView: function() {
            $('#js-platformsViewModal').foundation('reveal', 'open');
            return false;
        },

        showPairsView: function() {
            $('#js-pairsViewModal').foundation('reveal', 'open');
            return false;
        },

        showItemsView: function() {
            $('#js-itemsViewModal').foundation('reveal', 'open');
            return false;
        },
        displayCurrency: function(){
        },
        displayPlatforms:function(){
       
        },
        displayItems:function(){
            
        }

    });

});