define('depthView', ['config', 'depth', 'd3', 'text!depthView.html', 'depthchart', 'bignumber', 'depthDataHelper'], function(config, Depth, d3, DepthTemplate, DepthChart, BigNumber, DepthDataHelper) {

    return Backbone.View.extend({

        el: '#js-depthView',

        template: _.template(DepthTemplate),

        initialize: function() {
            this.depth = new Depth();
            this.depthDataHelper = new DepthDataHelper();
            _.bindAll(this, 'render', 'update');
        },

        render: function(params) {
            this.$el.html(this.template());
            this.depth.socketSync(params);
            this.depth.on('update', this.update, this);
            this.depthChart = new DepthChart('#js-depthChart');
            this.maxBidNumber = new BigNumber('#js-maxBid');
            this.minAskNumber = new BigNumber('#js-minAsk');
            return this;
        },

        update: function(params) {

            this.computedDepth = this.depthDataHelper.computeDepth(this.depth);

            this.depthChart.draw(this.computedDepth);

            var updateParams = {
                unit: '$',
                value: this.computedDepth.maxBid.price,
                type: 'price',
                delay: 0,
                duration: 600,
                fontSize: '35px',
                trend: true
            };

            this.maxBidNumber.render(updateParams);

            var updateParams = {
                unit: '$',
                value: this.computedDepth.minAsk.price,
                type: 'price',
                delay: 0,
                duration: 600,
                fontSize: '35px',
                trend: true
            };

            this.minAskNumber.render(updateParams);
        }

    });

});