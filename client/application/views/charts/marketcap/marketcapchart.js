define('marketcapchart', ['config', 'dataHelper', 'd3','moment'], function(config, DataHelper, d3) {

    var MarketcapChart=function(el) {
    	var self=this;
        this.el = el;
       
    };

    MarketcapChart.prototype.draw=function(marketcaps) {
    	// console.log(marketcaps.marketcaps.length);
    	var self=this;
    	var positionnement= {
    		milieu_h:2.4375
    	}
    	var case_rank=function(data,index) {
    		d3.select("#rank_"+data.name).append("text").text(index+1);
    	}

    	var case_marketcap=function(data,index) {
    		this.svg_marketcap=d3.select("#marketcap_"+data.name).append("svg").append("g");
    		this.svg_marketcap.append("rect").attr("width",100).attr("height",10);
    		this.svg_marketcap.append("text").text(data.marketcap).attr("y",2.4375+"em");
    	}

    	var case_name=function(data,index) {
    		d3.select("#"+data.name).append("text").text(data.name).attr("fill","white");
    	}

    	var case_price_volume=function(data,index) {
    		d3.select("#price_volume_"+data.name).append("text").text(data.price);
    		d3.select("#price_volume_"+data.name).append("text").text(data.volume_24);
    	}

    	var case_change=function(data,index) {
    		d3.select("#change_"+data.name).append("text").text(data.priceChange);
    		d3.select("#change_"+data.name).append("text").text(data.volumeChange);
    	}
    	var case_correlation=function(data,index) {
    		d3.select("#correlation_"+data.name).append("text").text(data.correlation);
    	}


    	_.each(marketcaps.marketcaps, function(data,index) {
    		
    		
    		case_rank(data,index);
    		case_marketcap(data,index);
    		case_name(data,index);
    		case_price_volume(data,index);
    		case_change(data,index);
    		case_correlation(data,index);
    		
    		// console.log(data[name]);
    		
    	});
    }
    
    return MarketcapChart;

});