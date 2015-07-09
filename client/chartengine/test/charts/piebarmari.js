require(['../../dist/ChartEngine'], function(ChartEngine) {

	var chartParams = {
		anchorId: "#test",
		chartType: "PieBarMari",
		size: 'auto'
	};

	var chart = ChartEngine.create(chartParams);

	var mari = {
		lines: [{
			id: "Social",
			name: "Social",
			points: [{
				id: "blog_netvibes_com",
				value: 3953,
				x: "blog.netvibes.com",
				name: "blog.netvibes.com"
			}, {
				id: "eco_netvibes_com",
				value: 3242,
				x: "eco.netvibes.com",
				name: "eco.netvibes.com"
			}, {
				id: "faq_netvibes_com",
				value: 2824,
				x: "faq.netvibes.com",
				name: "faq.netvibes.com"
			}, {
				id: "other:ga:source",
				value: 27176,
				x: "other:ga:source",
				name: "other:ga:source"
			}]
		}, {
			id: "Referral",
			name: "Referral",
			points: [{
				id: "social",
				value: 116137,
				x: "other:ga:source",
				name: "other:ga:source"
			}, {
				id: "feeds_feedburner_com",
				value: 20382,
				x: "feeds.feedburner.com",
				name: "feeds.feedburner.com"
			}, {
				id: "1_1_1_1",
				value: 4213,
				x: "1.1.1.1",
				name: "1.1.1.1"
			}, {
				id: "techsupportalert_com",
				value: 2387,
				x: "techsupportalert.com",
				name: "techsupportalert.com"
			}]
		}, {
			id: "Organic Search",
			name: "Organic Search",
			points: [{
				id: "other:ga:source",
				value: 7573,
				x: "other:ga:source",
				name: "other:ga:source"
			}, {
				id: "google",
				value: 162817,
				x: "google",
				name: "google"
			}, {
				id: "bing",
				value: 6647,
				x: "bing",
				name: "bing"
			}, {
				id: "baidu",
				value: 4459,
				x: "baidu",
				name: "baidu"
			}]
		}, {
			id: "Direct",
			name: "Direct",
			points: [{
				id: "other:ga:source",
				value: 0,
				x: "other:ga:source",
				name: "other:ga:source"
			}, {
				id: "direct",
				value: 1930331,
				x: "Direct",
				name: "Direct"
			}]
		}, {
			id: "others",
			name: "others",
			points: [{
				id: "others",
				value: 16151,
				x: "others",
				name: "others"
			}]
		}]
	};

	var piebar = {
		lines: [{
			id: "2013",
			name: "2013",
			points: [{
				id: "social",
				value: 3953,
				x: "Social",
				name: "Social"
			}, {
				id: "direct",
				value: 3242,
				x: "Direct",
				name: "Direct"
			}, {
				id: "email",
				value: 2824,
				x: "Email",
				name: "Email"
			}, {
				id: "non_social_referrer",
				value: 27176,
				x: "Non social referrer",
				name: "Non social referrer"
			}]
		}, {
			id: "2014",
			name: "2014",
			points: [{
				id: "social",
				value: 116137,
				x: "Social",
				name: "Social"
			}, {
				id: "direct",
				value: 20382,
				x: "Direct",
				name: "Direct"
			}, {
				id: "non_branded_keyword",
				value: 4213,
				x: "Non branded keyword",
				name: "Non branded keyword"
			}, {
				id: "non_social_referrer",
				value: 2387,
				x: "Non social referrer",
				name: "Non social referrer"
			}]
		}]
	};

	var dataset = {
		mari: mari,
		piebar: piebar
	};

	chart.draw(dataset);

});