var BaseLineLayer = {

    modes: ["large", "medium", "small"],

    dataBind: function(data) {
        var chart = this.chart();
        return this.selectAll("path").data(data);
    },

    insert: function() {
        var chart = this.chart();
        var selection = this.append("path");
        return selection;
    },

    events: {
        merge: function() {
            var chart = this.chart();
            this.attr('d', function(d, i, j) {
                return chart.lineGenerator(d.data);
            });
            return this;
        }
    }
};

module.exports = BaseLineLayer;