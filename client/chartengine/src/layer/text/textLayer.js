/**
Provides marimekko rectangles layer
@module ChartEngine
@submodule Layer
@class TextLayer
*/

var defaultFontSize = 1;

var TextLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.textLabel').data(points);
	},

	insert: function() {
		return this.append('text').classed('textLabel', true);
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
			this
				.attr('font-size', defaultFontSize + 'px')
				.attr('x', function(point, i, j) {
					return chart.ordinalScale(i) + chart.ordinalScale.rangeBand() / 2;
				})
				.html(function(point, i, j) {
					if (chart.params.options && chart.params.options.split) {
						var regex = new RegExp("(" + chart.params.options.split + ")");
						var aTexts = point.name.split(regex);
						var htmlContent = "";
						_.each(aTexts, function(text) {
							htmlContent += "<tspan x='" + (chart.ordinalScale(i) + chart.ordinalScale.rangeBand() / 2) + "' dy='.73em'>" + text + "</tspan>";
						});
						return htmlContent;
					} else  {
						return point.name;
					}
				})
				.attr('font-size', function(point, i, j) {
					var textLength = this.getComputedTextLength();
					var rangeBand = chart.ordinalScale.rangeBand();
					var size = (rangeBand / textLength) * defaultFontSize;
					return size + 'px';
				})
				.attr('fill', chart.colorManager.colors.highlight)
				.attr('y', function(point, i, j) {
					var textHeight = this.getBBox().height;
					return (chart.height() - textHeight) / 2;
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

module.exports = TextLayer;