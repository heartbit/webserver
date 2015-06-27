var d3 = require("d3");
var i=0;
var PieChart = {

	remove: function(keyfact) {
		d3.select('#Overview'+keyfact+" svg").remove();
	},


	
	draw : function(keyfact,toresolve,datasets) {
		var width = 200,
		height = 200,
		radius = Math.min(width,height)/2,
		labelRadius = 60;

		// var color = d3.scale.ordinal()
		// 	.range(["#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121", "#830909"]);

		var colors = {
			USD:'#14961E',
			BTC: '#D88028',
			JPY:'#703866',
			EUR: '#C6B328',
			LTC: '#8FBC8F',
			CNY:'#A21A1C',
			KRW:'#6496C8',
			XRP:'#346AA9',
			default:'##D3D3D3'
		}
		
		var data = [];
		_.map(datasets.ripplelines.lines,function(line) {
			if( line.balance > 0 ) {
				
				var balance = { balance:parseFloat(line.balance), currency:line.currency, xrpequ:"" };

				// Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
				 _.each(datasets.rippleexchangerates, function(account) {
					if(_.isObject(account)) {
						if( line.currency == account.base.currency ) {
							// console.log("line.currency",line.currency,"account.base.currency",account.base.currency);
							var xrpequivalent = line.balance*account.last;
						
							balance.xrpequ = xrpequivalent;	
						}
					};
				});
						
				data.push(balance);
			}
		
		});
		
		//Add XRP
		var xrpbalance ={ 
			balance:parseFloat((datasets.rippleinfos.account_data.Balance)*Math.pow(10,-6)), 
			currency:"XRP",
			xrpequ:parseFloat((datasets.rippleinfos.account_data.Balance)*Math.pow(10,-6))
		};

		data.push(xrpbalance);
	
		data.sort(function(a,b) {
			if (a.currency < b.currency) 
				return -1;
			if(a.currency > b.currency)
				return 1;
			return 0
		});


		var arc = d3.svg.arc()
			.outerRadius(radius-40)
			.innerRadius(30);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) {  return d.xrpequ });

		var svg = d3.select('#Overview'+keyfact).append("svg")
				.attr("width",width)
				.attr("height",height)
				.attr("class","piechart_overview")
			.append("g")
				.attr("transform", "translate("+ width/2 + "," + height/2 + ")");

		var g = svg.selectAll(".arc")
				.data(pie(data))
				.enter().append("g")
				.attr("class","arc");

		g.append("path")
				.attr("d",arc)
				.style("fill", function(d) { return colors[d.data.currency] } );

		g.append("text")
		// .attr("text-anchor", function(d) {
		//     // are we past the center?
		//     return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
		// })	
		.text(function(d) { return d.data.currency })
		.attr({

			    x: function (d, i) {
			        centroid = arc.centroid(d);
			        midAngle = Math.atan2(centroid[1], centroid[0]);
			        x = Math.cos(midAngle) * labelRadius;
			        sign = (x > 0) ? 1 : -1
			        labelX = x + (5 * sign)
			        return labelX;
			    },
			    y: function (d, i) {
			        centroid = arc.centroid(d);
			        midAngle = Math.atan2(centroid[1], centroid[0]);
			        // ajustement partie basse du cercle
			        var a = Math.PI/2;
			        var b = Math.PI*2*0.75;
			        if(a <d.endAngle && d.endAngle<b) {
			        	y = Math.sin(midAngle) * labelRadius + $(this).height()/2;
			        } else {
			        	y = Math.sin(midAngle) * labelRadius;
			        }
			        return y;
			    },
			        'text-anchor': function (d, i) {
			        centroid = arc.centroid(d);
			        midAngle = Math.atan2(centroid[1], centroid[0]);
			        x = Math.cos(midAngle) * labelRadius;
			        return (x > 0) ? "start" : "end";
			    },
			        'class': 'pieoverviewlabels'
		});
	

		// $('#Overview'+keyfact).find('text').each(function(){
		// 	var width = $(this).width();
		// });
		


	}
}

module.exports = PieChart;