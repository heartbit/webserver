define('marketcapView', ['config','marketcap', 'text!marketcapView.html', 'FormatUtils','trades'], 
    function(config,Marketcap, MarketcapViewTemplate, FormatUtils,Trades) {

    return Backbone.View.extend({

        
        el:'#js-marketcapDiv',

        templateMarketCap: _.template(MarketcapViewTemplate),

        item:"BTC",
        currency:"USD",

        initialize: function(params) {
            var self = this;
            this.marketcap = new Marketcap({url:config.marketcap.urlModel+"item="+this.item+"&currency="+this.currency});
            this.trades = new Trades();
            this.trades.init();
            this.trades.fetchAllLastTrades();
            this.marketcap.fetch();
            _.bindAll(this, 'render', 'update');
            this.trades.on('update',this.update,this);
            this.render();
            //this.listenTo(this.marketcap,'change', this.render({viewName:'marketcap'}));
          
        },
       
        render: function(params) {
            var self = this;
            this.marketCapJson = this.marketcap.toJSON();
            this.marketCapJson.marketcaps = new Array() ;
            _.each(this.trades.averages,function(average){
                self.marketCapJson.marketcaps.push(
                    {
                      price:FormatUtils.formatPrice(average.average,average.currency),
                      marketcap:FormatUtils.formatPrice(average.average*self.marketCapJson.totalcoin,average.currency),
                      totalcoin:self.marketCapJson.totalcoin
                  });
            });
            // _.each(this.trades.averages,function(average){
            //      self.marketCapJson.averages.push({average: FormatUtils.formatPrice( average.average,average.currency),items:average.items});
            // });
            
            //this.marketCapJson.marketcap = FormatUtils.formatPrice( this.marketCapJson.totalcoin*this.trades.average,'USD');
            this.marketCapJson.totalcoin = FormatUtils.formatPrice( this.marketCapJson.totalcoin,'BTC');

            this.$el.html(this.templateMarketCap({marketcapTemplate:this.marketCapJson}));
            return this;
        },
        update: function(){
            this.render();
            return this;
        }

    });

});