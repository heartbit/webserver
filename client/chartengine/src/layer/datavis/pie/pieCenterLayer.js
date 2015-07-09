/**
Provides pie chart center layer
@module ChartEngine
@submodule Layer
@class PieCenterLayer
*/

var colors = ['#333', '#666', '#999', '#aaa', '#ccc', '#eee', '#fafafa'];

var highlight = '#BE5E2A';

var Formatter = require('Formatter');

var PieCenterLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(line) {
		return this.selectAll('.pieCenter').data([line]);
	},

	insert: function() {
		return this.append('text').classed('pieCenter', true)
	},

	over: function(params) {

	},

	out: function(params) {

	},

	events: {
		enter: function() {
			var chart = this.chart();
			// 	.on('mouseover', function(point, i, j) {
			// 		chart.trigger('over', {
			// 			chart: chart.params,
			// 			elId: point.data.id
			// 		});
			// 	})
			// 	.on('mouseout', function(point, i, j) {
			// 		chart.trigger('out', {
			// 			chart: chart.params,
			// 			elId: point.data.id
			// 		});
			// 	});
			return this;
		},
		'enter:transition': function() {
			return this;
		},

		update: function() {
			return this;
		},
		'update:transition': function() {
			return this;
		},

		merge: function() {
			var chart = this.chart();
			return this
				.attr('x', chart.width() / 2)
				.attr('y', chart.height() / 2)
				.style('font-size', chart.innerRadius / 2.65)
				.attr('alignment-baseline', 'central')
				.html(function(line) {
					return Formatter.format(line.total, 'ShortValueFormatter');
				});
		},
		'merge:transition': function() {
			return this;
		},

		exit: function() {
			this.remove();
		},
		'exit:transition': function() {
			return this;
		}
	}
};

module.exports = PieCenterLayer;
