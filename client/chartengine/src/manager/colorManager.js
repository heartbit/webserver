var _ = require('lodash');

var defaultColors = {
	highlight: '#656298',
	other: '#C4C0C0',
	greyScale: ['#242222', '#3B3838', '#545353', '#777676', '#969494', '#AEABAB', '#C4C0C0'],
	colorScale: ['#252343', '#36335D', '#4E4B7C', '#656298', '#7F7CA9', '#9C99BE', '#C2C0DD']
};

var hasHighlight = function(dataset) {
	var hasHighlight = false;
	_.each(dataset.lines, function(line) {
		_.each(line.points, function(point) {
			if (point.status && point.status == 'highlight') {
				hasHighlight = true;
			}
		});
	});
	return hasHighlight;
};

var ColorManager = function(colors) {
	this.colors = _.extend(defaultColors, colors);
};

ColorManager.prototype.setColors = function(colors) {
	if (colors) {
		this.colors = _.extend(defaultColors, colors);
	}
};

ColorManager.prototype.attributesColors = function(dataset) {
	var self = this;

	var alreadyColoredPoints = {};
	var colorSet = hasHighlight(dataset) ? this.colors.greyScale : this.colors.colorScale;

	_.each(dataset.lines, function(line, indexLine) {
		_.each(line.points, function(point, indexPoint) {
			if (point.status) {
				switch (point.status) {
					case 'highlight':
						point.color = self.colors.highlight;
						break;
					case 'other':
						point.color = self.colors.other;
						break;
				}
			} else {
				if (alreadyColoredPoints[point.id]) {
					point.color = alreadyColoredPoints[point.id];
				} else {
					point.color = colorSet[indexPoint % colorSet.length];
					alreadyColoredPoints[point.id] = point.color;
				}
			}
		});
	});

	return dataset;
};

module.exports = ColorManager;