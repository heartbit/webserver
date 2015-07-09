/**
 Computes lines based on the model's projections
 @class BrowserAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

BrowserAdapter.prototype = Object.create(AbstractAdapter.prototype);

function BrowserAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
BrowserAdapter.prototype.computeLines = function(dataset) {

	var points = dataset.lines[0].points;
	_.each(points, function(point) {
		switch (point.id) {
			case 'Firefox':
			case 'Mozilla':
			case 'Mozilla Compatible Agent':
				point.id = 'firefox';
				break;

			case 'Chrome':
				point.id = 'chrome';
				break;

			case 'Safari':
			case 'Safari (in-app)':
				point.id = 'safari';
				break;

			case 'Android Browser':
			case 'Android':
				point.id = 'android';
				break;

			case 'Internet Explorer':
				point.id = 'ie';
				break;

			case 'Opera Mini':
			case 'Opera':
				point.id = 'opera';
				break;
		}
	});

	return points;
};

module.exports = new BrowserAdapter();