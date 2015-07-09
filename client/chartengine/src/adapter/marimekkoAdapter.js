/**
 Computes lines based on the model's projections
 @class MarimekkoAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

MarimekkoAdapter.prototype = Object.create(AbstractAdapter.prototype);

function MarimekkoAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
MarimekkoAdapter.prototype.computeLines = function(data) {

	data.total = 0;
	var xoffset = 0;

	// Calculate sub sum per line
	_.each(data.lines, function(line) {
		line.sum = 0;
		_.each(line.points, function(point) {
			data.total += point.value;
			line.sum += point.value;
			point.parent = line;
			point.uniqueId = _.uniqueId();
		});
	});

	// Reorder lines
	data.lines = _.sortBy(data.lines, function(line) {
		if (line.points.length == 1 && line.points[0].status == 'other') {
			return 0;
		} else {
			return -line.sum;
		}
	});

	// Calculate offset line
	_.each(data.lines, function(line) {
		line.offset = xoffset;
		line.total = data.total;
		xoffset += line.sum;

		// Reorder points
		line.points = _.sortBy(line.points, function(point) {
			if (point.status && point.status == 'other') {
				return 0;
			} else {
				return point.value;
			}
		});

		// Calculate offset point
		var yoffset = 0;
		_.each(line.points, function(point) {
			point.offset = yoffset;
			yoffset += point.value;
		});
	});

	_.each(data.lines, function(line) {
		line.points = line.points.reverse();
	});

	return data;

};

module.exports = new MarimekkoAdapter();