define('marketcapView', ['marketcaps', 'text!marketcapView.html', 'FormatUtils'], function(Marketcaps, MarketcapViewTemplate, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-marketcapModal',

        template: _.template(MarketcapViewTemplate),

        initialize: function() {
            var self = this;
            _.bindAll(
                this,
                'render'
            );
            this.marketcaps = new Marketcaps();
            // this.marketcaps.on('update',);
            this.marketcaps.fetch({
                success: this.render
            });
            this.currencylabel = FormatUtils.formatCurrencyLabel;
        },

        render: function(update) {
            // var self = this;
            // var tplVariables = {
            //     currencylabel: this.currencylabel,
            // };
            this.$el.html(this.template(this.marketcaps));
            return this;
        }

    });

});