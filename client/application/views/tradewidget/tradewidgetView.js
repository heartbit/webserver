define('tradewidgetView', ['config', 'text!tradewidgetView.html', 'ParametersManager','trade','trades','FormatUtils','dataHelper'],
function(config, TradewidgetTemplate, ParametersManager, Trade,Trades,FormatUtils,DataHelper) {

	return Backbone.View.extend ({

		template:_.template(TradewidgetTemplate),
		el:"#js-tradewidget",

		initialize:function(params) {
				// var params = ParametersManager.getCurrentParams();
			this.trade= new Trade();
			this.lastTrades= new Trades();
			this.lastTrades.reset();
			this.lastTrades.fetchAllLastTrades(params);

			this.FormatUtils=FormatUtils;
			this.trade.on('update',this.redraw,this);
			var params = ParametersManager.getCurrentParams();
			_.bindAll(this,'render','update','redraw');
			console.log("tradeview-this.trade",this.trade);
		
		},

		render:function(params) {
				console.log("tradeView-this.lasttrade",this.lastTrades);
			// console.log("tradeparams",params);
			// console.log("TRADE",this.trade.get("price"),this.trade.get("amount"),this.trade.get("dateTrade"));
			// console.log("TRADE",this.trade);
			this.dateTrade=this.FormatUtils.formatTime(this.trade.get("dateTrade"),"trade");

			this.$el.html(this.template({
				lastPrice:this.trade.get("price"),
				lastAmount:this.trade.get("amount"),
				item:this.trade.get("item"),
				currency:this.trade.get("currency"),
				platform:this.trade.get("platform"),
				date:this.dateTrade
			}));

         

            // this.trade.socketSync(params);

            return this;
		},

		update:function(params) {
			// console.log("tradeUpdate",params);
			// this.trade.socketSync(params);
			console.log("tradeview-UPDATE-this.trade",this.trade);
			this.render();
			return this;
		},

		redraw:function(params) {
						console.log("tradeview-UPDATE-this.trade",this.trade);
			this.render();
		}


	});
	

});