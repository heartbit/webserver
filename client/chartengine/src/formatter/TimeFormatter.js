require('d3');

var monthNameFormat = d3.time.format('%B');
var monthNameMediumFormat = d3.time.format('%b');
var monthNameSmallFormat = d3.time.format('%m');

var TimeFormatter = function() {};

TimeFormatter.formatMonth = function(date) {
	// console.log('format long');
	return monthNameFormat(date);
};

TimeFormatter.formatMonthMedium = function(date) {
	return monthNameMediumFormat(date);
};

TimeFormatter.formatMonthShort = function(date) {
	// console.log('format short');
	return monthNameSmallFormat(date);
};

module.exports = new TimeFormatter();