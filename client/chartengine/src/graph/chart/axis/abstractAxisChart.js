/**
@module ChartEngine
@submodule Chart
@class AbstractAxisChart
@abstract
*/
var AbstractChart = require('AbstractChart');

var AbstractAxisChart = d3.chart('AbstractChart').extend('AbstractAxisChart', {

	initialize: function(options) {
		this.options = options || {};
		this.axisInstance = this.base.append("g");
	},

	transform: function(data) {
		console.log('transform abstract axis');
		this.axis = d3.svg
			.axis()
			.scale(this.option.scale)
			.orient(options.orientation);
		return data;
	}

});

module.exports = AbstractAxisChart;