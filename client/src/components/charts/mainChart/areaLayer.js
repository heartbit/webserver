var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var moment = require('moment');
var defaultDuration = 300;

function AreaLayer(chart) {
    var self = this;

    this.chart = chart;
    console.log("New AreaLayer --> chart context:", this.chart);
    this.areaLayer = this.chart.mainLayer
        .append("g")
        .attr("class","areaLayer");

    this.isVisible = true;

    this.candleYScale = d3.scale
        .linear()
        .range([3 * this.chart.height / 4, 0]);

    this.candlesArea = d3.svg.area()
        .x(function(candle) {
            return self.chart.timeScale(candle.middleDate);
        })
        .y0(function(candle) {
            return self.candleYScale(candle.low);
        })
        .y1(function(candle) {
            return self.candleYScale(candle.high);
        })
        .interpolate("monotone");

};

AreaLayer.prototype.draw = function() {
    var self = this;
    this.params = params;
    this.update();

}

AreaLayer.prototype.update = function() {
    console.log("update AREA CHART!");
    var self = this;
    var candleYOffset = 0;
    var ratio = 0.005;
    this.candles = this.chart.models.candles;

    this.candleYScale.domain([d3.min(self.candles.map(function(candle) {
        return (candle.low - (candle.low * ratio));
    })) - candleYOffset, d3.max(this.candles.map(function(candle) {
        return (candle.high + (candle.high * ratio));
    })) + candleYOffset]);
    
    this.candleAreaChart = this.areaLayer
        .append("path")
        .attr('opacity', 0.4)
        .attr('class', 'areaLayer');

    this.candleAreaChart
        .transition()
        .duration(defaultDuration)
        .attr('d', self.candlesArea(self.candles))

}

AreaLayer.prototype.mouseout = function() {

}

AreaLayer.prototype.mouseover = function() {

}

AreaLayer.prototype.updateTooltip = function() {

}

AreaLayer.prototype.hide = function() {
    this.isVisible = false;
    this.areaLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 0);
}

AreaLayer.prototype.show = function() {
    this.isVisible = true;
    this.areaLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 1);
}

AreaLayer.prototype.resize = function() {

}


module.exports = AreaLayer;