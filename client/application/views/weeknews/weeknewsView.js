define('weeknewsView', ['text!weeknewsView.html','weeknews1','FormatUtils'], function(weeknewsViewTemplate,WeekNews1,FormatUtils) {

    return Backbone.View.extend({

        el: '#js-weeknewsModal',

        template: _.template(weeknewsViewTemplate),

        initialize: function() {
            var self = this;

            this.currencylabel=FormatUtils.formatCurrencyLabel;
        },

        render: function(update) {
            var self = this;
            var tplVariables = {
                currencylabel: this.currencylabel,
            };
            console.log(this.currencylabel);
            console.log("uuuuh");
            this.$el.html(this.template(tplVariables));
            return this;
        }

    });

});