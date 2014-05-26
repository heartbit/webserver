define('depthchart', ['config', 'dataHelper', 'd3', 'tooltip', 'FormatUtils', 'moment'], function(config, DataHelper, d3, Tooltip, FormatUtils) {

    var DepthChart = function(el) {
        var self = this;
        this.el = el;
        _.bindAll(
            this,
            'initOnMouseOverEvents'
        );

        this.margin = {
            top: 20,
            right: 10,
            bottom: 30,
            left: 40
        };

        this.dataHelper = new DataHelper();

        this.width = $(el).width() - this.margin.left - this.margin.right,
        this.height = $(el).height() - this.margin.top - this.margin.bottom;

        this.tooltip = new Tooltip(this.el);
        this.chart = d3.select(el).append("svg")
            .attr("class", 'playground')
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .call(this.initOnMouseOverEvents);

        this.mainLayer = this.chart.append("g").attr("class", 'mainLayer')
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

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

        this.depthLayer = self.mainLayer.append("g").attr("class", "depthLayer");

        this.currentPositionXLine = this.mainLayer
            .append("svg:line")
            .attr('class', 'currentPositionXLine')
            .attr('y1', this.height)
            .attr('y2', this.height)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('opacity', 0);

        this.currentPositionYLine = this.mainLayer
            .append("svg:line")
            .attr('class', 'currentPositionYLine')
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('opacity', 0);
    };

    DepthChart.prototype.clearGraph = function() {
        this.mainLayer.selectAll('.depthLayer').html();
        this.mainLayer.selectAll('.x_axis').remove();
        this.mainLayer.selectAll('.y_axis').remove();
    };

    DepthChart.prototype.draw = function(depth) {
        if (!depth) return;
        this.depth = depth;
        var self = this;
        if (this.isDrawn) {
            this.clearGraph();
        }
        var ymargin = 30;

        this.circlesData = depth.Circles;
        var depthMin = depth.DepthMin;
        var depthMax = depth.DepthMax;
        var murBids = depth.MurBids;
        var murAsks = depth.MurAsks;

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

        // this.depthLayer.append("path").attr("d", self.line(murBids)).attr("class", "depthBid");
        // this.depthLayer.append("path").attr("d", self.line(murAsks)).attr("class", "depthAsk");
        this.depthLayer.append("path").datum(murAsks).attr("d", self.area).attr("class", "depthAreaBids");
        this.depthLayer.append("path").datum(murBids).attr("d", self.area).attr("class", "depthAreaAsks");

        this.circlesLayer = this.depthLayer
            .append("g")
            .attr('class', "circles_layer");

        this.circles = this.circlesLayer
            .selectAll(".circle")
            .data(this.circlesData, function(d) {
                return d.price;
            });

        var circleRadius = 3;
        this.circles
            .enter()
            .insert("circle")
            .attr("class", "circle")
            .attr('cx', function(d) {
                return self.xScale(d.price);
            })
            .attr('cy', function(d) {
                return self.yScale(d.amount);
            })
            .attr('r', 0);

        this.isDrawn = true;
    };

    DepthChart.prototype.initOnMouseOverEvents = function(element) {
        var self = this;
        element
            .on("mouseover", function() {
                // self.tooltip.mouseover();
                self.currentPositionXLine
                    .transition()
                    .duration(400)
                    .attr('opacity', 1);
                self.currentPositionYLine
                    .transition()
                    .duration(400)
                    .attr('opacity', 1);
            })
            .on("mouseout", function() {
                // self.tooltip.mouseout();
                self.circles
                    .transition()
                    .duration(100)
                    .attr('r', 0);
                self.currentPositionXLine
                    .transition()
                    .duration(400)
                    .attr('opacity', 0);
                self.currentPositionYLine
                    .transition()
                    .duration(400)
                    .attr('opacity', 0);
            })
            .on("mousemove", function() {
                // console.log('move');
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

                // var left = 0;
                // var top = 0;

                self.circles
                    .transition()
                    .duration(100)
                    .attr('r', function(d, i) {
                        if (i == self.closestPoint.index) {
                            // left = d3.select(this).attr('cx');
                            // top = d3.select(this).attr('cy');
                            return 3;
                        } else {
                            return 0;
                        }
                    });

                var currentCircle = d3.select(self.closestPoint.circle);
                self.currentPositionXLine
                    .attr('x1', currentCircle.attr('cx'))
                    .attr('y1', currentCircle.attr('cy'))
                    .attr('x2', currentCircle.attr('cx'))

                self.currentPositionYLine
                    .attr('x1', currentCircle.attr('cx'))
                    .attr('y1', currentCircle.attr('cy'))
                    .attr('y2', currentCircle.attr('cy'))

                // var tooltipVariables = {};
                // var position = {
                //     left: String(50 + mousex) + 'px',
                //     top: String(50 + mousey) + 'px'
                // };
                // self.tooltip.render(tooltipVariables, position);

            });

    };

    return DepthChart;

});