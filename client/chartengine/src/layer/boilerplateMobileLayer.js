/**
Provides boilerplate template for small layer
@module ChartEngine
@submodule Layer
@class BoilerplateMobileLayer
*/

var BoilerplateMobileLayer = {

	modes: ["small"],

	dataBind: function(data) {
		return this.selectAll("text")
			.data([data.length]);
	},

	insert: function() {
		return this.append("text")
			.style("fill", "blue")
			.attr("y", "10%")
			.attr("x", 10);
	},

	events: {
		merge: function() {
			return this.text(function(d) {
				return "There are " + d + " boxes painted on the screen";
			});
		}
	}

};

module.exports = BoilerplateMobileLayer;