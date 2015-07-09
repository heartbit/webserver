var Fraction = require('./fraction');

describe('Fraction.js lib tests', function() {

	before(function(done) {
		done();
	});

	after(function(done) {
		done();
	});

	it('Should compute lines', function(done) {
		console.log(Fraction.getUsualFraction(1));
		console.log(Fraction.getUsualFraction(0.56));
		console.log(Fraction.getUsualFraction(0.23));
		console.log(Fraction.getUsualFraction(0.7));
		console.log(Fraction.getUsualFraction(0.13854));
		console.log(Fraction.getUsualFraction(0.6848));
		console.log(Fraction.getUsualFraction(0.015));
		console.log(Fraction.getUsualFraction(0.134));
		console.log(Fraction.getUsualFraction(0.2455));
		console.log(Fraction.getUsualFraction(0.2356));
		done();
	});

});