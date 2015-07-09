define(['d3', 'BaseAbstractChart', 'd3Utils', 'd3chart'], function(d3, BaseAbstractChart, d3Utils) {

    var defaultRadiusRatio = 0.7;
    var defaultRadius = 20;

    var BasePieChart = d3.chart("BaseAbstractChart").extend("BasePieChart", {

        initialize: function(options) {

            options = options || {};
            this.r = defaultRadius;

            this.width(options.width || this.base.attr('width') || this._width);
            this.height(options.height || this.base.attr('height') || this._height);

            this.arc = d3.svg
                .arc()
                .innerRadius(defaultRadiusRatio * this.r)
                .outerRadius(this.r);

            this.line = d3.svg
                .line()
                .interpolate('basis');

            this.donut = d3.layout
                .pie()
                .value(function(d) {
                    return d;
                });

            var pieContainer = this.base
                .append('g')
                .attr('class', 'pieContainer')
                .attr('transform', 'translate(' + (this.width() / 2) + ',' + (this.height() / 2) + ')');

            this.layer("slices", pieContainer, {

                dataBind: function(data) {
                    return this
                        .selectAll("path")
                        .data(data);
                },

                insert: function() {
                    return this.insert("path");
                },

                events: {
                    enter: function() {
                        var chart = this.chart();
                        return this
                            .attr('stroke', 'white')
                            .attr('stroke-width', 0.5)
                            .attr('fill', function(d, i) {
                                return chart.color(i);
                            })
                            .attr('d', chart.arc)
                            .on('mouseover', function(d) {
                                d3.select(this)
                                    .attr('opacity', 0.8);
                            })
                            .on('mouseout', function(d) {
                                d3.select(this)
                                    .attr('opacity', 1);
                            });
                    },
                    // "enter:transition": function() {
                    //     return this
                    //         .delay(500)
                    //         .attr("r", 5)
                    //         .style("fill", "blue");
                    // }
                }
            });

        },

        transform: function(data) {
            return this.donut(data);
        },

        tweenPie: function(b) {
            var r = this.radius();
            var i = d3.interpolate({
                startAngle: 0,
                endAngle: 0
            }, b);
            return function(t) {
                return _this.arc.innerRadius(defaultRadiusRatio * r).outerRadius(r)(i(t));
            };
        },

        radius: function(radius) {
            if (arguments.length === 0) {
                return this.r;
            }
            this.r = radius;
            return this;
        },

        innerRadius: function(innerRadius) {
            if (arguments.length === 0) {
                return this.ir;
            }
            this.ir = innerRadius;
            return this;
        },



    });

    return BasePieChart;

});