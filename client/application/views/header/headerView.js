define('headerView', ['config', 'text!headerView.html', 'items', 'itemControllerView'], function(config, HeaderTemplate, Items, itemControllerView) {

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
            // this.itemControllerView = new itemControllerView();
            _.bindAll(this,
                'render',
                'update'
            );
        },

        render: function(params) {
            this.$el.prepend(this.template());
            // this.itemControllerView
            //     .setElement('#js-itemView')
            //     .render(params);
            $(document).foundation();
            return this;
        },

        update: function(params) {
            // this.itemControllerView.render(params);
            $(document).foundation();
        }

    });

});