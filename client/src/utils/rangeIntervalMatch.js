var React = require('react/addons');
var match = {};


match.customLength = function(params) {
	var timeframe = params.dateEnd - params.dateStart;
	switch(true) {
		case(timeframe<=43200):
			return '1m';
			break;
		case (43200<=timeframe<=86400):
			return '15m';
			break;
		case (86400<=timeframe<=259200):
			return '1h';
			break;
		case (259200<=timeframe<=604800):
			return '1h';
			break;
		case (604800<=timeframe<=1209600):
			return '6h';
		case (1209600<=timeframe<=2678400):
			return '12h';
			break;
		case (2678400<=timeframe<=16070400):
			return '24h';
			break;
		default:
			return '24h';
	}

}

match.customFilterInterval = function(value, currentInterval) {
	// console.log(value,currentInterval);
	// switch(currentInterval) { 
	// 	case '1m':
	// 		return (value != '24h' && value != '12h' && value != '6h');
	// 		break;
	// 	case '15m':
	// 		return (value != '24h' && value != '12h' && value != '6h');
	// 		break;
	// 	case '1h':
	// 		return  (value !='1m');
	// 		break;
	// 	case '6h':
	// 		return (value !='15m' && value != '1m');
	// 		break;
	// 	case '12h':
	// 		return (value !='1h' && value !='15m' && value!='1m');
	// 		break;
	// 	case '24h':
	// 		return (value!='12h' && value !='6h' && value !='1h' && value !='15m' && value!='1m');
	// 		break;
	// }
}

match.defaultInterval = function(currentRange,params) {
	switch(currentRange) {
		case '12h':
			return '1m';
			break;
		case '1d':
			return '15m';
			break;
		case '3d':
			return '1h';
			break;
		case '1w':
			return '1h';
			break;
		case '2w':
			return '6h';
			break;
		case '1m':
			return '12h';
			break;
		case '3m':
		case '6m':
		case '1y':
			return '24h';
			break;
		case 'Custom':
			return this.customLength(params);
			break;

		default:
			return '24h';
	}
}

match.filterInterval = function(value, currentRange, currentInterval) {
	switch(currentRange) {
		case '12h':
		case '1d':
			return (value != '24h' && value != '12h' && value != '6h');
			break;
		case '3d':
			return (value != '24h' && value != '12h' && value != '6h' && value !='1m');
			break;
		case '1w':
			return (value !='1m');
			break;
		case '2w':
			return (value !='15m' && value != '1m');
		case '1m':
			return (value !='1h' && value !='15m' && value!='1m');
			break;
		case '3m':
		case '6m':
			return (value !='6h' && value !='1h' && value !='15m' && value!='1m');
			break;
		case '1y':
			return (value!='12h' && value !='6h' && value !='1h' && value !='15m' && value!='1m');
			break;
		// case 'Custom': 
		// 	return this.customFilterInterval(value,currentInterval);
		// 	break;
		default:
			return (value!='12h' && value !='6h' && value !='1h' && value !='15m' && value!='1m');
	}

}

match.interval = function(interval, currentRange, currentInterval) {
	var self = this;
	var options = _.map(interval, function(value, key) {
		if(self.filterInterval(value, currentRange, currentInterval)) { 
			return <option value={value}>{value}</option>
		} else {
			return <option value={value} disabled>{value}</option>
		}
	});

	return options;
}

match.range = function(range, currentInterval) {
	var options = _.map(range, function(value, key) {
			return <option value={value}>{value}</option>
	});

	return options;
}

module.exports = match;