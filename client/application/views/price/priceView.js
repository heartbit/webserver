define('priceView', ['config', 'text!priceView.html', 'ParametersManager', 'FormatUtils', 'trades'],
	function(config, PriceTemplate, ParametersManager, FormatUtils, Trades) {

		return Backbone.View.extend({

			template: _.template(PriceTemplate),

			events: {},
			el: '#js-price',
			initialize: function() {
				var self = this;
				_.bindAll(this, 'render', 'update');
				this.trades = new Trades();
				this.trades.fetchAllLastTrades();
				this.trades.on('update', this.update, this);
				this.render();
			},

			render: function(params) {
				var self = this;
				this.averages = new Array();
				_.each(this.trades.averages, function(average) {
					self.averages.push({
						average: FormatUtils.formatPrice(average.average, average.currency),
						items: average.items
					});
				});
				this.$el.html(this.template({
					averages: this.averages
				}));
				return this;
			},
			update: function() {
				this.render();
				return this;
			}
		});

	});