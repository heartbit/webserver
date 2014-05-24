define('appRouter', ['backbone', 'config', 'ParametersManager', 'EventManager', 'NewsSocketManager', 'DataSocketManager', 'ChatSocketManager', 'ShortcutsManager', 'items', 'headerView', 'marketcapView', 'keyFactsView', 'mainView', 'controllerView', 'indicatorsView', 'miskView', 'newsView', 'offcanvasmenuView'], function(Backbone, config, ParametersManager, EventManager, NewsSocketManager, DataSocketManager, ChatSocketManager, ShortcutsManager, Items, HeaderView, MarketcapView, KeyFactsView, MainView, ControllerView, IndicatorsView, MiskView, NewsView, OffcanvasmenuView) {

	var Router = Backbone.Router.extend({

		routes: {
			"app*": "app",
		},

		initialize: function() {
			_.bindAll(this, 'refresh', 'render', 'update', 'initSockets');

			this.appEl = '#js-app';
			this.isRender = false;

			this.views = {
				header: new HeaderView(),
				offcanvasmenu: new OffcanvasmenuView(),
				keyfacts: new KeyFactsView(),
				controller: new ControllerView(),
				main: new MainView(),
				news: new NewsView(),
				indicators: new IndicatorsView()
			};

			Backbone.history.start({
				pushState: true
			});

			ShortcutsManager.addShortcut('t', function() {
				console.log('t')
			});

			$(document).foundation();
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
		app: function(params) {
			console.log('params : ', params);
			this.params = params || this.params || {};
			ParametersManager.isInit ? this.refresh() : ParametersManager.init(this.refresh);
		},

		refresh: function() {
			ParametersManager.updateUserInputParams(this.params);
			this.render(this.initSockets);
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

		joinDataRoom: function(params) {
			var sep = ':';
			var dataroom = params.item + sep + params.currency;
			console.log('dataroom', dataroom);
			DataSocketManager.emit('dataroom', dataroom);
		}

	});

	return Router;

});