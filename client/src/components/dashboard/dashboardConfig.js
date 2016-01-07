Config = {
	app : {
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
	        id:'app',
	        icon:'',
	        width:4,
	        height:4,
	        chart: 'ActiveAccountsWidget',
	        col:9,
	        row:10
	    }
	    ]
	},
	marketMakers: {
		widgets: [{
	        key:'activeaccounts',
	        title:'BITSTAMP XRP/USD',
	        id: 'BITSTAMPXRPUSD',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:0,
	        row:0
	    },
	    {
	        key:'activeaccounts2',
	        title:'TOKYOJPY XRP/JPY',
	        id: 'TOKYOJPYXRPJPY',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:4,
	        row:0
	    },
	    {
	        key:'activeaccounts3',
	        title:'RIPPLEFOX XRP/CNY',
	        id: 'RIPPLEFOXXRPCNY',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:9,
	        row:0
	    },
	    {
	        key:'activeaccounts4',
	        title:'SNAPSWAP XRP/USD',
	        id: 'SNAPSWAPXRPUSD',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:9,
	        row:2
	    },
	    {
	        key:'activeaccounts5',
	        title:'BITSTAMP XRP/BTC',
	        id: 'BITSTAMPXRPBTC',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:0,
	        row:2
	    },
	    {
	        key:'activeaccounts6',
	        title:'GATEHUB XRP/USD',
	        id: 'GATEHUBXRPUSD',
	        icon:'',
	        width:4,
	        height:2,
	        chart: 'ActiveAccountsWidget',
	        col:4,
	        row:2
	    }
		]
	}
};

module.exports = Config;