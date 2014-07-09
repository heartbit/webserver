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
                this.bubblechartOption = 'bubbleAll';
                $(function(){
                  $("#marketcapTable").tablesorter();
                });
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
                this.marketcaps.fetch();
                this.marketcaps.on('reset',  this.update,this);
                
            },

            update: function() {

                var self = this;
                this.marketcap=[];
                _.each(this.marketcaps.models,function(marketcap) {
                 
                    self.marketcap.push(marketcap.attributes);
                });
             
                
                //console.log(this.marketcap);
            

                // this.marketCapJson.marketcap.sort(function(a, b) {
                //     return (a.marketcap < b.marketcap);
                // });

                this.$el.html(this.templateMarketCap({
                    marketcaps: this.marketcaps.models
                }));

                setTimeout(function() {
                    self.marketcapChart = new MarketcapChart("#js-marketcapChart");
                    self.marketcapChart.draw(self.marketcap);
                    // self.bubbleMarketcapChart = new BubbleMarketcapChart("#js-bubbleMarketcapChart");
                    // self.bubbleMarketcapChart.draw(self.marketcaps.models);
                }, 500);

            },

        });

    });