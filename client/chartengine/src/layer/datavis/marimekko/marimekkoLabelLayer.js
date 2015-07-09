/**
Provides marimekko labels layer
@module ChartEngine
@submodule Layer
@class MarimekkoLabelLayer
*/

var Formatter = require('Formatter');

var formatValue = function(point) {
	return point.value;
};

var formatLabel = function(point) {
	if (_.contains(point.status, 'highlight')) {
		return formatHtmlLabelWithData(point);
	} else {
		return point.name;
	}
};

var samePoints = function(p1, p2){
	return p1.uniqueId === p2.uniqueId
}

var placeLabel = function(chart) {
	return function(point){
		/* Place labels in their right position	*/
			d3.select(this)
				.attr('y', function() {
					var height = this.getBBox().height;
					var y = chart.yscale(0) - chart.yscale(((point.value / 2 + point.offset) / point.parent.sum) * 100) + height / 4;
					return y
				})
				.attr('x', function() {
					return chart.xscale(point.parent.sum / 2) - chart.xscale(0);
				})
	}
};

/* Check a posteriori the text size and hide it if too big */
var checkLabelSize = function(rects, fitDy) {
	return function(point){
		/* Get the rect that contains the text */
		var rect = rects.filter(function(d, i){
			return samePoints(d, point)
		})

		d3.select(this)
			.style('font-size', '20px')
			.fitIn(rect.node(), 5, 12, fitDy)
	}

}

// will give you big tips that fill the rect !
var fitTip = function(rects){
	return function(point){

		/* Get the rect that contains the text */
		var rect = rects.filter(function(d, i){
			return samePoints(d, point)
		})

		d3.select(this)
			.style('font-size', '5px')
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'central')
			.style('opacity', 0.1)
			.fillRect(rect.node(), 5)
	}
}

var MarimekkoLabelLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this.selectAll(".marimekkoLabels").data(data.lines, function(line) {
			return line.id;
		});
	},

	over: function(params) {
		var chart = this.chart(),
				_this = this;
		this
			.selectAll(".marimekkoRectTip")
			.each(function(point, i, j) {

				if (samePoints(point, params.point)) {
					var s = d3.select(this)
					//retrieve the corresponding label
					var label = _this.selectAll('.marimekkoRectLabel').filter(function(p){
						return samePoints(p, point)
					})
					if (label.attr('data-tooSmall') === 'true' || s.attr('data-tooSmall') === 'true'){
						//show the classical d3.tip
						chart.tip.show(point)
					} else {
						// show the tip, that has been placed just under the rect label
						s.attr('visibility', 'visible')
					}
				}
			});
	},

	out: function(params) {
		this
			.selectAll(".marimekkoRectTip")
			.attr('visibility', 'hidden')

		this.chart().tip.hide()
	},

	insert: function() {
		return this.append("g").classed('marimekkoLabels', true);
	},

	events: {
		enter: function() {
			var chart = this.chart();

			var rectLabels = this
				.selectAll(".marimekkoRectLabels")
				.data(function(line) {
					return line.points;
				}, function(point) {
					return point.id;
				})
				.enter()
				.append('g').classed('marimekkoRectLabels', true) //container for label, tooltip ...


			rectLabels
				.append('text')
				.attr('text-anchor', 'middle')
				.classed('marimekkoRectLabel', true);

			rectLabels
				.append('text')
				.attr('text-anchor', 'middle')
				.classed('marimekkoRectTip', true);

		},
		merge: function() {
			var chart = this.chart();

			//TODO Accessing the layer like this is not a good practice ?
			var rects = chart.marimekkoRectangleLayerInstance.selectAll('.marimekkoRect')

			this.attr('transform', function(line) {
				return 'translate(' + chart.xscale(line.offset) + ',0)';
			});

			this.selectAll('.marimekkoRectLabel')
				.text(formatLabel)
				.each(placeLabel(chart))
				.each(checkLabelSize(rects))

			this.selectAll('.marimekkoRectTip')
				.text(function(point){
					return Formatter.format(point.value, 'ShortValueFormatter');
				})
				.each(placeLabel(chart))
				.each(checkLabelSize(rects, true))
				.attr('visibility', 'hidden');

			return this;
		}
	}
};

module.exports = MarimekkoLabelLayer;
