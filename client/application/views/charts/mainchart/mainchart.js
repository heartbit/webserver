define('mainchart', ['config', 'dataHelper', 'd3', 'maingraphes', 'maingraphe', 'areaLayer', 'candleLayer', 'volumeLayer', 'moment'], function(config, DataHelper, d3, Maingraphes, Maingraphe, AreaLayer, CandleLayer, VolumeLayer) {

    // tooltip sur les volumes et beaux wording à l'intérieur
    // faire le menu de selection des layers
    function MainChart(view, el, params) {
        this.el = el;
        this.view = view;

        _.bindAll(
            this,
            'initOnMouseOverEvents',
            'doZoom'
        );

        this.dataHelper = new DataHelper();
        this.initChart(params);
        this.initXAxis();
        this.layers = {};
        this.layers.areaLayer = new AreaLayer(this);
        this.layers.volumeLayer = new VolumeLayer(this);
    };

    MainChart.prototype.parseMainGraphes = function(maingraphes) {
        this.models = this.dataHelper.sanitizeMainChartModels(maingraphes);
    };

    MainChart.prototype.initChart = function(params) {
        var self = this;

        this.margin = {
            top: 5,
            right: 30,
            bottom: 20,
            left: 40
        };

        this.width = $(this.el).width() - this.margin.left - this.margin.right;
        this.height = $(this.el).height() - this.margin.top - this.margin.bottom;

        var visWidth = this.width + this.margin.left + this.margin.right;
        var visHeigth = this.height + this.margin.top + this.margin.bottom;

        this.chart = d3.select(this.el)
            .append('svg')
            .attr("class", 'playground')
            .attr("width", visWidth)
            .attr("height", visHeigth)
            .attr('viewBox', "0 0 " + visWidth + " " + visHeigth)
            .attr('perserveAspectRatio', "xMidYMid")
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

        this.zoom = d3.behavior.zoom().on("zoom", this.doZoom);
        this.chart.call(this.zoom);

        this.timeAxis = d3.svg.axis()
            .scale(this.timeScale)
            .orient('bottom')
            .ticks(8);

        this.timeAxisInstance = this.mainLayer.append("g")
            .attr("class", "x_time_axis")
            .attr("transform", "translate(0," + self.height + ")");

        this.currentPositionXLine = this.mainLayer.append("svg:line")
            .attr('class', 'currentPositionXLine')
            .attr('y1', this.height)
            .attr('y2', this.height)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('opacity', 0);

        this.currentPositionYLine = this.mainLayer.append("svg:line")
            .attr('class', 'currentPositionXLine')
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('x1', 0)
            .attr('x2', this.width)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('opacity', 0);
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
        this.zoom.x(this.timeScale);
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
        this.parseMainGraphes(maingraphes);
        this.updateXAxis();
        _.each(_.values(this.layers), function(layer) {
            layer.update();
        });
    };

    MainChart.prototype.update = function(maingraphes, params) {
        //Do something else?
        this.draw(maingraphes, params);
    };

    MainChart.prototype.clear = function() {};

    MainChart.prototype.doZoom = function(event) {
        console.log('do zoom', d3.event);
        var sourceEvent = d3.event.sourceEvent;
        switch (sourceEvent.type) {
            case "wheel":
                // Zoom in -> ask index -1
                if (sourceEvent.wheelDelta > 0) {
                    this.view.changeTimePeriod(null, -1);
                }
                // Zoom out -> ask index +1
                else {
                    this.view.changeTimePeriod(null, 1);
                }
                break;
            case "mousemove":
                if (sourceEvent.wheelDelta > 0) {} else {}
                break;
        }
        return false;
    };

    MainChart.prototype.initOnMouseOverEvents = function(element) {
        var self = this;
        element
            .on("mouseover", function() {
                self.layers.areaLayer.mouseover();
                self.layers.volumeLayer.mouseover();
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
                self.layers.areaLayer.mouseout();
                self.layers.volumeLayer.mouseout();
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
            this.layers.areaLayer.updateRange([this.height, 0]);
            this.layers.volumeLayer.hide();
        }
        else{
            this.layers.areaLayer.updateRange([3 * this.height / 4, 0]);
            this.layers.volumeLayer.show();
        }
    };

    return MainChart;

});