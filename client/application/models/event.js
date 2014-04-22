define('informationEvent', ['config', 'moment'], function(config, moment) {

	var InformationEvent = Backbone.Model.extend({

		defaults: {
			source: 'google news',
			date: new Date(),
			title: '',
			description: '',
			link: '',
			author: '',
			picture: '',
			
		},

	});

	return InformationEvent;
});