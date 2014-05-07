define('indexRouter', ['homeView', 'marketCapView','EventManager', 'config', 'DataSocketManager', 'ChatSocketManager'], function(HomeView, MarketCapView,EventManager, config, DataSocketManager, ChatSocketManager) {

	var Router = Backbone.Router.extend({

		routes: {
			"": "home",
			'marketcap/:item/:currency' : 'marketcap',
			"market*": "home"
		},

		initialize: function() {
			this.appEl = '#appArticle';
			this.$appEl = $(this.appEl);
			this.$homeloader = $('.homeloader');

			// ChatSocketManager.on('welcome', function(data) {
			// 	console.log('welcome', data);
			// });
			// window.DataSocketManager = DataSocketManager;
			Backbone.history.start({
				pushState: true
			});
		},

		/*	README
			Mini doc 
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
			var self = this;
			params = params ? this.sanitizeParams(params) : config.defaultparams;

			var homeViewRenderCallback = function() {
				self.$homeloader.hide();
				self.joinDataRoom(params);
			};

			if (this.homeView) {
				this.homeView.update(params, homeViewRenderCallback);
			} else {
				this.homeView = new HomeView();
				this.homeView.setElement(this.appEl).render(params, homeViewRenderCallback);
			}
		},
		marketcap: function( item,currency ) {
			var self = this;
			if (this.marketCapView) {
				this.marketCapView.update();
			} else {
				this.marketCapView = new MarketCapView(item,currency);
				this.marketCapView.setElement(this.appEl).render();
			}
		},
		joinDataRoom: function(params) {
			var sep = ':';
			var dataroom = params.item + sep + params.currency;
			console.log('dataroom', dataroom);
			DataSocketManager.emit('dataroom', dataroom);
		},

		sanitizeParams: function(params) {
			var cleanParams = {
				item: params.item || (this.params && this.params.item) || config.defaultparams.item,
				platform: params.platform || (this.params && this.params.platform) || config.defaultparams.platform,
				currency: params.currency || (this.params && this.params.currency) || config.defaultparams.currency
			};
			this.params = cleanParams;
			return cleanParams;
		}

	});

	return Router;

});