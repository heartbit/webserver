/**
Provides marimekko highlight labels layer
@module ChartEngine
@submodule Layer
@class MarimekkoHighlightLayer
*/

var MarimekkoHighlightLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this.selectAll(".marimekkoHighlightedPoints").data(data.lines, function(line) {
			return line.id;
		});
	},

	insert: function() {
		return this.append("g").classed('marimekkoHighlightedPoints', true);
	},

	events: {
		enter: function() {
			this.selectAll(".marimekkoHighlightedPoints")
				.data(function(line) {
					return line.points;
				}, function(point) {
					return point.id;
				})
				.enter()
				.append('text')
				.attr('text-anchor', 'left')
				.classed('marimekkoHighlight', true);
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
				.selectAll('.marimekkoHighlight')
				.text(function(point) {
					return _.contains(point.classes, 'highlight') ? point.value : '';
				})
				.attr('y', function(point) {
					var height = this.getBBox().height;
					return chart.yscale(0) - chart.yscale(((point.value / 2 + point.offset) / point.parent.sum) * 100) + height / 4;
				})
				.attr('x', function(point) {
					return 20;
				})
				.attr('font-size', '40px') //function(point) {
			// 	switch (chart.mode()) {
			// 		case 'large':
			// 			return '20px';
			// 			break;
			// 		case 'medium':
			// 			return '18px';
			// 			break;
			// 		case 'small':
			// 		default:
			// 			return '16px';
			// 	}
			// })
			// .attr('fill', highlight);

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

module.exports = MarimekkoHighlightLayer;