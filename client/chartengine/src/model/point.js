var PointSchema = require('ModelSchemas').PointSchema;

var Point = function(id, name, value, x, color) {
	this.id = id || '';
	this.name = name || '';
	this.value = value || 0;
	this.x = x || '';
	this.color = color || '';
};

module.exports = Point;