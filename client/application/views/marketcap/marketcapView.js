define('marketcapView', ['config', 'marketcaps', 'text!marketcapView.html', 'marketcapchart', 'bubbleMarketcapChart', 'FormatUtils', 'trades'],
    function(config, Marketcaps, MarketcapViewTemplate, MarketcapChart, BubbleMarketcapChart, FormatUtils, Trades) {

        return Backbone.View.extend({

            el: '#js-marketcapModal',

            templateMarketCap: _.template(MarketcapViewTemplate),

            item: "BTC",
            currency: "USD",

            events: {
                'click .js-bubbleOption': 'changeBubbleChartOption',
            },

            initialize: function(params) {
                //_.bindAll(this, 'render', 'update');
                this.marketcaps = new Marketcaps();
                this.marketcaps.on('reset', this.update, this);
                this.bubblechartOption = 'bubbleAll';
                this.marketcapChart = new MarketcapChart("#js-marketcapChart");
                this.bubbleMarketcapChart = new BubbleMarketcapChart("#js-bubbleMarketcapChart");
            
            },

            changeBubbleChartOption: function(event) {
                console.log(event);
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
                this.marketcaps.fetch();
            },

            update: function() {
                var self = this;

                this.marketcap = [];
                this.marketcapFormat = [];
                _.each(this.marketcaps.models, function(marketcap, i) {
                    self.marketcap.push(marketcap.attributes);
                    self.marketcap[i].marketcap = self.marketcap[i].price * self.marketcap[i].totalCoin;
               
                    self.marketcapFormat.push(_.clone(marketcap.attributes));
                });

                _.each(this.marketcapFormat, function(d, i) {
                    d.marketcap = FormatUtils.formatItem(d.marketcap, "$");
                    // marketcap.marketcap,marketcap.currencyId);//                 +FormatUtils.formatCurrencyLabel(marketcap.currencyId);
                    d.currencyId = d.currencyId;
                    d.price = FormatUtils.formatPrice(d.price, "$");
                    d.priceChange = FormatUtils.formatPercent(d.priceChange);
                    d.volume = FormatUtils.formatItem(d.volume, d.currencyId);
                    if (d.volumeChange > 0) {
                        d.volumeChange = "+" + FormatUtils.formatPercent(d.volumeChange);
                    } else {
                        d.volumeChange = FormatUtils.formatPercent(d.volumeChange);
                    }
                    d.correlation = FormatUtils.truncToNdecimal(d.correlation, 5);
                });



                this.$el.html(this.templateMarketCap({
                    marketcaps: this.marketcapFormat
                }));

                setTimeout(function() {
                    self.bubbleMarketcapChart.draw(self.marketcap);
                    self.marketcapChart.draw(self.marketcap);
                }, 500);

            },

        });

    });