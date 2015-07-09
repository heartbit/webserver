/**
Provides boilerplate template for chart type
@module ChartEngine
@submodule Chart
@class BoilerplateChart
*/
var AbstractChart = require('AbstractChart');
var BoilerplateLayer = require('BoilerplateLayer');
var BoilerplateMobileLayer = require('BoilerplateMobileLayer');
var BoilerplateAdapter = require('BoilerplateAdapter');

var BoilerplateChart = d3.chart('AbstractChart').extend('BoilerplateChart', {

	modes: {
		small: function() {
			return Modernizr.mq('only all and (max-width: 700px)');
		},
		medium: function() {
			return false;
		},
		large: function() {
			return Modernizr.mq('only all and (min-width: 701px)');
		}
	},

	initialize: function() {
		var chart = this;

		chart._margin = {
			top: 20,
			bottom: 20,
			left: 20,
			right: 20
		};

		// Data adapter
		this.adapter = new BoilerplateAdapter();

		// Scale generator
		this.xScale = d3.scale.linear().range([0, this.width()]);
		chart.on('change:width', function(newWidth) {
			chart.xScale.range([0, newWidth]);
		});

		// Layers definition
		var boilerplateLayer = this.base
			.append('g')
			.classed('boilerplateLayer', true);
		this.layer('boilerplateLayer', boilerplateLayer, BoilerplateLayer);

		var boilerplateMobileLayer = this.base
			.append('g')
			.classed('boilerplateMobileLayer', true);
		this.layer('boilerplateMobileLayer', boilerplateMobileLayer, BoilerplateMobileLayer);
	},

	transform: function(data) {
		// Data mapper
		var computedData = this.adapter.computeLines(data);
		// Scale update
		this.xScale.domain([d3.min(computedData), d3.max(computedData)]);
		return computedData;
	}

});

module.exports = BoilerplateChart;