define('platformsView', ['config', 'text!platformsView.html', 'ParametersManager'], function(config, PlatformsTemplate, ParametersManager) {

	return Backbone.View.extend({

		template: _.template(PlatformsTemplate),

		events: {
			'click .js-platform': 'changeGlobalPlatform'
		},

		initialize: function() {
			var self = this;
			_.bindAll(this,
				'render'
			);
		},

		render: function(params) {
			this.$el.html(this.template({
				platforms: ParametersManager.getPlatforms().models,
			}));
			$(document).foundation();
			return this;
		},

		changeGlobalPlatform: function(event) {
			var platformId = $(event.target).attr('id');
			var currentPlatform =ParametersManager.getPlatforms().findByName(platformId);
            var pairId = ParametersManager.getCurrentParams().item+"/"+ParametersManager.getCurrentParams().currency;
    
            if ( !_.contains(currentPlatform.pairs,pairId) ){
                pairId = null;
            }
            ParametersManager.changeGlobalPlatform(platformId,pairId);
            this.$el.foundation('reveal', 'close');
			return true;
		},

	});

});