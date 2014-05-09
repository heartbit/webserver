define('volumewidgetView', ['config', 'text!volumewidgetView.html', 'ParametersManager', 'miskpiechart','tickers','FormatUtils','dataHelper'],
	function(config, VolumewidgetTemplate, ParametersManager, Miskpiechart,Tickers,FormatUtils,DataHelper) {

		return Backbone.View.extend({

			template: _.template(VolumewidgetTemplate),

			events: {},
			el: '#js-volumewidget',
			initialize: function() {
				var self = this;
				this.dataHelper = new DataHelper();
				_.bindAll(this, 'render', 'update');
				this.tickers = new Tickers();
				this.tickers.fetchAllTickersForVolumeWidget();
				this.tickers.on('update',this.update,this);
				this.render();
			},

			render: function(params) {
				var self = this;
				var data = this.dataHelper.buildVolumesForPieChart(this.tickers);
				if( data.volumes && data.volumes.length > 0 ) {
					this.$el.html(this.template(
						{data: {tickers:data.volumes,total:data.volumeTotal}}
					));
					this.pieChart = new Miskpiechart({el:"#js-pieChart",tickers:data.volumesPieChart});
					this.drawPie({el:"#js-pieChart",tickers:data.volumesPieChart});
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