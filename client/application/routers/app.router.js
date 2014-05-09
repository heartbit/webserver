define('appRouter', ['config', 'ParametersManager', 'EventManager', 'NewsSocketManager', 'DataSocketManager', 'ChatSocketManager', 'items', 'headerView', 'marketcapView', 'keyFactsView', 'mainView', 'controllerView', 'lastupdateView', 'indicatorsView', 'miskView', 'newsView', 'weeknewsView', 'calculatorView'], function(config, ParametersManager, EventManager, NewsSocketManager, DataSocketManager, ChatSocketManager, Items, HeaderView, MarketcapView, KeyFactsView, MainView, ControllerView, LastupdateView, IndicatorsView, MiskView, NewsView, WeeknewsView, CalculatorView) {

	var Router = Backbone.Router.extend({

		routes: {
			"show": "show",
			"":"home"
			// 'marketcap/:item/:currency': 'marketcap'
		},

		show: function(){
			console.log('show');
		},

		initialize: function() {
			_.bindAll(this, 'refresh', 'render', 'update', 'initSockets');

			this.appEl = '#js-app';
			this.isRender = false;

			this.views = {
				header: new HeaderView(),
				keyfacts: new KeyFactsView(),
				controller: new ControllerView(),
				// main: new MainView(),
				// news: new NewsView(),
				// indicators: new IndicatorsView(),
			};

			Backbone.history.start({
				pushState: true
			});
		},

		/*	README
			Mini doc tous les params sont optionnels
			var params = {
				item: itemId,
				currency: currencyId,
				platforms: [platformId],
				status:{
					socket: boolean
					(... NE PAS ABUSER...)
				},
				mainview:{
					candle: true
					(... NE PAS ABUSER...)
				}
			}
		*/
		home: function(params) {
			this.params = params || this.params || {};
			ParametersManager.isInit ? this.refresh() : ParametersManager.init(this.refresh);
		},

		refresh: function() {
			ParametersManager.updateUserInputParams(this.params);
			this.isRender ? this.update(this.initSockets) : this.render(this.initSockets);
		},

		render: function(callback) {
			var self = this;
			_.each(_.keys(this.views), function(viewKey) {
				self.views[viewKey].render(ParametersManager.getCurrentParams());
			});
			this.isRender = true;
			if (callback) {
				callback();
			}
		},

		initSockets: function() {
			this.joinDataRoom(ParametersManager.getCurrentParams());
		},

		update: function(callback) {
			var self = this;
			_.each(_.keys(this.views), function(viewKey) {
				self.views[viewKey].update(ParametersManager.getCurrentParams());
			});
			if (callback) {
				callback();
			}
		},

		// marketcap: function( item,currency ) {
		// 	var self = this;
		// 	if (this.marketCapView) {
		// 		this.marketCapView.update();
		// 	} else {
		// 		this.marketCapView = new MarketCapView(item,currency);
		// 		this.marketCapView.setElement(this.appEl).render();
		// 	}
		// },

		joinDataRoom: function(params) {
			var sep = ':';
			var dataroom = params.item + sep + params.currency;
			console.log('dataroom', dataroom);
			DataSocketManager.emit('dataroom', dataroom);
		},

		// sanitizeParams: function(params) {
		// 	var cleanParams = {
		// 		item: params.item || (this.params && this.params.item) || config.defaultparams.item,
		// 		platform: params.platform || (this.params && this.params.platform) || config.defaultparams.platform,
		// 		currency: params.currency || (this.params && this.params.currency) || config.defaultparams.currency
		// 	};
		// 	this.params = cleanParams;
		// 	return cleanParams;
		// }

	});

	return Router;

});