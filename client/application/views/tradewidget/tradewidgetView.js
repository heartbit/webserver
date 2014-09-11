define('tradewidgetView', ['config', 'text!tradewidgetView.html', 'ParametersManager','trade','trades','FormatUtils','dataHelper'],
function(config, TradewidgetTemplate, ParametersManager, Trade,Trades,FormatUtils,DataHelper) {

	return Backbone.View.extend ({

		template:_.template(TradewidgetTemplate),
		el:"#js-tradewidget",

		initialize:function(params) {
				 this.tradesTable=[];
				this.lastTrades= new Trades();
				this.dataHelper= new DataHelper();
				var params = ParametersManager.getCurrentParams();
				this.lastTrades.reset();
				this.initialized=false;

				if( params.length > 0 ) {
					syncTrade();
			
				}
			
			},
			syncTrade: function(params){
				var params = ParametersManager.getCurrentParams();
				this.lastTrades.fetchAllLastTrades(params);

				this.lastTrades.on('update',this.update,this);
				this.initialized = true;
			},
			render: function(params) {
				self=this;
				if ( !this.initialized ){
					this.syncTrade();
					
				}
				var params= ParametersManager.getCurrentParams();
				this.allPlatform=this.dataHelper.getPrices(this.lastTrades);
				this.currentPlatform;
				
				_.each(this.allPlatform.pricesRaw,function(platform) {
					if(platform.platform == params.platform){
						self.currentPlatform=platform;
					}
				});
				this.currentPlatform.dateTrade=FormatUtils.formatTime(this.currentPlatform.dateTrade,"trade");
				this.currentPlatform.colors_price = {
		            "BITSTAMP":"rgb(50,180,80)",
		            "BTCE":"rgb(140,70,110)",
		            "BTCCHINA":"rgb(220,130,70)",
		            "BITFINEX":"#555B67",
		            "KRAKEN":"rgb(200,40,50)"
		        };
		       
		  
		       	// INIT
		        if(this.tradesTable.length==0 && this.currentPlatform.amount!=0){
		        	this.tradesTable.unshift(this.currentPlatform);
		        //REMPLISSAGE
		        }else if(this.currentPlatform.amount!=0  && this.currentPlatform.tid!=this.tradesTable[0].tid ){ 
		        	 //VIDER tableau lors changement platform
		        	if(this.tradesTable[0].platform!= this.currentPlatform.platform) { 
		        		this.tradesTable=[];
		       		}
		      
		        	this.tradesTable.unshift(this.currentPlatform);
		        
		        	if(this.tradesTable.length==6) { //LIMITATION LONGUEUR
		        		this.tradesTable.pop();
		        	}
		        }
	
				this.$el.html(this.template({
					prices:this.tradesTable,
					platform:this.currentPlatform.platform
				}));

				return this;
			},
			
			update: function(params) {
				this.render();

				return this;
			}


	});
	

});