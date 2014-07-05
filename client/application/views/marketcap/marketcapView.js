define('marketcapView', ['config', 'marketcap', 'text!marketcapView.html', 'marketcapchart', 'bubbleMarketcapChart', 'FormatUtils', 'trades'], function(config, Marketcap, MarketcapViewTemplate, MarketcapChart, BubbleMarketcapChart, FormatUtils, Trades) {

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

            // this.marketcap = new Marketcap({url:config.marketcap.urlModel+"item="+this.item+"&currency="+this.currency});
            this.marketcap = new Marketcap({
                url: config.marketcap.urlModel
            });

            this.bubblechartOption = 'bubbleAll';
            this.marketcap.fetch();
            // this.trades = new Trades();
            // console.log(this.trades);
            // this.trades.init();
            // this.trades.fetchAllLastTrades();
            // _.bindAll(this, 'render', 'update');
            // this.trades.on('update',this.update,this);
            // this.render();
            //this.listenTo(this.marketcap,'change', this.render({viewName:'marketcap'}));
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
            var self = this;

            this.marketCapJson = this.marketcap.toJSON();
            this.marketCapJson.marketcap = $.map(this.marketCapJson.marketcap, function(marketcap, index) {
                marketcap.name = index;
                return marketcap;
            });

            this.marketCapJson.marketcap.sort(function(a, b) {
                return (a.marketcap < b.marketcap);
            });

            this.marketCapJson.marketcaps = new Array();

            _.each(this.marketCapJson.marketcap, function(marketcap, index) {
                self.marketCapJson.marketcaps.push({
                    "name": marketcap.name,
                    "currencyID": marketcap.currencyId,
                    "symbol": FormatUtils.formatCurrencyLabel(marketcap.currencyId),
                    "marketcap": FormatUtils.formatPrice(marketcap.marketcap, "$"),
                    "price": FormatUtils.formatPrice(marketcap.price, "$"),
                    "supply": FormatUtils.formatPrice(marketcap.supply, FormatUtils.formatCurrencyLabel(marketcap.currencyId)),
                    "volume_24": FormatUtils.formatPrice(marketcap.volume_24, "$"),
                    "priceChange": FormatUtils.formatPercent(marketcap.priceChange),
                    "volumeChange": FormatUtils.formatPercent(marketcap.volumeChange),
                    "correlation": FormatUtils.formatPrice(marketcap.correlation) 
                });
            });

            this.$el.html(this.templateMarketCap({
                marketcapTemplate: this.marketCapJson
            }));
            this.marketcapChart = new MarketcapChart("#js-marketcapChart");
            this.marketcapChart.draw(this.marketCapJson);

            this.bubbleMarketcapChart = new BubbleMarketcapChart("#js-bubbleMarketcapChart");
            setTimeout(function() {
                self.bubbleMarketcapChart.draw(self.marketCapJson.marketcap);
            }, 500);
            return this;
        },

        update: function() {
            this.render();
            return this;
        }

    });

});