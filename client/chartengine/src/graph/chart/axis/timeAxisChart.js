/**
@module ChartEngine
@submodule Chart
@class TimeAxisChart
*/
var AbstractChart = require('AbstractChart');
var TimeAxisAdapter = require('TimeAxisAdapter');
var TimeFormatter = require('TimeFormatter');

var TimeAxisChart = d3.chart('AbstractChart').extend('TimeAxisChart', {

	initialize: function(options) {
		options = options || {};

		var chart = this;

		// Data adapter
		this.adapter = new TimeAxisAdapter();

		// Scale generator
		this.scale = options.scale || d3.time.scale().range([0, this.width()]);

		this.axis = d3.svg
			.axis()
			.scale(this.scale)
			.orient(options.orientation || "bottom");

		this.axisInstance = this.base.append("g")
			.attr("class", "x_axis");
	},

	transform: function(data) {
		var computedData = this.adapter.computeLines(data);

		switch (this.mode()) {
			case "small":
				this.timeaxis.tickFormat(TimeFormatter.formatShort);
				break;
			case "medium":
				this.timeaxis.tickFormat(TimeFormatter.formatMedium);
				break;
			case "large":
				this.timeaxis.tickFormat(TimeFormatter.format);
				break;
		}

		this.axisInstance
			.attr("transform", "translate(0," + this.height() + ")")
			.call(this.axis);
		return computedData;
	}

});

module.exports = TimeAxisChart;