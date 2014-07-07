var assert = require("assert");
// var requirejs = require('requirejs');
var _ = require('underscore');

// var baseUrl = __dirname + '/../client/';

// requirejs.config({
//   baseUrl: baseUrl,
//   nodeRequire: require,
// });

describe('ParametersManager tests', function() {

  var FormatUtils = require('../server/FormatUtils');

  // before(function(done) {
  //   requirejs(['./modules/common'], function() {
  //     requirejs(['FormatUtils'], function(formatUtils) {
  //       FormatUtils = formatUtils;
  //       done();
  //     });
  //   });
  // });

  it('Should init a FormatUtils', function(done) {
    assert.ok(FormatUtils);
    done();
  });

  it('Should format prices', function(done) {
    var currency = 'USD';

    var bigvalues = [1026.666, 16542.36478, 156542.36478, 156542.3, 10000000, 2354650000, 111110000000.2121, 54654315254654, 3232515.121565455, 3230000, 1211111111111111111111];
    console.log('Big values')
    _.each(bigvalues, function(price) {
      console.log()
      console.log(price + '\t' + FormatUtils.formatPriceShort(price, currency) + '\t' + FormatUtils.formatPrice(price, currency));
      console.log();
    });

    var middlevalues = [999, 99.3254114, 12.1, 625.36654, 412, 6.3212, 35.3514855];
    console.log('\n\n\n\nMiddle values')
    _.each(middlevalues, function(price) {
      console.log()
      console.log(price + '\t' + FormatUtils.formatPriceShort(price, currency) + '\t' + FormatUtils.formatPrice(price, currency));
      console.log();
    });

    var smallprices = [0.0000000000017, 1.33513215, 9.351, 0.1121, 0.312321321, 0, 0.00001, 0.000000001, 0.002323232323];
    console.log('\n\n\n\nSmall values')
    _.each(smallprices, function(price) {
      console.log()
      console.log(price + '\t' + FormatUtils.formatPriceShort(price, currency) + '\t' + FormatUtils.formatPrice(price, currency));
      console.log();
    });

    done();

  });

  after(function(done) {
    console.log('After tests')
    done();
  });

});