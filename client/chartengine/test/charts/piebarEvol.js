requirejs.config({
	waitSeconds: 30
})

require(['../../dist/ChartEngine'], function(ChartEngine) {

	var chartParams = {
		anchorId: "#test",
		chartType: "PieBarEvol",
		size: 'auto',
		options: {
			pie: {
				title: 'Split of visits by channel'
			},
			barevol: {
				title: 'Evolution over previous month, in points'
			}
		}
	};

	chart = ChartEngine.create(chartParams);

	realDs = {
		"last": {
			"lines": [{
				"id": "time:20142309",
				"points": [{
					"id": "Direct",
					"value": 1447,
					"x": "Direct",
					"name": "Direct"
				}, {
					"id": "Referral",
					"value": 1401,
					"x": "Referral",
					"name": "Referral"
				}, {
					"id": "Organic Search",
					"value": 567,
					"x": "Organic Search",
					"name": "Organic Search"
				}, {
					"id": "___other",
					"value": 449,
					"x": "Other",
					"name": "3 others",
					"status": "other"
				}],
				"total": 3864
			}]
		},
		"evol": {
			"lines": [{
				"id": "time:20142308->time:20142309",
				"points": [{
					"id": "Direct",
					"value": 0.44700000000000006,
					"originalValue": 1447,
					"x": "Direct",
					"name": "Direct"
				}, {
					"id": "Referral",
					"value": -0.13250773993808052,
					"originalValue": 1401,
					"x": "Referral",
					"name": "Referral"
				}, {
					"id": "Organic Search",
					"value": 0.06981132075471708,
					"originalValue": 567,
					"x": "Organic Search",
					"name": "Organic Search"
				}],
				"total": 3864
			}]
		}
	}

	var multiDataset = {
		last: {
			lines: [{
				points: [{
					id: "direct",
					value: 9114275,
					x: "Direct",
					name: "Direct"
				}, {
					id: "organic_Search",
					value: 8889812,
					x: "Organic Search",
					name: "Organic Search"
				}, {
					id: "referral",
					value: 5462432,
					x: "Referral",
					name: "Referral"
				}, {
					id: "paid_search",
					value: 2416776,
					x: "Paid Search",
					name: "Paid Search"
				}, {
					id: "other",
					value: 2245423,
					x: "(Other)",
					name: "(Other)",
					status: 'other'
				}]
			}]
		},
		evol: {
			lines: [{
				points: [{
					id: "direct",
					value: 13,
					x: "Direct",
					name: "Direct",
				}, {
					id: "organic_Search",
					value: -2,
					x: "Organic Search",
					name: "Organic Search"
				}, {
					id: "referral",
					value: 6,
					x: "Referral",
					name: "Referral"
				}, {
					id: "paid_search",
					value: -11,
					x: "Paid Search",
					name: "Paid Search"
				}]
			}]
		}
	};

	chart.draw(realDs);

});