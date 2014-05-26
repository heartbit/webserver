define('depthView', ['config', 'depth', 'd3', 'text!depthView.html', 'depthchart', 'bignumber'], function(config, Depth, d3, DepthTemplate, DepthChart, BigNumber) {

    return Backbone.View.extend({

        el: '#js-depthView',

        template: _.template(DepthTemplate),

        initialize: function() {
            this.depth = new Depth();
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

            this.depthChart.draw(this.depth);

            // d3.select('#js-maxBid')
            //     .transition()
            //     .text()
            //     .duration(600)
            //     .tween("text", function(d) {
            //         var i = d3.interpolate(0, 450);
            //         return function(t) {
            //             this.textContent = i(t);
            //         };
            //     });
            // this.maxBidNumber.render(updateParams);

            // var timestamp = +moment(update.date).format('X') || +moment().format('X');
            // var updateParams = {
            //     unit: 'timestamp',
            //     value: timestamp,
            //     type: 'timestamp',
            //     delay: 100,
            //     duration: 600,
            //     fontSize: '15px'
            // };
            // this.updateTimestamp.render(updateParams);
        }

    });

});