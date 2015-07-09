/**
Provides generic behavior for chart objects
@module ChartEngine
@submodule Charts
@class AbstractChart
@abstract
*/

define(['d3', 'd3chart'], function(d3) {

	var BaseBarLayer = {

		modes: ["large", "medium"],

		dataBind: function(data) {
			var chart = this.chart();
			return this.selectAll("rect").data(data);
		},

		insert: function() {
			var chart = this.chart();
			var selection = this.append("rect");
			return selection;
		},

		events: {
			merge: function() {
				var chart = this.chart();
				var selection = this;
				if (chart.mode() === "medium") {
					selection.attr("width", 10)
						.attr("height", 10);
				} else if (chart.mode() === "large") {
					selection.attr("width", 50)
						.attr("height", 50);
				}
				selection.style("fill", "blue")
					.style("opacity", "0.5");

				selection.attr("x", function(d) {
					return chart.xScale(d);
				}).attr("y", chart.height() / 2);

				return selection;
			}
		}
	};

	return BaseBarLayer;

});
// {

//            dataBind: function(data) {
//                var chart = this.chart();

//                // Update the x-scale.
//                chart.xScale.domain(data.map(function(d) {
//                        return d;
//                    }));
//                chart.xScale.rangeRoundBands([0, chart.width()], 0.1);

//                // Update the y-scale.
//                chart.yScale
//                    .domain([
//                        d3.min(data, function(d) {
//                            return d3.min([d, 0]);
//                        }),
//                        d3.max(data, function(d) {
//                            return d;
//                        })
//                    ]);
//                chart.yScale.range([chart.height(), 0]);

//                return this.selectAll('.bar').data(data);
//            },

//            insert: function() {
//                var chart = this.chart();
//                // Append the bars
//                return this.append('rect')
//                    .attr('fill', 'blue')
//                    .attr('width', chart.xScale.rangeBand());
//            },

//            events: {
//                enter: function() {
//                    var chart = this.chart();
//                    return this
//                        .attr('x', function(d, i) {
//                            return chart.xScale(i);
//                        })
//                        .attr('y', function(d) {
//                            return chart.yScale(d3.max([0, d]));
//                        })
//                        .attr('height', function(d) {
//                            return Math.abs(chart.yScale(d) - chart.yScale(0));
//                        })
//                        .attr('fill', function(d, i) {
//                            return chart.color(i);
//                        });
//                }
//            }
//        });