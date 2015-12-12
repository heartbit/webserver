var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var defaultDuration = 200;

var orderbookChartD3 = function(el, params) {
	this.el = el;
	this.params = params;

	this.initChart();
	this.initXAxis();
	this.initYAxis();

}

orderbookChartD3.prototype.initChart = function() {
 	var self = this;

    this.margin = {
        top: 30,
        right: 35,
        bottom: 20,
        left: 35
    };

    var visWidth = $(this.el).width();
    // var visHeigth = $(this.el).height();
    var visHeigth = 320;

    this.width = visWidth - this.margin.left - this.margin.right;
    this.height = visHeigth - this.margin.top - this.margin.bottom;

    this.chart = d3.select(this.el)
        .append('svg')
        .attr("class", 'playgroundOrderbook')
	    .attr("width", visWidth)
	    .attr("height", visHeigth)
	    .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
        .call(this.initOnMouseOverEvents);

    this.mainLayer = this.chart
        .append("g")
        .attr("class", 'mainLayerOrderbook')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.bidLineInstance = this.mainLayer.append("path")
		.attr("class", "bid_line");

	this.askLineInstance = this.mainLayer.append("path")
		.attr("class", "ask_line");

	this.tooltipLayer = this.mainLayer
        .append("g")
        .attr("class", "tooltipLayer")
        .attr('opacity', 0);
}

orderbookChartD3.prototype.initXAxis = function() {
	var self = this;
	this.xScale = d3.scale.linear().range([0, this.width]);

	this.xAxis = d3.svg.axis()
		.scale(this.xScale)
		.orient('bottom');
		// .ticks(8);

	this.xAxisInstance = this.mainLayer.append('g')
		.attr('class', 'x_time_axis')
		.attr('transform', 'translate(0,' + String(self.height)+")");

}

orderbookChartD3.prototype.initYAxis = function() {
	var self = this;
	//Left Y axis
	this.yScaleLeft = d3.scale.linear().range([this.height, 0]);

	this.yAxisLeft = d3.svg.axis()
		.scale(this.yScaleLeft)
		.orient('left')
		.tickFormat(function(d) {
            return FormatUtils.formatValueShort(d, 3);
        })
		.ticks(8);

	this.yAxisLeftInstance = this.mainLayer.append("g")
		.attr("class","y_orderbook_axis");

	// Right Y axis
	this.yScaleRight = d3.scale.linear().range([this.height, 0]);
	this.yAxisRight = d3.svg.axis()
		.scale(this.yScaleRight)
		.orient('right')
		.tickFormat(function(d) {
            return FormatUtils.formatValueShort(d, 3);
        })
		.ticks(8);

	this.yAxisRightInstance = this.mainLayer.append("g")
		.attr("class","y_orderbook_axis")
		.attr("transform", "translate("+this.width+",0)");
}

orderbookChartD3.prototype.updateXAxis = function(data) {
	var self = this;
	var visWidth = $(this.el).width();
    this.width = visWidth - this.margin.left - this.margin.right;
	this.xScale.range([0, this.width]);
	this.xScale.domain([d3.min(data.bid.map(function(order){
		return order.price;
	})), d3.max(data.ask.map(function(order){
		return order.price;
	}))]);
	this.xAxisInstance.call(this.xAxis);
}

orderbookChartD3.prototype.updateYAxis = function(data) {
	var self = this;
	// Left Y Axis
	this.yScaleLeft.domain([d3.min(data.bid.map(function(order){
		return order.sum;
	})),  d3.max([data.ask[data.ask.length-1].sum, data.bid[data.bid.length-1].sum])]);

	this.yAxisLeftInstance.call(this.yAxisLeft);

	// Right Y Axis
	this.yScaleRight.domain([d3.min(data.ask.map(function(order){
		return order.sum;
	})), d3.max([data.ask[data.ask.length-1].sum, data.bid[data.bid.length-1].sum])]);

	this.yAxisRightInstance.call(this.yAxisRight);


}

orderbookChartD3.prototype.draw = function(d) {
	var self = this;
	// data.bid = data.bid.slice(0, 20);
	// data.ask = data.ask.slice(0, 100);
	var data = {};
	data.bid = this.zoom(d,'bid', 0.5);
	data.ask = this.zoom(d, 'ask', 1.5);
	this.updateXAxis(data);
	this.updateYAxis(data);

	// Bid
	this.bidLine = d3.svg.line()
		.x(function(d) {
			return self.xScale(d.price);
		})
		.y(function(d) {
			return self.yScaleRight(d.sum);
		});
	this.bidLineInstance
		.transition()
		.attr("d", self.bidLine(data.bid));

	// Ask
	this.askLine = d3.svg.line()
		.x(function(d) {
			return self.xScale(d.price);
		})
		.y(function(d) {
			return self.yScaleRight(d.sum);
		});
	this.askLineInstance
		.transition()
		.attr("d", self.askLine(data.ask));
 
}

orderbookChartD3.prototype.update = function(d) {
	this.draw(d);
}

orderbookChartD3.prototype.resize = function(d) {
	var self = this;
	var visWidth = $(self.el).width();
    var visHeigth = 350;
    self.width = visWidth - self.margin.left - self.margin.right;
    self.height = visHeigth - self.margin.top - self.margin.bottom;
	this.yAxisRightInstance.attr("transform", "translate(" + self.width + ",0)");

    self.chart
        .attr("width", visWidth)
        .attr("height", visHeigth)
        .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
        .call(self.initOnMouseOverEvents);

    self.mainLayer
        .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
        
	this.update(d);
}

orderbookChartD3.prototype.initOnMouseOverEvents =  function() {

}

orderbookChartD3.prototype.zoom = function(data, side, coef) {
	if (coef == 'all') return data[side];

	var s1 = data.bid[0].price;
	var s2 = data.ask[0].price;
	var result = [];
	var spread = [s1, s2];

	_.each(data[side], function(d, i) {
		if(side == "bid") {
			if(d.price >= s1*coef) {
				result.push(d);
			}
		} else if(side == "ask") {
			if(d.price <= s2*coef) {
				result.push(d);
			}
		}

	})
	return result;
}

orderbookChartD3.prototype.mouseover = function() {

}

orderbookChartD3.prototype.mouseout = function() {
	
}


orderbookChartD3.prototype.hide = function() {
    this.isVisible = false;
    this.mainLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 0);
}

orderbookChartD3.prototype.show = function() {
    this.isVisible = true;
    this.mainLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 1);
}

// orderbookChartD3.prototype.remove = function() {
// 	d3.select(this.el).remove();
// }
 
module.exports = orderbookChartD3;