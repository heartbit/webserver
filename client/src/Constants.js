var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
		ASK_CANDLE: null,
		ASK_VOLUME: null,
		ASK_PLATFORM: null,
		REGISTER_SELECTOR: null,
		FILL_MAINGRAPH: null,
		RECEIVE_TICKER: null
	}),

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null
	})

};