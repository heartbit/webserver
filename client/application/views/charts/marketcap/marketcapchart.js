define('marketcapchart', ['config', 'dataHelper', 'd3', 'moment'], function(config, DataHelper, d3) {

    var MarketcapChart = function(el) {
        var self = this;
        this.el = el;
    };

    MarketcapChart.prototype.minipiechart.init =function() {

    	var height=26em,
    		radius=height/2;

    	var color=["#FA0202","#2C677A"];

    	var arc= d3.svg.arc()outerRadius(radius-5);

    	var pie= d3.layout.pie()
    		.sort(null)
    		.value(function(d) {
    			return d.correlation;
    		});
    }

    MarketcapChart.prototype.draw = function(marketcaps) {
        var self = this;

        var positionnement = {
            milieu_h: 1.5625,
            milieu_h_moins: 1.125,
            milieu_h_plus: 2
        }

        var case_rank = function(data, index) {
            this.svg_rank = d3.select("#rank_" + data.name).append("svg").append("g");
            this.svg_rank.append("text")
                .text(index + 1)
                .attr("y", positionnement.milieu_h + "em");
        }

        var case_marketcap = function(data, index) {
            this.svg_marketcap = d3.select("#marketcap_" + data.name).append("svg").append("g");
            //this.svg_marketcap.append("rect").attr("width",100).attr("height",10);
            this.svg_marketcap.append("text")
                .text(data.marketcap)
                .attr("y", positionnement.milieu_h + "em");
        }

        var case_name = function(data, index) {
            this.svg_name = d3.select("#" + data.name).append("svg").append("g");
            this.svg_name.append("text")
                .text(data.name)
                .attr("y", positionnement.milieu_h + "em");
        }

        var case_price_volume = function(data, index) {
            this.svg_price_volume = d3.select("#price_volume_" + data.name).append("svg").append("g");
            this.svg_price_volume.append("text")
                .text(data.price)
                .attr("y", positionnement.milieu_h_moins + "em");
            this.svg_price_volume.append("text")
                .text(data.volume_24)
                .attr("y", positionnement.milieu_h_plus + "em");
        }

        var case_change = function(data, index) {
            this.svg_change = d3.select("#change_" + data.name).append("svg").append("g");
            this.svg_change.append("text")
                .text(data.priceChange).attr("y", positionnement.milieu_h_moins + "em");
            this.svg_change.append("text")
                .text(data.volumeChange).attr("y", positionnement.milieu_h_plus + "em");
        }

        var case_correlation = function(data, index) {
            this.svg_correlation = d3.select("#correlation_" + data.name).append("svg").append("g");
            this.svg_correlation.append("text")
                .text(data.correlation).attr("y", positionnement.milieu_h + "em");
        }

        _.each(marketcaps.marketcaps, function(data, index) {
            case_rank(data, index);
            case_marketcap(data, index);
            case_name(data, index);
            case_price_volume(data, index);
            case_change(data, index);
            case_correlation(data, index);

            this.minipiechart.init();
        });

        
       // this.minipiechart.draw(marketcaps.marketcap);

    }

    return MarketcapChart;

});