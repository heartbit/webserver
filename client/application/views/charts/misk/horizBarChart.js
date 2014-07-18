define('horizBarChart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

    function HorizBarChart(el) {
        var self=this;
        this.el = el;
       
        this.margin_volume = {
                top: 0,
                right: 40,
                bottom: 30,
                left: 80
            };
        this.padding_volume = {
                right:8
        };

        this.width_volume = $(el).width() - this.margin_volume.left - this.margin_volume.right,
        this.height_volume = $(el).height() - this.margin_volume.top - this.margin_volume.bottom;
        
        this.chart_volume = d3.select("#js-horizBarChart")
            .append("svg")
            .attr("width", this.width_volume+this.margin_volume.left+this.margin_volume.right)
            .attr("height", this.height_volume+this.margin_volume.top+this.margin_volume.bottom)
            .append("g").attr("transform", function() {
                return "translate(" +self.margin_volume.left+ "," +self.margin_volume.top + ")"});

        this.colors_volume = {
            "BITSTAMP":"#57C0CD",
            "BTCE":"#32589A",
            "BTCCHINA":"#D3A28E",
            "BITFINEX":"#555B67",
            "KRAKEN":"#9A4032"
        };
        this.xScale_volume = d3.scale.linear().range([0,this.width_volume]);
           // .domain([0,d3.max(data, function(d) {return d.vol; })])
           console.log()
           
    };


    HorizBarChart.prototype.rogueDraw = function(params) {
        console.log(params);

        var data = params.data;
		var self =this;
        data = _.filter(data, function(ticker) {
            return typeof ticker.vol !== 'undefined';
        });
		data = _.sortBy(data,function(item){
			return item.vol
		});
		data = data.reverse();
		
        this.xScale_volume.domain([0,d3.max(data,function(d) {
            return d.vol;
        })]);
        console.log(data);

     
        var bar = this.chart_volume.selectAll(".barVolume")
	        .data(data)
			.enter()
			.append("g")
			// .attr("transform", function(d, i) {
			// 	return "translate(0," +(i*self.height_volume) + ")";
			// })
            .attr("class","barVolume");

        bar.append("rect")
            .attr("width", function(d) {
                console.log(self.xScale_volume(d.vol));
                return self.xScale_volume(d.vol);
            })
            .attr("height", function(d) {
                return (self.height_volume/data.length);
            })
			// .attr("transform", function(d, i) {
			// 	return "translate(5,0)";
			// })
			.attr("fill", function(d) {
				return self.colors_volume[d.platform]; 
			}).attr("y",function(d,i) {
                return i*(self.height_volume/data.length)+"px";
            });
    console.log(this.height_volume);

        bar.append("text")
            .attr("x", function(d) {
                return -self.padding_volume.right;
            })
            .attr("y", function(d,i) {
                return i*(self.height_volume/data.length)+(0.25*self.height_volume/data.length)+"px";
            })
            .attr("dy", "1em")
            .text(function(d) {
                return d.platform;
            });

		bar.append("text")
            .attr("x", function(d) {
                return self.width_volume-self.padding_volume.right;
            })
			 .attr("y", function(d,i) {
                return i*(self.height_volume/data.length)+(0.25*self.height_volume/data.length)+"px";
            })
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