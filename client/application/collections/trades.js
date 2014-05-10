define('trades', ['config', 'trade', 'items','ParametersManager'], function(config, Trade, Items,ParameterManager) {

    var Tickers = Backbone.Collection.extend({

        model: Trade,

        init: function(options) {
            this.bind('all', this.update, this);
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
                    var trade = new Trade(initParams);
                    self.add(trade);
                });
            });
            
            return this;
        },

        fetch: function(params, callback) {
            var self = this;

            _.each(this.models, function(trade) {
                trade.socketSync();
            });

            if (callback) {
                callback();
            }
        },

        find: function(params) {
            var selectedTrade = _.find(this.models, function(trade) {
                return trade.get('platform').id === params.platform && trade.get('item').id === params.item && trade.get('currency').id === params.currency;
            });
            return selectedTrade;
        },
      
        fetchAllLastTrades: function(params) {
          
            var self = this;
            this.platforms = ParameterManager.getPlatforms();
            _.each(this.platforms.models, function(platform) {
                switch (platform.id) {
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
            this.init({
                platforms: this.platforms.models
            });
            this.fetch();
            return this.models

        },
        update: function() {
            var self = this;
            this.averages = new Array();
            var zeroAverage = 0;
            _.each(this.models, function(trade) {
                if (trade && trade.get('price') && trade.get('price') != 0) {
                    self.add = false;
                    var currency = trade.get('currency');

                    // Creation des objets averages
                    // average = {
                    //     currency:'USD',
                    //     items:{platform:'BTCE',price:456},
                    //     average:456
                    // }
                    if (!self.averages ||  self.averages.length == 0) {
                        self.averages = [{
                            currency: currency,
                            items: [{
                                platform: trade.get('platform'),
                                price: trade.get('price')
                            }],
                            average: 0
                        }];
                    }

                    // Update the price for a platform
                    self.add = false;
                    _.each(self.averages, function(average) {
                        _.each(average.items, function(item) {
                            if (trade.get('platform') === item.platform) {
                                item.price = trade.get('price');
                                self.add = true;
                            }
                        });
                    });

                    //If the price hasn't been updated, this means :
                    // - that we must create a new "average" entry in the array ( currency missing )
                    // OR 
                    // - We need to add a platform to an existent average entry (platform missing)
                    if (!self.add) {
                        self.found = false;
                        _.each(self.averages, function(average) {
                            if (average.currency === trade.get('currency')) {
                                average.items.push({
                                    platform: trade.get('platform'),
                                    price: trade.get('price')
                                });
                                self.found = true;
                            }

                        });
                        if (!self.found) {
                            self.averages.push({
                                currency: trade.get('currency'),
                                items: [{
                                    platform: trade.get('platform'),
                                    price: trade.get('price')
                                }],
                                average: 0
                            });
                        }

                    }
                }
            });

            // Calculate the mean
            if (this.models) {
                _.each(this.averages, function(average) {
                    _.each(average.items, function(item) {
                        average.average = average.average + item.price;
                    });
                    average.average = average.average / average.items.length;
                });
            }
            return this;
        }

    });

    return Tickers;

});