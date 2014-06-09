define('areaLayer', ['d3', 'FormatUtils', 'moment'], function(d3, FormatUtils) {

    var defaultDuration = 200;

    function AreaLayer(chart) {
        var self = this;

        _.bindAll(this, 'brushed');
        this.chart = chart;
        this.candleLayer = this.chart.mainLayer
            .append("g")
            .attr("class", "candle_layer");

        // Min, Max and Last value
        var candleTickValues = function(d, i, j) {
            var values = [];
            // Last value
            values.push(_.last(self.candles).close);
            // Mean
            // var mean = 
            // // Close min - max
            // values = _.union(values, d3.extent(self.candles.map(function(candle) {
            //     return candle.close;
            // })));
            // High max
            values = _.union(values, d3.max(self.candles.map(function(candle) {
                return candle.high;
            })));
            // low min
            values = _.union(values, d3.min(self.candles.map(function(candle) {
                return candle.low;
            })));
            return values;
        };

        this.candleYScale = d3.scale
            .linear()
            .range([3 * this.chart.height / 4, 0]);

        this.candleYAxis = d3.svg.axis()
            .scale(this.candleYScale)
            .orient("right")
            .ticks(6)
            .tickFormat(function(d) {
                return FormatUtils.formatValueShort(d, 3);
            })
            .tickSize(-this.chart.width, 0)
        // .tickValues(candleTickValues)

        this.candleYAxisInstance = this.candleLayer
            .append("g")
            .attr("class", "y_candle_axis")
            .attr("transform", "translate(" + self.chart.width + ",0)");

        this.candlesArea = d3.svg.area()
            .x(function(candle) {
                return self.chart.timeScale(candle.middleDate);
            })
            .y0(function(candle) {
                return self.candleYScale(candle.high);
            })
            .y1(function(candle) {
                return self.candleYScale(candle.low);
            })
            .interpolate("monotone");

        this.candleAreaChart = this.candleLayer
            .append("path")
            .attr('opacity', 0.4)
            .attr('class', 'candle_area');

        this.candlesLine = d3.svg.line()
            .x(function(candle) {
                return self.chart.timeScale(candle.middleDate);
            })
            .y(function(candle) {
                var meanValue = (candle.high + candle.low) / 2;
                return self.candleYScale(meanValue);
            })
            .interpolate("monotone");

        this.candleLineChart = this.candleLayer
            .append("path")
            .attr('class', 'candle_line');

        this.candlesCirclesLayer = this.candleLayer
            .append("g")
            .attr('class', "candle_circles_layer");

        this.tooltipLayer = this.candleLayer
            .append("g")
            .attr("class", "tooltipLayer")
            .attr('opacity', 0);

        this.currentPositionXLine = this.tooltipLayer
            .append("line")
            .attr('class', 'currentPositionXLine')
            .attr('y1', 10)
            .attr('y2', this.chart.height)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1);

        this.currentPositionLabelTime = this.tooltipLayer
            .append('text')
            .attr("y", 20)
            .attr('class', 'currentPositionLabelAmount');

        this.currentPositionLabelPrice = this.tooltipLayer
            .append('text')
            .attr("y", 20)
            .attr('class', 'currentPositionLabelPrice');

        this.brush = d3.svg.brush()
            .x(this.chart.timeScale)
            .on("brush", this.brushed);

        this.gBrush = this.candleLayer
            .append("g")
            .attr("class", "brush")
            .call(this.brush);

        this.gBrush.selectAll("rect")
            .attr("y", 0)
            .attr("height", this.chart.height);

        this.gExtent = d3.select("rect.extent");

        this.gBrushLabel = this.gBrush.append("text")
            .attr('y', this.chart.height / 2)
            .attr('opacity', 0)
            .style('font-size', '50px')
            .style("text-anchor", "middle")
            .text('')

    };

    AreaLayer.prototype.draw = function(params) {
        var self = this;
        this.params = params;
        this.update();
    };

    AreaLayer.prototype.update = function() {
        var self = this;
        this.candles = this.chart.models.candles;

        var candleYOffset = 0;
        var ratio = 0.005;

        this.candleYScale.domain([d3.min(self.candles.map(function(candle) {
            return (candle.low - (candle.low * ratio));
        })) - candleYOffset, d3.max(this.candles.map(function(candle) {
            return (candle.high + (candle.high * ratio));
        })) + candleYOffset]);

        this.candleYAxisInstance
            .transition()
            .duration(defaultDuration)
            .call(self.candleYAxis);

        this.candleCircles = this.candlesCirclesLayer
            .selectAll(".circle")
            .data(self.candles, function(candle) {
                return candle.middleDate;
            });

        var circleRadius = 4;
        // Enter
        this.candleCircles
            .enter()
            .insert("circle")
            .attr("class", "circle");

        // Exit
        this.candleCircles
            .exit()
            .remove();

        // Update
        this.candleCircles
            .attr('cx', function(candle) {
                return self.chart.timeScale(candle.middleDate);
            })
            .attr('cy', function(candle) {
                var meanValue = (candle.high + candle.low) / 2;
                return self.candleYScale(meanValue);
            })
            .attr('r', 0)
            .attr('class', 'circle')

        this.candleAreaChart
            .transition()
            .duration(defaultDuration)
            .attr('d', self.candlesArea(self.candles))

        this.candleLineChart
            .transition()
            .duration(defaultDuration)
            .attr('d', self.candlesLine(self.candles))
    };

    AreaLayer.prototype.resize = function() {
        this.candleYScale.range([3 * this.chart.height / 4, 0]);
        this.candleYAxisInstance
            .transition()
            .duration(defaultDuration)
            .call(this.candleYAxis);
        this.update();
    };

    AreaLayer.prototype.hide = function() {};

    AreaLayer.prototype.updateTooltip = function(date) {
        var self = this;

        var finclosestCandle = function(date) {
            var pointIndex = (self.closestPoint && self.closestPoint.index) || 0;
            var closestPoint = self.candleCircles[pointIndex];
            var circlesCount = self.candleCircles.size()
            self.candleCircles.each(function(candleCircle, index) {
                if (index == 0 && date <= candleCircle.startDate) {
                    pointIndex = index;
                    closestPoint = candleCircle;
                }
                if (index == circlesCount - 1 && date >= candleCircle.endDate) {
                    pointIndex = index;
                    closestPoint = candleCircle;
                }
                if (candleCircle.startDate <= date && candleCircle.endDate >= date) {
                    pointIndex = index;
                    closestPoint = candleCircle;
                }
            });
            return {
                index: pointIndex,
                candle: closestPoint
            };
        };

        this.closestPoint = finclosestCandle(date);

        if (this.closestPoint && this.closestPoint.candle && this.closestPoint.candle.startDate) {
            var currentX = 0;
            var currentY = 0;

            this.candleCircles
                .attr('r', function(d, i) {
                    if (i == self.closestPoint.index) {
                        currentX = d3.select(this).attr('cx');
                        currentY = d3.select(this).attr('cy');
                        return 3;
                    } else {
                        return 0;
                    }
                });

            this.currentPositionXLine
                .attr('x1', currentX)
                .attr('x2', currentX);

            this.currentPositionLabelTime
                .style("text-anchor", function() {
                    return currentX > self.chart.width / 2 ? "end" : "start";
                })
                .attr("x", currentX)
                .text(" " + FormatUtils.formatDate(this.closestPoint.candle.startDate, 'lll'));

            self.currentPositionLabelPrice
                .style("text-anchor", function() {
                    return currentX > self.chart.width / 2 ? "end" : "start";
                })
                .attr("x", function() {
                    return currentX > self.chart.width / 2 ? currentX - 10 : currentX + 30;
                })
                .attr("y", currentY + 50)
                .text("  " + FormatUtils.formatValue(this.closestPoint.candle.close, 2));
        }
    };

    AreaLayer.prototype.mouseout = function() {
        this.candleCircles
            .transition()
            .duration(100)
            .attr('r', 0);
        this.tooltipLayer
            .transition()
            .duration(100)
            .attr('opacity', 0);
    };

    AreaLayer.prototype.mouseover = function() {
        this.tooltipLayer
            .transition()
            .duration(100)
            .attr('opacity', 1);
    };

    AreaLayer.prototype.updateRange = function(range) {
        this.candleYScale.range(range);
        this.update();
    };

    AreaLayer.prototype.brushed = function() {
        var extent = this.brush.extent();
        // this.gBrush

        // Get candles between these 2 dates
        var currentCandles = _.chain(this.candles)
            .filter(function(candle) {
                return candle.startDate >= extent[0] && candle.endDate <= extent[1];
            })
            .sortBy(function(candle) {
                return candle.startDate;
            })
            .value();

        var newx = Math.round(+this.gExtent.attr('x') + +this.gExtent.attr('width') / 2);

        if (currentCandles && currentCandles.length > 2 && newx) {
            var first = _.first(currentCandles);
            var last = _.last(currentCandles);

            // console.log('\n\n\nCandles in brush : ' + currentCandles.length);
            // console.log('Start : ' + FormatUtils.formatDate(first.startDate, 'lll'));
            // console.log('End : ' + FormatUtils.formatDate(last.endDate, 'lll'));
            // console.log('Min : ' + _.min(currentCandles, function(candle) {
            //     return candle.low;
            // }).low);
            // console.log('Max : ' + _.max(currentCandles, function(candle) {
            //     return candle.high;
            // }).high);

            // console.log('Evolution : ' + FormatUtils.formatValue(evol, 2) + "%");

            // if (d3.event.mode === "move") {
            //     this.gBrushLabel
            // } else {

            var evol = 100 * (last.close - first.close) / first.close;

            this.gBrushLabel
                .transition()
                .duration(50)
                .attr('x', newx)
                .attr('opacity', 1)
                .text(FormatUtils.formatValue(evol, 2) + '%')
                .attr('font-size', '50px')

        } else {
            this.gBrushLabel
                .transition()
                .duration(50)
                .attr('x', newx)
                .text('')
                .attr('opacity', 0);
        }


    };

    return AreaLayer;

});