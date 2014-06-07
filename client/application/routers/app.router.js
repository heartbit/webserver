define(function(require) {

	var ParametersManager = require('ParametersManager'),
	EventManager = require('EventManager');
	NewsSocketManager = require('NewsSocketManager');
	DataSocketManager = require('DataSocketManager');
	ChatSocketManager = require('ChatSocketManager');
	ShortcutsManager = require('ShortcutsManager');

	var config = require('config');

	var HeaderView = require('headerView'),
		KeyFactsView = require('keyFactsView'),
		MainView = require('mainView'),
		ControllerView = require('controllerView'),
		DepthView = require('depthView'),
		MiskView = require('miskView'),
		NewsView = require('newsView'),
		OffcanvasmenuView = require('offcanvasmenuView');

	var Router = Backbone.Router.extend({

		routes: {
			"app*": "app",
		},

		initialize: function() {
			_.bindAll(this, 'refresh', 'render', 'update', 'initSockets');

			this.appEl = '#js-app';
			this.isRender = false;

			this.views = {
				offcanvasmenu: new OffcanvasmenuView(),
				controller: new ControllerView(),
				keyfacts: new KeyFactsView(),
				header: new HeaderView(),
				main: new MainView(),
				depth: new DepthView(),
				news: new NewsView()
			};

			Backbone.history.start({
				pushState: true
			});

			ShortcutsManager.init();
			// ShortcutsManager.addShortcut('t', function() {
			// 	console.log('t')
			// });

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