define('pricewidgetView', ['config', 'text!pricewidgetView.html', 'ParametersManager','trade','trades','FormatUtils','dataHelper'],
	function(config, PricewidgetTemplate, ParametersManager, Trade,Trades,FormatUtils,DataHelper) {

		return Backbone.View.extend({

			template: _.template(PricewidgetTemplate),
			el:"#js-pricewidget",
			initialize:function(params) {
		
				this.trades= new Trades();
				this.dataHelper= new DataHelper();
				
				var params = ParametersManager.getCurrentParams();
				this.trades.reset();
				this.initialized=false;

				if( params.length > 0 ) {
					syncTrade();
			
				}
			
			},
			syncTrade: function(){
				var params = ParametersManager.getCurrentParams();
				// console.log(params);
				this.trades.fetchAllLastTrades(params);
				this.trades.on('update',this.update,this);
				this.initialized = true;
	
			},
			render: function(params) {
				if ( !this.initialized ){
					this.syncTrade();
					
				}

				this.price=this.dataHelper.getPrices(this.trades);
			
				this.price.pricesRaw.colors_price = {
		            "BITSTAMP":"rgb(50,180,80)",
		            "BTCE":"rgb(140,70,110)",
		            "BTCCHINA":"rgb(220,130,70)",
		            "BITFINEX":"#555B67",
		            "KRAKEN":"rgb(200,40,50)"
		        };
				this.$el.html(this.template({prices:this.price.pricesRaw}));

				return this;
			},
			
			update: function(params) {
				this.render();

				return this;
			}

		});

	});