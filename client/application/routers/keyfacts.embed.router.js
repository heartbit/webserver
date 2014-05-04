define('embedKeyfactsRouter', ['config', 'EventManager','keyFactsView'], function(config, EventManager, keyFactsView) {

	var Router = Backbone.Router.extend({

		routes: {
			"": "displayKeyfacts"
		},

		initialize: function() {
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
		displayKeyfacts: function(params) {
			var self = this;
			console.log('blatte');
			// params = params ? this.sanitizeParams(params) : config.defaultparams;
			// var homeViewRenderCallback = function() {
			// 	self.$homeloader.hide();
			// 	self.joinDataRoom(params);
			// };
			// if (this.homeView) {
			// 	this.homeView.update(params, homeViewRenderCallback);
			// } else {
			// 	this.homeView = new HomeView();
			// 	this.homeView.setElement(this.appEl).render(params, homeViewRenderCallback);
			// }
		}

	});

	return Router;

});