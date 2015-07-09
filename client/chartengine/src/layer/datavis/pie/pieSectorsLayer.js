/**
Provides pie chart sectors layer
@module ChartEngine
@submodule Layer
@class PieSectorsLayer
*/

var magicStrokeWidthRatio = 30;

var PieSectorsLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(line) {
		var chart = this.chart();
		return this.selectAll('.slice').data(chart.pie(line.points));
	},

	insert: function() {
		return this.append('path').classed('slice', true);
	},

	over: function(params) {
		var chart = this.chart();
		/* Basic tooltip
		this
			.selectAll(".slice")
			.each(function(point, i, j) {
				if (point.data.id == params.elId) {
					chart.tip.show(point, this);
				}
			});
		*/
	},

	out: function(params) {
		var chart = this.chart();
		/* Basic tooltip
		chart.tip.hide();
		*/
	},

	events: {
		enter: function() {
			var chart = this.chart();
			this
				.on('mouseover', function(point, i, j) {
					chart.trigger('over', {
						chart: chart.params,
						elId: point.data.id
					});
				})
				.on('mouseout', function(point, i, j) {
					chart.trigger('out', {
						chart: chart.params,
						elId: point.data.id
					});
				});

			this.attr('d', chart.arc);
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
				.attr('d', chart.arc)
				.attr('stroke-width', chart.radius / magicStrokeWidthRatio)
				.attr('fill', function(point) {
					return point.data.color;
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

module.exports = PieSectorsLayer;