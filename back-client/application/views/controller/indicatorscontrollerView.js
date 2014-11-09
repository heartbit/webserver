define('indicatorscontrollerView', ['config', 'EventManager', 'dataHelper', 'text!indicatorscontrollerView.html', 'mainView'], function(config, EventManager, DataHelper, IndicatorscontrollerTemplate, MainView) {

    return Backbone.View.extend({

        events: {
            'change .js-sma': 'changeSMA'
        },

        el: '#js-indicatorscontroller',

        template: _.template(IndicatorscontrollerTemplate),

        initialize: function() {
            this.checkboxes = config.mainchartcheckcontroller.checkboxes;
        },

        render: function() {
            var self = this;

            var tplVariables = {
                checkboxes: this.checkboxes
            };

            this.$el.html(this.template(tplVariables));
        },

        changeSMA: function(event) {
            var self = this;
            var $input = $(event.target);

            var checkbox = _.find(this.checkboxes, function(checkbox) {
                return checkbox.id == $input.attr('id');
            });
            console.log($input[0].checked);

            if ($input[0].checked) {
                EventManager.trigger('mainchart:add', checkbox);
            } else {
                EventManager.trigger('mainchart:remove', checkbox);
            }
        }

    });

});