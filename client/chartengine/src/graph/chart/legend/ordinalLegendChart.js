/**
@module ChartEngine
@submodule Chart
@class OrdinalLinearAxisChart
*/
require('d3extended');

var AbstractChart = require('AbstractChart');
var OrdinalLegendLabelLayer = require('OrdinalLegendLabelLayer');

function getXYFromTranslate(element) {
	var split = element.attr("transform").split(",");
	var x = ~~split[0].split("(")[1];
	var y = ~~split[1].split(")")[0];
	return [x, y];
}

var OrdinalLegendChart = d3.chart('AbstractChart').extend('OrdinalLegendChart', {

	initialize: function(options) {
		var chart = this;
		this.options = options;

		this.ordinalLegendLabelLayer = this.base
			.append('g')
			.classed('ordinalLegendLabelLayer', true);
		this.ordinalLegendLabelLayerInstance = this.layer('ordinalLegendLabelLayer', this.ordinalLegendLabelLayer, OrdinalLegendLabelLayer);
	},

	transform: function(data) {
		this.base.attr('transform', 'translate(0,' + getXYFromTranslate(this.base)[1] + ')');
		return data;
	}

});

module.exports = OrdinalLegendChart;