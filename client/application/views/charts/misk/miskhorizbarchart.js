define('miskhorizbarchart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

	function MiskHorizBarChart(el) {
		this.el = el;
		this.initChart();
		this.initLayer();
		this.initAxis();
	};

	MiskHorizBarChart.prototype.parseCollections = function(collections) {
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

		this.volumetotal = function(volume) {
			var total = 0;
			for (var i = 0; i < volume.length; i++) {
				total += volume[i].volume;
			};
			return total;
		};

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

	MiskHorizBarChart.prototype.initChart = function() {
		var self = this;

		this.margin = {
			top: 50,
			bottom: 20,
			left: 50,
			right: 50,
			caption: 6,
			captionVol: 4,
			barPadding: 15,
		};

		this.width = $(this.el).width() / 4 - this.margin.left - this.margin.right;
		this.height = $(this.el).height() - this.margin.top - this.margin.bottom;

		var visWidth = this.width + this.margin.left + this.margin.right;
		var visHeight = this.height + this.margin.top + this.margin.bottom;
		this.misk = d3.select(this.el)
			.append("svg")
			.attr("height", visHeight)
			.attr("width", visWidth);
	};

	MiskHorizBarChart.prototype.initLayer = function() {
		this.barChartLayer = this.misk.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
			.attr("class", "widgetlayer");
	};

	MiskHorizBarChart.prototype.initAxis = function() {
		var self = this;
		//barchart
		this.xScale = d3.scale
			.linear()
			.range([0, this.width]);

		this.yScale = d3.scale
			.ordinal()
			.rangeBands([this.height, 0], 0.1, 0.1);

		this.yAxis = d3.svg.axis()
			.scale(this.yScale)
			.orient("left")
			.tickSize(3, 1)
			.ticks(4);

		this.xAxis = d3.svg.axis()
			.scale(this.xScale)
			.orient("bottom")
			.tickSize(3, 1)
			.ticks(4);
		// this.grid=d3.svg.axis().scale(this.yScale).orient("left").ticks(4).tickSize(-this.width,0,0);

		this.timeYAxisInstance = this.barChartLayer
			.append("g")
			.attr("class", "yaxis");

		this.timeXAxisInstance = this.barChartLayer
			.append("g")
			.attr("class", "xaxis")
			.attr("transform", "translate(0," + self.height + ")");
	};

	MiskHorizBarChart.prototype.updateAxis = function() {
		var self = this;
		//PieChart
		this.caption = this.barChartLayer
			.append("text")
			.attr("x", (this.width) / 2)
			.attr("y", 0 - this.margin.caption)
			.text("24h Volume (BTC)")
			.attr("class", "title");

		this.xScale.domain(d3.extent(this.volumes, function(volume) {
			return volume.volume;
		}));

		this.yScale.domain(_.last(this.volumes, 4).map(function(volume) {
			return volume.platform;
		}));

		this.timeYAxisInstance.call(self.yAxis);

		this.VolumeBarChart = this.barChartLayer
			.selectAll("rect")
			.data(_.last(this.volumes, 4));

		this.VolumeBarChart
			.enter()
			.append("rect")
			.attr("class", "volume")
			.attr("y", function(volume, i) {
				return self.yScale(volume.platform);
			})
			.attr("height", function(volume) {
				var height = self.yScale.rangeBand();
				return height;
			})
			.attr("width", function(volume) {
				var width = self.xScale(volume.volume);
				return width;
			})
			.style("fill", function(volume) {
				return volume.color;
			});

		this.VolumeBarChart.enter().append("text")
			.attr("class", "volTitle")
			.text(function(volume) {
				return volume.volume;
			})
			.attr("x", function(volume, i) {
				return self.xScale(volume.volume);
			})
			.attr("y", function(volume) {
				var midText = parseFloat($("text.volTitle").css("font-size"));
				var midRec = parseFloat($("rect.volume").attr("height") / 2);
				return self.yScale(volume.platform) + midText / 2 + midRec;
			});

		this.VolumeBarChart.enter().append("text")
			.text(function(volume, i) {
				var voltot = self.volumetotal(_.last(self.volumes, 4));
				return ((volume.volume / voltot) * 100).toFixed(2) + "%";
			})
			.attr("x", function(volume, i) {
				return self.margin.pourcent;
			})
			.attr("y", function(volume) {
				var midText = parseFloat($("text.volTitle").css("font-size"));
				var midRec = parseFloat($("rect.volume").attr("height") / 2);
				return self.yScale(volume.platform) + midText / 2 + midRec;
			}).attr("class", "pourcent");

	};

	MiskHorizBarChart.prototype.draw = function() {
		this.parseCollections();
		this.updateAxis();
	};

	MiskHorizBarChart.prototype.update = function() {
		this.draw();
	};

	return MiskHorizBarChart;

});