define('miskpiechart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

	function MiskPieChart(el) {
		this.el = el;
		this.initChart();
		this.initLayer();
		this.initPie();
	};

	MiskPieChart.prototype.parseCollections = function(collections) {
		var self = this;

		this.volumes = [];
		this.data = [
			["bitstamp", 26863, "EU", "#508F40", true],
			["btcChina", 8245, "PRC", "#D95050", true],
			["btc-e", 21837, "BG", "#64658C", true],
			["OKCoin", 124098, "PRC", "#99609C", false],
			["huobi", 166968, "PRC", "#DED143", false],
			["bitcoin-central", 400, "EU", "#042157", true],
			["kraken", 1211, "EU", "#D0D61A", true]
		];
		//Tri tableau par grandeur volume
		this.data.sort(function(a, b)  {
			return a[1] > b[1];
		});

		//RADIUS
		_.each(this.data, function(data) {
			var volume = {};
			volume.platform = data[0];
			volume.volume = data[1];
			volume.region = data[2];
			volume.color = data[3];
			volume.reliable = data[4];
			self.volumes.push(volume);
		});
	};

	MiskPieChart.prototype.initChart = function() {
		var self = this;

		this.margin = {
			top: 50,
			bottom: 20,
			left: 50,
			right: 50,
			radiusMargin: 30,
			outLine: 8,
		};

		this.width = $(this.el).width() / 4 - this.margin.left - this.margin.right;
		this.height = $(this.el).height() - this.margin.top - this.margin.bottom;

		var visWidth = this.width + this.margin.left + this.margin.right;
		var visHeight = this.height + this.margin.top + this.margin.bottom;

		this.radius = (Math.min(this.width, this.height) / 2) - this.margin.radiusMargin;
		this.radius2 = this.radius * 2 + 20;

		this.misk = d3.select(this.el)
			.append("svg")
			.attr("height", visWidth)
			.attr("width", visHeight);
	};

	MiskPieChart.prototype.initLayer = function() {
		this.pieChartLayer = this.misk
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
			.attr("class", "widgetlayer");
	};

	MiskPieChart.prototype.initPie = function() {
		var self = this;
		
		this.arc = d3.svg.arc()
			.outerRadius(this.radius)
			.innerRadius(20);

		this.arc2 = d3.svg.arc()
			.outerRadius(this.radius2)
			.innerRadius(20);
	};

	MiskPieChart.prototype.updateAxis = function() {
		var self = this;

		// layout definition
		this.pie = d3.layout.pie()
			.sort(null)
			.value(function(volume) {
				return volume.volume;
			});

		// PieChart2	
		this.pie2 = d3.layout.pie()
			.sort(null)
			.value(function(volume) {
				return volume.volume;
			});

		this.dataSelect = self.pie(_.last(this.volumes, 4));
		this.dataSelect2 = self.pie2(_.last(this.volumes, 4));

		// PIECHART1
		this.pieChart = this.pieChartLayer
			.selectAll(".arc")
			.data(this.dataSelect)
			.enter().append("g")
			.attr("class", "arc");

		this.pieChart
			.append("path")
			.attr("d", self.arc)
			.style("fill", function(volume) {
				return volume.data.color;
			});

		this.pieChart
			.append("text")
			.attr("transform", function(volume) {
				if ((volume.endAngle - volume.startAngle) < (Math.PI / 2)) {
					var centre2 = self.arc2.centroid(volume);
					var centre1 = self.arc.centroid(volume);
					self.pieChart.append("line")
						.attr("x1", centre1[0])
						.attr("y1", centre1[1])
						.attr("x2", centre2[0])
						.attr("y2", centre2[1] + self.margin.outLine)
						.attr("class", "outLine");
					return "translate(" + self.arc2.centroid(volume) + ")";
				} else {
					return "translate(" + self.arc.centroid(volume) + ")";
				}
			})
			.attr("class", "volTitle")
			.text(function(volume) {
				return volume.data.platform + " " + (((volume.endAngle - volume.startAngle) / Math.PI) * 100).toFixed(2) + "%";
			});

		this.pieChart
			.append("text")
			.text("BTC")
			.attr("class", "title")
			.attr("y", +4);

		//AFFICHAGE POURCENTAGE
		// this.pieChart.append("text")
		// 	.attr("transform",function(volume){
		// 		var centre =self.arc.centroid(volume);
		// 		var x=centre[0];
		// 		// console.log(self.arc.centroid(volume));
		// 		console.log(volume.data[0]);
		// 		console.log(centre[0]);

		// 		// console.log(centre[1]);
		// 		return "translate("+x+","+centre[1]+")";
		// 	})
		// 	.attr("class","pourcent")
		// 	.text(function(volume){
		// 		return (((volume.endAngle-volume.startAngle)/Math.PI)*100).toFixed(2)+"%";
		// 	})
	};

	MiskPieChart.prototype.draw = function() {
		this.parseCollections();
		this.updateAxis();
	};

	MiskPieChart.prototype.update = function() {
		this.draw();
	};

	return MiskPieChart;

});