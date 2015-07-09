require('jsSchema');

var LineSchema = schema({
	id: String,
	name: String,
	points: Array,
	'?status': ['forcast', 'highlight', 'inprogress', 'default'],
	'?drilldown': String
});

module.exports = LineSchema;