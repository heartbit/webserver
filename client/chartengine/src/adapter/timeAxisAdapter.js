var AbstractAdapter = require('AbstractAdapter');

TimeAxisAdapter.prototype = Object.create(TimeAxisAdapter.prototype);

function TimeAxisAdapter(model) {
	AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
TimeAxisAdapter.prototype.computeLines = function(data) {
	// var lines = AbstractAdapter.prototype.computeLines.apply(this, data)
	return this.enrichLines(data);
};

TimeAxisAdapter.prototype.enrichLines = function(line) {
	var dateLine = [];
	_.each(line, function(el) {
		dateLine.push(_.isDate(el) ? el : new Date(Date.parse(el)));
	});
	return dateLine;
};

module.exports = TimeAxisAdapter;