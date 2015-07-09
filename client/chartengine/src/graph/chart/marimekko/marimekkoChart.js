/**
Provides a base for a marimekko chart
@module ChartEngine
@submodule Chart
@class MarimekkoChart
*/

var AbstractChart = require('AbstractChart');

// Import adapter
var MarimekkoAdapter = require('MarimekkoAdapter');

// Import layers
var MarimekkoRectangleLayer = require('MarimekkoRectangleLayer');
var MarimekkoHighlightLayer = require('MarimekkoHighlightLayer');
var MarimekkoLabelLayer = require('MarimekkoLabelLayer');

// Import subcharts
var QuantitativeAxisChart = require('QuantitativeAxisChart');
var OrdinalLegendChart = require('OrdinalLegendChart');

var Formatter = require('Formatter');

var xscale = d3.scale.linear();
var yscale = d3.scale.linear();

var MarimekkoChart = d3.chart("AbstractChart").extend("MarimekkoChart", {

    zones: {
        linearXAxis: {
            type: 'QuantitativeAxisChart',
            attach: 'linearXAxis',
            width: {
                start: .1,
                end: .9
            },
            height: {
                start: .0,
                end: .1
            },
            isAxis: true,
            grid: false,
            formatter: 'ShortValueFormatter',
            scale: xscale,
            orientation: 'top',
            hidden: true
        },
        linearYAxis: {
            type: 'QuantitativeAxisChart',
            attach: 'linearYAxis',
            width: {
                start: .05,
                end: .1
            },
            height: {
                start: .1,
                end: .9
            },
            isAxis: true,
            scale: yscale,
            formatter: 'PercentFormatter',
            orientation: 'left',
        },
        ordinalXLegendChart: {
            type: 'OrdinalLegendChart',
            attach: 'ordinalLegendChart',
            width: {
                start: .1,
                end: .9
            },
            height: {
                start: .9,
                end: 1
            },
            scale: xscale,
            orientation: 'top',
            text: function(line) {
                return line.name
            },
        },
        ordinalXTotalsChart: {
            type: 'OrdinalLegendChart',
            attach: 'ordinalTotalsChart',
            width: {
                start: .1,
                end: .9
            },
            height: {
                start: .0,
                end: .05
            },
            scale: xscale,
            orientation: 'top',
            formatter: 'ShortValueFormatter',
            //Use the same chart to display different properties of the line
            text: function(line) {
                return line.sum
            }
        }
    },

    initialize: function(options) {
        var chart = this;
        this.base.classed('marimekkoChart', true);

        this.tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr('id', 'marimekkoRectTooltip-' + chart.params.attach || chart.params.anchorId)
            .html(function(point) {
                return point.name + ': ' + Formatter.format(point.value, 'ShortValueFormatter');
            });
        this.base.call(this.tip);

        // Scale generators
        this.xscale = xscale;
        var changeLinearXscaleRange = function() {
            chart.xscale.range([chart.width() * chart.zones.linearXAxis.width.start, chart.width() * chart.zones.linearXAxis.width.end]);
        };
        chart.on('change:width', changeLinearXscaleRange);
        changeLinearXscaleRange();

        this.yscale = yscale;

        // Attach layers
        this.marimekkoRectangleLayer = this.base.append('g').classed('marimekkoRectangleLayer', true)
        this.marimekkoRectangleLayerInstance = this.layer('marimekkoRectangleLayer', this.marimekkoRectangleLayer, MarimekkoRectangleLayer);

        this.marimekkoLabelLayer = this.base.append('g').classed('marimekkoLabelLayer', true)
        this.marimekkoLabelLayerInstance = this.layer('marimekkoLabelLayer', this.marimekkoLabelLayer, MarimekkoLabelLayer);

        var onHeightChange = function() {
            chart.yscale.range([chart.height() * chart.zones.linearYAxis.height.end, chart.height() * chart.zones.linearYAxis.height.start]);
            chart.marimekkoRectangleLayer.attr('transform', 'translate(0,' + chart.zones.linearYAxis.height.start * chart.height() + ')');
            chart.marimekkoLabelLayer.attr('transform', 'translate(0,' + chart.zones.linearYAxis.height.start * chart.height() + ')');
        };
        chart.on('change:height', onHeightChange);
        onHeightChange();

        d3.select('.linearYAxis').moveToFront();
    },

    transform: function(data) {
        this.data = data;
        data = MarimekkoAdapter.computeLines(data);
        data = this.colorManager.attributesColors(data);

        this.xscale.domain([0, data.total]);
        this.yscale.domain([0, 100]);
        return data;
    },

    overEvent: function(params) {
        this.marimekkoRectangleLayerInstance.over(params);
        this.marimekkoLabelLayerInstance.over(params);
    },

    outEvent: function(params) {
        this.marimekkoRectangleLayerInstance.out(params);
        this.marimekkoLabelLayerInstance.out(params);
    }

});

module.exports = MarimekkoChart;