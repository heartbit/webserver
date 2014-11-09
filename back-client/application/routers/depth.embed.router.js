define('embedDepthRouter', ['config', 'EventManager', 'DataSocketManager', 'depthView'],
	function(config, EventManager, DataSocketManager, DepthView) {

		var Router = Backbone.Router.extend({

			initialize: function() {
				var self = this;
				this.depthView = new DepthView();

				var params = {
					platform: 'BITSTAMP',
					currency: 'USD',
					item: 'BTC'
				};

				this.depthView.render(params);

				var sep = ':';
				var dataroom = params.item + sep + params.currency;
				console.log('dataroom', dataroom);
				DataSocketManager.emit('dataroom', dataroom);

				Backbone.history.start({
					pushState: true
				});
			}

		});

		return Router;

	});