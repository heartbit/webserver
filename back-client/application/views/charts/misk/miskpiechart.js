define('miskpiechart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

	function MiskPieChart(params) {
		this.el = params.el;
		this.initlayer=false;
		this.initChart(params);
	//	this.initLayer();
	//	this.initPie();
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


		this.volumes.sort(function(a,b) {
			return a[1]>b[1];		
		});
	
	};


	MiskPieChart.prototype.rogueDraw=function(params) {
		this.initChart(params);
		var w = 130,
		h = 200,
		r = Math.min(w, h) / 2,
		labelr = r + 15, // radius for label anchor
		color = d3.scale.category20(),
		donut = d3.layout.pie(),
		arc = d3.svg.arc().innerRadius(r * .3).outerRadius(r);

		var vis = d3.select("#js-pieChart")
		  .append("svg:svg")
			.data([this.volumes])
			.attr("width", w + 200)
			.attr("height", h);

		var arcs = vis.selectAll("g.arc")
			.data(donut.value(function(volume) { return volume[1]; }))
		  .enter().append("svg:g")
			.attr("class", "arc")
			.attr("transform", "translate(" + (r + 70) + "," + (r+50) + ")");

		arcs.append("svg:path")
			.attr("fill", function(volume) {return volume.data[3]; })
			.attr("d", arc);

		arcs.append("svg:text")
			.attr("transform", function(d) {
				var c = arc.centroid(d),
					x = c[0],
					y = c[1],
					// pythagorean theorem for hypotenuse
					h = Math.sqrt(x*x + y*y);
				return "translate(" + (x/h * labelr) +  ',' +
				   (y/h * labelr) +  ")"; 
			})
		.attr("dy", ".125em")
		.attr("text-anchor", function(d) {
			// are we past the center?
			return (d.endAngle + d.startAngle)/2 > Math.PI ?
				"end" : "start";
		})
		.data(donut.value(function(volume) {return volume[3]; }))
		.text(
		function(d) { 
			if( d.data[1] ) {
				return d.data[0];
			}
		}).attr("font-size","10px");
	}
	MiskPieChart.prototype.updateMiskPieChart=function(params) {
		 d3.select("#js-pieChart").remove();
		 this.rogueDraw(params);
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