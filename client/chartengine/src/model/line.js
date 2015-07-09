var LineSchema = require('ModelSchemas').LineSchema;

var Line = function(id, name, points) {
	this.id = id || '';
	this.name = name || '';
	this.points = points || [];
};

Line.prototype.validate = function() {
	var errors = LineSchema.errors(this);
	if (errors) {
		console.error(errors);
		return false;
	} else {
		return true;
	}
};

module.exports = Line;