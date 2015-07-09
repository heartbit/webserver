/**
Provides chart people layer
@module ChartEngine
@submodule Layer
@class ScreenShapeLayer
*/

var ScreenShapeLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.screen').data(points);
	},

	insert: function() {
		return this.append('g').classed('screen', true);
	},

	events: {
		enter: function() {
			this.each(function(point) {
				var svgShape = d3.select('#screen-desktop-shape').node();
				this.appendChild(svgShape.cloneNode(true));
				// d3.select(this).classed('desktop', true);
			});

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
				.attr('transform', function(point, i, j) {
					var bbox = this.getBBox();
					var bandWidth = chart.ordinalScale.rangeBand();
					var scale = ' scale(' + bandWidth / bbox.width + ') ';
					var translate = ' translate(' + chart.ordinalScale(i) + ',0) ';
					return translate + scale;
				});
			return this;
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

module.exports = ScreenShapeLayer;