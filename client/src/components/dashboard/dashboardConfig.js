Config = {
	Conf1 : {
		widgets: [{
	   		key: 'keyfact1',
	        title:'Price & Volume',
	        icon:'fa fa-bar-chart',
	        chart: 'TickerWidget',
	        width: 12,
	        height: 1,
	        col: 0,
	        row: 0
	    },
	    {
	        key: 'selector',
	        title:'Selector ',
	        icon:'fa fa-hand-o-right',
	        chart: 'ParameterSelectorWidget',
	        width: 12,
	        height: 1,
	        col: 0,
	        row: 2
	    },
	    {
	        key: 'timeline',
	        title: 'Timeline',
	        icon:'fa fa-line-chart',
	        width: 12,
	        height: 3,
	        chart: 'MainChartWidget',
	        col: 0,
	        row: 3,
	        resize_reload: true
	    },
	    {
	        key:'orderbook',
	        title:"Orderbook",
	        icon:'fa fa-bar-chart',
	        width: 12,
	        height: 3,
	        chart: 'OrderbookChartWidget',
	        col: 0,
	        row:7
	    },
	    {
	        key:'bidask',
	        title:'Bids/Asks',
	        icon:'',
	        width:8,
	        height:4,
	        chart: 'OrderbookListWidget',
	        col:0,
	        row:10
	    },
	    {
	        key:'activeaccounts',
	        title:'Active Accounts',
	        icon:'',
	        width:4,
	        height:4,
	        chart: 'ActiveAccountsWidget',
	        col:9,
	        row:10
	    }
	    ]
	}
};

module.exports = Config;