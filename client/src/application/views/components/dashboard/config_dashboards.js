var Config = {
	main : {
		 items: [{
	          key: 'keyfactOne',
	          title:'Keyfact 1',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 1,
	          chart: 'PieChart',
	          datatype:'testitem2',
	          col: 1,
	          row: 1
	        },
	        {
	          key: 'keyfactTwo',
	          title:'KeyfactII',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 1,
	          chart: 'MarimekkoChart',
	          datatype:'testitem2',
	          col: 2,
	          row: 1
	        },
	        {
	          key: 'keyfact3',
	          title:'Keyfact 3',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 1,
	          col: 3,
	          row: 1
	        },
	        {
	          key: 'timeline',
	          title: 'Timeline',
	          icon:'fa fa-line-chart',
	          width: 2,
	          height: 2,
	          chart: 'MarimekkoChart',
	          datatype: 'testitem2',
	          col: 1,
	          row: 2
	        },
	        {
	          key: 'orderbook',
	          title: 'Orderbook',
	          icon:'fa fa-list',
	          width: 1,
	          height: 3,
	          chart: 'MarimekkoChart',
	          datatype: 'testitem2',
	          col: 3,
	          row: 2
	        },
	        {
	          key: 'depth',
	          title: 'Depth',
	          icon:'fa fa-area-chart',
	          width: 2,
	          height: 1,
	          chart: 'PieChart',
	          datatype: 'testitem2',
	          col: 1,
	          row: 4
	        },
	        {
	          key: 'volume',
	          title: 'Volume',
	          icon:'fa fa-pie-chart',
	          chart: 'PieChart',
	          datatype: 'testitem2',
	          width: 1,
	          height: 2,
	          col: 1,
	          row: 6
	        },
	        {
	          key: 'other',
	          title: 'Other',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 1,
	          col: 1,
	          row: 8
	        },
	        {
	          key: 'news',
	          title: 'News',
	          icon:'fa fa-newspaper-o',
	          width: 2,
	          height: 3,
	          col: 2,
	          row: 5
	        }],
	},
	account: {
		items: [{
	          key: 'keyfact1',
	          title:'Account',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 3,
	          col: 1,
	          row: 1,
	          datatype:"rippleaccount",
	          blocknum:0
	        },
	        {
	          key: 'keyfact2',
	          title:'Overview',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 3,
	          col: 3,
	          row: 1,
	          datatype:"accountoverview",
	          chart:"pie_accountoverview",
	          blocknum:0
	        },
	        {
	          key: 'keyfact3',
	          title:'Details',
	          icon:'fa fa-bar-chart',
	          width: 3,
	          height: 1,
	          col: 1,
	          row: 4,
	          blocknum:0
	        }]
	}
     
};

module.exports = Config;