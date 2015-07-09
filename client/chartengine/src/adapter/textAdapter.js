/**
 Computes lines based on the model's projections
 @class TextAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

TextAdapter.prototype = Object.create(AbstractAdapter.prototype);

function TextAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
TextAdapter.prototype.computeLines = function(dataset) {
	return dataset.lines[0].points;
};

module.exports = new TextAdapter();