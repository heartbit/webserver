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
			test: /\.svg$/,
			loader: 'raw'
		}]
	},

	resolve: {
		modulesDirectories: ['node_modules', 'lib/bower_components'],
		alias: {

			// Bundles
			app: path.join(__dirname, './src/bundle/app'),
			home: path.join(__dirname, './src/bundle/home'),

			// Style
			allStyle: path.join(__dirname, './style/all-source.scss'),
			app: path.join(__dirname, './style/bundle/app.scss'),
			home: path.join(__dirname, './style/bundle/home.scss'),

			// External libs
			jquery: path.join(__dirname, './lib/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './lib/bower_components/lodash/dist/lodash.underscore'),
			d3: path.join(__dirname, './lib/bower_components/d3/d3'),
			modernizr: path.join(__dirname, './lib/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './lib/bower_components/js-schema/js-schema.debug'),
			faker: path.join(__dirname, './lib/bower_components/faker/dist/faker'),
			chance: path.join(__dirname, './lib/bower_components/chance/chance'),
			numeral: path.join(__dirname, './lib/bower_components/numeral/numeral')
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