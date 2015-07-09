/**
 Computes lines based on the model's projections
 @class AbstractAdapter
 @constructor
 @param model the chart model
 @module ChartEngine
 @abstract
 */

function AbstractAdapter() {};

/**
     Compute the lines from the chart model
     @method computeLines
    */
AbstractAdapter.prototype.computeLines = function(data) {
	console.log('AbstractAdapter compute lines');
	return data;
};

/**
     Attribute colors 
     @method attributeColors
    */
AbstractAdapter.prototype.attributeColors = function(aDataset) {
	// if highlight
	// else attribute one color by node id
};

module.exports = AbstractAdapter;