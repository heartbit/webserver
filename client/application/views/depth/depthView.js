define('depthView', ['config', 'depth', 'text!depthView.html', 'depthchart'], function(config, Depth, DepthTemplate, DepthChart) {

    return Backbone.View.extend({

        el: '#js-indicators',

        template: _.template(DepthTemplate),

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