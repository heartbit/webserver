/**
Provides a base for a horizontal bar chart
@module ChartEngine
@submodule Chart
@class HorizontalBarChart
*/

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var BarAdapter = require('BarAdapter');

var BarRectangleLayer = require('BarRectangleLayer');
var BarLabelLayer = require('BarLabelLayer');

var OrdinalAxisChart = require('OrdinalAxisChart');
var QuantitativeAxisChart = require('QuantitativeAxisChart');

var ordinalScale = d3.scale.ordinal();
var linearScale = d3.scale.linear();

var HorizontalBarChart = d3.chart("AbstractChart").extend("HorizontalBarChart", {

    zones: {
        ordinalYAxis: {
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
                start: 0,
                end: 1
            },
            isAxis: true,
            grid: true
        },
        // linearXAxis: {
        //     type: 'QuantitativeAxisChart',
        //     attach: 'linearXAxis',
        //     width: {
        //         start: .2,
        //         end: 1
        //     },
        //     height: {
        //         start: 0,
        //         end: .1
        //     },
        //     isAxis: true,
        //     scale: linearScale,
        //     ticksNumber: 2,
        //     formatter: 'ShortValueFormatter',
        //     orientation: 'bottom'
        // }
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
            chart.xscale.range([chart.width() * chart.zones.ordinalYAxis.width.end, chart.width()]);
        };
        chart.on('change:width', changeLinearXscaleRange);
        changeLinearXscaleRange();

        this.yscale = ordinalScale;
        var changeLinearYscaleRange = function() {
            chart.yscale.rangeRoundBands([chart.height() * chart.zones.ordinalYAxis.height.end, chart.height() * chart.zones.ordinalYAxis.height.start], .33, .25);
        };
        chart.on('change:height', changeLinearYscaleRange);
        changeLinearYscaleRange();

        this.barRectangleLayer = this.base.append('g').classed('barRectangleLayer', true);
        this.barRectangleLayerInstance = this.layer('barRectangleLayer', this.barRectangleLayer, BarRectangleLayer);

        this.barLabelLayer = this.base.append('g').classed('barLabelLayer', true)
        this.barLabelLayerInstance = this.layer('barLabelLayer', this.barLabelLayer, BarLabelLayer);
    },

    transform: function(data) {
        this.data = data;
        data = this.colorManager.attributesColors(data);
        data = BarAdapter.computeLines(data);
        /* X axis domain
        - Always start at 0 when all values are of the same sign
        - A padding of 1/10 the scale is added on both ends (it's visually better)
        */
        var extent = d3.extent(data.points, function(point) {
            return point.value;
        })

        var distance = extent[1] - extent[0]
        if (extent[0] >= 0) {
            extent[0] = 0
        } else {
            extent[0] = extent[0] - distance / 10
        }
        if (extent[1] <= 0) {
            extent[1] = 0
        } else {
            extent[1] = extent[1] + distance / 10
        }
        this.xscale.domain(extent);

        this.yscale.domain(_.pluck(data.points, function(point) {
            return point.name;
        }));

        return data.points;
    },

    overEvent: function(params) {
        this.barRectangleLayerInstance.over(params);
    },

    outEvent: function(params) {
        this.barRectangleLayerInstance.out(params);
    },

    color: function() {
        console.log('horizontal colors');
        return this;
    },

});

module.exports = HorizontalBarChart;