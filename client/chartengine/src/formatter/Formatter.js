/**
@module ChartEngine
@submodule Formatter
@class Formatter
*/

var ValueFormatter = require('ValueFormatter');
var TimeFormatter = require('TimeFormatter');

var Formatter = function() {};

Formatter.prototype.format = function(value, formatter) {
	var formattedValue = value;
	switch (formatter) {
		case 'ValueFormatter':
			formattedValue = value;
			break;
		case 'ShortValueFormatter':
			formattedValue = ValueFormatter.formatShort(value);
			break;
		case 'PercentFormatter':
			formattedValue = ValueFormatter.formatPercent(value);
			break;
		case 'ShortMonthFormatter':
			formattedValue = TimeFormatter.formatMonthShort(value);
			break;
		case 'MediumMonthFormatter':
			formattedValue = TimeFormatter.formatMonthMedium(value);
			break;
		case 'MonthFormatter':
			formattedValue = TimeFormatter.formatMonth(value);
			break;
	}
	return formattedValue;
};

module.exports = new Formatter();