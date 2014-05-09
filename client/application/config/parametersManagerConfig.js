define('parametersManagerConfig', function() {

	var parametersManagerConfig = {};

	parametersManagerConfig.defaultparams = {
		platform: 'BITSTAMP',
		item: 'BTC',
		currency: 'USD'
	};

	parametersManagerConfig.defaultplatforms = {
		BTCE: {
			item: 'BTC',
			currency: 'USD'
		},
		KRAKEN: {
			item: 'BTC',
			currency: 'USD'
		},
		BITSTAMP: {
			item: 'BTC',
			currency: 'USD'
		},
		BTCCHINA: {
			item: 'BTC',
			currency: 'CNY'
		},
		CRYPTSY: {
			item: 'DOGE',
			currency: 'BTC'
		},
		HUOBI: {
			item: 'BTC',
			currency: 'CNY'
		},
		OKCOIN: {
			item: 'BTC',
			currency: 'CNY'
		},
		BITCOINCENTRAL: {
			item: 'BTC',
			currency: 'EUR'
		},
		BITFINEX: {
			item: 'BTC',
			currency: 'USD'
		}
	};

	parametersManagerConfig.defaultitems = {
		BTC: {
			platform: "BITSTAMP",
			currency: "USD"
		},
		LTC: {
			platform: "BTCE",
			currency: "USD"
		},
		DOGE: {
			platform: "CRYPTSY",
			currency: "BTC"
		},
		NMC : {
			platform: "BTCE",
			currency: "USD"
		},
		NVC: {
			platform: "BTCE",
			currency: "USD"
		},
		TRC: {
			platform: "BTCE",
			currency: "BTC"
		},
		PPC: {
			platform: "BTCE",
			currency: "USD"
		},
		FTC: {
			platform: "BTCE",
			currency: "BTC"
		},
		XPM: {
			platform: "BTCE",
			currency: "BTC"
		},
		XRP: {
			platform: "KRAKEN",
			currency: "USD"
		}
	};

	return parametersManagerConfig;

});