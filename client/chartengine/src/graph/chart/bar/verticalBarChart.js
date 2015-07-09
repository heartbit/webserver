/**
Provides a base for a horizontal bar chart
@module ChartEngine
@submodule Chart
@class HorizontalBarChart
*/

console.log('VERTICAL');

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var BarAdapter = require('BarAdapter');

var BarRectangleLayer = require('BarRectangleLayer');
var BarLabelLayer = require('BarLabelLayer');

var OrdinalAxisChart = require('OrdinalAxisChart');
var QuantitativeAxisChart = require('QuantitativeAxisChart');

var ordinalScale = d3.scale.ordinal();
var linearScale = d3.scale.linear();

var VerticalBarChart = d3.chart("AbstractChart").extend("VerticalBarChart", {

    zones: {
        ordinalXAxis: {
            type: 'OrdinalAxisChart',
            attach: 'ordinalYAxis',
            scale: ordinalScale,
            formatter: 'ShortValueFormatter',
            orientation: 'left',
            width: {
                start: 0,
                end: .2
            },
            height: {
                start: .1,
                end: .9
            },
            isAxis: true,
            grid: true
        },
        linearYAxis: {
            type: 'QuantitativeAxisChart',
            attach: 'linearXAxis',
            width: {
                start: .2,
                end: 1
            },
            height: {
                start: .9,
                end: 1
            },
            scale: linearScale,
            grid: true,
            isAxis: true,
            formatter: 'ValueFormatter',
            orientation: 'bottom'
        }
    },

    initialize: function(options) {
        var chart = this;
        this.base.classed('barChart', true);

        this.tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr('id', 'horizontalBarChartTooltip-' + chart.params.attach || chart.params.anchorId)
            .html(function(point) {
                return point.name + ': ' + Formatter.format(point.value, 'ShortValueFormatter');
            })
            .offset([-12, 0]);
        this.base.call(this.tip);

        // Scale generators
        this.xscale = linearScale;
        var changeLinearXscaleRange = function() {
            chart.xscale.range([chart.width() * chart.zones.linearXAxis.width.start, chart.width() * chart.zones.linearXAxis.width.end]);
        };
        chart.on('change:width', changeLinearXscaleRange);
        changeLinearXscaleRange();

        this.yscale = ordinalScale;
        var changeLinearYscaleRange = function() {
            chart.yscale.rangeRoundBands([chart.height() * chart.zones.ordinalYAxis.height.end, chart.height() * chart.zones.ordinalYAxis.height.start], .35, .35);
        };
        chart.on('change:height', changeLinearYscaleRange);
        changeLinearYscaleRange();

        this.barRectangleLayer = this.base.append('g').classed('barRectangleLayer', true);
        this.barRectangleLayerInstance = this.layer('barRectangleLayer', this.barRectangleLayer, BarRectangleLayer);
    },

    transform: function(data) {
        this.data = data;
        BarAdapter.computeLines(data);
        this.xscale.domain(d3.extent(data.points, function(point) {
            return point.value;
        }));
        this.yscale.domain(_.pluck(data.points, function(point) {
            return point.id;
        }));
        return data.points;
    },

    overEvent: function(params) {
        this.barRectangleLayerInstance.over(params);
    },

    outEvent: function(params) {
        this.barRectangleLayerInstance.out(params);
    }

});

module.exports = VerticalBarChart;