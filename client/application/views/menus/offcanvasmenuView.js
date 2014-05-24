define('offcanvasmenuView', ['config', 'text!offcanvasmenuView.html', 'backbone', 'weeknewsView', 'calculatorView', 'shortcutsView', 'lastupdateView'], function(config, OffcanvasmenuTemplate, Backbone, WeeknewsView, CalculatorView, ShortcutsView, LastupdateView) {

    return Backbone.View.extend({

        el: '#js-offcanvasmenu',

        template: _.template(OffcanvasmenuTemplate),

        events: {
            'click #js-calculator': 'showCalculatorModal',
            'click #js-weeknews': 'showWeeknewsModal',
            'click #js-shortcuts': 'showShortcutsModal',
        },

        showCalculatorModal: function() {
            this.calculatorView
                .setElement('#js-calculatorModal')
                .render();
            $('#js-calculatorModal').foundation('reveal', 'open');
        },

        showShortcutsModal: function() {
            this.shortcutsView
                .setElement('#js-shortcutsModal')
                .render();
            $('#js-shortcutsModal').foundation('reveal', 'open');
        },

        showWeeknewsModal: function() {
            this.weeknewsView
                .setElement('#js-weeknewsModal')
                .render();
            $('#js-weeknewsModal').foundation('reveal', 'open');
        },

        initialize: function() {
            _.bindAll(this,
                'render'
            );
            this.calculatorView = new CalculatorView();
            this.weeknewsView = new WeeknewsView();
            this.shortcutsView = new ShortcutsView();
        },

        render: function(params) {
            this.$el.html(this.template());
            $(document).foundation();
            return this;
        },


    });

});