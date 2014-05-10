define('priceView', ['config', 'text!priceView.html','text!selectCurrencyView.html','text!boxView.html', 'ParametersManager', 'FormatUtils', 'trades'],
	function(config, PriceTemplate,SelectTemplate,BoxTemplate, ParametersManager, FormatUtils, Trades) {

		return Backbone.View.extend({

			template: _.template(PriceTemplate),
			selectTemplate:_.template(SelectTemplate),
			boxTemplate:_.template(BoxTemplate),
			events: {
				'change #js-selectCurrency select':'renderAll'
			},
			el: '#js-price',
			elSelect: '#js-selectCurrency',
			elBox:'#js-priceBox',
			initialize: function(params) {
				var self = this;
				this.params = params;
				_.bindAll(this, 'render', 'update');
				this.trades = new Trades();
				//this.currency = 'USD';
				this.firstRendered = true;
				this.trades.fetchAllLastTrades(this.params);
				this.trades.on('update', this.update, this);
				this.render();
			},
			renderAll:function(event){
				this.render({changeCurrency:true});
			},
			render: function(params) {
				var self = this;
				
				this.averages = new Array();
				_.each(this.trades.averages, function(average) {
					var formattedItems = new Array();
					_.each(average.items,function(item){
						formattedItems.push({platform:item.platform,price:FormatUtils.formatPrice(item.price, average.currency)})
					});
					self.averages.push({
						average: FormatUtils.formatPrice(average.average, average.currency),
						items: formattedItems,
						currency:average.currency
					});
				});
				
				if ( this.firstRendered || params && params.changeCurrency || $(this.elSelect + " select option").length != this.averages.length )  {

					this.currency =  $(this.elSelect + " select option:selected").length > 0  ? $(this.elSelect + " select option:selected")[0].value :this.currency;//: this.currency;

					this.$el.html(this.template({
						averages: this.averages ,
						currency:this.currency
					}));
					
					$(this.elSelect).html(this.selectTemplate({
						averages: this.averages ,
						currency:this.currency
					}));
					this.firstRendered = false;
				}
				
				$(this.elBox).html(this.boxTemplate({
						averages: this.averages ,
						currency:this.currency
					}));
				return this;
			},
			initListeners: function(){
				//$(this.elSelect).on('change',this.renderAll());	
			},
			update: function() {
				this.render();
				this.initListeners();
				return this;
			}
		});

	});