var rangeTranslate = function(range,params) {
	var result = {
		dateEnd: Math.floor(new Date().getTime()/1000),
		dateStart: null,
		range: null
	};
	switch(range) {
		case '12h':
			result.dateStart = result.dateEnd - 43200;
			result.range = '12h';
			break;

		case '1d':
			result.dateStart = result.dateEnd - 86400;
			result.range = '1d';
			break;

		case '3d':
			result.dateStart = result.dateEnd - 259200;
			result.range = '3d';
			break;

		case '1w':
			result.dateStart = result.dateEnd - 604800;
			result.range = '1w';
			break;
		
		case '2w':
			result.dateStart = result.dateEnd - 1209600;
			result.range = '2w';
			break;

		case '1m':
			result.dateStart = result.dateEnd - 2678400;
			result.range = '1m';
			break;

		case '3m':
			result.dateStart = result.dateEnd - 8035200;
			result.range = '3m';
			break;

		case '6m':
			result.dateStart = result.dateEnd - 16070400;
			result.range = '6m';
			break;

		case '1y':
			result.dateStart = result.dateEnd - 32140800;
			result.range = '1y';
			break;

		case 'Max':
			result.dateStart = 1293840000;
			result.range = 'Max';
			break;
	
		case 'Custom':
			result.dateStart = params.dateStart;
			result.dateEnd = params.dateEnd;
			result.range = "Custom";
			break;
	}

	return result;
};

module.exports = rangeTranslate;