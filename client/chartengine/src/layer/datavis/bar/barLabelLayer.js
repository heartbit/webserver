/**
Provides marimekko labels layer
@module ChartEngine
@submodule Layer
@class BarLabelLayer
*/

var Formatter = require('Formatter');

var BarLabelLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.barLabel').data(points, function(point) {
			return point.id;
		});
	},

	insert: function() {
		return this.append('text').classed('barLabel', true);
	},

	over: function(params) {

	},

	out: function(params) {

	},

	events: {
		enter: function() {
			var chart = this.chart();
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
			this
				.attr('x', function(point, i) {
					var padding = point.value > 0 ? 2 : -2;
					return chart.xscale(point.value) + padding;
				})
				.html(function(point) {
					return Formatter.format(point.value, 'ShortValueFormatter');
				})
				.attr('y', function(point) {
					return chart.yscale(point.name) + chart.yscale.rangeBand() / 2 + this.getBBox().height / 2;
				})
				.attr('text-anchor', function(point) {
					if (point.value > 0) {
						return 'start';
					} else {
						return 'end';
					}
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

module.exports = BarLabelLayer;