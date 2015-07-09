/**
@module ChartEngine
@submodule Chart
@class QuantitativeAxisChart
*/
require('d3extended');

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var QuantitativeAxisChart = d3.chart('AbstractChart').extend('QuantitativeAxisChart', {

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
		this.options = options;

		this.base.classed('quantitativeAxisChart', true);

		this.axis = d3.svg
			.axis()
			.scale(this.options.scale)
			.orient(this.options.orientation)
			.tickFormat(function(point) {
				return Formatter.format(point, chart.options.formatter);
			});

		var zone = this.zones.ticks;

		var computeTransform = function() {
			var x = 0,
				y = 0;
			switch (chart.options.orientation) {
				case 'left':
					x = zone.width.end * chart.width();
					y = 0;
					break;
				case 'right':
					x = zone.width.start * chart.width();
					y = 0;
					break;
				case 'top':
					x = 0;
					y = zone.height.end * chart.height();
					break;
				case 'bottom':
					x = 0;
					y = zone.height.start * chart.height();
					break;
				default:
			}
			return 'translate(' + x + ',' + y + ')';
		};

		chart.axisInstance = zone.anchor
			.attr("class", "quantitative_axis")
			.attr('transform', computeTransform);

		chart.on('resize', function() {
			chart.axisInstance.attr('transform', computeTransform);
		});

		chart.backgroundNegativeArea = this.base
			.insert('rect', '.quantitative_axis')
			.classed('negativeArea', true);
	},

	addGrid: function() {
		var chart = this;

		var putZeroClass = function(value, i, j) {
			return value == 0;
		};

		var putGridLineClass = function(value, i, j) {
			return chart.options.grid || value == 0;
		};

		switch (chart.options.orientation) {
			case 'left':
				this.base
					.selectAll('g.tick line')
					.classed("grid-line", putGridLineClass)
					.classed("zero", putZeroClass)
					.attr("x1", 0)
					.attr("y1", 0)
					.attr("x2", this.params.parent.width() * this.params.parent.zones.linearXAxis.width.end)
					.attr("y2", 0);
				break;
			case 'right':
				break;
			case 'top':
				break;
			case 'bottom':
				this.base
					.selectAll('g.tick line')
					.classed("grid-line", putGridLineClass)
					.classed("zero", putZeroClass)
					.attr("x1", 0)
					.attr("y1", this.params.parent.height() * this.params.parent.zones.ordinalYAxis.height.start)
					.attr("x2", 0)
					.attr("y2", this.params.parent.height() * this.params.parent.zones.ordinalYAxis.height.end);
				break;
			default:
		}
	},

	placeNegativeArea: function(points) {
		var chart = this;
		var minValue = d3.min(chart.options.scale.domain());

		if (minValue < 0) {
			this.backgroundNegativeArea
				.attr('x', function() {
					return chart.params.parent.width() * chart.params.parent.zones.linearXAxis.width.start;
				})
				.attr('y', function() {
					return chart.params.parent.height() * chart.params.parent.zones.ordinalYAxis.height.start;
				})
				.attr('width', function() {
					return chart.options.scale(0) - chart.options.scale(minValue);
				})
				.attr('height', function() {
					return chart.params.parent.height() * chart.params.parent.zones.ordinalYAxis.height.end - chart.params.parent.height() * chart.params.parent.zones.ordinalYAxis.height.start;
				});
		}
	},

	transform: function(points) {
		var chart = this;
		// this.axis.tickValues(_.union(d3.extent(points, function(point) {
		// 	return point.value;
		// }), [0]))
		this.axisInstance.call(this.axis);
		this.addGrid();
		this.placeNegativeArea(points);
		return points;
	}

});

module.exports = QuantitativeAxisChart;