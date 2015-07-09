/**
Provides
@module ChartEngine
@submodule Layer
@class OrdinalLegendLabelLayer
*/

var Formatter = require('Formatter');

var OrdinalLegendLabelLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this.selectAll(".ordinalLegendLabel").data(data.lines, function(line) {
			return line.id;
		});
	},

	insert: function() {
		return this.append("text").classed('ordinalLegendLabel', true);
	},

	events: {
		enter: function() {
			this
				.attr('text-anchor', 'middle')
				.attr('font-size', 18);
		},
		merge: function() {
			var chart = this.chart();
			this
				.attr('x', function(line) {
					return chart.options.scale(line.offset + line.sum / 2);
				})
				.html(function(line) {
					var rawText = chart.options.text(line)
					if (chart.options.formatter) {
						return Formatter.format(rawText, chart.options.formatter)
					} else {
						return rawText;
					}
				})
				.attr('y', function(line) {
					var font = +d3.select(this).attr('font-size');
					return 2 * font;
				});
			return this;
		}
	}
};

module.exports = OrdinalLegendLabelLayer;