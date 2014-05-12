if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

var requirejs = require('requirejs');
requirejs.config({
	mainConfigFile: '../client/modules/common.js'
});

var params = {};
params._ = requirejs('underscore');
var Mocha = requirejs('mocha');
params.mocha = new Mocha();
params.chai = requirejs('chai');
params.sinon = requirejs('sinon');
var suite = requirejs('parametersManagerTests');
// suite.run(params);