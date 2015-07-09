/**
Provides boilerplate template for large and medium layer
@module ChartEngine
@submodule Layer
@class BoilerplateLayer
*/

var BoilerplateLayer = {

	modes: ["large", "medium"],

	dataBind: function(data) {
		return this.selectAll("rect").data(data);
	},

	insert: function() {
		return this.append("rect").classed('boilerplateLayerElement', true);
	},

	events: {
		merge: function() {
			var chart = this.chart();
			if (chart.mode() === "medium") {
				this.attr("width", 10)
					.attr("height", 10);
			} else if (chart.mode() === "large") {
				this.attr("width", 50)
					.attr("height", 50);
			}
			this.attr("y", chart.height() / 2)
				.attr("x", function(d) {
					return chart.xScale(d);
				});
			return this;
		}
	}
};

module.exports = BoilerplateLayer;