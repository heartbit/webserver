define('miskbarchart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

	function MiskBarChart(el) {
		this.el = el;
		this.initChart();
		this.initLayer();
	};

	MiskBarChart.prototype.parseCollections = function(collections) {
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

	MiskBarChart.prototype.initChart = function() {
		var self = this;

		this.margin = {
			top: 50,
			bottom: 20,
			left: 50,
			right: 50,
			caption: 6,
			captionVol: 4,
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

	MiskBarChart.prototype.initLayer = function() {
		this.barChartLayer = this.misk
			.append("g")
			.attr("class", "barChartLayer")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
		this.initAxis();
	};

	MiskBarChart.prototype.initAxis = function() {
		var self = this;
		//barchart
		this.yScale = d3.scale
			.linear()
			.range([this.height, 0]);
		this.xScale = d3.scale
			.ordinal()
			.rangeBands([0, this.width], 0.25, 0.25);

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

		this.grid = d3.svg.axis()
			.scale(this.yScale)
			.orient("left")
			.ticks(4)
			.tickSize(-this.width, 0, 0);

		this.timeYAxisInstance = this.barChartLayer
			.append("g")
			.attr("class", "yaxis");

		this.timeXAxisInstance = this.barChartLayer
			.append("g")
			.attr("class", "xaxis")
			.attr("transform", "translate(0," + self.height + ")");

		this.gridInstance = this.barChartLayer
			.append("g")
			.attr("class", "grid");

	};

	MiskBarChart.prototype.updateAxis = function() {
		var self = this;
		//PieChart
		this.caption = this.barChartLayer
			.append("text")
			.attr("x", (this.width) / 2)
			.attr("y", 0 - this.margin.caption)
			.text("24h Volume (BTC)")
			.attr("class", "title");

		this.xScale.domain(_.last(this.volumes, 4).map(function(volume) {
			return volume.platform;
		}));
		this.yScale.domain(d3.extent(this.volumes, function(volume) {
			return volume.volume + volume.volume * 0.3;
		}));

		this.gridInstance.call(self.grid);
		this.timeYAxisInstance.call(self.yAxis);
		this.timeXAxisInstance.call(self.xAxis);

		this.VolumeBarChart = this.barChartLayer.selectAll("rect").data(_.last(this.volumes, 4));

		this.VolumeBarChart.enter().append("rect")
			.attr("class", "volume")
			.attr("x", function(volume, i) {
				return self.xScale(volume.platform);
			})
			.attr("y", function(volume) {
				return self.yScale(volume.volume);
			})
			.attr("height", function(volume) {
				return self.height - self.yScale(volume.volume);
			})
			.attr("width", function() {
				var width = self.xScale.rangeBand();
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
				return self.xScale(volume.platform) + ($("rect.volume").attr("width")) / 2;
			})
			.attr("y", function(volume) {
				return self.yScale(volume.volume) - self.margin.captionVol;
			})
			.attr("text-anchor", "middle");
	};

	MiskBarChart.prototype.draw = function() {
		this.parseCollections();
		this.updateAxis();
	};

	MiskBarChart.prototype.update = function() {
		this.draw();
	};

	return MiskBarChart;

});