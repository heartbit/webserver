/**
Provides a base for a time line chart
@module ChartEngine
@submodule Chart
@class BaseTimeLineChart
*/

var AbstractChart = require('AbstractChart');
var TimeAxisChart = require('TimeAxisChart');
var BaseLineLayer = require('BaseLineLayer');
var BaseCircleLayer = require('BaseCircleLayer');

var BaseTimeLineChart = d3.chart("AbstractChart").extend("BaseTimeLineChart", {

    initialize: function(options) {
        var chart = this;

        // Generators
        this.timescale = d3.time.scale().range([0, this.width()]);
        this.yScale = d3.scale.linear().range([this.height(), 0]);
        chart.on('change:width', function(newWidth) {
            chart.timescale.range([0, newWidth / 2]);
        });
        chart.on('change:height', function(newHeight) {
            chart.yScale.range([newHeight, 0]);
        });

        this._interpolationFunction = "basic";
        this.lineGenerator = d3.svg
            .line()
            .interpolate(this._interpolationFunction)
            .x(function(d, i, j) {
                var x = chart.timescale(d.timestamp);
                return x;
            })
            .y(function(d, i, j) {
                var y = chart.yScale(+d.value);
                return y;
            });

        // Attach layers, sub charts
        options.timescale = this.timescale;
        var timeaxis = this.base
            .append('g')
            .classed('timeaxis', true)
            .chart('TimeAxisChart', options)
            .height(options.height || parseInt(d3.select(options.anchorId).style('height'), 10) || '100%')
            .width(options.width || parseInt(d3.select(options.anchorId).style('width'), 10) || '100%');
        this.attach('timeaxis', timeaxis);

        var baseLineLayer = this.base.append('g').classed('baseLineLayer', true);
        this.layer("baseLine", baseLineLayer, BaseLineLayer);

        var baseCircleLayer = this.base.append('g').classed('baseCircleLayer', true);
        this.layer("baseCircle", baseCircleLayer, BaseCircleLayer);
    },

    transform: function(data) {
        var timestamps = [];
        var values = [];
        _.each(data, function(line) {
            _.each(line.data, function(point) {
                point.timestamp = new Date(Date.parse(point.timestamp));
                timestamps.push(point.timestamp);
                values.push(+point.value);
            });
        });

        this.timescale.domain(d3.extent(timestamps));
        this.yScale.domain(d3.extent(values));
        return data;
    },

    demux: function(name, data) {
        if (name === "timeaxis") {
            var timestamps = _.pluck(data[0].data, 'timestamp')
            return timestamps;
        } else {
            return data;
        }
    },

    interpolate: function(newInterpolation) {
        if (newInterpolation) {
            this._interpolationFunction = newInterpolation;
            this.lineGenerator.interpolate(this._interpolationFunction);
            this.draw(this.data);
            return this;
        } else {
            return this._interpolationFunction;
        }
    }

});

module.exports = BaseTimeLineChart;