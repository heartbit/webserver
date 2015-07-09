/**
 Computes lines based on the model's projections
 @class PieBarEvolAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');
var Line = require('Line');
var Point = require('Point');

PieBarEvolAdapter.prototype = Object.create(AbstractAdapter.prototype);

function PieBarEvolAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
PieBarEvolAdapter.prototype.computeLines = function(data) {

	// var current = data.lines[0];
	// var previous = data.lines[1];

	// var barevolLine = new Line('evol', 'Evolution');

	// // Compute totals
	// var totalCurrent = 0;
	// var totalPrevious = 0;
	// _.each(current.points, function(point) {
	// 	totalCurrent += point.value;
	// });
	// _.each(previous.points, function(point) {
	// 	totalPrevious += point.value;
	// });

	// // Compute evol in points
	// _.each(current.points, function(point) {
	// 	var id = point.id;
	// 	// Compute current slice
	// 	var currentSlice = point.value / totalCurrent;
	// 	var oldSlice = 0;

	// 	_.each(previous.points, function(previousPoint) {
	// 		// Compute previous slice if exists in previous line
	// 		if (previousPoint.id == id) {
	// 			oldSlice = previousPoint.value / totalPrevious;
	// 		}
	// 	});

	// 	var evolutionInPoints = -(currentSlice - oldSlice) * 100;
	// 	barevolLine.points.push(new Point(id, point.name, evolutionInPoints, point.x, point.color));
	// });

	// var alreadyComputedPointsIds = _.pluck(barevolLine.points, function(point) {
	// 	return point.id;
	// });

	// var computedLines = {
	// 	pie: current,
	// 	barevol: barevolLine
	// };

	return data;
};

module.exports = new PieBarEvolAdapter();