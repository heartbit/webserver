var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var moment = require('moment');
var defaultDuration = 300;
var conf = require('ChartsConf');

function AreaLayer(chart) {
    var self = this;

    this.chart = chart;
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

    this.candleAreaChart = this.areaLayer
        .append("path")
        .attr('opacity', 0.6)
        .attr('class', 'areaLayer');
};

AreaLayer.prototype.draw = function() {
    var self = this;
    this.params = params;
    this.update();

}

AreaLayer.prototype.update = function() {
    var self = this;
    var candleYOffset = 0;
    var ratio = 0.005;
    this.candles = this.chart.models.candles;

    var scaleMarginMin = conf.mainchart.scaleMarginMin;
    var scaleMarginMax = conf.mainchart.scaleMarginMax;

    this.candleYScale.domain([d3.min(self.candles.map(function(candle) {
        return (candle.close*scaleMarginMin);
    })), d3.max(this.candles.map(function(candle) {
        return (candle.close*scaleMarginMax);
    }))]);
    

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