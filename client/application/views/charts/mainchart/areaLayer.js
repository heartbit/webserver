define('areaLayer', ['d3', 'FormatUtils', 'moment'], function(d3, FormatUtils) {

    var defaultDuration = 200;

    function AreaLayer(chart) {
        var self = this;

        _.bindAll(this, 'brushed');
        this.chart = chart;

        this.radiusHighlightCircle = 3;

        this.colors = {
            highlight: "red",
            normal: "#b7b7b7"
        };

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
                return FormatUtils.formatPrice(d);
            })
            .tickSize(-this.chart.width, 0);

        this.candleYAxisInstance = this.candleLayer
            .append("g")
            .attr("class", "y_candle_axis")
            .attr("transform", "translate(" + self.chart.width + ",0)");

        this.candlesArea = d3.svg.area()
            .x(function(candle) {
                return self.chart.timeScale(candle.middleDate);
            })
            .y0(function(candle) {
                return self.candleYScale(candle.low);
            })
            .y1(function(candle) {
                return self.candleYScale(candle.high);
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
                // var meanValue = (candle.high + candle.low) / 2;
                // return self.candleYScale(meanValue);
                return self.candleYScale(candle.close);
            })
            //.interpolate("monotone");

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
            .attr('stroke', '#cacaca')
            .attr('opacity', .5)
            .attr('stroke-width', 1);

        this.currentPositionLabelTime = this.tooltipLayer
            .append('text')
            .attr("y", 20)
            .attr('class', 'currentPositionLabelAmount');

        this.currentPositionLabelPrice = this.tooltipLayer
            .append('text')
            .attr("y", 40)
            .attr('class', 'currentPositionLabelPrice');

        this.colorGradient = this.candleLayer
            .append("defs")
            .append("linearGradient")
            .attr("id", "line-gradient")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "1")
            .attr("y2", "0")
            .attr("spreadMethod", "pad");

        this.colorGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", this.colors.normal)
            .attr("stop-opacity", 1);

        this.end1SegGrad = this.colorGradient.append("stop")
            .attr("stop-color", this.colors.normal)
            .attr("stop-opacity", 1);

        this.start2SegGrad = this.colorGradient.append("stop")
            .attr("stop-color", this.colors.highlight)
            .attr("stop-opacity", 1);

        this.end2SegGrad = this.colorGradient.append("stop")
            .attr("stop-color", this.colors.highlight)
            .attr("stop-opacity", 1);

        this.start3SegGrad = this.colorGradient.append("stop")
            .attr("stop-color", this.colors.normal)
            .attr("stop-opacity", 1);

        this.colorGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", this.colors.normal)
            .attr("stop-opacity", 1);

        this.brush = d3.svg.brush()
            .x(this.chart.timeScale)
            .on("brush", this.brushed);

        this.gBrush = this.candleLayer
            .append("g")
            .attr("class", "brush")
            .call(this.brush);

        this.gBrushLabel_weightedPrice= this.gBrush
            .append("text")
            .attr('y', this.chart.height-75)
            .attr('opacity',0)
            .style('font-size','16px')
            .style("text-anchor","middle")
            .style("fill", "black")
            .style("stroke","none")
            .text('');

        this.gBrushLabel_variation = this.gBrush
            .append("text")
            .attr('y', this.chart.height - 15)
            .attr('opacity', 0)
            .style('font-size', '16px')
            .style("text-anchor", "middle")
            .style("fill", '#808080')
            .style("stroke", "none")
            .text('');

        this.gBrushLabel_nbTrades= this.gBrush
            .append("text")
            .attr('y', this.chart.height-35)
            .attr('opacity',0)
            .style('font-size','16px')
            .style("text-anchor","middle")
            .style("fill", "black")
            .style("stroke","none")
            .text('');

        this.gBrushLabel_volumeTotal= this.gBrush
            .append("text")
            .attr('y', this.chart.height-55)
            .attr('opacity',0)
            .style('font-size','16px')
            .style("text-anchor","middle")
            .style("fill", "black")
            .style("stroke","none")
            .text('');

        this.gBrush
            .selectAll("rect")
            .attr("y", 0)
            .attr("height", this.chart.height);

        this.gExtent = d3.select("rect.extent");

        this.startBrushLabelTime = this.gBrush
            .append('text')
            .attr("y", 0)
            .style("fill", '#666')
            .style("stroke", "none")
            .attr('class', 'startBrushLabelTime');

        this.endBrushLabelTime = this.gBrush
            .append('text')
            .attr("y", 0)
            .style("fill", '#666')
            .style("stroke", "none")
            .attr('class', 'endBrushLabelTime');

        this.lowCandleBrushLabel = this.gBrush
            .append('text')
            .attr("y", 0)
            .style("fill", '#666')
            .style("stroke", "none")
            .attr('class', 'lowCandleBrushLabel');

        this.highCandleBrashLabel = this.gBrush
            .append('text')
            .attr("y", 0)
            .style("fill", '#666')
            .style("stroke", "none")
            .attr('class', 'highCandleBrashLabel');
    };

    AreaLayer.prototype.draw = function(params) {
        var self = this;
        this.params = params;
        this.update();
    };

    AreaLayer.prototype.update = function() {
        var self = this;
        this.hideBrush();
        this.candles = this.chart.models.candles;
        this.volumes= this.chart.models.volumes;
       

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
                // var meanValue = (candle.high + candle.low) / 2;
                // return self.candleYScale(meanValue);
                return self.candleYScale(candle.close);
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

    AreaLayer.prototype.finclosestCandle = function(date) {
        var pointIndex = (this.closestPoint && this.closestPoint.index) || 0;
        var closestPoint = this.candleCircles[pointIndex];
        var circlesCount = this.candleCircles.size()
        this.candleCircles.each(function(candleCircle, index) {
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

    AreaLayer.prototype.updateTooltip = function(date) {
        var self = this;

        this.closestPoint = this.finclosestCandle(date);

        if (this.closestPoint && this.closestPoint.candle && this.closestPoint.candle.startDate) {
            var currentX = 0;
            var currentY = 0;

            this.candleCircles
                .attr('r', function(d, i) {
                    if (i == self.closestPoint.index) {
                        currentX = d3.select(this).attr('cx');
                        currentY = d3.select(this).attr('cy');
                        return self.radiusHighlightCircle;
                    } else if (d.highlight) {
                        return self.radiusHighlightCircle;
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
                .text(' ' + FormatUtils.formatDate(this.closestPoint.candle.startDate, 'lll'));

            this.currentPositionLabelPrice
                .style("text-anchor", function() {
                    return currentX > self.chart.width / 2 ? "end" : "start";
                })
                .attr("x", function() {
                    return currentX;
                })
                .text(' Price: ' + FormatUtils.formatPrice(this.closestPoint.candle.close));
        }
    };

    AreaLayer.prototype.mouseout = function() {
        var self = this;

        this.candleCircles
            .transition()
            .duration(100)
            .attr('r', function(d, i, j) {
                return d.highlight ? self.radiusHighlightCircle : 0;
            });

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

        var startDateBrush = extent[0];
        var endDateBrush = extent[1];

        // Get candles between these 2 dates
        var currentCandles = _.chain(this.candles)
            .filter(function(candle) {
                return candle.startDate >= extent[0] && candle.endDate <= extent[1];
            })
            .sortBy(function(candle) {
                return candle.startDate;
            })
            .value();
         //Get volumes between these 2 dates
        var currentVolumes = _.chain(this.volumes)
            .filter(function(volume) {
                return volume.startDate >= extent[0] && volume.endDate <= extent[1];
            })
            .sortBy(function(volume) {
                return volume.startDate;
            })
            .value();

        var newx = Math.round(+this.gExtent.attr('x') + +this.gExtent.attr('width') / 2);

        if (currentCandles && currentCandles.length > 2 && newx) {
            var first = _.first(currentCandles);
            var last = _.last(currentCandles);

            var nbCandles = currentCandles.length;

            var lowestCandle = _.min(currentCandles, function(candle) {
                return candle.close;
            });
            var highestCandle = _.max(currentCandles, function(candle) {
                return candle.close;
            });
            //Calcul pourcnetage variation prix
            var evol = 100 * (last.close - first.close) / first.close;
            var evolColor = evol >= 0 ? 'green' : 'red';

            //Calcul nombre de trade 
            var nbTrade=_.reduce(currentVolumes,function(memo,currentVolume) {
               return memo+currentVolume.nbTrades;
            },0);
            var volumeTotal=_.reduce(currentVolumes,function(memo,currentVolume) {
                return memo+currentVolume.amount;
            },0);
            //Calcul prix pondéré/volume
            var weightedPrice =0;      
            _.each(currentCandles,function(currentCandle,i) {
                    weightedPrice+=(currentCandle.close*currentVolumes[i].amount)/volumeTotal;
            }); 
            
            // console.log('nbtrade',nbTrade);
            // console.log('volumetotal',volumeTotal);
            // console.log('prix moyen',weightedPrice);

            this.gBrushLabel_weightedPrice
                .transition()
                .duration(50)
                .attr('x', newx)
                .attr('opacity', 1)
                .text("Weighted Price: "+FormatUtils.truncToNdecimal(weightedPrice,2));

            this.gBrushLabel_variation
                .transition()
                .duration(50)
                .attr('x', newx)
                .attr('opacity', 1)
                .text("Price Variation"+FormatUtils.formatEvol(evol))
                .style("fill", evolColor);

           this.gBrushLabel_nbTrades
                .transition()
                .duration(50)
                .attr('x', newx)
                .attr('opacity', 1)
                .text(function() {
                    return "Trades: "+nbTrade;
                })
                .style("fill", "#1D5080");

            this.gBrushLabel_volumeTotal
                .transition()
                .duration(50)
                .attr('x', newx)
                .attr('opacity', 1)
                .text("Total Volume: "+FormatUtils.truncToNdecimal(volumeTotal,2))
                .style("fill", "#1D5080");

            this.startBrushLabelTime
                .transition()
                .duration(50)
                .attr('y', 0)
                .attr('x', this.chart.timeScale(startDateBrush))
                .attr('opacity', 1)
                .attr('font-size', '16px')
                .attr('text-anchor', function() {
                    return nbCandles < 10 ? 'end' : 'middle';
                })
                .text(FormatUtils.formatDate(startDateBrush, 'lll'));

            this.endBrushLabelTime
                .transition()
                .duration(50)
                .attr('y', 0)
                .attr('x', this.chart.timeScale(endDateBrush))
                .attr('opacity', 1)
                .attr('text-anchor', function() {
                    return nbCandles < 10 ? 'start' : 'middle';
                })
                .attr('font-size', '16px')
                .text(FormatUtils.formatDate(endDateBrush, 'lll'));

            this.lowCandleBrushLabel
                .transition()
                .duration(50)
                .attr('y', this.candleYScale(lowestCandle.close) + 18)
                .attr('x', this.chart.timeScale(lowestCandle.middleDate))
                .attr('opacity', 1)
                .attr('text-anchor', 'middle')
                .attr('font-size', '16px')
                .text(FormatUtils.formatPrice(lowestCandle.close));

            var lowCircle = this.finclosestCandle(lowestCandle.middleDate);

            this.highCandleBrashLabel
                .transition()
                .duration(50)
                .attr('y', this.candleYScale(highestCandle.close) - 5)
                .attr('x', this.chart.timeScale(highestCandle.middleDate))
                .attr('opacity', 1)
                .attr('text-anchor', 'middle')
                .attr('font-size', '16px')
                .text(FormatUtils.formatPrice(highestCandle.close));

            var highCircle = this.finclosestCandle(highestCandle.middleDate);

            this.candleCircles
                .transition()
                .duration(100)
                .style('fill', function(d, i) {
                    if (i == highCircle.index) {
                        return 'green';
                    } else if (i == lowCircle.index) {
                        return 'red';
                    } else if (d.highlight == 'lowCircle') {
                        return 'white';
                    } else if (d.highlight == 'highCircle') {
                        return 'white';
                    }
                    return 'white';
                })
                .attr('r', function(d, i) {
                    if (i == highCircle.index) {
                        d.highlight = 'highCircle';
                        return self.radiusHighlightCircle;
                    } else if (i == lowCircle.index) {
                        d.highlight = 'lowCircle';
                        return self.radiusHighlightCircle;
                    } else if (d.highlight == 'lowCircle') {
                        delete d.highlight;
                        return 0;
                    } else if (d.highlight == 'highCircle') {
                        delete d.highlight;
                        return 0;
                    }
                    return 0;
                })

            var startPercent = String((+this.gExtent.attr('x') / this.chart.width) * 100) + '%';
            var endPercent = String(((+this.gExtent.attr('x') + +this.gExtent.attr('width')) / this.chart.width) * 100) + '%';

            this.end1SegGrad.attr('offset', startPercent);
            this.start2SegGrad
                .attr('offset', startPercent)
                .attr('stop-color', evolColor);
            this.end2SegGrad
                .attr('offset', endPercent)
                .attr('stop-color', evolColor);
            this.start3SegGrad.attr('offset', endPercent);

        } else {
            this.hideBrush();
        }

    };

    AreaLayer.prototype.hideBrush = function() {

        this.gBrushLabel_variation
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.gBrushLabel_weightedPrice
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.gBrushLabel_volumeTotal
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.gBrushLabel_nbTrades
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);



        this.startBrushLabelTime
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.endBrushLabelTime
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.highCandleBrashLabel
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        this.lowCandleBrushLabel
        // .transition()
        // .duration(50)
        .attr('x', 0)
            .text('')
            .attr('opacity', 0);

        if (this.candleCircles) {
            this.candleCircles
                .attr('r', function(d, i) {
                    if (d.highlight) {
                        delete d.highlight;
                    }
                    return 0;
                });
        }

        this.end1SegGrad.attr('offset', '0');
        this.start2SegGrad.attr('offset', '0');
        this.end2SegGrad.attr('offset', '0');
        this.start3SegGrad.attr('offset', '0');
    }

    return AreaLayer;

});