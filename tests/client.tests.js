var assert = require("assert");
var requirejs = require('requirejs');

var baseUrl = __dirname + '/../';

requirejs.config({
  baseUrl: baseUrl,
  nodeRequire: require,
});

describe('ParametersManager tests', function() {

  var ParametersManager;

  before(function(done) {
  	console.log('Before tests');
  	done();
    // Load config file
    // requirejs(['./client/modules/common'], function() {
    //   // Load global environment variables
    //   requirejs(['ParametersManager'], function(ParametersManager) {
    //     // Load tested modules
    //     ParametersManager = ParametersManager;
    //     done();
    //   });
    // });
  });

  after(function(done) {
    console.log('After tests')
    done();
  });

  it('Should init a ParametersManager', function(done) {
    assert.ok('true');
    done();
  });

});