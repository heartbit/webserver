define('homeView', ['config', 'items', 'headerView', 'marketcapView', 'keyFactsView', 'mainView', 'controllerView', 'lastupdateView', 'indicatorsView', 'indicatorscontrollerView', 'miskView', 'newsView','sidecontrollerView','weeknewsView','calculatorView'], function(config, Items, HeaderView, MarketcapView, KeyFactsView, MainView, ControllerView, LastUpdateView, IndicatorsView, IndicatorscontrollerView, MiskView,NewsView, SideControllerView,WeeknewsView,CalculatorView) {

    return Backbone.View.extend({

        events: {
            'click .js-home': 'navigateToHome',
            'click #js-marketcap': 'showMarketcap',
            'click #js-weeknews': 'showWeeknews',
            'click #js-calculator':'showCalculator'
        },

        initialize: function() {
            _.bindAll(
                this,
                'initSubviews',
                'renderSubviews',
                'updateSubviews',
                'updateInternalParams'
            );
            this.items = new Items();
            this.initSubviews();
        },

        render: function(params, callback) {
            var self = this;
            this.items.fetch({
                data: {},
                type: 'POST',
                success: function() {
                    self.updateInternalParams(params);
                    self.renderSubviews();
                    if (callback) {
                        callback();
                    }
                }
            });
            this.items.on('update', this.updateSubviews);
            return this;
        },

        updateInternalParams: function(params) {
            if (!params) {
                var params = {
                    item: undefined,
                    currency: undefined,
                    platform: undefined
                };
            }

            // Choose item
            var item = _.find(this.items.models, function(item) {
                return item.id == params.item;
            });
            if (!item) {
                this.params = config.defaultparams;
                return;
            }
            params.item = item.id;

            // Choose currency
            var currenciesKeys = _.keys(item.currencies);
            var currency = _.find(currenciesKeys, function(currency) {
                return currency == params.currency;
            });
            params.currency = currency ? currency : currenciesKeys[0];

            // Choose platform
            var platform = _.find(item.currencies[params.currency], function(platform) {
                return platform == params.platform;
            });
            var firstPlatform = item.currencies[params.currency][0];
            params.platform = platform ? platform : firstPlatform;

            this.params = params;
        },

        update: function(params, callback) {
            this.updateInternalParams(params);
            this.updateSubviews();
            if (callback) {
                callback();
            }
            return this;
        },
        showCalculator: function() {
            this.calculatorView.render(this.params);
            $('#js-calculatorModal').foundation('reveal','open');
            return false;
        },

        showMarketcap: function() {
            this.marketcapView.render(this.params);
            $('#js-marketcapModal').foundation('reveal', 'open');
            return false;
        },
        showWeeknews: function() {
            this.weeknewsView.render(this.params);
            $('#js-weeknewsModal').foundation('reveal', 'open');
            return false;
        },

        navigateToHome: function() {
            Backbone.history.navigate('/', true);
            return false;
        },

        initSubviews: function() {
            this.headerView = new HeaderView();
            this.controllerView = new ControllerView();
            this.keyFactsView = new KeyFactsView();
            this.mainView = new MainView();
            this.newsView = new NewsView();
            this.indicatorsView = new IndicatorsView();
            this.miskView = new MiskView();
            this.calculatorView=new CalculatorView();
            this.marketcapView = new MarketcapView();
            this.weeknewsView = new WeeknewsView();
            this.lastUpdateView = new LastUpdateView();
        },

        renderSubviews: function() {
            this.params.items = this.items;
            this.headerView.render(this.params);
            this.controllerView.render(this.params);
            this.keyFactsView.render(this.params);
            this.mainView.render(this.params);
            // this.newsView.render();
            this.indicatorsView.render(this.params);
            this.miskView.render(this.params);
            this.lastUpdateView.render(this.params);
            this.isRendered = true;
        },

        updateSubviews: function(params) {
            this.headerView.update(this.params);
            this.controllerView.update(this.params);
            this.keyFactsView.render(this.params);
            this.mainView.update(this.params);
            this.indicatorsView.render(this.params);
            this.miskView.render(this.params);
        }

    });

});