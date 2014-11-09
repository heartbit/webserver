define('candleLayer', ['config', 'dataHelper', 'd3', 'maingraphes', 'maingraphe', 'GrapheExceptionsUtils', 'tooltip','moment'], function(config, DataHelper, d3, Maingraphes, Maingraphe, Grapheexceptionsutils,Tooltip) {

    function Chandelier(el) {};

    Chandelier.prototype.updateChandelier = function() {
        var self = this;

        // Init chandelier chart data
        this.chandelierChart = this.volumeBarChartLayer
            .selectAll("rect.chandelier")
            .data(self.volumes, function(volume) {
                return volume.startDate;
            });

        // Enter
        this.chandelierChart
            .enter()
            .insert("rect")
            .attr("class", "chandelier");

        // Exit
        this.chandelierChart
            .exit()
            .transition()
            .duration(500)
            .attr('opacity', 0)
            .remove();

        // Update
        this.chandelierChart
            .attr("x", function(d) {
                return self.timeScale(d.startDate);
            })
            .attr('y', function(d) {
                return self.candleYScale(d.close);
            })
            .attr("height", function(d) {
                return self.height - self.volumeYScale(d.amount);
            })
            .attr("width", function(d) {
                return (self.timeScale(d.endDate) - self.timeScale(d.startDate)) - 1;
            })
            .attr('fill', function(volume, i) {
                // var correspondingCandle = self.candles[i];
                // if (correspondingCandle.close < correspondingCandle.open) {
                //     return "red";
                // }
                // if (correspondingCandle.close > correspondingCandle.open) {
                //     return "green";
                // }
                return "grey";
            })
            .transition()
            .duration(500)
            .attr('opacity', .5)
    };

    

    return Chandelier;

});