define('platformsView', ['config', 'text!platformsView.html'], function(config, PlatformsTemplate) {

	return Backbone.View.extend({

		template: _.template(PlatformsTemplate),

		events: {},

		initialize: function() {
			var self = this;
			_.bindAll(this,
				'render'
			);
		},

		changePlatforms: function(event) {
			var platformId = $(event.target).attr('id');
			// $('#js-platformsViewModal').foundation('reveal', 'close');
			// Backbone.history.navigate(url, true);
		},

		render: function(params) {
			if (!params) params = {};
			this.currentPlatform = params.platform || this.platform;
			this.$el.html(this.template({}));
			// $('.js-item').on('click', this.changeItem);
			$(document).foundation();
			return this;
		}

	});

});