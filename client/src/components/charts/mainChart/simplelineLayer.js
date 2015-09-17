var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var moment = require('moment');
var defaultDuration = 200;

var SimpleLineLayer = function(chart,chartName) {
	var self = this;
    this.chart = chart;
    this.chartName = chartName;
    var height_max = 3 * this.chart.height / 4;
    var height_min = this.chart.height / 4;
    this.simplelineLayer = this.chart.mainLayer
        .append("g")
        .attr("class", chartName);
    this.isVisible = true;


 	this.yScale = d3.scale
    	.linear()
    	.range([3 * this.chart.height / 4, 0]);

    this.xScale = this.chart.timeScale;
    this.simplelineChart = this.simplelineLayer.append("path")
		.attr("class", this.chartName+"_line");
}

SimpleLineLayer.prototype.draw = function() {
	this.update();
}

SimpleLineLayer.prototype.update = function() {
	var self = this;

	this.candles = this.chart.models.candles
	//Yscale callée sur le ligne principale de prix
	this.yScale.domain([d3.min(self.candles.map(function(candle) {
        return (candle.close*0.999);
    })), d3.max(this.candles.map(function(candle) {
        return (candle.close*1.001);
    }))]);

	this.smaLine = d3.svg.line()
		.x(function(d) {
			return self.xScale(d.middleDate);
		})
		.y(function(d) {
			// console.log("simpleline callback PATH ")
			// console.log("simple LINE",self.yScale(d.close));
			return self.yScale(d.close);
		});

	this.simplelineChart
		.attr("d", self.smaLine(self.chart.models.sma.calculated));

}

SimpleLineLayer.prototype.mouseover = function() {

}

SimpleLineLayer.prototype.mouseout = function() {

}

SimpleLineLayer.prototype.updateTooltip = function() {

}

SimpleLineLayer.prototype.hide = function() {
    this.isVisible = false;

    this.simplelineLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 0)
};

SimpleLineLayer.prototype.show = function() {
    this.isVisible = true;
    this.simplelineLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 1)
};

module.exports = SimpleLineLayer;