/**
Provides a base for a pie chart

- "other" node :
  This pie automatically computes a "other" node,
  in order to have a clear graph with a few nodes. See PieAdapter.

  TODO It should be possible to :
    This chart can be called with a remainder option :
    remainder : {
        totalValue: 987654, //what's the sum on all nodes (even those not in the given dataset) on this dimension ?
    }
    AND a 'totalCount' parameter
    It is the real number of nodes on this dimension (even those not available in the input dataset,
    but available as metadata)


@module ChartEngine
@submodule Chart
@class PieChart
*/

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var PieAdapter = require('PieAdapter');

var PieSectorsLayer = require('PieSectorsLayer');
var PieLabelLayer = require('PieLabelLayer');
var PieCenterLayer = require('PieCenterLayer');

var arc = d3.svg.arc();
var pie = d3.layout.pie();

var PieChart = d3.chart("AbstractChart").extend("PieChart", {

    initialize: function(options) {
        var chart = this;
        this.base.classed('pieChart', true);

  /*
        this.tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr('id', 'horizontalBarChartTooltip-' + chart.params.attach || chart.params.anchorId)
            .html(function(point) {
                return point.data.name + ': ' + Formatter.format(point.value, 'ShortValueFormatter');
            })
            .offset([-12, 0]);
        this.base.call(this.tip);
        */

        // Attach layers
        this.pieSectorsLayer = this.base.append('g').classed('pieSectorsLayer', true)
        this.pieSectorsLayerInstance = this.layer('pieSectorsLayer', this.pieSectorsLayer, PieSectorsLayer);

        this.pieLabelLayer = this.base.append('g').classed('pieLabelLayer', true)
        this.pieLabelLayerInstance = this.layer('pieLabelLayer', this.pieLabelLayer, PieLabelLayer);

        this.pieCenterLayer = this.base.append('g').classed('pieCenterLayer', true)
        this.pieCenterLayerInstance = this.layer('pieCenterLayer', this.pieCenterLayer, PieCenterLayer);

        var resizeAndRecenter = function() {
            chart.pieSectorsLayer.attr('transform', 'translate(' + chart.width() / 2 + ',' + chart.height() / 2 + ')');
        };
        resizeAndRecenter();
        chart.on('change:width', resizeAndRecenter);
        chart.on('change:height', resizeAndRecenter);
    },

    transform: function(data) {
        this.data = data;
        data = this.colorManager.attributesColors(data);
        this.radius = d3.min([this.height(), this.width()]) / 4;
        this.innerRadius = this.radius / 1.618;
        var data = PieAdapter.computeLines(data);
        this.arc = arc.outerRadius(this.radius).innerRadius(this.innerRadius);
        this.pie = pie
            .sort(null)
            .value(function(point) {
                return point.value;
            });
        return data;
    },

    overEvent: function(params) {
        this.pieSectorsLayerInstance.over(params);
        this.pieLabelLayerInstance.over(params);
    },

    outEvent: function(params) {
        this.pieSectorsLayerInstance.out(params);
        this.pieLabelLayerInstance.out(params);
    },

    color: function() {
        console.log('pie colors');
        return this;
    }

});

module.exports = PieChart;
