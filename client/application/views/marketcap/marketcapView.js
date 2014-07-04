define('marketcapView', ['config','marketcap', 'text!marketcapView.html','marketcapchart', 'FormatUtils','trades'], function(config,Marketcap, MarketcapViewTemplate,MarketcapChart, FormatUtils,Trades) {
           
    return Backbone.View.extend({

        
        el:'#js-marketcapModal',

        templateMarketCap: _.template(MarketcapViewTemplate),

        item:"BTC",
        currency:"USD",

        initialize: function(params) {
            var self = this;

            // this.marketcap = new Marketcap({url:config.marketcap.urlModel+"item="+this.item+"&currency="+this.currency});
            this.marketcap = new Marketcap({url:config.marketcap.urlModel});
            


            // this.trades = new Trades();
            // console.log(this.trades);
            // this.trades.init();
            // this.trades.fetchAllLastTrades();
            this.marketcap.fetch();
            // _.bindAll(this, 'render', 'update');
            // this.trades.on('update',this.update,this);
            // this.render();
            //this.listenTo(this.marketcap,'change', this.render({viewName:'marketcap'}));
      
        },
       
        render: function(params) {
            var self = this;
            

            this.marketCapJson = this.marketcap.toJSON();
                    
            this.marketCapJson.marketcap=$.map(this.marketCapJson.marketcap,function(marketcap,index) {
               
                marketcap.name=index;
                return marketcap;
            }); 
           
            this.marketCapJson.marketcap.sort(function(a,b){
                return (a.marketcap<b.marketcap);
            });
            


            this.marketCapJson.marketcaps = new Array() ;
           
            _.each(this.marketCapJson.marketcap,function(marketcap,index){
                
                self.marketCapJson.marketcaps.push(
                    {
                        
                        "name":marketcap.name,
                        "currencyID":marketcap.currencyId,
                        "symbol":FormatUtils.formatCurrencyLabel(marketcap.currencyId),
                        "marketcap":FormatUtils.formatPrice(marketcap.marketcap,"$"),
                        "price":FormatUtils.formatPrice(marketcap.price,"$"),
                        "supply":FormatUtils.formatPrice(marketcap.supply,FormatUtils.formatCurrencyLabel(marketcap.currencyId)),
                        "volume_24":FormatUtils.formatPrice(marketcap.volume_24,"$"),
                        "priceChange":FormatUtils.formatPercent(marketcap.priceChange),
                        "volumeChange":FormatUtils.formatPercent(marketcap.volumeChange),
                        "correlation":FormatUtils.formatPrice(marketcap.correlation)
                        
                  });
        
            });
            

            this.$el.html(this.templateMarketCap({marketcapTemplate:this.marketCapJson}));
            this.marketcapChart= new MarketcapChart("#js-marketcapChart");
          
            this.marketcapChart.draw(this.marketCapJson);
            return this;
        },
        update: function(){
            this.render();
            return this;
        }

    });

});