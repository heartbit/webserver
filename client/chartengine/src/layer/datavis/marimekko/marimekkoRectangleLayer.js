/**
Provides marimekko rectangles layer
@module ChartEngine
@submodule Layer
@class MarimekkoRectangleLayer
*/

var MarimekkoRectangleLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this
			.selectAll(".marimekkoLine")
			.data(data.lines, function(line) {
				return line.id;
			});
	},

	insert: function() {
		return this.append("g").classed('marimekkoLine', true);
	},

	over: function(params) {
		var chart = this.chart();
		this.selectAll(".marimekkoLine")
			.selectAll(".marimekkoRect")
			.each(function(point, i, j) {
				if (point.uniqueId == params.point.uniqueId) {
					d3.select(this).style('opacity', 0.95)
				}
			});
	},

	out: function(params) {
		var chart = this.chart();
		this.selectAll(".marimekkoLine")
			.selectAll(".marimekkoRect")
			.each(function(point, i, j) {
				d3.select(this).style('opacity', 1)
			});
	},

	events: {
		enter: function() {
			var chart = this.chart();
			this.selectAll(".marimekkoRect")
				.data(function(line) {
					return line.points;
				}, function(point) {
					return point.id;
				})
				.enter()
				.append('rect')
				.classed('marimekkoRect', true)
				.on('mouseover', function(d, i, j) {
					chart.trigger('over', {
						chart: chart.params,
						elId: d.id,
						point: d
					});
				})
				.on('mouseout', function(d, i, j) {
					chart.trigger('out', {
						chart: chart.params,
						elId: d.id,
						point: d
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

			this.attr('transform', function(line) {
				return 'translate(' + chart.xscale(line.offset) + ',0)';
			});

			this.selectAll(".marimekkoRect")
				.attr('y', function(point) {
					var y = chart.yscale(0) - chart.yscale((point.offset / point.parent.sum) * 100) //chart.yscale(0) - ;
					return y;
				})
				.attr('width', function(point) {
					var width = chart.xscale(point.parent.sum) - chart.xscale(0);
					return width;
				})
				.attr('height', function(point) {
					var height = chart.yscale(0) - chart.yscale((point.value / point.parent.sum) * 100);
					return height;
				})
				.attr('fill', function(point) {
					return point.color;
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

module.exports = MarimekkoRectangleLayer;
