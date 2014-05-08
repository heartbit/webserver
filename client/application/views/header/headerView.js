define('headerView', ['config', 'text!headerView.html'], function(config, HeaderTemplate) {

    return Backbone.View.extend({

        el: '#js-header',

        template: _.template(HeaderTemplate),

        events: {
            'click #js-getStarted': 'launchTutorial'
        },

        launchTutorial: function() {
            $(document).foundation('joyride', 'start');
        },

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render',
                'update'
            );
        },

        render: function(params) {
            this.$el.html(this.template());
            $(document).foundation();
            return this;
        },

        update: function(params) {
            $(document).foundation();
        }

    });

});