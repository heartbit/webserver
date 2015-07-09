require('jsSchema');

var PointSchema = schema({
	id: String,
	name: String,
	value: Number,
	x: String,
	'?color': String,
	'?status': ['forcast', 'highlight', 'inprogress', 'default'],
	'?drilldown': String
});

module.exports = PointSchema;