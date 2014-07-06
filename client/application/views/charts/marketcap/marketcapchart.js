define('marketcapchart', ['config', 'dataHelper', 'd3', 'moment'], function(config, DataHelper, d3) {

    var MarketcapChart = function(el) {
        var self = this;
        this.el = el;
    };

    MarketcapChart.prototype.init =function(data,index) {
   
    	var height=38,
    		radius=height/2;

    	this.color=d3.scale.ordinal()
    		.range(["#145415","#FA0202"]);

    	this.arc= d3.svg.arc().outerRadius(radius);

    	this.pie= d3.layout.pie()
    		.value(function(d) {
    			console.log(d);
    			return d;
    		});

    	this.svg_minipie=d3.select("#correlation_"+data.name).append("svg").append("g")
    		.attr("transform","translate("+(75-radius)+","+height/2+")")
    		.attr("id","#correlation_pie_"+data.name);
    }

    MarketcapChart.prototype.draw = function(marketcaps) {
        var self = this;

        var positionnement = {
            milieu_h: 1.5625,
            milieu_h_moins: 1.125,
            milieu_h_plus: 2
        }

        var minipiechart=function(data,index) {
        	var pieData=[data.correlation,1-data.correlation];
        	var g=self.svg_minipie.selectAll(".arc")
        		.data(self.pie(pieData))
        		.enter().append("g")
        		.attr("class","arc");

        	g.append("path")
        		.attr("d",self.arc)
        		.style("fill",function(d) { console.log(d); return self.color(d.data);});
       		self.svg_minipie.append("text")
                .text(data.correlation).attr("class","marketcap_correlation").attr("y",positionnement.milieu_h);
        }
        //var case_correlation = function(data, index) {
            // this.svg_correlation = d3.select("#correlation_" + data.name).append("svg").append("g");
            // this.svg_correlation.append("text")
            //     .text(data.correlation).attr("y", positionnement.milieu_h + "em");
        //}

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
      
            if(parseInt(data.priceChange)>0) {
            	this.svg_change.append("text")
                .text("+"+data.priceChange).attr("y", positionnement.milieu_h_moins + "em").attr("fill","green");
            }else {
            	this.svg_change.append("text")
                .text(data.priceChange).attr("y", positionnement.milieu_h_moins + "em").attr("fill","red");
            }
             if(parseInt(data.volumeChange)>0) {
            	this.svg_change.append("text")
                .text("+"+data.volumeChange).attr("y", positionnement.milieu_h_plus + "em").attr("fill","green");
            }else {
            	this.svg_change.append("text")
                .text(data.volumeChange).attr("y", positionnement.milieu_h_plus + "em").attr("fill","red");
            }
        }

       

        _.each(marketcaps.marketcap, function(data,index) {
        	self.init(data,index);
        	minipiechart(data,index);
        });

        _.each(marketcaps.marketcaps, function(data, index) {
            case_rank(data, index);
            case_marketcap(data, index);
            case_name(data, index);
            case_price_volume(data, index);
            case_change(data, index);
           // case_correlation(data, index);
        });

       

        
       // this.minipiechart.draw(marketcaps.marketcap);

    }

    return MarketcapChart;

});