define('keyFactsView', ['ticker', 'trade', 'config', 'text!keyFactsView.html', 'bignumber', 'FormatUtils', 'graphmenuView'],
    function(Ticker, Trade, config, KeyfactsTemplate, BigNumber, FormatUtils, GraphmenuView) {

        return Backbone.View.extend({

            events: {},

            el: '#js-keyfacts',
            exportToolEl: '#js-keyFactExportTools',
            template: _.template(KeyfactsTemplate),

            /**
            initialize keyfactsview
            var options = {
                platforms : [],
                tickerAttributes:['last', 'wavg', 'high', 'low', 'daily', 'vol']
            }
         */
            initialize: function(options) {
                if (!options) {
                    options = {};
                }
                this.options = options;
                this.ticker = new Ticker();
                this.trade = new Trade();
                this.ticker.on('update', this.redraw, this);
                this.trade.on('update', this.redraw, this);

                this.exportTools = new GraphmenuView();
                this.exportTools.initParent(this.$el);
                _.bindAll(this, 'render', 'update','redraw');
                // console.log("initKEYFACT",this.trade.get("price"),this.trade.get("amount"),this.trade.get("dateTrade"));
            },

            render: function(params) {
                var self = this;
                this.bigNumberViews = [];
                // console.log("keyfactparams",params);
                // console.log("renderKEYFACT",this.trade.get("price"),this.trade.get("amount"),this.trade.get("dateTrade"));
             
                var tickerAttributes = this.options.tickerAttributes || config.keyfactsview.defaultAttributes;
                _.each(tickerAttributes, function(tickerAttribute) {
                    tickerAttribute.htmlSelector = 'js-' + tickerAttribute.id + 'BigNumber';
                });
                this.tickerAttributes = tickerAttributes;
            
                this.$el.html(this.template({
                    tickerAttributes: this.tickerAttributes
                }));

                _.each(this.tickerAttributes, function(tickerAttribute) {
                    var options = {
                        trend: {
                            after: true
                        }
                    };

                    var bigNumberView = {
                        bigNumberChart: new BigNumber('#' + tickerAttribute.htmlSelector, options),
                        tickerAttribute: tickerAttribute
                    };

                    self.bigNumberViews.push(bigNumberView);
                });

                $(document).foundation();

                this.ticker.socketSync(params);
                this.trade.socketSync(params);

                return this;
            },

            update: function(params) {
                this.ticker.socketSync(params);
                this.trade.socketSync(params); 
                console.log("updateKEYFACT",this.trade.get("price"),this.trade.get("amount"),this.trade.get("dateTrade"));
            },
           
            redraw: function(reset) {
                var self = this;
                // console.log("redrawKEYFACT",this.trade.get("price"),this.trade.get("amount"),this.trade.get("dateTrade"));
                // console.log("redrawKEYFACT",this.trade);
                _.each(this.bigNumberViews, function(bigNumberView, index) {
                    var unit = null;
                    switch (bigNumberView.tickerAttribute.type) {
                        case "short":
                        case "volume":
                        case "volume-short":
                            unit = self.ticker.get('item');
                            break;
                        case "price":
                            unit = self.ticker.get('currency');
                            break;
                        case "percent":
                            unit = "%";
                            break;
                        default:
                            break;
                    }

                    var value = self.ticker.get(bigNumberView.tickerAttribute.id) || self.trade.get(bigNumberView.tickerAttribute.id) || 0;
                  
                   
                    var updateParams = {
                        unit: unit,
                        value: value,
                        type: bigNumberView.tickerAttribute.type,
                        delay: index * 100,
                        duration: 500,
                        trend: true,
                        reset: reset
                    };
                    bigNumberView.bigNumberChart.render(updateParams);
 

                });
            }

        });

    });