define('volumewidgetView', ['config', 'text!volumewidgetView.html', 'ParametersManager', 'miskpiechart','tickers','FormatUtils'],
	function(config, VolumewidgetTemplate, ParametersManager, Miskpiechart,Tickers,FormatUtils) {

		return Backbone.View.extend({

			template: _.template(VolumewidgetTemplate),

			events: {},
			el: '#js-volumewidget',
			initialize: function() {
				var self = this;
				_.bindAll(this, 'render', 'update');
				this.tickers = new Tickers();
				this.tickers.fetchAllTickersForVolumeWidget();
				this.tickers.on('update',this.update,this);
				this.render();
			},

			render: function(params) {
				var self = this;
				this.modelsJSONPieChart =  new Array();
				this.modelsJSON =  new Array();
				var item= "";
				_.each(this.tickers.models,function(model) {
					item = model.item;
					var modelPieChart = model.toJSON();
					model = model.toJSON();
					self.modelsJSONPieChart.push(modelPieChart);
					model.vol = FormatUtils.formatPrice( model.vol,model.item );
					model.currency = FormatUtils.formatCurrencyLabel( model.currency);
					self.modelsJSON.push(model);
				});
				if( this.modelsJSON && this.modelsJSON.length > 0 ) {
					var volumeTotal = FormatUtils.formatPrice(this.tickers.volumeTotal,this.modelsJSON[0].item);
					this.$el.html(this.template(
						{data: {tickers:this.modelsJSON,total:volumeTotal}}
					));
					this.pieChart = new Miskpiechart({el:"#js-pieChart",tickers:this.modelsJSONPieChart});
					this.drawPie({el:"#js-pieChart",tickers:this.modelsJSONPieChart});
				}
				return this;
			},
			update: function() {
			
				this.render();
				return this;
			},
			drawPie: function(params) {
				if ( !this.pieChart.initLayer ){
					this.pieChart.initLayer();
				}
				this.pieChart.draw(params);
			}

		});

	});