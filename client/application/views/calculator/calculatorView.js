define('calculatorView', ['config','marketcap','text!calculatorView.html','FormatUtils'], function(config,Marketcap, calculatorViewTemplate,FormatUtils) {
    
    return Backbone.View.extend({

        el: '#js-calculatorModal',

        template: _.template(calculatorViewTemplate),

       
        initialize: function(params) {
            var self = this;

            this.marketcap = new Marketcap({
                url: config.marketcap.urlModel
            });
            console.log(this);
            this.marketcap.fetch();
          
        },
        render: function(update) {
            var self=this;
            this.marketCapJson = this.marketcap.toJSON();
            
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