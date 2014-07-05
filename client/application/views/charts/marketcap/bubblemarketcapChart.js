define('bubbleMarketcapChart', ['d3', 'FormatUtils', 'bubbleTooltip', 'moment'], function(d3, FormatUtils, BubbleTooltip) {

	function BubbleChart(el) {

		this.el = el;
		this._width = 500;
		this._height = 600;
		this.width = this._width;
		this.height = this._height;
		this.tooltip = BubbleTooltip("bubbleMarketcapTooltip", 240);

		this.center = {
			x: this.width / 2,
			y: this.height / 2
		};

		this.group_centers = {
			"VL": {
				x: 1 * this.width / 10,
				y: this.height / 2,
				label: "< 100"
			},
			"L": {
				x: 2 * this.width / 10,
				y: this.height / 2,
				label: "< 1K"
			},
			"ML": {
				x: 3 * this.width / 10,
				y: this.height / 2,
				label: "< 10K"
			},
			"MH": {
				x: 4 * this.width / 10,
				y: this.height / 2,
				label: "< 100K"
			},
			"H": {
				x: 5 * this.width / 10,
				y: this.height / 2,
				label: "< 1M"
			},
			"VH": {
				x: 6.5 * this.width / 10,
				y: this.height / 2,
				label: "> 1M"
			}
		};
		this.fill_color = d3.scale.ordinal().domain(["VL", "L", "ML", "MH", "H", "VH"]).range(["#d84b2a", "#d2413c", "#ff5f3a", "#ff922d", "#76cc99", "#2e806c"]);

		this.layout_gravity = -0.001;
		this.damper = 0.1;
		this.vis = null;
		this.nodes = [];
		this.force = null;
		this.circles = null;
	};

	BubbleChart.prototype.draw = function(marketcaps) {

		this.marketcaps = marketcaps;

		// Scale radius
		var min_max_marketcap = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.marketcap;
		});
		this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, min_max_marketcap[1]]).range([8, 60]);

		// Scale price
		var min_max_price = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.price;
		});
		this.priceScale = d3.scale.log()
			.domain(min_max_price)
			.range([150, this.height - 150]);

		// Scale supply
		var min_max_supply = d3.extent(this.marketcaps, function(marketcap) {
			return +marketcap.supply;
		});
		this.supplyScale = d3.scale.linear()
			.domain(min_max_supply)
			.range([150, this.width - 150]);

		this.initTemplates();
		this.create_nodes();
		this.create_vis();
		this.start();
		this.display_group_all();
	};

	BubbleChart.prototype.create_nodes = function() {
		var _this = this;

		var determine_group = function(marketcap) {
			if (marketcap.marketcap < 100) {
				return "VL";
			}
			if (marketcap.marketcap < 1000) {
				return "L";
			}
			if (marketcap.marketcap < 10000) {
				return "ML";
			}
			if (marketcap.marketcap < 100000) {
				return "MH";
			}
			if (marketcap.marketcap < 1000000) {
				return "H";
			} else {
				return "VH";
			}
		};

		this.marketcaps.forEach(function(marketcap, index) {

			// marketcap.group = determine_group(marketcap);
			// _.each(marketcap.profiles, function(profile) {
			// 	profile.visits = parseInt(profile.visits) || 0;
			// });
			// d.profiles = _.sortBy(d.profiles, function(profile) {
			// 	return profile.visits;
			// }).reverse();

			var node = {
				id: marketcap.currencyId,
				correlation: marketcap.correlation,
				marketcap: +marketcap.marketcap || 0,
				name: marketcap.name,
				price: +marketcap.price || 0,
				priceChange: +marketcap.price || 0,
				supply: +marketcap.supply || 0,
				volumeChange: +marketcap.volumeChange || 0,
				volume: +marketcap.volume || 0,
				radius: _this.radius_scale(parseInt(marketcap.marketcap)) || 0,
				x: Math.random() * _this.width,
				y: Math.random() * _this.height
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

		var svg_nodes = this.vis.append('g').attr('class', 'nodes');
		this.circles = svg_nodes.selectAll("circle").data(this.nodes, function(d) {
			return d.id;
		});

		this.circles
			.enter()
			.append("circle")
			.attr("r", 0)
			.attr("fill", function(d) {
				return 'blue'; //_this.fill_color(d.group);
			}).attr("stroke-width", 2).attr("stroke", function(d) {
				return d3.rgb('blue').darker();
			}).attr("id", function(d) {
				return "bubble_" + d.id;
			})
			.on("mouseover", function(marketcap, i) {
				return _this.show_details(marketcap, i, this);
			}).on("mouseout", function(marketcap, i) {
				return _this.hide_details(marketcap, i, this);
			})
		// .on("click", function(marketcap, i) {
		// 	return _this.show_profiles(marketcap, i, this);
		// });

		return this.circles
			.transition()
			.duration(2000)
			.attr("r", function(node) {
				return node.radius || 0;
			});
	};

	BubbleChart.prototype.charge = function(marketcap) {
		return -Math.pow(marketcap.radius, 2.0) / 8;
	};

	BubbleChart.prototype.start = function() {
		return this.force = d3.layout.force()
			.nodes(this.nodes)
			.size([this.width, this.height]);
	};

	BubbleChart.prototype.display_group_all = function() {
		var _this = this;
		this.force.gravity(this.layout_gravity)
			.charge(this.charge)
			.friction(0.9).on("tick", function(e) {
				return _this.circles.each(_this.move_towards_center(e.alpha))
					.attr("cx", function(d) {
						return d.x;
					}).attr("cy", function(d) {
						return d.y;
					});
			});
		this.force.start();
		return this.hide_groups();
	};

	BubbleChart.prototype.move_towards_center = function(alpha) {
		var _this = this;
		return function(d) {
			d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
			return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
		};
	};



	// X axis
	BubbleChart.prototype.display_by_groups = function() {
		var _this = this;
		this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
			return _this.circles.each(_this.move_towards_group(e.alpha)).attr("cx", function(d) {
				return d.x;
			}).attr("cy", function(d) {
				return d.y;
			});
		});
		this.force.start();
		return this.display_groups();
	};
	BubbleChart.prototype.move_towards_group = function(alpha) {
		var _this = this;
		return function(d) {
			var target;
			target = _this.group_centers[d.group];
			d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
			return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
		};
	};

	BubbleChart.prototype.display_groups = function() {
		var _this = this;
		var svg_xAxis = this.vis.append('g').attr('class', 'xAxis');
		var groups = svg_xAxis.selectAll(".groups").data(_.values(_this.group_centers));
		groups.enter()
			.append("text")
			.attr("class", "groups")
			.attr("x", function(d) {
				return d.x;
			})
			.attr("y", 40)
			.attr("text-anchor", "middle").text(function(d) {
				return d.label;
			});
	};

	BubbleChart.prototype.hide_groups = function() {
		this.vis.selectAll(".groups").remove();
	};



	// Y axis
	BubbleChart.prototype.display_by_price = function() {
		var _this = this;
		this.force.gravity(this.layout_gravity)
			.charge(this.charge)
			.friction(0.9).on("tick", function(e) {
				return _this.circles.each(_this.move_towards_price(e.alpha))
					.attr("cx", function(d) {
						return d.x;
					}).attr("cy", function(d) {
						return d.y;
					});
			});
		this.force.start();
		return this.display_groups();
	};

	BubbleChart.prototype.move_towards_price = function(alpha) {
		var _this = this;
		return function(marketcap, i, j) {
			// var target = _this.priceScale[marketcap.price];
			// marketcap.x = marketcap.x + (target.x - marketcap.x) * (_this.damper + 0.02) * alpha * 1.1;
			var y = _this.priceScale(marketcap.price);
			return marketcap.y = marketcap.y + (y - marketcap.y) * (_this.damper + 0.02) * alpha * 1.1;
		};
	};

	BubbleChart.prototype.display_price = function() {
		var _this = this;
		var yAxis = d3.svg.axis()
			.scale(_this.priceScale)
			.orient("left");

		var svg_yAxis = this.vis.append('g')
			.attr('class', 'yAxis')
			.call(yAxis);
	};

	// Tooltip
	BubbleChart.prototype.show_details = function(data, i, element) {
		d3.select(element)
			.attr("stroke", "black");
		var htmlTooltip = this.tooltipTemplate(data);
		return this.tooltip.showTooltip(htmlTooltip, d3.event);
	};


	BubbleChart.prototype.hide_details = function(data, i, element) {
		var _this = this;
		d3.select(element).attr("stroke", function(d) {
			return d3.rgb(_this.fill_color(d.group)).darker();
		});
		return this.tooltip.hideTooltip();
	};

	BubbleChart.prototype.initTemplates = function() {
		// var simple = 'hello';
		var simple = '<h3><%= name %></h3>'
		simple += '<span class="name">Marketcap: </span>';
		simple += '<span class="value"><%= marketcap %></span>';
		simple += '<br/><span class="name">Price: </span>';
		simple += '<span class="value"><%= price %></span>';
		simple += '<br/><span class="name">Supply: </span>';
		simple += '<span class="value"><%= supply %></span><br/>';
		simple += '<span class="name">Volume: </span>';
		simple += '<span class="value"><%= volume %></span>';
		simple += '<br/><span class="name">Volume change: </span>';
		simple += '<span class="value"><%= volumeChange %></span>';
		simple += '<br/><span class="name">Correlation: </span>';
		simple += '<span class="value"><%= correlation %></span><br/>';
		this.tooltipTemplate = _.template(simple);
		// var advanced = simple + '<% _.each(_.keys(custom), function(key){ %><span class="name"><%= key %> </span><span class="value"> <%= custom[key] %></span><br/><% }); %>';
		// this.tooltipWebsiteTemplate = _.template(advanced);
	};

	// BubbleChart.prototype.show_profiles = function(data, i, element) {
	// 	var custom = {
	// 		"Top 5": "visits"
	// 	};

	// 	_.each(_.first(data.profiles, 5), function(profile) {
	// 		custom[profile.website] = profile.visits;
	// 	});

	// 	d3.select(element).attr("stroke", "black");
	// 	data.custom = custom;

	// 	var htmlTooltip = this.tooltipWebsiteTemplate(data);
	// 	return this.tooltip.showTooltip(htmlTooltip, d3.event);
	// };

	return BubbleChart;

});