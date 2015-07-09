requirejs.config({
	waitSeconds: 30
})

require(['../../dist/ChartEngine'], function(ChartEngine) {

	var chartParams = {
		anchorId: "#test",
		chartType: "PieChart",
		size: 'auto',
		modeDebug: false
	};

	var chart = ChartEngine.create(chartParams);

	// var dataset = {
	// 	lines: [{
	// 		id: "2013",
	// 		name: "2013",
	// 		points: [{
	// 			id: "social",
	// 			value: 3953,
	// 			x: "Social",
	// 			name: "Social"
	// 		}, {
	// 			id: "direct",
	// 			value: 3242,
	// 			x: "Direct",
	// 			name: "Direct"
	// 		}, {
	// 			id: "email",
	// 			value: 2824,
	// 			x: "Email",
	// 			name: "Email"
	// 		}, {
	// 			id: "non_social_referrer",
	// 			value: 27176,
	// 			x: "Non social referrer",
	// 			name: "Non social referrer"
	// 		}]
	// 	}, {
	// 		id: "2014",
	// 		name: "2014",
	// 		points: [{
	// 			id: "social",
	// 			value: 116137,
	// 			x: "Social",
	// 			name: "Social"
	// 		}, {
	// 			id: "direct",
	// 			value: 20382,
	// 			x: "Direct",
	// 			name: "Direct"
	// 		}, {
	// 			id: "non_branded_keyword",
	// 			value: 4213,
	// 			x: "Non branded keyword",
	// 			name: "Non branded keyword"
	// 		}, {
	// 			id: "non_social_referrer",
	// 			value: 2387,
	// 			x: "Non social referrer",
	// 			name: "Non social referrer"
	// 		}]
	// 	}]
	// };

	var dataset = {
		points: [{
			id: "Direct",
			value: 9114275,
			x: "Direct",
			name: "Direct"
		}, {
			id: "Organic Search",
			value: 8889812,
			x: "Organic Search",
			name: "Organic Search"
		}, {
			id: "Referral",
			value: 5462432,
			x: "Referral",
			name: "Referral"
		}, {
			id: "Paid Search",
			value: 2416776,
			x: "Paid Search",
			name: "Paid Search"
		},
		{
			id: "Hello",
			value: 2416776,
			x: "Hello",
			name: "Hello"
		},
		{
			id: "Bonjour",
			value: 2416776,
			x: "Bonjour",
			name: "Bonjour"
		}],
		name: "2014/08",
		id: "time:20142308"
	};

	chart.draw(dataset);

});
