define('tickers', ['config', 'ticker', 'items'], function(config, Ticker, Items) {

    var Tickers = Backbone.Collection.extend({

        model: Ticker,

        initialize: function(options) {
            this.volumeTotal=0;

            var self = this;
            if (!options) {
                options = {};
            }
            this.on('change', this.update);

        },
        killAllListener:function(){
          _.each(this.models,function(model){
              model.killListener();
          }); 
        },
        fetch: function(params, callback) {
            var self = this;
            this.killAllListener();
            this.reset();
            _.each(params.platformPairs,function(value,key){
              _.each(value,function(platform){
                var initParams = {
                  platform: platform,
                  item:params.item,
                  currency: key
                };
                 var ticker = new Ticker();
                 ticker.socketSync(initParams);
                 self.add(ticker);
              }); 
            });
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
        update : function(){
            this.trigger('update');
        }

    });

    return Tickers;

});