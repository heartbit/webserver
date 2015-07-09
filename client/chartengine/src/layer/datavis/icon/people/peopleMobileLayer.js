/**
Provides chart people mobile layer
@module ChartEngine
@submodule Layer
@class PeopleMobileLayer
*/

var PeopleMobileLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.people').data(points);
	},

	insert: function() {
		return this.append('g').classed('people', true);
	},

	events: {
		enter: function() {
			this.each(function(point, i) {
				var svgShape = '';
				if (point.value == "mobile") {
					var mobilesShapes = d3.selectAll('#mobile-defs .mobile-shape');
					svgShape = d3.select('#mobile-defs #mobile-shape-' + (i + 1)).node(); // _.random(1, mobilesShapes[0].length)).node();
					d3.select(this).classed('mobile', true);
				} else {
					var nonMobilesShapes = d3.selectAll('#mobile-defs .no-mobile-shape');
					svgShape = d3.select('#mobile-defs #no-mobile-shape-' + (i + 1)).node(); // + _.random(1, nonMobilesShapes[0].length)).node();
					d3.select(this).classed('other', true);
				}
				this.appendChild(svgShape.cloneNode(true));
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
					// Scale width
					var bandWidth = chart.ordinalScale.rangeBand();
					var ratioWidth = bandWidth / bbox.width;
					// Scale height
					var ratioHeight = chart.height() / bbox.height;
					var ratio = _.min([ratioWidth, ratioHeight]);
					var scale = ' scale(' + ratioWidth + ') ';
					var offset = 0;
					var x = +chart.ordinalScale(i) + offset;
					var translate = ' translate(' + x + ',0) ';



					// Animations
					// var head = d3.select(this).select('.head');
					// var rotate = false;
					// setInterval(function() {
					// 	head
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', function()  {
					// 			if (!rotate) {
					// 				rotate = true;
					// 				return 'rotate(1) ';
					// 			} else {
					// 				rotate = false;
					// 				return 'rotate(0)';
					// 			}
					// 		});
					// }, 1000 * (i + 1));

					// var hiddenArm = d3.select(this).select('.hiddenArm');
					// var rotate = false;
					// setInterval(function() {
					// 	hiddenArm
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', function()  {
					// 			if (!rotate) {
					// 				rotate = true;
					// 				return ' translate(0,5) ';
					// 			} else {
					// 				rotate = false;
					// 				return '  translate(0,0)  ';
					// 			}
					// 		});
					// }, 1000);

					// var visibleArm = d3.select(this).select('.visibleArm');
					// var rotate = false;
					// setInterval(function() {
					// 	visibleArm
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', function()  {
					// 			if (!rotate) {
					// 				rotate = true;
					// 				return ' translate(0,5) ';
					// 			} else {
					// 				rotate = false;
					// 				return '  translate(0,0) ';
					// 			}
					// 		});
					// }, 5000);

					// var tablet = d3.select(this).select('.tablet');
					// var rotate = false;
					// setInterval(function() {
					// 	tablet
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', function()  {
					// 			if (!rotate) {
					// 				rotate = true;
					// 				return ' translate(0,5) ';
					// 			} else {
					// 				rotate = false;
					// 				return '  translate(0,0) ';
					// 			}
					// 		});
					// }, 3000);

					// var leftArm = d3.select(this).select('.leftArm');
					// setInterval(function() {
					// 	leftArm
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(5,5) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(0,0) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(5,5) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(0,0) ')
					// }, 5000);

					// var rightArm = d3.select(this).select('.rightArm');
					// setInterval(function() {
					// 	rightArm
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(5,5) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(0,0) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(5,5) ')
					// 		.transition()
					// 		.duration(500)
					// 		.attr('transform', ' translate(0,0) ')
					// }, 5000);
					return translate + scale;
				});

			// Fill with highlight color
			this
				.selectAll('.highlight')
				.attr('fill', chart.colorManager.colors.highlight);
			this
				.selectAll('.highlightStroke')
				.attr('stroke', chart.colorManager.colors.highlight);

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

module.exports = PeopleMobileLayer;