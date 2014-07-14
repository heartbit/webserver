define('horizBarChart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

    function HorizBarChart(params) {
        this.el = params.el;
    };


    HorizBarChart.prototype.rogueDraw = function(params) {
        var data = params.data;
		var self =this;
        data = _.filter(data, function(ticker) {
            return typeof ticker.vol !== 'undefined';
        });
		data = _.sortBy(data,function(item){
			return item.vol
		});
		data = data.reverse();
		this.colors = {
			"BITSTAMP":"#57C0CD",
			"BTCE":"#32589A",
			"BTCCHINA":"#D3A28E",
			"BITFINEX":"#555B67",
			"KRAKEN":"#9A4032"
		};
	    var width = $("#js-horizBarChart").width()-50;
        var barHeight = 40;// $("#js-horizBarChart").height();

        var margin = {
            left: 50,
            top: 10
        };
        var x = d3.scale.linear()
            .domain([0,d3.max(data, function(d) {return d.vol; })])
            .range([0,width-margin.left]);
        var chart = d3.select("#js-horizBarChart")
            .append("svg")
            .attr("width", width-margin.left)
            .attr("height", data.length*barHeight+margin.top)
            .append("g").attr("transform", function() {
                return "translate(" + margin.left + "," +margin.top + ")";
            });
        var bar = chart.selectAll("g")
	        .data(data)
			.enter()
			.append("g")
			.attr("transform", function(d, i) {
				return "translate(0," +i*barHeight + ")";
			})

        bar.append("rect")
            .attr("width", function(d) {
                return x(d.vol);
            })
            .attr("height", (barHeight - 1) + "px")
			.attr("transform", function(d, i) {
				return "translate(70,0)";
			})
			.attr("fill", function(d) {
				return self.colors[d.platform]; 
			});
        bar.append("text")
            .attr("x", function(d) {
                return margin.left;
            })
            .attr("y", barHeight/4)
            .attr("dy", "1em")
            .text(function(d) {
                return d.platform;
            });
		bar.append("text")
			
            .attr("x", function(d) {
                return width-120;
            })
			
            .attr("y", barHeight/4)
            .attr("dy", "1em")
			
            .text(function(d) {
                return formatutils.formatVolumeShort(d.vol);
            });
    }


    HorizBarChart.prototype.update = function() {
        this.rogueDraw();
    };

    return HorizBarChart;

});