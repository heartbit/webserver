var d3 = require('d3');
var FormatUtils = require('FormatUtils');
var moment = require('moment');

var defaultDuration = 300;

function VolumeLayer(chart) {
    var self = this;
    this.chart = chart;
    var height_max = 3 * this.chart.height / 4;
    var height_min = this.chart.height / 4;
    this.volumeLayer = this.chart.mainLayer
        .append("g")
        .attr("class", "volumeLayer");
    this.isVisible = true;

    var volumeTickValues = function(d, i, j) {
        return d3.extent(self.volumes.map(function(volume) {
            return volume.amount > 0 ? volume.amount : 1;
        }));
    };

    var volumeTickSize = function(d, i, j) {
        return 2;
    };

    this.volumeYScale = d3.scale
        .linear()
        .range([height_max, height_min]);

    this.volumeYAxis = d3.svg.axis()
        .scale(this.volumeYScale)
        .orient("left");
    this.volumeYAxis.tickFormat(function(d) {
            return FormatUtils.formatValueShort(d, 3);
        })
        .ticks(3);

    this.volumeYAxisInstance = this.volumeLayer.append("g")
        .attr("class", "y_volume_axis");

    this.volumeBarChartLayer = this.volumeLayer.append('g')
        .attr('class', 'volume_barchart_layer');

    this.volumeLabel = this.volumeLayer
        .append('text')
        .attr('opacity', 0)
        .attr('class', 'volume_label');
};

VolumeLayer.prototype.draw = function(params) {
    var self = this;
    this.params = params;
    this.update();
};

VolumeLayer.prototype.update = function(params) {
    var self = this;
    var offsetFactor = 0.1;

    var height_max = 3 * self.chart.height / 4;
    this.volumes = this.chart.models.volumes;
    this.volumeYScale.domain([d3.min(self.volumes.map(function(volume) {
        return volume.amount > 0 ? volume.amount : 1;
    })), d3.max(self.volumes.map(function(volume) {
        return (volume.amount + volume.amount * offsetFactor);
    }))]);
    this.volumeYAxisInstance.call(self.volumeYAxis);

    // Init bar chart data
    this.volumeBarChart = this.volumeBarChartLayer
        .selectAll("rect.volume")
        .data(self.volumes, function(volume) {
            return volume.startDate;
        });

    // Enter
    this.volumeBarChart
        .enter()
        .insert("rect")
        .attr("class", "volume");

    // Exit
    this.volumeBarChart
        .exit()
        .remove();

    //console.log(this.chart.models);
    // Update 
    this.volumeBarChart
        .attr("x", function(d) {
            var x = self.chart.timeScale(d.startDate);
            // console.log(x);
            return x;
        })
        .attr("width", function(d) {
            var width = (self.chart.timeScale(d.endDate) - self.chart.timeScale(d.startDate));
            return width >= 0 ? width : 0;
        })
        .attr('opacity', 0.5)
        .attr("height", function(d) {
            var height = height_max - self.volumeYScale(d.amount);
            return height >= 0 ? height : 0;
        })
        .attr('y', function(d) {
            return d.amount == 0 ? height_max : self.volumeYScale(d.amount);
        });
};

VolumeLayer.prototype.resize = function() {
    var height_max = 3 * this.chart.height / 4;
    var height_min = this.chart.height / 4;
    this.volumeYScale.range([height_max, height_min]);
    this.volumeYAxisInstance
        .transition()
        .duration(defaultDuration)
        .call(this.volumeYAxis);
    this.update();
};

VolumeLayer.prototype.hide = function() {
    this.isVisible = false;

    this.volumeLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 0)
};

VolumeLayer.prototype.show = function() {
    this.isVisible = true;

    this.volumeLayer
        .transition()
        .duration(defaultDuration)
        .attr('opacity', 1)
};

VolumeLayer.prototype.updateTooltip = function(date) {
    var self = this;

    var finclosestVolume = function(date) {
        var pointIndex = (self.closestPoint && self.closestPoint.index) || 0;
        var closestPoint = self.volumeBarChart[pointIndex];
        var barCount = self.volumeBarChart.size()
        self.volumeBarChart.each(function(barVolume, index) {
            if (index == 0 && date <= barVolume.startDate) {
                pointIndex = index;
                closestPoint = barVolume;
            }
            if (index == barCount - 1 && date >= barVolume.endDate) {
                pointIndex = index;
                closestPoint = barVolume;
            }
            if (barVolume.startDate <= date && barVolume.endDate >= date) {
                pointIndex = index;
                closestPoint = barVolume;
            }
        });
        return {
            index: pointIndex,
            candle: closestPoint
        };
    };

    this.closestPoint = finclosestVolume(date);

    if (this.closestPoint && this.closestPoint.candle) {
        var left = 0;
        var top = 0;
        this.volumeBarChart
            .transition()
            .duration(100)
            .attr('opacity', function(d, i) {
                if (i == self.closestPoint.index) {
                    left = d3.select(this).attr('x');
                    top = d3.select(this).attr('y');
                    return 1;
                } else {
                    return 0.5;
                }
            });

        this.volumeLabel
            .attr('opacity', 1)
            .attr('x', +left + 5)
            .attr('y', 60)
            .style("text-anchor", function() {
                return left > self.chart.width / 2 ? "end" : "start";
            })
            .text(' Volume: ' + FormatUtils.formatValue(this.closestPoint.candle.amount, 0));
    }
};

VolumeLayer.prototype.mouseout = function() {
    this.volumeBarChart
        .transition()
        .duration(100)
        .attr('opacity', 0.5);

    this.volumeLabel
        .transition()
        .duration(100)
        .attr('opacity', 0);
};

VolumeLayer.prototype.mouseover = function() {};

module.exports = VolumeLayer;