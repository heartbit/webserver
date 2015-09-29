var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
		ASK_CANDLE: null,
		ASK_VOLUME: null,
		ASK_PLATFORM: null,
		ASK_ORDERBOOK: null,
		UPDATE_ORDERBOOK: null,
		ASK_MA: null,
		ASK_MARKETTRADERS: null,
		REGISTER_SELECTOR: null,
		FILL_MAINGRAPH: null,
		UPDATE_MAINGRAPHPARAMS: null,
		RECEIVE_TICKER: null
	}),

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null
	})

};