define('marketcapView', ['config', 'marketcaps', 'text!marketcapView.html', 'marketcapchart', 'bubbleMarketcapChart', 'FormatUtils', 'trades'], function(config, Marketcaps, MarketcapViewTemplate, MarketcapChart, BubbleMarketcapChart, FormatUtils, Trades) {

    return Backbone.View.extend({

        el: '#js-marketcapModal',

        templateMarketCap: _.template(MarketcapViewTemplate),

        item: "BTC",
        currency: "USD",

        events: {
            'click .js-bubbleOption': 'changeBubbleChartOption',
        },

        initialize: function(params) {
            var self = this;
            console.log('INITIII');

            // this.marketcap = new Marketcap({url:config.marketcap.urlModel+"item="+this.item+"&currency="+this.currency});
            
            this.marketcap = new Marketcaps();
            

            this.bubblechartOption = 'bubbleAll';

        },

        changeBubbleChartOption: function(event) {
            var option = $(event.target).attr('id').split('-')[1];

            if (option == this.bubblechartOption) {
                return false;
            } else {
                switch (option) {
                    case 'bubbleSplitPrice':
                        this.bubblechartOption = 'bubbleSplitPrice';
                        this.bubbleMarketcapChart.display_by_price();
                        break;
                    case 'bubbleSplitSupply':
                        this.bubblechartOption = 'bubbleSplitSupply';
                        this.bubbleMarketcapChart.display_by_supply();
                        break;
                    case 'bubbleAll':
                        this.bubblechartOption = 'bubbleAll';
                        defaut: this.bubbleMarketcapChart.display_all();
                        break;
                }
                return false;
            }
        },

        render: function(params) {
           
            
           this.marketcap.fetch(this.update());
           console.log(this.marketcap);
           console.log(this.marketcap.models);
           
            
        },

        update: function() {
            var self=this;
            console.log(this.marketcap.models);
            // this.marketcap=this.marketcap.marketcap;
            // console.log(this.marketcap);
            // console.log(this.marketcap.models);
            // console.log(this.marketcap.attributes.marketcap);
            // console.log(this.marketcap.models);
            // _.each(this.marketcap.attributes.currencyName, function(marketcap) {
            //     this.marketcapJson.currencyName.push(currencyName);
            // });
            //  _.each(this.marketcap.attributes.currencyName, function(marketcap) {
            //     console.log("uh");
            //     console.log(marketcap);
               
            // });
            //console.log(this.marketcap.models.marketcap.bitcoin);
            // _.each(this.marketcap.changed,function(att,index) {
            //     console.log(index);
            //     console.log(att);
            // });
            //console.log(this.marketcap.toJSON());
            //console.log(this.marketcap);
         
       
            //this.marketCapJson = this.marketcap;
            
            //   console.log(this.marketCapJson);
            // this.marketCapJson.marketcap = $.map(this.marketCapJson.marketcap, function(marketcap, index) {
            //     marketcap.name = index;
            //     return marketcap;
            // });
           // console.log(this.marketCapJson);
            // this.marketCapJson.marketcap.sort(function(a, b) {
            //     return (a.marketcap < b.marketcap);
            // });

            // this.marketCapJson.marketcaps = new Array();

            // _.each(this.marketCapJson.marketcap, function(marketcap,index) {
            //     self.marketCapJson.marketcaps.push({
            //         "name": marketcap.name,
            //         "currencyID": marketcap.currencyId,
            //         "symbol": FormatUtils.formatCurrencyLabel(marketcap.currencyId),
            //         "marketcap": FormatUtils.formatPrice(marketcap.marketcap, "$"),
            //         "price": FormatUtils.formatPrice(marketcap.price, "$"),
            //         "supply": FormatUtils.formatPrice(marketcap.supply, FormatUtils.formatCurrencyLabel(marketcap.currencyId)),
            //         "volume_24": FormatUtils.formatPrice(marketcap.volume_24, "$"),
            //         "priceChange": FormatUtils.formatPercent(marketcap.priceChange),
            //         "volumeChange": FormatUtils.formatPercent(marketcap.volumeChange),
            //         "correlation": FormatUtils.formatPrice(marketcap.correlation) 
            //     });
            // });

            // this.$el.html(this.templateMarketCap({
            //     marketcapTemplate: this.marketCapJson
            // }));


            setTimeout(function() {
                self.marketcapChart = new MarketcapChart("#js-marketcapChart");
                self.marketcapChart.draw(self.marketCapJson);

                // self.bubbleMarketcapChart = new BubbleMarketcapChart("#js-bubbleMarketcapChart");
                // self.bubbleMarketcapChart.draw(self.marketCapJson.marketcap);
            }, 500);
            

            return this;
        }

    });

});