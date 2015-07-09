/**
 Computes lines based on the model's projections
 @class ScreenAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

ScreenAdapter.prototype = Object.create(AbstractAdapter.prototype);

function ScreenAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
ScreenAdapter.prototype.computeLines = function(dataset) {
	// _.each(dataset.lines[0].points, function(point) { });
	// var points = _.shuffle(line.points);
	return dataset.lines[0].points;
};

module.exports = new ScreenAdapter();