define('bubbleMarketcapChart', ['d3', 'FormatUtils', 'bubbleTooltip', 'moment'], function(d3, FormatUtils, BubbleTooltip) {

	function BubbleChart(el) {
		this.el = el;
		this.tooltip = new BubbleTooltip("bubbleMarketcapTooltip", 240);
		this.fill_color = d3.scale.ordinal().range(["#cacaca", "#d3a28e", "#57c0cd", "#555b67", "#32589a", "#9a4032"]);
		this.layout_gravity = -0.001;
		this.damper = 0.05;
		this.vis = null;
		this.nodes = [];
		this.force = null;
		this.circles = null;
	};

	BubbleChart.prototype.draw = function(marketcaps) {
		this.fill_color.domain(d3.range(0, marketcaps.length));
		// d3.range(0, 7)
		// .forEach(function(d) {
		// 	console.log(this.fill_color(d));
		// })
		this.marketcaps = marketcaps;
		this._width = $('#js-marketcapModal').width() + 100;
		this._height = 250;
		this.width = this._width;
		this.height = this._height;

		this.center = {
			x: this.width / 2,
			y: this.height / 2
		};

		// Scale radius
		var min_max_marketcap = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.marketcap;
		});
		this.radius_scale = d3.scale
			.pow()
			.exponent(0.15)
			.domain([min_max_marketcap[0], min_max_marketcap[1]])
			.range([10, 50]);

		// Scale price
		var min_max_price = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.price;
		});
		this.priceScale = d3.scale.log()
			.domain(min_max_price)
			.range([120, this.width - 200]);

		// Scale supply
		var min_max_supply = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.supply;
		});
		this.supplyScale = d3.scale.log()
			.domain(min_max_supply)
			.range([this.height - 100, 100]);

		this.initTemplates();
		this.create_nodes();
		this.create_vis();
		this.start();
		this.display_all();
	};

	BubbleChart.prototype.create_nodes = function() {
		var _this = this;

		this.marketcaps.forEach(function(marketcap, index) {
			var node = {
				id: marketcap.currencyId,
				correlation: marketcap.correlation,
				marketcap: +marketcap.marketcap || 0,
				//name: marketcap.name,
				price: +marketcap.price || 0,
				priceChange: +marketcap.price || 0,
				supply: +marketcap.totalCoin || 0,
				volumeChange: +marketcap.volumeChange || 0,
				volume: +marketcap.volume || 0,
				radius: _this.radius_scale(parseInt(marketcap.marketcap)) || 0,
				x: Math.random() * _this.width,
				y: Math.random() * _this.height / 2.5
			};

			return _this.nodes.push(node);
		});
		return this.nodes.sort(function(a, b) {
			return b.marketcap - a.marketcap;
		});
	};

	BubbleChart.prototype.create_vis = function() {
		var _this = this;

		this.vis = d3.select(this.el)
			.append("svg")
			.attr("width", this._width)
			.attr("height", this._height)
			.attr("id", "bubbleMarketCapChart");

		this.xAxis = d3.svg.axis()
			.scale(this.priceScale)
			.orient("bottom")
			.tickValues([100, 10, 1, .1, .01, .001])
			.tickFormat(function(supply, i, j) {
				return FormatUtils.formatPrice(supply, 'USD');
			})
		// .tickSubdivide(3)
		// .tickSize(12, 4, -10)
		// .tickFormat(function(price) {
		// 	return FormatUtils.formatPrice(price);
		// });

		this.svg_xAxis = this.vis
			.append('g')
			.attr('class', 'xAxis')
			.attr("transform", "translate(0,0)")
			.attr('opacity', 0)
			.call(this.xAxis);

		this.yAxis = d3.svg.axis()
			.scale(this.supplyScale)
			.orient("right")
			.tickValues([1000000, 10000000, 100000000, 1000000000, 10000000000, 10000000000])
			.tickSize(12, 4, -10)
			.tickFormat(function(supply, i, j) {
				return FormatUtils.formatValueShort(supply, 4);
			});

		this.svg_yAxis = this.vis
			.append('g')
			.attr('class', 'yAxis')
			.attr("transform", "translate(50,0)")
			.attr('opacity', 0)
			.call(this.yAxis);

		var svg_nodes = this.vis
			.append('g')
			.attr('class', 'nodes');

		this.circles = svg_nodes
			.selectAll("circle")
			.data(this.nodes, function(d) {
				return d.id;
			});

		this.circles
			.enter()
			.append("circle")
			.attr("r", 0)
			.attr("fill", function(d, i) {
				return _this.fill_color(i);
			})
			.attr("stroke-width", 0)
			.attr("stroke", function(d, i) {
				return d3.rgb(_this.fill_color(i)).brighter(1);
			})
			.attr("id", function(d) {
				return "bubble_" + d.id;
			})
			.on("mouseover", function(marketcap, i) {
				d3.select(this).attr("stroke-width", 2);
				return _this.show_details(marketcap, i, this);
			}).on("mouseout", function(marketcap, i) {
				d3.select(this).attr("stroke-width", 0);
				return _this.hide_details(marketcap, i, this);
			});

		this.circles
			.transition()
			.duration(1000)
			.attr("r", function(node) {
				return node.radius || 0;
			});

		return true;
	};

	BubbleChart.prototype.charge = function(marketcap) {
		return -Math.pow(marketcap.radius, 2.1) / 8;
	};

	BubbleChart.prototype.start = function() {
		return this.force = d3.layout.force()
			.nodes(this.nodes)
			.size([this.width, this.height]);
	};

	// Init display
	BubbleChart.prototype.display_all = function() {
		var _this = this;
		this.force
			.gravity(this.layout_gravity)
			.charge(this.charge)
			.friction(0.9)
			.on("tick", function(e) {
				return _this.circles
					.each(_this.move_towards_center(e.alpha))
					.attr("cx", function(d) {
						return d.x;
					}).attr("cy", function(d) {
						return d.y;
					});
			});

		this.svg_yAxis
			.transition()
			.duration(300)
			.attr('opacity', 0);

		this.svg_xAxis
			.transition()
			.duration(300)
			.attr('opacity', 0);

		this.force.start();
		return false;
	};

	BubbleChart.prototype.move_towards_center = function(alpha) {
		var _this = this;
		return function(d) {
			d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
			return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
		};
	};

	// Y axis
	BubbleChart.prototype.display_by_supply = function() {
		var _this = this;
		this.force
			.gravity(this.layout_gravity)
			.charge(this.charge)
			.friction(0.9)
			.on("tick", function(e) {
				return _this.circles
					.each(_this.move_towards_supply(e.alpha))
					.attr("cx", function(d) {
						return d.x;
					}).attr("cy", function(d) {
						return d.y;
					});
			});

		this.svg_yAxis
			.transition()
			.duration(300)
			.attr('opacity', 1);

		this.force.start();
		return false;
	};

	BubbleChart.prototype.move_towards_supply = function(alpha) {
		var _this = this;
		return function(marketcap) {
			var y = _this.supplyScale(marketcap.supply);
			return marketcap.y = marketcap.y + (y - marketcap.y) * (_this.damper + 0.02) * alpha * 1.1;
		};
	};

	// X axis
	BubbleChart.prototype.display_by_price = function() {
		var _this = this;
		this.force
			.gravity(this.layout_gravity)
			.charge(this.charge)
			.friction(0.9).on("tick", function(e) {
				return _this.circles
					.each(_this.move_towards_price(e.alpha))
					.attr("cx", function(d) {
						return d.x;
					})
					.attr("cy", _this.height / 2);
			});

		this.svg_xAxis
			.transition()
			.duration(300)
			.attr('opacity', 1);

		this.force.start();

		return false;
	};

	BubbleChart.prototype.move_towards_price = function(alpha) {
		var _this = this;
		return function(marketcap, i, j) {
			var x = _this.priceScale(marketcap.price);
			return marketcap.x = marketcap.x + (x - marketcap.x) * (_this.damper + 0.02) * alpha * 0.08;
		};
	};

	// Tooltip
	BubbleChart.prototype.show_details = function(data, i, element) {
		data.FormatUtils = FormatUtils;
		var htmlTooltip = this.tooltipTemplate(data);
		this.tooltip.showTooltip(htmlTooltip, d3.event);
		return false;
	};

	BubbleChart.prototype.hide_details = function(data, i, element) {
		this.tooltip.hideTooltip();
		return false;
	};

	BubbleChart.prototype.initTemplates = function() {
		var simple = '<h3 class="itemLabel"><%= id %></h3>'
		simple += '<span class="name">Marketcap: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatValueShort(marketcap, 4) %></span>';
		simple += '<br/><span class="name">Price: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatValueShort(price, "USD") %></span>';
		simple += '<br/><span class="name">Supply: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatValueShort(supply, 4) %></span><br/>';
		simple += '<span class="name">Volume: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatValueShort(volume, 4) %></span>';
		simple += '<br/><span class="name">Volume change: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatEvol(volumeChange) %></span>';
		simple += '<br/><span class="name">Correlation: </span>';
		simple += '<span class="value right"> <%= FormatUtils.formatEvol(correlation) %></span><br/>';
		this.tooltipTemplate = _.template(simple);
	};

	return BubbleChart;

});