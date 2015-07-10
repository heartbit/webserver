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
config.platforms.url =apiprefix+"platform";
module.exports = config;