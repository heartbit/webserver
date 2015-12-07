var path = require('path');
var webpack = require('webpack');

module.exports = {

	cache: true,
	context: __dirname,

	entry: {
		app: ['appBundle'],
		home: ['homeBundle'],
		login: ['loginBundle'],
		register: ['registerBundle']
	},

	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist/js/'),
		publicPath: 'dist/js/',
		filename: '[name].js',
		chunkFilename: '[chunkhash].js',
		sourceMapFilename: '[file].map'
	},

	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.css$/,
			loaders: ['style', 'css']
		}, {
			test: /\.svg$/,
			loader: 'raw'
		}, {
			test: /\.js$/,
			loader: "jsx-loader?insertPragma=React.DOM&harmony"
		}, {
			test: /\.jsx$/,
			loader: "jsx-loader?insertPragma=React.DOM&harmony"
		}, {
			test: /\.png$/,
			loader: "url-loader?limit=100000&mimetype=image/png"
		}, {
			test: /\.jpg$/,
			loader: "file-loader"
		}, {
			test: /\.woff$/,
			loader: "url-loader?limit=10000&minetype=application/font-woff"
		}, {
			test: /\.ttf$/,
			loader: "file-loader"
		}, {
			test: /\.eot$/,
			loader: "file-loader"
		}, ]
	},

	resolve: {
		modulesDirectories: ['node_modules', 'lib/bower_components', 'lib/internal-libs'],
		alias: {

			// Bundles
			appBundle: path.join(__dirname, './src/bundle/app'),
			homeBundle: path.join(__dirname, './src/bundle/home'),
			loginBundle: path.join(__dirname, './src/bundle/login'),
			registerBundle: path.join(__dirname, './src/bundle/register'),

			//Config
			Config: path.join(__dirname, './src/config/Config'),
			DashboardConfig: path.join(__dirname, './src/components/dashboard/dashboardConfig'),

			// Components
			App: path.join(__dirname, './src/components/app/app'),
			Topbar: path.join(__dirname, './src/components/topbar/topbar'),
			Footer: path.join(__dirname, './src/components/footer/footer'),
			SideMenu: path.join(__dirname, './src/components/sidemenu/sidemenu'),
			// SearchComponent: path.join(__dirname, './src/components/search/searchComponent'),

			// Widgets
			MainChartWidget: path.join(__dirname, './src/components/widgets/MainChartWidget'),
			MainChartReact: path.join(__dirname, './src/components/charts/mainChart/MainChartReact'),
			TickerWidget: path.join(__dirname, './src/components/widgets/TickerWidget'),
			OrderbookChartWidget: path.join(__dirname, './src/components/OrderbookChartWidget'),
			OrderbookListWidget: path.join(__dirname, './src/components/OrderbookListWidget'),
			ActiveAccountsWidget: path.join(__dirname, './src/components/ActiveAccountsWidget'),
			BaseWidget: path.join(__dirname, './src/components/widgets/BaseWidget'),
			Dashboard: path.join(__dirname, './src/components/dashboard/Dashboard'),
			AuthComponent: path.join(__dirname, './src/components/auth/authComponent'),
			RegisterComponent: path.join(__dirname, './src/components/auth/registerComponent'),
			Settings: path.join(__dirname, './src/components/settings/settingsComponent'),

			// Stores
			AbstractStore: path.join(__dirname, './src/stores/AbstractStore'),
			CandleStore: path.join(__dirname, './src/stores/CandleStore'),
			VolumeStore: path.join(__dirname, './src/stores/VolumeStore'),
			MaingraphStore: path.join(__dirname, './src/stores/MaingraphStore'),
			TickerStore: path.join(__dirname, './src/stores/TickerStore'),
			SelectorStore: path.join(__dirname, './src/stores/SelectorStore'),
			PlatformStore: path.join(__dirname, './src/stores/PlatformsStore'),
			MovingAverageStore: path.join(__dirname, './src/stores/MovingAverageStore'),
			OrderbookStore:  path.join(__dirname, './src/stores/OrderbookStore'),
			MarketTraderStore: path.join(__dirname, './src/stores/MarketTraderStore'),

			// Mixin
			StoreMixin: path.join(__dirname, './src/stores/mixin/storeMixin'),

			// Routers
			AppRouter: path.join(__dirname, './src/router/appRouter'),

			// Dispatcher
			Dispatcher: path.join(__dirname, './src/dispatcher/dispatcher'),

			//Helpers & utils
			FormatUtils: path.join(__dirname, './lib/internal-libs/FormatUtils/FormatUtils'),
			RangeTranslate: path.join(__dirname, './src/helpers/selectorWidget/rangeTranslate'),
			IntervalTranslate: path.join(__dirname, './src/helpers/selectorWidget/intervalTranslate'),
			RangeIntervalMatch: path.join(__dirname, './src/helpers/selectorWidget/rangeIntervalMatch'),
			PairsPlatformsMatch: path.join(__dirname, './src/helpers/selectorWidget/pairsPlatformsMatch'),
			OrderbookParser: path.join(__dirname, './src/helpers/webSocket/orderbookParser'),
			OrderbookRequest: path.join(__dirname, './src/helpers/webSocket/orderbookRequest'),

			//Websocket
			OrderbookSocket: path.join(__dirname, './src/websocket/OrderbookSocket'),

			//Models & collections
			Volume: path.join(__dirname, './src/models/Volume'),
			Candle: path.join(__dirname, './src/models/Candle'),
			Ticker: path.join(__dirname, './src/models/Ticker'),
			Platform: path.join(__dirname, './src/models/Platform'),
			Market_Trader:  path.join(__dirname, './src/models/Market_Trader'),
			// Orderbook: path.join(__dirname, './src/models/Orderbook'),

			Candles: path.join(__dirname, './src/collections/Candles'),
			Volumes: path.join(__dirname, './src/collections/Volumes'),
			Platforms: path.join(__dirname, './src/collections/Platforms'),
			Market_Traders:  path.join(__dirname, './src/collections/Market_Traders'),

			Constants: path.join(__dirname, './src/Constants'),

			//Actions
			DashboardActions: path.join(__dirname, './src/actions/DashboardActions'),
			TickerActions: path.join(__dirname, './src/actions/TickerActions'),
			SelectorActions: path.join(__dirname, './src/actions/SelectorActions'),
			WebsocketActions: path.join(__dirname, './src/actions/WebsocketActions'),
			DataapiActions: path.join(__dirname, './src/actions/DataapiActions'),

			// Internal libs
			gridster: path.join(__dirname, './lib/internal-libs/jquery.gridster/gridster'),
			gridstack: path.join(__dirname, './lib/internal-libs/jquery.gridstack/gridstack'),
			gridsterResponsive: path.join(__dirname, './lib/internal-libs/gridster-responsive/gridster.responsive'),
			ChartEngine: path.join(__dirname, './lib/internal-libs/chartEngine/ChartEngine'),

			//charts
			DataSocketManager: path.join(__dirname, './src/managers/SocketManager'),
			WebSocketManager: path.join(__dirname, './src/managers/WebSocketManager'),
			MainChartD3: path.join(__dirname, './src/components/charts/mainChart/MainChartD3'),
			OrderbookChartD3: path.join(__dirname, './src/components/charts/orderbookChart/OrderbookChartD3'),
			AreaLayer: path.join(__dirname, './src/components/charts/mainChart/areaLayer'),
			SimpleLineLayer: path.join(__dirname, './src/components/charts/mainChart/simplelineLayer'),
			LineLayer: path.join(__dirname, './src/components/charts/mainChart/lineLayer'),
			VolumeLayer: path.join(__dirname, './src/components/charts/mainChart/volumeLayer'),

			//charts conf
			ChartsConf: path.join(__dirname, './src/components/charts/chartConf'),

			// External libs
			backbone: path.join(__dirname, './lib/bower_components/backbone/backbone'),
			d3: path.join(__dirname, './lib/internal-libs/d3/d3.min'),
			bootstrap: path.join(__dirname, './lib/bower_components/bootstrap/dist/js/bootstrap'),
			jquery: path.join(__dirname, './lib/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './lib/bower_components/lodash/dist/lodash.underscore'),
			modernizr: path.join(__dirname, './lib/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './lib/bower_components/js-schema/js-schema.debug'),
			chance: path.join(__dirname, './lib/bower_components/chance/chance'),
			numeral: path.join(__dirname, './lib/bower_components/numeral/numeral'),
			moment: path.join(__dirname, './lib/bower_components/momentjs/moment'),
			ripplelib: path.join(__dirname, './lib/internal-libs/ripple/ripple'),
			localstorage: path.join(__dirname, './lib/bower_components/store.js/store+json2.min'),
			socketio: path.join(__dirname, './lib/internal-libs/socket.io/socket.io-1.3.5.min.js'),
			// Home page libs
			classie: path.join(__dirname, './lib/internal-libs/home/classie'),
			cbpAnimatedHeader: path.join(__dirname, './lib/internal-libs/home/cbpAnimatedHeader'),
			jqueryEasing: path.join(__dirname, './lib/internal-libs/home/jquery.easing'),

			// Data
			fakevolumes: path.join(__dirname, './data/fakevolumes'),
			fakecandles: path.join(__dirname, './data/fakecandles')
		}
	},

	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			_: 'lodash',
			Backbone: 'backbone'

		})

	]
};