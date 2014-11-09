var path = require('path');
var webpack = require('webpack');

module.exports = {

	cache: true,
	context: __dirname,

	entry: {
		app: ['app'],
		home: ['home'],
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
			test: /\.jsx$/,
			loader: 'jsx?harmony'
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
		modulesDirectories: ['node_modules', 'lib/bower_components'],
		alias: {

			// Bundles
			app: path.join(__dirname, './src/bundle/app.jsx'),
			home: path.join(__dirname, './src/bundle/home'),
			login: path.join(__dirname, './src/bundle/login'),

			// Components
			Topbar: path.join(__dirname, './src/components/topbar.jsx'),
			Bottombar: path.join(__dirname, './src/components/bottombar.jsx'),
			Dashboard: path.join(__dirname, './src/components/dashboard.jsx'),
			Sidemenu: path.join(__dirname, './src/components/sidemenu.jsx'),

			// Internal libs
			gridster: path.join(__dirname, './lib/internal-libs/jquery.gridster/gridster'),
			gridsterResponsive: path.join(__dirname, './lib/internal-libs/gridster-responsive/gridster.responsive'),
			ChartEngine: path.join(__dirname, './lib/internal-libs/chartEngine/ChartEngine'),
			
			// External libs
			backbone: path.join(__dirname, './lib/bower_components/backbone/backbone'),
			bootstrap: path.join(__dirname, './lib/bower_components/bootstrap/dist/js/bootstrap'),
			jquery: path.join(__dirname, './lib/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './lib/bower_components/lodash/dist/lodash.underscore'),
			modernizr: path.join(__dirname, './lib/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './lib/bower_components/js-schema/js-schema.debug'),
			chance: path.join(__dirname, './lib/bower_components/chance/chance'),
			numeral: path.join(__dirname, './lib/bower_components/numeral/numeral'),
			moment: path.join(__dirname, './lib/bower_components/momentjs/moment'),

			// Home page
			classie:path.join(__dirname, './lib/internal-libs/home/classie'),
			cbpAnimatedHeader: path.join(__dirname, './lib/internal-libs/home/cbpAnimatedHeader'),
			jqueryEasing: path.join(__dirname, './lib/internal-libs/home/jquery.easing'),


			// Style
			// allStyle: path.join(__dirname, './style/all-source.scss'),
			// appStyle: path.join(__dirname, './style/bundle/app.scss'),
			// home: path.join(__dirname, './style/bundle/home.scss'),
			// booststrapStyle: path.join(__dirname, './lib/bower_components/bootstrap/dist/css/bootstrap.css'),
			// booststrapStyleTheme: path.join(__dirname, './lib/bower_components/bootstrap/dist/css/bootstrap-theme.css'),
		}
	},

	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			_: 'lodash',
		})
	]
};