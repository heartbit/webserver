define('depthchart', ['config', 'd3', 'FormatUtils', 'moment'],
    function(config, d3, FormatUtils, Moment) {

        var DepthChart = function(el) {
            var self = this;

            this.el = el;
            _.bindAll(
                this,
                'initOnMouseOverEvents'
            );

            this.maxBidNumber = d3.select('#js-maxBid');
            this.minAskNumber = d3.select('#js-minAsk');

            this.margin = {
                top: 20,
                right: 10,
                bottom: 30,
                left: 40
            };

            this.width = $(el).width() - this.margin.left - this.margin.right,
            this.height = $(el).height() - this.margin.top - this.margin.bottom;
           
            this.chart = d3.select(el).append("svg")
                .attr("class", 'playground')
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom);

            this.chart.call(this.initOnMouseOverEvents);

            this.mainLayer = this.chart.append("g").attr("class", 'mainLayer')
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

            this.xScale = d3.scale.linear()
                .range([0, this.width]);

            this.xAxis = d3.svg.axis()
                .scale(this.xScale)
                .orient("bottom")
                .ticks(6)
                .tickFormat(function(d) {
                    return FormatUtils.formatValueShort(d);
                });

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
                    return self.xScale(d.price);
                })
                .y(function(d) {
                    return self.yScale(d.amount);
                });

            /** Axis **/
            this.x_axis = this.mainLayer.append("g")
                .attr("class", "x_axis")
                .attr("transform", "translate(0," + this.height + ")");

            this.y_axis = this.mainLayer.append("g")
                .attr("class", "y_axis")

            /** Area **/
            this.depthLayer = this.mainLayer
                .append("g")
                .attr("class", "depthLayer");
            // this.wallBids = this.depthLayer.append("path").attr("d", self.line(murBids)).attr("class", "depthBid");
            // this.wallAsks = this.depthLayer.append("path").attr("d", self.line(murAsks)).attr("class", "depthAsk");
            this.lineAsks = this.depthLayer
                .append("path")
                .attr("class", "depthAreaBids");

            this.lineBids = this.depthLayer
                .append("path")
                .attr("class", "depthAreaAsks");

            /** Tooltip **/
            this.tooltipLayer = this.mainLayer
                .append("g")
                .attr("class", "tooltipLayer")
                .attr('opacity', 0);

            this.currentPositionXLine = this.tooltipLayer
                .append("line")
                .attr('class', 'currentPositionXLine')
                .attr('y1', 0)
                .attr('y2', this.height)
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('stroke', 'gray')
                .attr('stroke-width', 1);

            this.currentPositionLabelAmount = this.tooltipLayer
                .append('text')
                .attr('class', 'currentPositionLabelAmount');

            var offset = 25;
            this.currentPositionLabelPrice = this.tooltipLayer
                .append('text')
                .attr("transform", function() {
                    return "translate(0," + offset + ")";
                })
                .attr('class', 'currentPositionLabelPrice');

            this.currentPositionYLine = this.tooltipLayer
                .append("line")
                .attr('class', 'currentPositionYLine')
                .attr('y1', 0)
                .attr('y2', 0)
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('stroke', 'gray')
                .attr('stroke-width', 1);

            this.circlesLayer = this.tooltipLayer
                .append("g")
                .attr('class', "circles_layer");
        };

        DepthChart.prototype.clearGraph = function() {
            // this.mainLayer.selectAll('.depthLayer').html();
            // this.mainLayer.selectAll('.x_axis').remove();
            // this.mainLayer.selectAll('.y_axis').remove();
            // this.circles.remove();
        };

        DepthChart.prototype.draw = function(depth) {
            var self = this;
            if (!depth) return;
            this.depth = depth;

            var ymargin = 30;

            this.circlesData = depth.Circles;
            var depthMin = depth.DepthMin;
            var depthMax = depth.DepthMax;
            var murBids = depth.MurBids;
            var murAsks = depth.MurAsks;

            this.yScale.domain([d3.min(depthMin.map(function(depth) {
                return depth.amount;
            })), d3.max(depthMax.map(function(depth) {
                return depth.amount;
            }))]);

            this.xScale.domain([d3.min(murBids.map(function(depth) {
                return depth.price;
            })), d3.max(murAsks.map(function(depth) {
                return depth.price;
            }))]);

            this.x_axis
                .transition()
                .duration(100)
                .call(this.xAxis);

            this.y_axis
                .transition()
                .duration(100)
                .call(this.yAxis);

            this.lineAsks
                .datum(murAsks)
                .transition()
                .duration(100)
                .attr("d", this.area);
            this.lineBids
                .datum(murBids)
                .transition()
                .duration(100).attr("d", this.area);

            var circleRadius = 4;

            this.circles = this.circlesLayer
                .selectAll(".circle")
                .data(this.circlesData, function(d) {
                    return d.price;
                });

            this.circles
                .exit()
                .remove();

            this.circles
                .enter()
                .insert("circle")
                .attr("class", "circle");

            this.circles
                .transition()
                .duration(100)
                .attr('cx', function(d) {
                    return self.xScale(d.price);
                })
                .attr('cy', function(d) {
                    return self.yScale(d.amount);
                })
                .attr('r', 0);

            // get max murbids
            this.maxBid = _.max(murBids, function(bid) {
                return bid.price;
            });
            // get min murAsks
            this.minAsk = _.min(murAsks, function(ask) {
                return ask.price;
            });

            var leftOffsetMaxBid = this.xScale(this.maxBid.price) - this.margin.left - this.margin.right - 5;
            var leftOffsetMinAsk = this.xScale(this.minAsk.price) - this.margin.left - this.margin.right;

            this.maxBidNumber
                .transition()
                .duration(100)
                .style('left', leftOffsetMaxBid + 'px');

            this.minAskNumber
                .transition()
                .duration(100)
                .style('left', leftOffsetMinAsk + 'px');
        };

        DepthChart.prototype.initOnMouseOverEvents = function(element) {
            var self = this;
            element
                .on("mouseover", function() {
                    self.tooltipLayer
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);
                })
                .on("mouseout", function() {
                    self.circles
                        .transition()
                        .duration(100)
                        .attr('r', 0);
                    self.tooltipLayer
                        .transition()
                        .duration(100)
                        .attr('opacity', 0);
                })
                .on("mousemove", function() {
                    if (!self.depth) {
                        return;
                    }

                    var mouse = d3.mouse(this);
                    var mousex = +mouse[0];
                    var mousey = +mouse[1];

                    var findClosestPrice = function(x) {
                        var price = self.xScale.invert(x);
                        var fakePoint = {
                            price: price
                        }
                        var pointIndex = _.sortedIndex(self.circlesData, fakePoint, 'price');
                        var circle = self.circles[0][pointIndex];
                        return {
                            index: pointIndex,
                            circle: circle
                        };
                    };

                    self.closestPoint = findClosestPrice(mousex - self.margin.left);

                    if (!self.closestPoint || !self.closestPoint.circle || !self.closestPoint.index) {
                        return;
                    }

                    self.circles
                        .attr('r', function(d, i) {
                            return i == self.closestPoint.index ? 3 : 0;
                        });

                    var currentCircle = d3.select(self.closestPoint.circle);

                    self.currentPositionXLine
                        .attr('x1', currentCircle.attr('cx'))
                        .attr('y1', currentCircle.attr('cy'))
                        .attr('x2', currentCircle.attr('cx'));

                    self.currentPositionYLine
                        .attr('x1', currentCircle.attr('cx'))
                        .attr('y1', currentCircle.attr('cy'))
                        .attr('y2', currentCircle.attr('cy'));

                    self.currentPositionLabelAmount
                        .style("text-anchor", function() {
                            return currentCircle.attr('cx') > self.width / 2 ? "end" : "start";
                        })
                        .attr("transform", function(d) {
                            return "translate(" + currentCircle.attr('cx') + ",0)";
                        })
                        .text(function(d, i, j) {
                            var currentPrice = currentCircle.data()[0].price;
                            var askBid = currentPrice >= self.minAsk.price ? "Ask: " : 'Bid: '
                            return askBid + FormatUtils.formatValue(currentCircle.data()[0].amount, 0);
                        });

                    self.currentPositionLabelPrice
                        .style("text-anchor", function() {
                            return currentCircle.attr('cx') > self.width / 2 ? "end" : "start";
                        })
                        .attr("transform", function(d) {
                            return "translate(" + currentCircle.attr('cx') + ",25)";
                        })
                        .text('Price: ' + FormatUtils.formatPrice(currentCircle.data()[0].price, 0));

                });

        };

        return DepthChart;

    });