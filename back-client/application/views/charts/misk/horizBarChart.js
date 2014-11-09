define('horizBarChart', ['config', 'dataHelper', 'd3', 'FormatUtils', 'moment'], function(config, Datahelper, d3, formatutils) {

    function HorizBarChart(el) {
        var self = this;
        this.el = el;

        this.margin_volume = {
            top: 25,
            right: 40,
            bottom: 30,
            left: 80
        };
        this.padding_volume = {

                right:8,
                top:12

        };
        
        this.width_volume = $(el).width() - this.margin_volume.left - this.margin_volume.right,
        this.height_volume = $(el).height() - this.margin_volume.top - this.margin_volume.bottom;

        this.chart_volume = d3.select("#js-horizBarChart")
            .append("svg")
            .attr("width", this.width_volume + this.margin_volume.left + this.margin_volume.right)
            .attr("height", this.height_volume + this.margin_volume.top + this.margin_volume.bottom)
            .append("g").attr("transform", function() {
                return "translate(" + self.margin_volume.left + "," + self.margin_volume.top + ")"
            });

        this.colors_volume = {
<<<<<<< HEAD
            "BITSTAMP": "#57C0CD",
            "BTCE": "#32589A",
            "BTCCHINA": "#D3A28E",
            "BITFINEX": "#555B67",
            "KRAKEN": "#9A4032"
=======
            "BITSTAMP":"rgb(50,180,80)",
            "BTCE":"rgb(140,70,110)",
            "BTCCHINA":"rgb(220,130,70)",
            "BITFINEX":"#555B67",
            "KRAKEN":"rgb(200,40,50)"
>>>>>>> 532e52dea05f10d88a90ec3c342b864e38d61cd6
        };
        this.xScale_volume = d3.scale.linear().range([0, this.width_volume]);
        // .domain([0,d3.max(data, function(d) {return d.vol; })])
        // console.log()

    };


    HorizBarChart.prototype.rogueDraw = function(params) {
<<<<<<< HEAD
        // console.log(params);

=======
       
>>>>>>> 532e52dea05f10d88a90ec3c342b864e38d61cd6
        var data = params.data;
        var self = this;
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
            //Titre - label
        this.chart_volume.append("text")
            .style("text-anchor",'start')
            .attr("y", function() {
                return -self.padding_volume.top+"px";
            })
            .text(function() {
               var text='';
               _.each(data[0] , function(d,i) {
                    if(i=="item") {
                        text="Last 24h - Live Volumes in "+d;
                    }
                });
               return text;
                
            }).attr("id","volume_titre");
<<<<<<< HEAD

=======
     
>>>>>>> 532e52dea05f10d88a90ec3c342b864e38d61cd6
      
        var bar = this.chart_volume.selectAll(".barVolume")
            .data(data)
            .enter()
            .append("g")
            // .attr("transform", function(d, i) {
            // 	return "translate(0," +(i*self.height_volume) + ")";
            // })
            .attr("class", "barVolume");

        bar.append("rect")
            .attr("width", function(d) {

                return self.xScale_volume(d.vol);
            })
            .attr("height", function(d) {
                return (self.height_volume / data.length) - 3;
            })

			.attr("fill", function(d) {
				return self.colors_volume[d.platform]; 
			}).attr("y",function(d,i) {
                return i*(self.height_volume/data.length)+"px";
            });


        //Platform - label  
        bar.append("text")
            .attr("x", function(d) {
                return -self.padding_volume.right;
            })
            .attr("y", function(d, i) {
                return i * ((self.height_volume - 3) / data.length) + (0.25 * self.height_volume / data.length) + "px";
            })
            .attr("dy", "1em")
            .text(function(d) {
                return d.platform;
            });
        //Pair - label
        bar.append("text")
            .attr("x", function(d) {
                return self.width_volume / 2;
            })
            .attr("y", function(d, i) {
                return i * ((self.height_volume - 3) / data.length) + (0.25 * self.height_volume / data.length) + "px";
            })
            .attr("dy", "1em")
            .text(function(d) {
                return formatutils.formatItem(d.item + "/" + d.currency);
            });
        //Volume - label
        bar.append("text")
            .attr("x", function(d) {
                return self.width_volume - self.padding_volume.right;
            })
            .attr("y", function(d, i) {
                return i * ((self.height_volume - 3) / data.length) + (0.25 * self.height_volume / data.length) + "px";
            })
            .attr("dy", "1em")
            .text(function(d) {

                 var text='';
               _.each(data[0] , function(d,i) {
                    if(i=="item") {
                        text=d;
                    }
                });
                return formatutils.formatVolumeShort(d.vol)+" "+text;
            });

    }


    HorizBarChart.prototype.update = function() {
        this.rogueDraw();
    };

    return HorizBarChart;

});