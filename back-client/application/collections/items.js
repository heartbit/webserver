define('items', ['config', 'item', 'platforms', 'currencies', 'pairs', 'fuse','FormatUtils'], function(config, Item, Platforms, Currencies, Pairs, Fuse,FormatUtils) {

    var Items = Backbone.Collection.extend({

        model: Item,
        
        url: config.item.urlCollection,

        initialize: function() {
            this.on('change reset add remove', this.indexItems, this);
            this.searchIndex = new Fuse();
        },

        indexItems: function() {
            var options = {
                keys: ['name', 'id'],
            };
            this.searchIndex = new Fuse(this.models, options);
        },

        search: function(query) {
            var results = this.searchIndex.search(query);
            return results;
        },

        parse: function(response) {
            this.models = _.uniq(response, function(item) {
                return item.id;
            });
            _.each(this.models,function(model){
                model.active = !FormatUtils.isEmpty(model.currencies);
            });
            this.trigger('change');
        },
        comparator: function(model) {
            return model.id;
        },
        getPlatforms: function() {
            var platformdIds = [];
            _.each(this.models, function(item) {
                var currencies = _.keys(item.currencies);
                _.each(currencies, function(currency) {
                    platformdIds = _.union(platformdIds, item.currencies[currency]);
                });
            });
            var platforms = new Platforms();
            platforms.initFromIds(platformdIds);
            return platforms;
        },

        getCurrencies: function() {
            var currencyIds = [];
            _.each(this.models, function(item) {
                var currencies = _.keys(item.currencies);
                currencyIds = _.union(currencyIds, currencies);
            });
            var currencies = new Currencies();
            currencies.initFromIds(currencyIds);
            return currencies;
        },

        getPairs: function() {
            var pairIds = [];
            _.each(this.models, function(item) {
                pairIds = _.union(pairIds, _.chain(item.currencies)
                    .keys()
                    .map(function(currency) {
                        return item.id + '/' + currency;
                    }).value());
            });
            var pairs = new Pairs();
            pairs.initFromIds(pairIds);
            return pairs;
        }

    });

    return Items;

});