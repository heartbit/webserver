define('calculators', ['config', 'calculator'], function(config, Calculator) {

	var Calculators = Backbone.Collection.extend({

		model: Calculator,
		url: config.calculator.urlCollection,

		parse: function(response) {
			//console.log(response);
			this.reset(response);
			return response;
		}
		
	});

	return Calculators;
});