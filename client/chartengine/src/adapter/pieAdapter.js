/**
 Computes lines based on the model's projections
 @class PieAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

PieAdapter.prototype = Object.create(AbstractAdapter.prototype);

function PieAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
PieAdapter.prototype.computeLines = function(dataset) {

	var line = dataset.lines[0];
	line.total = d3.sum(line.points, function(point) {
		return point.value;
	});

	line.points = _.sortBy(line.points, function(point) {
		if (point.status && point.status == 'other') {
			return 0;
		} else {
			return -point.value;
		}
	});

	return line;
};

module.exports = new PieAdapter();