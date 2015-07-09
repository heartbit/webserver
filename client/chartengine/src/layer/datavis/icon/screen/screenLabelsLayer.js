/**
Provides chart people layer
@module ChartEngine
@submodule Layer
@class ScreenLabelsLayer
*/

var ScreenLabelsLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.screenLabel').data(points);
	},

	insert: function() {
		return this.append('text').classed('screenLabel', true);
	},

	events: {
		enter: function() {
			return this.attr('text-anchor', 'middle');
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
				.attr('x', function(point, i, j) {
					return chart.ordinalScale(i) + chart.ordinalScale.rangeBand() / 2;
				})
				.attr('y', 50)
				.html(function(point) {
					return point.name;
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

module.exports = ScreenLabelsLayer;