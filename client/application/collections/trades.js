define('trades', ['config', 'trade','items'], function(config, Trade,Items) {

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
        fetchAllLastTrades: function() {
            var self = this;
            this.items = new Items();
            this.items.fetch({
                data: {},
                type: 'POST',
                success: function() {
                    self.platforms = self.items.getPlatforms();
                    _.each(self.platforms.models, function(platform) {
                            platform.pairs = [{
                                item: 'BTC',
                                currency: 'USD'
                            }];
                    });
                    self.init({
                        platforms: self.platforms.models
                    });
                    self.fetch();
                    return self.models
                }
            });
            return self.models;
        },
        update : function(){
            var self = this;
            self.average = 0;
            var zeroAverage = 0;
            _.each(this.models,function(trade){
                if ( trade && trade.get('price') && trade.get('price') != 0 ) {
                  self.average = self.average + trade.get('price');
                }
                else {
                    zeroAverage = zeroAverage +1;
                }
            });
            if (this.models){
                this.average = this.average/(this.models.length-zeroAverage);
            }   
            return this;
        }

    });

    return Tickers;

});