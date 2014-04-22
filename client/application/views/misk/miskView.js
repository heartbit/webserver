define('miskView', ['config', 'text!miskView.html', 'miskbarchart', 'miskhorizbarchart', 'miskpiechart', 'FormatUtils'], function(config, MiskTemplate, MiskBarChart, MiskHorizBarChart, MiskPieChart) {

	return Backbone.View.extend({

		events: {},

		el: '#js-misk',

		template: _.template(MiskTemplate),

		initialize: function() {
			var self = this;
		},
		
		render: function() {
			var self = this;
			this.$el.html(this.template());
			this.miskhorizbarchart = new MiskHorizBarChart('#js-widget');
			this.miskhorizbarchart.update();
			this.miskbarchart = new MiskBarChart('#js-widget');
			this.miskbarchart.update();
			this.miskpiechart = new MiskPieChart('#js-widget');
			this.miskpiechart.update();
		}
	});

});