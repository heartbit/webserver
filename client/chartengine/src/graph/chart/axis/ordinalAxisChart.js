/**
@module ChartEngine
@submodule Chart
@class OrdinalAxisChart
*/
require('d3extended');

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var OrdinalAxisChart = d3.chart('AbstractChart').extend('OrdinalAxisChart', {

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

		this.axis = d3.svg
			.axis()
			.scale(this.options.scale)
			.orient(this.options.orientation);

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
			.attr("class", "ordinal_axis")
			.attr('transform', computeTransform);
		chart.on('resize', function() {
			chart.axisInstance.attr('transform', computeTransform);
		});
	},

	transform: function(data) {
		this.axisInstance.call(this.axis);
		return data;
	}

});

module.exports = OrdinalAxisChart;