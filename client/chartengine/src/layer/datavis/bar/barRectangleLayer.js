/**
Provides marimekko rectangles layer
@module ChartEngine
@submodule Layer
@class BarRectangleLayer
*/

var BarRectangleLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.barRect').data(points, function(point) {
			return point.id;
		});
	},

	insert: function() {
		return this.append('rect').classed('barRect', true);
	},

	over: function(params) {
		var chart = this.chart();
		this
			.selectAll(".barRect")
		// .attr('fill', 'black')
		// 	function(point, i) {
		// 	return (point.id == params.elId) ? highlight : colors[i];
		// });
	},

	out: function(params) {
		var chart = this.chart();
		chart.tip.hide();
	},

	events: {
		enter: function() {
			var chart = this.chart();
			this
				.on('mouseover', function(d, i, j) {
					chart.trigger('over', {
						chart: chart.params,
						elId: d.id
					});
				})
				.on('mouseout', function(d, i, j) {
					chart.trigger('out', {
						chart: chart.params,
						elId: d.id
					});
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
				.attr('x', function(point, i) {
					if (point.value >= 0) {
						return chart.xscale(0);
					} else {
						return chart.xscale(point.value);
					}
				})
				.attr('width', function(point, i) {
					if (point.value >= 0) {
						return chart.xscale(point.value) - chart.xscale(0);
					} else {
						return chart.xscale(0) - chart.xscale(point.value);
					}
				})
				.attr('y', function(point) {
					return chart.yscale(point.name);
				})
				.attr('height', chart.yscale.rangeBand())
				.attr('fill', function(point) {
					return point.color;
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

module.exports = BarRectangleLayer;