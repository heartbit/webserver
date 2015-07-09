/**
 Computes lines based on the model's projections
 @class PeopleMobileAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');
var Line = require('Line');
var Point = require('Point');
var FractionFactory = require('fraction');

PeopleMobileAdapter.prototype = Object.create(AbstractAdapter.prototype);

function PeopleMobileAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
*/

PeopleMobileAdapter.prototype.computeLines = function(dataset) {

	var total = 0;
	var mobileTotal = 0;
	_.each(dataset.lines[0].points, function(point) {
		total += point.value;
		switch (point.id) {
			case 'mobile':
			case 'tablet':
				mobileTotal += point.value;
				break;
		}
	});

	var ratio = mobileTotal / total;
	var fraction = FractionFactory.getUsualFraction(ratio);

	var points = [];
	_.each(_.range(fraction.numerator), function() {
		var point = new Point('mobile', 'Mobile users', 'mobile');
		points.push(point);
	});
	_.each(_.range(fraction.denominator - fraction.numerator), function() {
		var point = new Point('non-mobile', 'Non mobile users', 'other');
		points.push(point);
	});

	// points = _.shuffle(points);
	return points;
};

module.exports = new PeopleMobileAdapter();