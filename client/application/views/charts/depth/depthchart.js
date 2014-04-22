define('depthchart', ['config', 'dataHelper', 'd3', 'tooltip', 'FormatUtils', 'moment'], function(config, DataHelper, d3, Tooltip, FormatUtils) {

    var DepthChart = function(el) {
        var self = this;
        this.el = el;
        _.bindAll(
            this,
            'initOnMouseOverEvents'
        );

        this.margin = {
            top: 30,
            right: 50,
            bottom: 30,
            left: 50
        };

        this.dataHelper = new DataHelper();

        this.width = $(el).width() - this.margin.left - this.margin.right,
        this.height = $(el).height() - this.margin.top - this.margin.bottom;

        this.tooltip = new Tooltip(this.el);
        this.chart = d3.select(el).append("svg")
            .attr("class", 'playground')
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        this.mainLayer = this.chart.append("g").attr("class", 'mainLayer')
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .call(this.initOnMouseOverEvents);

        this.xScale = d3.scale.linear()
            .range([0, this.width]);

        this.xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom")
            .ticks(10);

        this.yScale = d3.scale
            .linear()
            .range([this.height, 0]);

        this.yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left")
            .ticks(5)
            .tickFormat(function(d) {
                return FormatUtils.formatValueShort(d, 3);
            });

        this.area = d3.svg.area()
            .x(function(d) {
                return self.xScale(d.price);
            })
            .y0(this.height)
            .y1(function(d) {
                return self.yScale(d.amount);
            });

        this.line = d3.svg.line()
            .x(function(d) {
                return this.xScale(d.price);
            })
            .y(function(d) {
                return this.yScale(d.amount);
            });
    };

    DepthChart.prototype.clearGraph = function() {
        this.mainLayer.selectAll('.depthLayer').remove();
        this.mainLayer.selectAll('.x_axis').remove();
        this.mainLayer.selectAll('.y_axis').remove();
    };

    DepthChart.prototype.draw = function(depth) {
        var self = this;

        this.depth = depth;
        if (this.isDrawn) {
            this.clearGraph();
        }
        var ymargin = 30;

        var lines = this.dataHelper.computeDepth(depth);
        if (!lines) return;

        var depthMin = lines.DepthMin;
        var depthMax = lines.DepthMax;
        var murBids = lines.MurBids;
        var murAsks = lines.MurAsks;

        self.yScale.domain([d3.min(depthMin.map(function(depth) {
            return depth.amount;
        })), d3.max(depthMax.map(function(depth) {
            return depth.amount;
        }))]);

        self.xScale.domain([d3.min(murBids.map(function(depth) {
            return depth.price;
        })), d3.max(murAsks.map(function(depth) {
            return depth.price;
        }))]);

        self.mainLayer.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.height + ")")
            .call(self.xAxis);

        self.mainLayer.append("g")
            .attr("class", "y_axis")
            .call(self.yAxis);

        this.depthLayer = self.mainLayer.append("g").attr("class", "depthLayer");
        this.depthLayer.append("path").attr("d", self.line(murBids)).attr("class", "depthBid");
        this.depthLayer.append("path").attr("d", self.line(murAsks)).attr("class", "depthAsk");
        this.depthLayer.append("path").datum(murBids).attr("d", self.area).attr("class", "depthAreaBids");
        this.depthLayer.append("path").datum(murAsks).attr("d", self.area).attr("class", "depthAreaAsks");
        this.isDrawn = true;
    };

    DepthChart.prototype.initOnMouseOverEvents = function(element) {

        var self = this;
        element
            .on("mouseover", function() {
                self.tooltip.mouseover();
                // self.currentPositionXLine
                //     .transition()
                //     .duration(400)
                //     .attr('opacity', 1);
                // self.currentPositionYLine
                //     .transition()
                //     .duration(400)
                //     .attr('opacity', 1);
            })
            .on("mouseout", function() {
                // self.candleCircles.attr('opacity', function(circle, index) {
                //     return 0.5;
                // });
                // self.volumeBarChart.attr('opacity', function(volumeBar, index) {
                //     return 0.5;
                // });
                self.tooltip.mouseout();
                // self.currentPositionXLine
                //     .transition()
                //     .duration(400)
                //     .attr('opacity', 0);
                // self.currentPositionYLine
                //     .transition()
                //     .duration(400)
                //     .attr('opacity', 0);
            })
            .on("mousemove", function() {
                if (!self.depth) {
                    return;
                }
                var mouse = d3.mouse(this);
                var mousex = +mouse[0];
                var mousey = +mouse[1];
                var minDiff = 5000;

                var findClosestPoint = function(x) {

                    var pointX = self.xScale.invert(x);

                    // Find closest
                    // var closestPoint = self.candleCircles[0];
                    // var pointIndex = 0;
                    // self.candleCircles.each(function(candleCircle, index) {
                    //     var circleX = +d3.select(this).attr('cx');
                    //     var diff = Math.abs((circleX) - (x));
                    //     if (diff < minDiff) {
                    //         minDiff = diff;
                    //         pointIndex = index;
                    //         closestPoint = this;
                    //     }
                    // });


                    return {
                        index: pointX || 0,
                        // candle: d3.select(closestPoint)
                    };
                };

                var closestPoint = findClosestPoint(mousex - self.margin.left);

                var tooltipVariables = {};
                // self.candleCircles
                //     .transition()
                //     .duration(0)
                //     .attr('opacity', function(circle, index) {
                //         if (index == closestPoint.index) {
                //             tooltipVariables.candle = circle;
                //             return 1;
                //         } else {
                //             return 0.5;
                //         }
                //     });
                // self.volumeBarChart.transition()
                //     .duration(0)
                //     .attr('opacity', function(volumeBar, index) {
                //         if (index == closestPoint.index) {
                //             tooltipVariables.volume = volumeBar;
                //             return 1;
                //         } else {
                //             return 0.5;
                //         }
                //     });

                // self.currentPositionXLine
                //     .attr('x1', closestPoint.candle.attr('cx'))
                //     .attr('x2', closestPoint.candle.attr('cx'))
                //     .attr('y1', closestPoint.candle.attr('cy'));

                // self.currentPositionYLine
                // .attr('x1', closestPoint.candle.attr('cx'))
                //     .attr('y1', closestPoint.candle.attr('cy'))
                //     .attr('y2', closestPoint.candle.attr('cy'));

                var position = {
                    left: String(50 + mousex) + 'px',
                    top: String(50 + mousey) + 'px'
                };

                self.tooltip.render(tooltipVariables, position);

            });

    };
    return DepthChart;

});