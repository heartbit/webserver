var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var moment = require('moment');
var defaultDuration = 200;

function AreaLayer(chart) {
    var self = this;

    this.chart = chart;
        // this.candleAreaChart = this.candleLayer
    //     .append("path")
    //     .attr('opacity', 0.4)
    //     .attr('class', 'candle_area');

    // this.candleAreaChart
    //     .transition()
    //     .duration(defaultDuration)
    //     .attr('d', self.candlesArea(self.candles))
};


module.exports = AreaLayer;