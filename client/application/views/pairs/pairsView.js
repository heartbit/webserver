define('pairsView', ['config', 'text!pairsView.html', 'ParametersManager'], function(config, PairsTemplate, ParametersManager) {

    return Backbone.View.extend({

        template: _.template(PairsTemplate),

        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
        },

        render: function() {
            this.$el.html(this.template({
                pairs: ParametersManager.getPairs().models,
            }));
            $(document).foundation();
            return this;
        }

    });

});