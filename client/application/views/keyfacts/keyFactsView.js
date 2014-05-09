define('keyFactsView', ['ticker', 'trade', 'config', 'text!keyFactsView.html', 'misc-bignumber', 'FormatUtils','graphmenuView'], 
    function(Ticker, Trade, config, KeyfactsTemplate, BigNumber, FormatUtils,GraphmenuView) {

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
            this.exportTools = new GraphmenuView();
            this.exportTools.initParent(this.$el);
            _.bindAll(this, 'render', 'update');
        },
       
        renderBigNumbers: function(tickerAttributes) {
            var self = this;
            this.bigNumberViews = [];
            var tickerAttributes = tickerAttributes || config.keyfactsview.defaultAttributes;
            this.tickerAttributes = this.addHtmlSelectors(tickerAttributes);
            this.$el.html(this.template({
                tickerAttributes: this.tickerAttributes
            }));
            _.each(this.tickerAttributes, function(tickerAttribute) {
                var bigNumberView = {
                    bigNumberChart: new BigNumber('#' + tickerAttribute.htmlSelector),
                    tickerAttribute: tickerAttribute
                }
                self.bigNumberViews.push(bigNumberView);
            });
            $(document).foundation();
        },

        addHtmlSelectors: function(tickerAttributes) {
            _.each(tickerAttributes, function(tickerAttribute) {
                tickerAttribute.htmlSelector = 'js-' + tickerAttribute.id + 'BigNumber';
            });
            return tickerAttributes;
        },

        render: function(params) {
            this.ticker.socketSync(params);
            this.trade.socketSync(params);
            this.renderBigNumbers(this.options.tickerAttributes);
            this.ticker.on('update', this.update, this);
            this.trade.on('update', this.update, this);
            this.update(true);
            this.exportTools.setElement($(this.exportToolEl)).render();
            return this;
        },

        update: function(reset) {
            var self = this;

            _.each(this.bigNumberViews, function(bigNumberView, index) {
                var unit = null;
                switch (bigNumberView.tickerAttribute.type) {
                    case "volume":
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

                var value = self.ticker.get(bigNumberView.tickerAttribute.id) || self.trade.get(bigNumberView.tickerAttribute.id);

                var updateParams = {
                    unit: unit,
                    value: value,
                    type: bigNumberView.tickerAttribute.type,
                    delay: index * 100,
                    duration: 500,
                    trend: true,
                    reset: reset,
                    fontSize: '16px'
                };

                bigNumberView.bigNumberChart.render(updateParams);
            });
            // this.changePageTitle();
        },

        // changePageTitle: function() {
        //     var $title = $("title");
        //     var title = "Coin";
        //     if (this.modelSelectedTicker.get('last') && this.modelSelectedTicker.get('currency')) {
        //         title = FormatUtils.formatPrice(this.modelSelectedTicker.get('last'), this.modelSelectedTicker.get('currency').id);
        //         title += " " + this.modelSelectedTicker.get('platform').label + " " + this.modelSelectedTicker.get('item').symbol + "/" + this.modelSelectedTicker.get('currency').symbol;
        //     }
        //     $title.html(title);
        //     return false;
        // },

    });

});