define('shortcutsView', ['config', 'text!shortcutsView.html', 'backbone', 'ShortcutsManager'], function(config, ShortcutsTemplate, Backbone, ShortcutsManager) {

    return Backbone.View.extend({

        template: _.template(ShortcutsTemplate),

        events: {},

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
            // ShortcutsManager
            // key('h', function() {
            //     console.log('Press h -> help');
            // });
        },

        render: function() {
            this.$el.html(this.template({
                shortcuts: ShortcutsManager.getList()
            }));
            $(document).foundation();
            return this;
        }

    });

});