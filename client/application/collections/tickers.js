define('tickers', ['config', 'ticker'], function(config, Ticker) {

    var Tickers = Backbone.Collection.extend({

        model: Ticker,

        init: function(options) {
            var self = this;
            if (!options) {
                options = {};
            }
            this.platforms = options.platforms || config.defaultplatforms;
            _.each(this.platforms, function(platform) {
                _.each(platform.pairs, function(pair) {
                    var initParams = {
                        platform: platform.id,
                        item: pair.item,
                        currency: pair.currency
                    };
                    var ticker = new Ticker(initParams);
                    self.add(ticker);
                });
            });
            //return this;
        },

        fetch: function(params, callback) {
            switch (params.type) {
                case 'last':
                default:
                    _.each(this.models, function(ticker) {
                        ticker.socketSync();
                    });
                    break;
            }
            if ( callback ) {
                callback();
            }
        },

        find: function(params) {
            var selectedTicker = _.find(this.models, function(ticker) {
                return ticker.get('platform').id === params.platform && ticker.get('item').id === params.item && ticker.get('currency').id === params.currency;
            });
            return selectedTicker;
        }

    });

    return Tickers;

});