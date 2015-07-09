var BaseCircleLayer = {

    modes: ["large"],

    dataBind: function(data) {
        return this.selectAll("circle").data(data[0].data);
    },

    insert: function() {
        return this.append("circle").classed('circle', true);
    },

    events: {
        enter: function() {},
        exit: function() {},
        merge: function() {
            var chart = this.chart();
            this
                .attr('cx', function(d, i, j) {
                    return chart.timescale(d.timestamp);
                })
                .attr('cy', function(d, i, j) {
                    return chart.yScale(d.value);
                })
                .attr('r', 10);
            return this;
        }
    }

};

module.exports = BaseCircleLayer;