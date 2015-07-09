/**
 Computes lines based on the model's projections
 @class OsAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

OsAdapter.prototype = Object.create(AbstractAdapter.prototype);

function OsAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
OsAdapter.prototype.computeLines = function(dataset) {
	var points = dataset.lines[0].points;
	_.each(points, function(point) {
		switch (point.id) {
			case 'Macintosh':
			case 'iOS':
				point.id = 'macintosh';
				break;

			case 'Android':
			case 'Linux':
			case 'Samsung':
				point.id = 'linux';
				break;

			case 'Windows':
				point.id = 'windows';
				break;
		}
	});
	return points;
};

module.exports = new OsAdapter();