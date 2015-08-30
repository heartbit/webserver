var d3 = require('d3');

var AreaLayer = require('./areaLayer');
var VolumeLayer = require('./volumeLayer')
var moment = require('moment');

function MainChartD3(el) {
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

MainChartD3.prototype.parseMainGraphes = function(maingraphes) {
    var models = {};
    // guess interval
    models.candles = _.filter(maingraphes.candles, function(candle) {
        var checkValues = candle.close > 0 && candle.open > 0 && candle.high > 0 && candle.low > 0
        candle.startDate = new Date(+candle.timestamp * 1000);
        candle.endDate = new Date((+candle.timestamp + maingraphes.candles.interval - 1) * 1000);
        candle.middleDate = new Date((+candle.timestamp + maingraphes.candles.interval/2) * 1000);
        var checkDates = _.isDate(candle.startDate) && _.isDate(candle.startDate) && _.isDate(candle.middleDate);
        return checkValues && checkDates;
    })

    models.volumes = _.filter(maingraphes.volumes, function(volume) {
        var checkValues = volume.amount >= 0;
        volume.startDate = new Date(volume.timestamp * 1000);
        volume.endDate = new Date((volume.timestamp + maingraphes.volumes.interval) * 1000);
        var checkDates = _.isDate(volume.startDate) && _.isDate(volume.endDate);
        return checkValues && checkDates;
    });
    this.models = models;
};

MainChartD3.prototype.initChart = function() {
    var self = this;

    this.margin = {
        top: 15,
        right: 60,
        bottom: 0,
        left: 60
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

MainChartD3.prototype.initXAxis = function() {
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
MainChartD3.prototype.updateXAxis = function() {
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


MainChartD3.prototype.draw = function(maingraphes, params) {
    this.params = params;
    // this.maingraphes = maingraphes || this.maingraphes;
    this.parseMainGraphes(maingraphes);
    this.updateXAxis();
    var visWidth =  $(this.el).width();
    var visHeigth = $(this.el).height();

    this.width = visWidth - this.margin.left - this.margin.right;
    this.height = visHeigth - this.margin.top - this.margin.bottom;
    this.chart.attr("width", visWidth)
    .attr("height", visHeigth)
    .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
    _.each(_.values(this.layers), function(layer) {
        layer.update();
    });
};

MainChartD3.prototype.update = function(maingraphes, params) {
    //Do something else?
    // this.maingraphes = maingraphes || this.maingraphes;
    this.draw(maingraphes, params);
};

MainChartD3.prototype.resize = function() {
    var self = this;

    var visWidth = $(self.el).width();
    var visHeigth = $(self.el).height();

    self.width = visWidth - self.margin.left - self.margin.right;
    self.height = visHeigth - self.margin.top - self.margin.bottom;
    console.log("RESIZE", self.width, self.height);

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

    this.update();
};

MainChartD3.prototype.clear = function() {};

MainChartD3.prototype.initOnMouseOverEvents = function(element) {
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

MainChartD3.prototype.toggleVolumeLayer = function() {
    if (this.layers.volumeLayer.isVisible) {
        // this.layers.areaLayer.updateRange([3 * this.height / 4, 0]);
        this.layers.volumeLayer.hide();
    } else {
        // this.layers.areaLayer.updateRange([3 * this.height / 4, 0]);
        this.layers.volumeLayer.show();
    }
    return false;
};

MainChartD3.prototype.toggleNewsLayer = function() {
    if (this.layers.newsLayer.isVisible) {
        this.layers.newsLayer.hide();
    } else {
        this.layers.newsLayer.show();
    }
    return false;
};

module.exports = MainChartD3;