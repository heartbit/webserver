var path = require('path');
var webpack = require('webpack');

module.exports = {

	cache: true,

	context: __dirname,

	entry: {
		ChartEngine: ['ChartEngine'],
		test: ['test'],
	},

	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		publicPath: 'dist/',
		filename: '[name].js',
		chunkFilename: '[chunkhash].js',
		sourceMapFilename: '[file].map'
	},

	module: {
		loaders: [{
			test: /\.scss$/,
			loader: 'style!css!sass?sourceMap'
		}, {
			test: /\.svg$/,
			loader: 'raw'
		}]
	},

	resolve: {
		modulesDirectories: ['node_modules', 'bower_components'],
		alias: {

			// Style
			allStyle: path.join(__dirname, './style/all-source.scss'),

			// Bundles
			test: path.join(__dirname, './test/test'),
			ChartEngine: path.join(__dirname, './src/ChartEngine'),

			// Infography
			DoubleMarimekkoChart: path.join(__dirname, './src/infography/doubleMarimekkoChart'),
			PieBarEvol: path.join(__dirname, './src/infography/pieBarEvol'),
			PieBarMari: path.join(__dirname, './src/infography/pieBarMari'),

			// Charts
			AbstractChart: path.join(__dirname, './src/graph/chart/abstractChart'),
			BoilerplateChart: path.join(__dirname, './src/graph/chart/boilerplateChart'),
			BaseTimeLineChart: path.join(__dirname, './src/graph/chart/line/baseTimeLineChart'),
			MarimekkoChart: path.join(__dirname, './src/graph/chart/marimekko/marimekkoChart'),
			HorizontalBarChart: path.join(__dirname, './src/graph/chart/bar/horizontalBarChart'),
			VerticalBarChart: path.join(__dirname, './src/graph/chart/bar/verticalBarChart'),
			PieChart: path.join(__dirname, './src/graph/chart/pie/pieChart'),
			PeopleMobileChart: path.join(__dirname, './src/graph/chart/people/peopleMobileChart'),
			IconChart: path.join(__dirname, './src/graph/chart/icon/iconChart'),
			BigTextChart: path.join(__dirname, './src/graph/textbloc/bigtext/bigTextChart'),

			//Axis
			TimeAxisChart: path.join(__dirname, './src/graph/chart/axis/timeAxisChart'),
			OrdinalAxisChart: path.join(__dirname, './src/graph/chart/axis/ordinalAxisChart'),
			QuantitativeAxisChart: path.join(__dirname, './src/graph/chart/axis/quantitativeAxisChart'),
			OrdinalLegendChart: path.join(__dirname, './src/graph/chart/legend/ordinalLegendChart'),

			// Layers
			BoilerplateLayer: path.join(__dirname, './src/layer/boilerplateLayer'),
			BoilerplateMobileLayer: path.join(__dirname, './src/layer/boilerplateMobileLayer'),
			BaseLineLayer: path.join(__dirname, './src/layer/datavis/line/baseLineLayer'),
			BaseCircleLayer: path.join(__dirname, './src/layer/datavis/line/baseCircleLayer'),
			MarimekkoRectangleLayer: path.join(__dirname, './src/layer/datavis/marimekko/marimekkoRectangleLayer'),
			MarimekkoLabelLayer: path.join(__dirname, './src/layer/datavis/marimekko/marimekkoLabelLayer'),
			MarimekkoHighlightLayer: path.join(__dirname, './src/layer/datavis/marimekko/marimekkoHighlightLayer'),
			PieSectorsLayer: path.join(__dirname, './src/layer/datavis/pie/pieSectorsLayer'),
			PieLabelLayer: path.join(__dirname, './src/layer/datavis/pie/pieLabelLayer'),
			PieCenterLayer: path.join(__dirname, './src/layer/datavis/pie/pieCenterLayer'),
			BarRectangleLayer: path.join(__dirname, './src/layer/datavis/bar/barRectangleLayer'),
			BarLabelLayer: path.join(__dirname, './src/layer/datavis/bar/barLabelLayer'),
			PeopleMobileLayer: path.join(__dirname, './src/layer/datavis/icon/people/peopleMobileLayer'),
			ScreenLabelsLayer: path.join(__dirname, './src/layer/datavis/icon/screen/screenLabelsLayer'),
			ScreenShapeLayer: path.join(__dirname, './src/layer/datavis/icon/screen/screenShapeLayer'),
			BrowserShapeLayer: path.join(__dirname, './src/layer/datavis/icon/browser/browserShapeLayer'),
			OsShapeLayer: path.join(__dirname, './src/layer/datavis/icon/os/osShapeLayer'),
			BigTextChartLayer: path.join(__dirname, './src/layer/text/textLayer'),

			// Axis
			TimeAxisLayer: path.join(__dirname, './src/layer/axis/time/timeAxisLayer'),
			OrdinalLegendLabelLayer: path.join(__dirname, './src/layer/label/legend/ordinalLegendLabelLayer'),

			// SVG definitions
			PeopleMobileShapeDefinitions: path.join(__dirname, './src/graph/static/people/mobile-illus.svg'),
			ScreenShapeDefinitions: path.join(__dirname, './src/graph/static/screens/screen-defs.svg'),
			BrowsersShapeDefinitions: path.join(__dirname, './src/graph/static/browsers/browser-defs.svg'),
			OsShapeDefinitions: path.join(__dirname, './src/graph/static/os/os-defs.svg'),

			// Adapters
			AbstractAdapter: path.join(__dirname, './src/adapter/abstractAdapter'),
			BoilerplateAdapter: path.join(__dirname, './src/adapter/boilerplateAdapter'),
			TimeAxisAdapter: path.join(__dirname, './src/adapter/timeAxisAdapter'),
			MarimekkoAdapter: path.join(__dirname, './src/adapter/marimekkoAdapter'),
			PieBarEvolAdapter: path.join(__dirname, './src/adapter/pieBarEvolAdapter'),
			PieAdapter: path.join(__dirname, './src/adapter/pieAdapter'),
			BarAdapter: path.join(__dirname, './src/adapter/barAdapter'),
			PeopleMobileAdapter: path.join(__dirname, './src/adapter/peopleMobileAdapter'),
			TextAdapter: path.join(__dirname, './src/adapter/textAdapter'),
			ScreenAdapter: path.join(__dirname, './src/adapter/screenAdapter'),
			BrowserAdapter: path.join(__dirname, './src/adapter/browserAdapter'),
			OsAdapter: path.join(__dirname, './src/adapter/osAdapter'),

			// Formatters
			Formatter: path.join(__dirname, './src/formatter/Formatter'),
			TimeFormatter: path.join(__dirname, './src/formatter/TimeFormatter'),
			ValueFormatter: path.join(__dirname, './src/formatter/ValueFormatter'),

			// Models
			Point: path.join(__dirname, './src/model/point'),
			Line: path.join(__dirname, './src/model/line'),
			ModelSchemas: path.join(__dirname, './src/model/ModelSchemas'),
			DatasetFactory: path.join(__dirname, './src/model/DatasetFactory'),

			// Managers
			ColorManager: path.join(__dirname, './src/manager/colorManager'),

			// Exceptions
			Exceptions: path.join(__dirname, './src/exception/Exceptions'),

			// Internal libs
			d3extended: path.join(__dirname, './libs/local-libs/d3-extend/d3extend'),
			d3chart: path.join(__dirname, './libs/local-libs/d3chart/d3.chart'),
			d3tip: path.join(__dirname, './libs/local-libs/d3tip/d3tip'),
			fraction: path.join(__dirname, './libs/local-libs/fraction/fraction'),

			// External libs
			jquery: path.join(__dirname, './libs/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './libs/bower_components/lodash/dist/lodash.underscore'),
			d3: path.join(__dirname, './libs/bower_components/d3/d3'),
			modernizr: path.join(__dirname, './libs/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './libs/bower_components/js-schema/js-schema.debug'),
			faker: path.join(__dirname, './libs/bower_components/faker/dist/faker'),
			chance: path.join(__dirname, './libs/bower_components/chance/chance'),
			numeral: path.join(__dirname, './libs/bower_components/numeral/numeral')
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