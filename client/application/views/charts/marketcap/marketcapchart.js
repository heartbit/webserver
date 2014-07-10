define('marketcapchart', ['config', 'dataHelper', 'd3', 'moment','tablesorter','tablesorter_widget'], function(config, DataHelper, d3) {

    var MarketcapChart = function(el) {
        var self = this;
        this.el = el;
        $(function(){
          $("#marketcapTable").tablesorter({
            selectSort:'a',
            widgets: ["stickyHeaders"],
            widgetOptions : {
            // css class name applied to the sticky header
            stickyHeaders : "tablesorter-stickyHeader"
            }
          });
        });
     
    };


    MarketcapChart.prototype.init = function(marketcaps) {

    }

    MarketcapChart.prototype.parse= function(marketcaps) {}

    MarketcapChart.prototype.draw = function(marketcaps) {
        var self=this;
        console.log(marketcaps);

    }

    return MarketcapChart;

});