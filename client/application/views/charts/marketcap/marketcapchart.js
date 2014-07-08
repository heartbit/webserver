define('marketcapchart', ['config', 'dataHelper', 'd3', 'moment'], function(config, DataHelper, d3) {

    var MarketcapChart = function(el) {
        var self = this;
        this.el = el;
    };

    MarketcapChart.prototype.init = function(data, index) {

    }

    MarketcapChart.prototype.draw = function(marketcaps) {
      var self=this;

    }

    return MarketcapChart;

});