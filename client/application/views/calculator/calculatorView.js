define('calculatorView', ['backbone','text!calculatorView.html','FormatUtils'], function(Backbone, calculatorViewTemplate,FormatUtils) {
    
    return Backbone.View.extend({

        el: '#js-calculatorModal',

        template: _.template(calculatorViewTemplate),

        initialize: function() {
            var self = this;

            // this.currencylabel=FormatUtils.formatCurrencyLabel;
        },

        render: function(update) {
            
            var self = this;
            var tplVariables = {
                difficulty:6119726089,
                price:430,
                estimated:6479825998,
                reward:25,
                calculate: function() {
                   var $form = $('form');
                   $form.submit(function(){
                     
                      return false;
                   });
                }
            };
            // console.log(this.currencylabel);
            // console.log("uuuuh");
            this.$el.html(this.template(tplVariables));
            return this;
        }

    });

});