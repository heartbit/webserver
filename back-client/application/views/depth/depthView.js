define('depthView', ['config', 'depth', 'd3', 'text!depthView.html', 'depthchart', 'bignumber', 'depthDataHelper'],
    function(config, Depth, d3, DepthTemplate, DepthChart, BigNumber, DepthDataHelper) {

        return Backbone.View.extend({

            el: '#js-depthView',

            template: _.template(DepthTemplate),

            initialize: function() {
                _.bindAll(this, 'render', 'update', 'redraw');
                this.depth = new Depth();
                this.depth.on('update', this.redraw, this);
                this.depthDataHelper = new DepthDataHelper();
            },

            render: function(params) {
                this.params = params ;
                this.$el.html(this.template());
                this.depthChart = new DepthChart('#js-depthChart');
                this.depth.socketSync(params);

                var optionMaxBid = {
                    trend: {
                        after: true
                    }
                };
                this.maxBidNumber = new BigNumber('#js-maxBid', optionMaxBid);

                var optionsMinAsk = {
                    trend: {
                        before: true
                    }
                };
                this.minAskNumber = new BigNumber('#js-minAsk', optionsMinAsk);
                return this;
            },

            update: function(params) {
                this.params = params;
                this.depth.socketSync(params);
            },

            redraw: function() {
                this.computedDepth = this.depthDataHelper.computeDepth(this.depth);
                this.depthChart.draw(this.computedDepth);

                var updateParams = {
                    unit: this.params.currency,
                    value: this.computedDepth.maxBid.price,
                    type: 'price',
                    delay: 0,
                    duration: 600,
                    fontSize: '35px',
                    trend: true
                };

                this.maxBidNumber.render(updateParams);

                var updateParams = {
                    unit: this.params.currency,
                    value: this.computedDepth.minAsk.price,
                    type: 'price',
                    delay: 0,
                    duration: 600,
                    fontSize: '35px',
                    trend: true
                };

                this.minAskNumber.render(updateParams);
            },


        });

    });