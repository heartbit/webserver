/**
Provides a base for a screen chart
@module ChartEngine
@submodule Chart
@class ScreenChart
*/

var AbstractChart = require('AbstractChart');

var ScreenAdapter = require('ScreenAdapter');

var ScreenShapeLayer = require('ScreenShapeLayer');
var ScreenLabelsLayer = require('ScreenLabelsLayer');
var ScreenShapeDefinitions = require('ScreenShapeDefinitions');

var ordinalScale = d3.scale.ordinal();

var ScreenChart = d3.chart("AbstractChart").extend("ScreenChart", {

    zones: {
        ticks: {
            width: {
                start: 0,
                end: 1
            },
            height: {
                start: 0,
                end: 1
            }
        }
    },

    initialize: function(options) {
        var chart = this;

        this.base.classed('screenChart', true);
        this.loadDefs(ScreenShapeDefinitions, 'screen-defs');

        this.ordinalScale = ordinalScale;
        var changeOrdinalscaleRange = function() {
            chart.ordinalScale.rangeRoundBands([0, chart.width()], .2, .35);
        };
        chart.on('change:width', changeOrdinalscaleRange);
        changeOrdinalscaleRange();

        this.screenShapeLayer = this.base.append('g').classed('screenShapeLayer', true);
        this.screenShapeLayerInstance = this.layer('screenShapeLayer', this.screenShapeLayer, ScreenShapeLayer);

        this.screenLabelsLayer = this.base.append('g').classed('screenLabelsLayer', true);
        this.screenLabelsLayerInstance = this.layer('screenLabelsLayer', this.screenLabelsLayer, ScreenLabelsLayer);
    },

    transform: function(data) {
        this.data = data;
        var points = ScreenAdapter.computeLines(data);
        this.ordinalScale.domain(_.range(points.length));
        return points;
    }

});

module.exports = ScreenChart;