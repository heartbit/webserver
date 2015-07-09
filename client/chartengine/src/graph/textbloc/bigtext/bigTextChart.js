/**
Provides a base for a text chart
@module ChartEngine
@submodule Chart
@class BigTextChart
*/

var AbstractChart = require('AbstractChart');
var BigTextChartLayer = require('BigTextChartLayer');
var TextAdapter = require('TextAdapter');

var ordinalScale = d3.scale.ordinal();

var BigTextChart = d3.chart("AbstractChart").extend("BigTextChart", {

    initialize: function(params) {
        var chart = this;
        this.textLayer = this.base.append('g').classed('textLayer', true)
        this.textLayerInstance = this.layer('textLayer', this.textLayer, BigTextChartLayer);

        this.ordinalScale = ordinalScale;
        var changeOrdinalscaleRange = function() {
            chart.ordinalScale.rangeRoundBands([0, chart.width()], 0, 0);
        };
        chart.on('change:width', changeOrdinalscaleRange);
        changeOrdinalscaleRange();
    },

    transform: function(data) {
        this.data = data;
        var points = TextAdapter.computeLines(data);
        this.ordinalScale.domain(_.range(points.length));
        return points;
    }

});

module.exports = BigTextChart;