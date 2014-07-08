define('calculatorView', ['config', 'marketcaps', 'text!calculatorView.html', 'FormatUtils'], function(config, Marketcaps, calculatorViewTemplate, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-calculatorModal',

        template: _.template(calculatorViewTemplate),

        initialize: function(params) {
            var self = this;
            this.marketcaps = new Marketcaps();
            this.marketcaps.fetch();
        },

        render: function(update) {
            var self = this;
            this.marketCapJson = this.marketcap.toJSON();

            var tplVariables = {
                difficulty: 6119726089,
                price: 430,
                estimated: 6479825998,
                reward: 25,
                calculate: function() {
                    var $form = $('form');
                    $form.submit(function() {

                        return false;
                    });
                }
            };
            this.$el.html(this.template(tplVariables));
            return this;
        }

    });

});