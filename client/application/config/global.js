define('config', function() {

	var apiprefix = "/api/";

	var config = {};

	config.defaultparams = {};
	config.defaultparams.platform = "BITSTAMP";
	config.defaultparams.item = "BTC";
	config.defaultparams.currency = "USD";

	config.platform = {};
	config.platform.url = apiprefix + "documentation/platform";
	config.platform.urlCollection = apiprefix + "documentation/platform";

	config.item = {};
	config.item.url = apiprefix + "documentation/item";
	config.item.urlCollection = apiprefix + "documentation/item";

	config.defaultplatforms = [{
		"id": "BTCE",
		"label": "btce",
		"url": "https://www.bitstamp.net/",
		"logo": "https://www.bitstamp.net/s/icons/favicon.ico",
		"pairs": [{
			"item": {
				"id": "BTC",
				"label": "Bitcoin",
				"symbol": "Ƀ"
			},
			"currency": {
				"id": "USD",
				"label": "American dollars",
				"symbol": "$"
			}
		}]
	}];

	config.depth = "/data/depth.json";
	config.ticker = {};
	config.ticker.url = apiprefix + "ticker/";

	config.marketcap = {};
	config.marketcap.urlModel = apiprefix + "marketcap?";

	config.maingraph = {};
	config.maingraph.urlCollection = apiprefix + "maingraph";
	config.maingraph.timeperiods = [{
		id: 'last3hours',
		label: '3H',
		duration: '3',
		typeDuration: 'HOUR'
	}, {
		id: 'last6hours',
		label: '6H',
		duration: '6',
		typeDuration: 'HOUR'
	}, {
		id: 'last12hours',
		label: '12H',
		duration: '12',
		typeDuration: 'HOUR'
	}, {
		id: 'last24hours',
		label: '24h',
		duration: '1',
		typeDuration: 'DAY'
	}, {
		id: 'last3days',
		label: '3d',
		duration: '3',
		typeDuration: 'DAY'
	}, {
		id: 'last7days',
		label: '7d',
		duration: '7',
		typeDuration: 'DAY'
	}, {
		id: 'last1month',
		label: '1m',
		duration: '1',
		typeDuration: 'MONTH'
	}, {
		id: 'last3months',
		label: '3m',
		duration: '3',
		typeDuration: 'MONTH'
	}, {
		id: 'last6months',
		label: '6m',
		duration: '6',
		typeDuration: 'MONTH'
	}, {
		id: 'last1year',
		label: '1Y',
		duration: '1',
		typeDuration: 'YEAR'
	}, {
		id: 'all',
		label: 'all',
		duration: '1',
		typeDuration: 'ALL'
	}];
	config.maingraph.defaultTimeperiodId = "last24hours";

	config.keyfactsview = {};
	config.keyfactsview.defaultAttributes = [{
		id: 'price',
		label: 'Last',
		type: 'price'
	}, {
		id: 'wavg',
		label: 'Weighted avg',
		type: 'price'
	}, {
		id: 'high',
		label: 'High',
		type: 'price'
	}, {
		id: 'low',
		label: 'Low',
		type: 'price'
	}, {
		id: 'daily',
		label: 'Daily change',
		type: 'percent'
	}, {
		id: 'vol',
		label: '24h volume',
		type: 'volume'
	}];

	return config;

});