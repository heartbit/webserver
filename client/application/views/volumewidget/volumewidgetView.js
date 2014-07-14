define('volumewidgetView', ['config', 'text!volumewidgetView.html', 'ParametersManager', 'horizBarChart','tickers','FormatUtils','dataHelper'],
	function(config, VolumewidgetTemplate, ParametersManager, HorizBarChart,Tickers,FormatUtils,DataHelper) {

		return Backbone.View.extend({

			template: _.template(VolumewidgetTemplate),

			events: {
				'click #js-showDetails':'showDetails',
				'click #js-volumewidget':'hideDetails',
				'click #js-volumes':'hideDetails'
			},
			el: '#js-volumewidget',
			initialize: function(params) {
				var self = this;
				this.dataHelper = new DataHelper();
				this.tickers = new Tickers();
				params = ParametersManager.getCurrentParams();
				this.tickers.reset();
				this.initialized = false;
				if( params.length > 0 ) {
					syncTicker();
				}
			},
			syncTicker: function(){
				var params = ParametersManager.getCurrentParams();
				var tickerRoom = ParametersManager.getTickerRoom(params);
				var defaultPairs = ParametersManager.getDefaultPairs(params.item);
				this.tickers.off('update');
				this.tickers.fetch({item:params.item,platformPairs:defaultPairs});
				this.tickers.on('update',this.updateValues,this);
				this.initialized = true;
			},
			showDetails:function(){
				$("#js-volumes").toggle('slow');
			},
			hideDetails: function() {
				$("#js-volumes").toggle('slow');
			},
			render: function(params) {
				var self = this;
				var data = this.dataHelper.buildVolumesForPieChart(this.tickers);
				if ( !this.initialized ){
					this.syncTicker();
				}
				if( data.volumes && data.volumes.length > 0 ) {
					this.$el.html(this.template());
					this.pieChart = new HorizBarChart({el:"#js-horizBarChart"});
					this.pieChart.rogueDraw({data:data.volumesPieChart});
				}
				return this;
			},
			update: function() {
				this.syncTicker();
				this.render();
				return this;
			},
			updateValues: function() {
				this.render();
				return this;
			},
			drawPie: function() {
				if ( !this.pieChart.initLayer ){
					this.pieChart.initLayer();
				}
				this.pieChart.draw();
			}

		});

	});