define('miskpiechart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

	function MiskPieChart(params) {
		this.el = params.el;
		this.initlayer=false;
		this.initChart(params);
		this.initLayer();
		this.initPie();
	};

	MiskPieChart.prototype.initChart = function(params) {
		var self =this;
		this.volumes=[];
		this.colors = {
			"BITSTAMP":"#508F40",
			"BTCE":"#99609C",
			"BTCECHINA":"#D95050",
			"BITFINEX":"#CACACA",
			"KRAKEN":"#D0D61A"
		}
		if( params && params.tickers ) {

			_.each(params.tickers,function(volume){
				var vol = volume.vol || 0;
				self.volumes.push([volume.platform,vol,'',self.colors[volume.platform],true]);
			});
		}
		// [
		// 	["bitstamp",2680,"EU","#508F40",true],
		// 	["btcChina",8245,"PRC","#D95050",true],
		// 	["btc-e",21870,"BG","#64658C",true],
		// 	["OKCoin",12098,"PRC","#99609C",false],
		// 	["huobi",56696,"PRC","#DED143",false],
		// 	["bitcoin-central",400,"EU","#042157",true],
		// 	["kraken",1211,"EU","#D0D61A",true]
		// ];

		this.volumes.sort(function(a,b) {
			return a[1]>b[1];		
		});
		this.generalHeight=500;
		this.generalWidth=1500;

		this.w=400;
		this.h=230;
		this.margin= {
			top:200,
			bottom:500,
			left:250,
			right:100,
			captiony:25,
			captionx:50,
			radiusMargin:30,
			outLine:8,
		};

		//RADIUS
		this.radius=(Math.min(this.w,this.h)/2)-this.margin.radiusMargin;
		this.radius2=this.radius*2+80;

		this.visHeight=this.h+this.margin.top+this.margin.bottom;
		this.visWidth=this.w+this.margin.left+this.margin.right;
		this.height=this.h-this.margin.top-this.margin.bottom;
		this.width=this.w-this.margin.left-this.margin.right;
	};

	MiskPieChart.prototype.initLayer=function() {
		this.misk=d3.select("#js-pieChart").append("svg").attr("height",this.generalHeight).attr("width",this.generalWidth);

		this.widget2=this.misk.append("g").attr("height",this.visHeight).attr("width",this.visWidth).attr("class","widget2");
	
		this.pieChartLayer=this.widget2.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")").attr("class","widgetlayer");
		this.initlayer=true;
	};

	MiskPieChart.prototype.initPie=function() {
		var self=this;
		//piechart
		// this.color=d3.scale.ordinal()
		// 	.range([this.volumes[3]]);

		this.arc=d3.svg.arc().outerRadius(this.radius).innerRadius(20);
		this.arc2=d3.svg.arc().outerRadius(this.radius2).innerRadius(20);
		// this.arc2=d3.svg.arc().outerRadius(this.radius2).innerRadius();

			
		

	};

	MiskPieChart.prototype.updateAxis=function() {
		var self=this;
		
		//PieChart1
		this.pie= d3.layout.pie()
			.sort(null)
			.value(function(volume){
				return volume[1];
			});

		//PieChart2	
		this.pie2= d3.layout.pie()
		.sort(null)
		.value(function(volume){
			return volume[1];
		});
		this.dataSelect=self.pie(_.last(this.volumes,5));
		this.dataSelect2=self.pie2(_.last(this.volumes,5));
	



////////PIECHART1
		this.pieChart=this.pieChartLayer.selectAll(".arc")
			.data(this.dataSelect)
			.enter().append("g")
			.attr("class","arc");
	
		this.pieChart.append("path")
			.attr("d",self.arc)
			.style("fill", function(volume){
				return volume.data[3];
		});


		this.pieChart.append("text")
			.attr("transform",function(volume){
					var centre2=self.arc2.centroid(volume);
					var centre1=self.arc.centroid(volume);
				
					self.pieChart.append("line")
						.attr("x1",centre1[0])
						.attr("y1",centre1[1])
						.attr("x2",centre2[0])
						.attr("y2",centre2[1])
						// .interpolate("basis")
						.attr("class","outLine");
				
					return "translate("+self.arc2.centroid(volume)+")";
				
			})
			.attr("class","volTitle")
			.text(function(volume){

				// return volume.data[0]+" "+(((volume.endAngle-volume.startAngle)/Math.PI)*100).toFixed(2)+"%";
				return volume.data[0];
			})
		
		// this.pieChart.append("text").text("BTC")
		// 	.attr("class","title")
		// 	.attr("y",4);




		// this.pieChartLayer.append("text")
		// 	.attr("y",this.radius+this.margin.captiony)
		// 	.attr("class","title")
		// 	.text("24h Volume (BTC)");

/////////PIECHART2
		

	};

	MiskPieChart.prototype.updateMiskPieChart=function() {
	

	};

	MiskPieChart.prototype.draw=function() {
		this.updateAxis();
		this.updateMiskPieChart();
	};

	MiskPieChart.prototype.update=function() {		
		this.draw();
	};

	return MiskPieChart;

});