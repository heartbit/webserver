var d3 = require('d3');

var AreaLayer = require('./areaLayer');
var VolumeLayer = require('./volumeLayer')
var moment = require('moment');

function MainChart(el) {
    this.el = el;

    _.bindAll(
        this,
        'initOnMouseOverEvents',
        // 'doZoom',
        'resize'
    );

    this.initChart();
    this.initXAxis();
    this.layers = {
        areaLayer: new AreaLayer(this),
        volumeLayer: new VolumeLayer(this),
    };
};

MainChart.prototype.parseMainGraphes = function(maingraphes) {
    var models = {};

    models.candles = _.filter(maingraphes.candles, function(candle) {
        var checkValues = candle.close > 0 && candle.open > 0 && candle.high > 0 && candle.low > 0
        candle.startDate = new Date(+candle.timestamp * 1000);
        candle.endDate = new Date((+candle.timestamp + 59 * 60) * 1000);
        candle.middleDate = new Date((+candle.timestamp + 30 * 60) * 1000);
        var checkDates = _.isDate(candle.startDate) && _.isDate(candle.startDate) && _.isDate(candle.middleDate);
        return checkValues && checkDates;
    })

    models.candles = _.last(models.candles, 30);

    models.volumes = _.filter(maingraphes.volumes, function(volume) {
        var checkValues = volume.amount >= 0;
        volume.startDate = new Date(volume.timestamp * 1000);
        volume.endDate = new Date((volume.timestamp + 60 * 60) * 1000);
        var checkDates = _.isDate(volume.startDate) && _.isDate(volume.endDate);
        return checkValues && checkDates;
    });

    // models.volumes = _.filter(maingraphes.volumes, function(volume, index) {
    //     return index % 10 == 0;
    // });
    models.volumes = _.last(models.volumes, 30);
    this.models = models;
    console.log("PARSE CANDLES:", models.candles.length);
    console.log("PARSE VOLUMES:", models.volumes.length);
};

MainChart.prototype.initChart = function() {
    var self = this;

    this.margin = {
        top: 15,
        right: 30,
        bottom: 0,
        left: 40
    };

    var visWidth = $(this.el).width();
    var visHeigth = $(this.el).height();

    this.width = visWidth - this.margin.left - this.margin.right;
    this.height = visHeigth - this.margin.top - this.margin.bottom;

    this.chart = d3.select(this.el)
        .append('svg')
        .attr("class", 'playground')
        .attr("width", visWidth)
        .attr("height", visHeigth)
        .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
        .call(this.initOnMouseOverEvents)

    this.mainLayer = this.chart
        .append("g")
        .attr("class", 'mainLayer')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
};

MainChart.prototype.initXAxis = function() {
    var self = this;
    this.timeScale = d3.time.scale()
        .range([0, this.width]);

    // this.zoom = d3.behavior.zoom().on("zoom", this.doZoom);
    // this.chart.call(this.zoom);

    this.timeAxis = d3.svg.axis()
        .scale(this.timeScale)
        .orient('bottom')
        .ticks(8);

    this.timeAxisInstance = this.mainLayer.append("g")
        .attr("class", "x_time_axis")
        .attr("transform", "translate(0," + String(3 * self.height / 4) + ")");
};

/* Update methods */
MainChart.prototype.updateXAxis = function() {
    var self = this;
    // var last30 = _.last(self.candles, 30);
    var last30 = this.models.candles;
    this.timeScale.domain([d3.min(last30.map(function(candle) {
        return candle.startDate;
    })), d3.max(last30.map(function(candle) {
        return candle.endDate;
    }))]);
    // this.zoom.x(this.timeScale);
    this.timeAxisInstance.call(this.timeAxis);
};

/**
    var mainGraphParams = {
        typePrice: "line",
        volume: false
    };
*/
MainChart.prototype.draw = function(maingraphes, params) {
    this.params = params;
    // this.maingraphes = maingraphes || this.maingraphes;
    this.parseMainGraphes(maingraphes);
    this.updateXAxis();
    _.each(_.values(this.layers), function(layer) {
        layer.update();
    });
};

MainChart.prototype.update = function(maingraphes, params) {
    //Do something else?
    // this.maingraphes = maingraphes || this.maingraphes;
    this.draw(maingraphes, params);
};

MainChart.prototype.resize = function() {
    var self = this;

    var visWidth = $(self.el).width();
    var visHeigth = $(self.el).height();

    self.width = visWidth - self.margin.left - self.margin.right;
    self.height = visHeigth - self.margin.top - self.margin.bottom;

    self.chart
        .attr("width", visWidth)
        .attr("height", visHeigth)
        .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
        .call(self.initOnMouseOverEvents);

    self.mainLayer
        .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

    self.timeScale.range([0, self.width]);
    // self.zoom.x(self.timeScale);
    self.timeAxisInstance.call(self.timeAxis);
    _.each(_.values(self.layers), function(layer) {
        layer.resize();
    });
};

MainChart.prototype.clear = function() {};

// MainChart.prototype.doZoom = function(event) {
//     console.log('do zoom', d3.event);
//     var sourceEvent = d3.event.sourceEvent;
//     switch (sourceEvent.type) {
//         case "wheel":
//             // Zoom in -> ask index -1
//             if (sourceEvent.wheelDelta > 0) {
//                 this.view.changeTimePeriod(null, -1);
//             }
//             // Zoom out -> ask index +1
//             else {
//                 this.view.changeTimePeriod(null, 1);
//             }
//             break;
//         case "mousemove":
//             if (sourceEvent.wheelDelta > 0) {} else {}
//             break;
//     }
//     return false;
// };

MainChart.prototype.initOnMouseOverEvents = function(element) {
    var self = this;
    element
        .on("mouseover", function() {
            self.layers.areaLayer.mouseover();
            self.layers.volumeLayer.mouseover();
            return false;
        })
        .on("mouseout", function() {
            self.layers.areaLayer.mouseout();
            self.layers.volumeLayer.mouseout();
            return false;
        })
        .on("mousemove", function() {
            if (!self.models) {
                return;
            }
            var mouse = d3.mouse(this);
            var mousex = +mouse[0];
            var findClosestDate = function(x) {
                var date = d3.time.second.round(self.timeScale.invert(x));
                return _.isDate(date) ? date : undefined;
            };
            var closestDate = findClosestDate(mousex - self.margin.left);
            if (closestDate) {
                self.layers.areaLayer.updateTooltip(closestDate);
                self.layers.volumeLayer.updateTooltip(closestDate);
            }
            return false;
        });
};

MainChart.prototype.toggleVolumeLayer = function() {
    if (this.layers.volumeLayer.isVisible) {
        // this.layers.areaLayer.updateRange([3 * this.height / 4, 0]);
        this.layers.volumeLayer.hide();
    } else {
        // this.layers.areaLayer.updateRange([3 * this.height / 4, 0]);
        this.layers.volumeLayer.show();
    }
    return false;
};

MainChart.prototype.toggleNewsLayer = function() {
    if (this.layers.newsLayer.isVisible) {
        this.layers.newsLayer.hide();
    } else {
        this.layers.newsLayer.show();
    }
    return false;
};

module.exports = MainChart;