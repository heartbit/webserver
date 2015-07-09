var ColorManager = require('./colorManager');

var dataset = {
	lines: [{
		points: [{
			id: '1',
			name: 'First',
			status: undefined
		}, {
			id: '2',
			name: 'Second',
			status: undefined
		}]
	}, {
		points: [{
			id: '2',
			name: 'Second',
			status: undefined
		}, {
			id: '3',
			name: 'Third',
			status: 'highlight'
		}]
	}]
};

// describe('colorManager.js tests', function() {

var colorManager = new ColorManager();

// before(function(done) {
// 	done();
// });

// after(function(done) {
// 	done();
// });

// it('Should attribute colors', function(done) {
var colorDataset = colorManager.attributesColors(dataset);
console.log(JSON.stringify(colorDataset));
// colorDataset
// 	done();
// });
// });