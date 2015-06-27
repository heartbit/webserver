var Config = {
	main: {
		items: [

			// {
			// 	key: 'main',
			// 	title: 'Timeline',
			// 	icon: 'fa fa-bar-chart',
			// 	width: 3,
			// 	height: 1,
			// 	chart: 'PieChart',
			// 	datatype: 'testitem2',
			// 	col: 1,
			// 	row: 1
			// },

			//  {
			// 	key: 'keyfact1',
			// 	title: 'Keyfact 1',
			// 	icon: 'fa fa-bar-chart',
			// 	width: 1,
			// 	height: 1,
			// 	chart: 'MarimekkoChart',
			// 	datatype: 'testitem2',
			// 	col: 1,
			// 	row: 3
			// }, {
			// 	key: 'keyfact2',
			// 	title: 'Keyfact 2',
			// 	icon: 'fa fa-bar-chart',
			// 	width: 1,
			// 	height: 1,
			// 	col: 2,
			// 	row: 3
			// }, {
			// 	key: 'keyfact3',
			// 	title: 'Keyfact 3',
			// 	icon: 'fa fa-bar-chart',
			// 	width: 1,
			// 	height: 1,
			// 	col: 3,
			// 	row: 3
			// },
			{
				key: 'keyfact1',
				title: 'Keyfact 1',
				icon: 'fa fa-bar-chart',
				width: 1,
				height: 1,
				chart: 'MarimekkoChart',
				datatype: 'testitem2',
				col: 1,
				row: 1
			}, {
				key: 'keyfact2',
				title: 'Keyfact 2',
				icon: 'fa fa-bar-chart',
				width: 1,
				height: 1,
				col: 2,
				row: 1
			}, {
				key: 'keyfact3',
				title: 'Keyfact 3',
				icon: 'fa fa-bar-chart',
				width: 1,
				height: 1,
				col: 3,
				row: 1
			}, {
				key: 'timeline',
				title: 'Timeline',
				icon: 'fa fa-line-chart',
				width: 3,
				height: 3,
				chart: 'MarimekkoChart',
				datatype: 'testitem2',
				col: 1,
				row: 2
			}
		],
	},
	account: {
		items: [{
			key: 'keyfact1',
			title: 'Account',
			icon: 'fa fa-bar-chart',
			width: 2,
			height: 3,
			col: 1,
			row: 1,
			datatype: "rippleaccount",
			blocknum: 0
		}, {
			key: 'keyfact2',
			title: 'Overview',
			icon: 'fa fa-bar-chart',
			width: 1,
			height: 3,
			col: 3,
			row: 1,
			datatype: "accountoverview",
			chart: "pie_accountoverview",
			blocknum: 0
		}, {
			key: 'keyfact3',
			title: 'Details',
			icon: 'fa fa-bar-chart',
			width: 3,
			height: 1,
			col: 1,
			row: 4,
			blocknum: 0
		}]
	}

};

module.exports = Config;