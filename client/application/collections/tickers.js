define('tickers', ['config', 'ticker', 'items'], function(config, Ticker, Items) {

    var Tickers = Backbone.Collection.extend({

        model: Ticker,

        init: function(options) {
            this.volumeTotal=0;
            this.bind('change', this.update, this);
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
            var self = this;
            switch (params.type) {
                case 'last':
                default:
                    _.each(this.models, function(ticker) {
                        ticker.socketSync();
                    });
                    break;
            }
            if (callback) {
                callback();
            }
        },

        find: function(params) {
            var selectedTicker = _.find(this.models, function(ticker) {
                return ticker.get('platform').id === params.platform && ticker.get('item').id === params.item && ticker.get('currency').id === params.currency;
            });
            return selectedTicker;
        },
        fetchAllTickersForVolumeWidget: function() {
            var self = this;
            this.items = new Items();
            this.items.fetch({
                data: {},
                type: 'POST',
                success: function() {
                    self.platforms = self.items.getPlatforms();
                    _.each(self.platforms.models, function(platform) {
                        switch( platform.id ) {
                          case 'BTCCHINA':
                            platform.pairs = [{
                                item: 'BTC',
                                currency: 'CNY'
                            }];
                            break;
                          case 'KRAKEN':
                            platform.pairs = [{
                                item: 'BTC',
                                currency: 'EUR'
                            }];
                            break;
                          default:
                            platform.pairs = [{
                                item: 'BTC',
                                currency: 'USD'
                            }];
                        }
                       
                    });
                    self.init({
                        platforms: self.platforms.models
                    });
                    self.fetch({
                        type: ''
                    });
                    return self.models
                }
            });
            return self.models;
        },
        update : function(){
            var self = this;
            self.volumeTotal = 0;
            _.each(this.models,function(ticker){
                if ( ticker && ticker.get('vol') && ticker.get('vol') != 0 ) {
                  self.volumeTotal = self.volumeTotal + ticker.get('vol');
                }
            });
        }

    });

    return Tickers;

});