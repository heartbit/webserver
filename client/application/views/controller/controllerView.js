define('controllerView', ['text!controllerView.html', 'config', 'items', 'FormatUtils'], function(ControllerViewTemplate, config, Items, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-controller',

        events: {
            'click .js-currency': 'changeGlobalCurrency',
            'click .js-platform': 'changeGlobalPlatform'
        },

        template: _.template(ControllerViewTemplate),

        initialize: function() {
            _.bindAll(
                this,
                'render',
                'update'
            );
        },

        render: function(params) {
            this.updateInternalParams(params);

            var tplVars = {
                compatiblePlatforms: this.compatiblePlatforms,
                compatibleCurrencies: this.compatibleCurrencies,
                selectedPlatform: this.platform,
                selectedCurrency: this.currency,
            };

            this.$el.html(this.template(tplVars));
            $(document).foundation();

            return this;
        },

        updateInternalParams: function(params) {
            this.items = params.items || this.items || [];
            
            this.item = _.find(this.items.models, function(item){
                return item.id == params.item;
            });

            this.currency = params.currency;
            this.compatibleCurrencies = _.keys(this.item.currencies);

            this.compatiblePlatforms = this.item.currencies[params.currency];
            this.platform = _.find(this.compatiblePlatforms, function(platform){
                return platform == params.platform;
            });
        },

        update: function(params) {
            var self = this;
            this.render(params);
        },

        changeGlobalCurrency: function(event) {
            var $a = $(event.target);
            var currencyId = $a.attr('id');
            var params = {
                platform: this.platform,
                item: this.item.id,
                currency: currencyId
            };
            var url = this.constructUrl(params);
            Backbone.history.navigate(url, false);
        },

        changeGlobalPlatform: function(event) {
            var $a = $(event.target);
            var platformId = $a.attr('id');
            var params = {
                platform: platformId,
                item: this.item.id,
                currency: this.currency
            }
            var url = this.constructUrl(params);
            Backbone.history.navigate(url, false);
        },

        constructUrl: function(params) {
            var url = "/market?";
            url += "platform=" + params.platform;
            url += "&item=" + params.item;
            url += "&currency=" + params.currency;
            return url;
        }

    });

});