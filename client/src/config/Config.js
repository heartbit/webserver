var apiprefix = "api/";
var apiHost = "http://localhost:9090/api/";

var config = {};
config.candles = {};
config.candles.url =apiprefix+"candle";
config.volumes = {};
config.volumes.url =apiprefix+"volume";
config.keyfact = {};
config.keyfact.url = "keyfact";
config.platforms = {};
config.platforms.url = apiprefix+"platform";


config.platforms.defaultplatforms = {
	'XRP/USD':'BITSTAMP',
	'XRP/JPY':'TOKYOJPY',
	'BTC/USD':'BITFINEX',
	'XRP/CNY':'RIPPLEFOX'
}

config.platforms.defaultpairs = {
	'BITSTAMP':'XRP/USD',
	'TOKYOJPY':'XRP/JPY',
	'BITFINEX':'BTC/USD',
	'RIPPLEFOX':'XRP/CNY',
	'SNAPSWAP':'XRP/USD'
}

config.platforms.address = {
	'BITSTAMP': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
	'SNAPSWAP': 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',
	'RIPPLEFOX': 'rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y',
	'TOKYOJPY': 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN'
}

config.websocketurl = {
	ripple:"wss://s-east.ripple.com:443"
}



module.exports = config;