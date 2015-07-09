/**
 Computes lines based on the model's projections
 @class BarAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */
require('d3');

var AbstractAdapter = require('AbstractAdapter');

BarAdapter.prototype = Object.create(AbstractAdapter.prototype);

function BarAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
BarAdapter.prototype.computeLines = function(dataset) {
	var line = dataset.lines[0];
	line.points = line.points.reverse();
	// // Reorder lines
	// line.points = _.sortBy(line.points, function(point) {
	// 	return point.value;
	// });
	return line;
};

module.exports = new BarAdapter();