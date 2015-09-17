var intervalTranslate = function(interval,params) {
	var result = {};
	switch(interval) {
		case '1m':
			result.interval = 60;
			break;

		case '15m':
			result.interval = 900;
			break;

		case '1h':
			result.interval = 3600;
			break;

		case '6h':
			result.interval = 21600;
			break;
		
		case '12h':
			result.interval = 43200;
			break;

		case '24h':
			result.interval = 86400;
			break;
	}

	return result;
};

module.exports = intervalTranslate;