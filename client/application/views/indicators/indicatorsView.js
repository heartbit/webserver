define('indicatorsView', ['config', 'depth', 'text!indicatorsView.html', 'depthchart'], function(config, Depth, IndicatorsTemplate, DepthChart) {

    return Backbone.View.extend({

        el: '#js-indicators',

        template: _.template(IndicatorsTemplate),

        initialize: function() {
            this.depth = new Depth();
            _.bindAll(this, 'render', 'update');
        },

        render: function(params) {
            this.$el.html(this.template());
            this.depth.socketSync(params);
            this.depth.on('update', this.update, this);
            this.depthChart = new DepthChart('#js-depth');
            return this;
        },

        update: function(params) {
            this.depthChart.draw(this.depth);
        }

    });

});