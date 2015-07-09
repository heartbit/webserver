require('jsSchema');

var status = ['forcast', 'highlight', 'inprogress', 'default'];

var ChartSchema = schema({
	type: String,
	height: ['auto', Number],
	width: ['auto', Number],
	"?params": Object
});

var PointSchema = schema({
	id: String,
	name: String,
	value: Number,
	x: String,
	'?color': String,
	'?status': status,
	'?drilldownId': String
});

var LineSchema = schema({
	id: String,
	name: String,
	points: Array,
	'?status': status,
	'?drilldownId': String
});

var DatasetSchema = schema({
	lines: Array,
	'?drilldown': Array
});

exports.ChartSchema = ChartSchema;
exports.LineSchema = LineSchema;
exports.PointSchema = PointSchema;
exports.DatasetSchema = DatasetSchema;