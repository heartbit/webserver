require('script!chance');

/* Util to generate datasets with random values */

var generateMarimekkoDataset = function(numLines, numPoints) {
	var lines = [];
	var lineIds = chance.unique(chance.state, numLines, {
		full: true
	});

	for (var i = 0; i < numLines; i++) {

		var pointsIds = chance.unique(chance.city, numPoints, {
			full: true
		});
		var points = [];
		for (var j = 0; j < numPoints; j++) {
			var point = {
				id: pointsIds[j],
				name: pointsIds[j],
				value: chance.floating({
					min: 0,
					max: 100
				})
			};
			points.push(point);
		}

		var line = {
			id: lineIds[i],
			name: lineIds[i],
			points: points
		};
		lines.push(line);
	}

	return {
		lines: lines
	}
};

exports.generateDataset = function(type, numLines, numPoints) {
	switch (type) {
		case 'marimekko':
			return generateMarimekkoDataset(numLines, numPoints);
			break;
		default:
			return generateMarimekkoDataset(numLines, numPoints);
	}
};
