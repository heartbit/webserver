var numeral = require('numeral');

// numeral.zeroFormat('N/A');
// numeral.language('qunb', {
// 	delimiters: {
// 		thousands: ',',
// 		decimal: '.'
// 	},
// 	abbreviations: {
// 		thousand: 'k',
// 		million: 'm',
// 		billion: 'b',
// 		trillion: 't'
// 	}
// });
// numeral.language('qunb');

var formatMiniValue = function(value) {
	var result = "0";
	var exposant = 0;
	var i = 1
	if (value && typeof value !== 'undefined' && value !== 0) {
		while (value < 1) {
			value = value * 10;
			exposant = exposant + 1;
		}
		value = "" + value;
		value = value.substring(0, 3);
		result = value + "e-" + exposant;
	}
	return result;
};

var ValueFormatter = function() {};

ValueFormatter.prototype.formatShort = function(value) {
	var formatted = value;
	var absValue = Math.abs(value);
	if (absValue > 1000000000) {
		formatted = numeral(value).format("0.[0]a");
	} else if (absValue <= 1000000000 && absValue >= 1000) {
		formatted = numeral(value).format("0.[0]a");
	} else if (absValue <= 999 && value >= 100) {
		formatted = numeral(value).format("0");
	} else if (absValue <= 100 && absValue >= 10) {
		formatted = numeral(value).format("0");
	} else if (absValue <= 10 && absValue >= 1) {
		formatted = numeral(value).format("0.[0]");
	} else if (absValue < 1 && absValue >= 0.00001) {
		formatted = numeral(value).format("0.[00]");
	} else if (absValue < 0.00001 && absValue > 0) {
		formatted = formatMiniValue(value); //numeral(value).format("0.[00000]");
	} else if (absValue == 0) {
		formatted = "";
	}
	return String(formatted);
};

ValueFormatter.prototype.formatPercent = function(value) {
	if (value == 0) {
		return '0';
	} else {
		return value != 100 ? '' : '100 %'
	}
};

module.exports = new ValueFormatter();
