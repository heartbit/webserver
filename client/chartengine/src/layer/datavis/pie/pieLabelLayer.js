/**
Provides pie chart sectors layer
@module ChartEngine
@submodule Layer
@class PieLabelLayer
*/

var Formatter = require('Formatter');

var PieLabelLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(line) {
		var chart = this.chart();
		this.line = line
		return this.selectAll('.pieLabels').data(chart.pie(line.points));
	},

	insert: function() {
		var group = this.append('g').classed('pieLabels', true);

		/* labels that will be placed out of the pie */
		var outerGroup = group.append('g').classed('outerLabels', true)
		outerGroup.append('text').classed('pieLabel', true);
		outerGroup.append('text').classed('pieTip', true);

		/* labels that will be placed in the pie sectors */
		var sectorGroup = group.append('g').classed('sectorLabels', true)
		sectorGroup.append('text').classed('piePercentage', true);

		return group
	},

	over: function(params) {
		var _this = this,
			chart = this.chart();
		/* Integrated tooltip */
		_(['.pieTip', '.piePercentage']).map(function(selector) {
			_this
				.selectAll(selector)
				.each(function(point, i, j) {
					if (point.data.id == params.elId) {
						d3.select(this).attr('visibility', 'visible')
					}
				});
		});
	},

	out: function(params) {
		var _this = this,
			chart = this.chart();

		/* Integrated tooltip */
		_(['.pieTip', '.piePercentage']).map(function(selector) {
			_this
				.selectAll(selector)
				.attr('visibility', 'hidden')
		})

	},

	events: {
		enter: function() {
			// var chart = this.chart();
			// this
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
			// return this.attr('d', chart.arc);
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

			var pi = Math.PI;
			var chart = this.chart();
			var labelsDistance = chart.radius + 45;
			var percentagesDistance = (chart.radius + chart.innerRadius) / 2;

			function translateGroup(distance) {
				return function(point) {
					var bisectAngle = (point.startAngle + point.endAngle) / 2;

					var x = chart.width() / 2 + Math.cos(bisectAngle - pi / 2) * distance;
					var y = chart.height() / 2 + Math.sin(bisectAngle - pi / 2) * distance;
					return 'translate(' + x + ',' + y + ')';
				}
			}

			function chooseTextAnchor() {
				return function(point) {
					var bisectAngle = (point.startAngle + point.endAngle) / 2;
					if (Math.sin(bisectAngle) > Math.sin(pi / 4)) {
						return 'start';
					}
					if (Math.sin(bisectAngle) < Math.sin(7 * pi / 4)) {
						return 'end';
					}
					return 'middle'
				}
			}
			/* Some math to position and style the labels ! */

			this.selectAll('.outerLabels').each(function(point, i, j) {
				var s = d3.select(this)

				s.attr('transform', translateGroup(labelsDistance))
				s.attr('text-anchor', chooseTextAnchor())

				s.selectAll('.pieLabel').html(function(point) {
					return point.data.name;
				})

				s.selectAll('.pieTip')
					.attr('dy', '25')
					.text(function(point) {
						return Formatter.format(point.value, 'ShortValueFormatter')
					})
					.attr('visibility', 'hidden')
			})

			this.selectAll('.sectorLabels').each(function(point, i, j) {
				var s = d3.select(this)

				s.attr('transform', translateGroup(percentagesDistance))
				s.attr('text-anchor', 'middle')

				d3.selectAll('.piePercentage')
					.attr('alignment-baseline', 'middle')
					.text(function(point) {
						var percent = point.value / chart.data.lines[0].total
						return Math.round(percent * 100) + '%'
					})
					.attr('visibility', 'hidden')
			})

			return this.attr('d', chart.arc);
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

module.exports = PieLabelLayer;