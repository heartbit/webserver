define(['d3', 'BaseAbstractChart', 'BaseBarLayer', 'd3Utils', 'd3chart'], function(d3, BaseAbstractChart, d3Utils) {

    var BaseBarChart = d3.chart("BaseAbstractChart").extend("BaseBarChart", {

        initialize: function(options) {

            this.xScale = d3.scale.ordinal();
            this.yScale = d3.scale.linear();

            var barsLayerBase = this.base
                .append('g')
                .classed('bars', true);

            this.layer("bars", barsLayerBase, BaseBarLayer);

       
        },

        transform: function(data) {
            return data;
        },

        width: function(newWidth) {
            if (arguments.length === 0) {
                return this._width;
            }
            this._width = newWidth;
            this.base.attr('width', this._width);
            this.xScale.rangeRoundBands([0, newWidth], 0.1);
            return this;
        },

        height: function(newHeight) {
            if (arguments.length === 0) {
                return this._height;
            }
            this._height = newHeight;
            this.base.attr('height', this._height);
            this.yScale.range([newHeight, 0]);
            return this;
        },

    });

    return BaseBarChart;

});