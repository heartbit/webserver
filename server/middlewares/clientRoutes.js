var fs = require('fs');
var _ = require('underscore');

function ClientRoutes() {};

ClientRoutes.prototype.init = function(params, callback) {
	var self = this;

	this.clientPath = params.clientPath;
	this.filename = params.filename;
	this.serverPath = params.serverPath;
	this.app = params.app;

	fs.readFile(this.filename, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var routes = JSON.parse(data).routes;
		_.each(routes, function(file, route) {
			if (file.indexOf(':') > -1) {
				var filename = file.replace('file:', '');
				console.log('Route ' + route + ' -> ' + filename);
				self.app.all(route, function(req, res) {
					console.log('route :' + route);
					res.sendfile(self.clientPath + filename);
				});
			}
		});
		if (callback) {
			callback();
		}
	});

};

module.exports = ClientRoutes;