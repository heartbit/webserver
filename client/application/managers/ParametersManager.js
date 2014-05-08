define('ParametersManager', ['config', 'items', 'platforms', 'currencies', 'pairs'], function(config, Items, Platforms, Currencies, Pairs) {

    var ParametersManager = function ParametersManager() {
        if (ParametersManager.caller != ParametersManager.getInstance) {
            throw new Error("Cannot instantiate more than one ParametersManager, use ParametersManager.getInstance() faggot ;-) ");
        }
        this.items = new Items();
        this.pairs = new Pairs();
        this.platforms = new Platforms();
        this.currencies = new Currencies();
        this.userInputParams = {};
        this.currentParams = {};
        this.isInit = false;
    };

    ParametersManager.instance = null;

    ParametersManager.prototype.init = function(callback) {
        var self = this;
        this.items.fetch({
            data: {},
            type: 'POST',
            success: function() {
                self.initInternalParams();
                self.isInit = true;
                if (callback) {
                    callback();
                }
            }
        });
    };

    ParametersManager.prototype.initInternalParams = function() {

        var platformdIds = [];
        _.each(this.items.models, function(item) {
            var currencies = _.keys(item.currencies);
            _.each(currencies, function(currency) {
                platformdIds = _.union(platformdIds, item.currencies[currency]);
            });
        });
        this.platforms = new Platforms();
        this.platforms.initFromIds(platformdIds);

        var currencyIds = [];
        _.each(this.items.models, function(item) {
            var currencies = _.keys(item.currencies);
            currencyIds = _.union(currencyIds, currencies);
        });
        this.currencies = new Currencies();
        this.currencies.initFromIds(currencyIds);

        var pairIds = [];
        _.each(this.items.models, function(item) {
            pairIds = _.union(pairIds, _.chain(item.currencies)
                .keys()
                .map(function(currency) {
                    return item.id + '/' + currency;
                }).value());
        });
        this.pairs = new Pairs();
        this.pairs.initFromIds(pairIds);

        this.currentParams = config.defaultparams;

        return this;
    };

    ParametersManager.prototype.updateUserInputParams = function(params) {

    };


    /* Getters */
    ParametersManager.prototype.getCurrentParams = function() {
        return this.currentParams;
    };

    ParametersManager.prototype.getPlatforms = function() {
        return this.platforms;
    };

    ParametersManager.prototype.getItems = function() {
        return this.items;
    };

    ParametersManager.prototype.getPairs = function() {
        return this.pairs;
    };

    ParametersManager.prototype.getCurrencies = function() {
        return this.currencies;
    };

    ParametersManager.getInstance = function() {
        if (this.instance === null) {
            this.instance = new ParametersManager();
        }
        return this.instance;
    };

    return ParametersManager.getInstance();

});