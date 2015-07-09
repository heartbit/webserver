require(['../../dist/ChartEngine'], function(ChartEngine) {

	var chartParams = {
		anchorId: "#test",
		chartType: "ScreenChart",
		size: 'auto'
	};

	var chart = ChartEngine.create(chartParams);

	var dataset = {
		"lines": [{
			"points": [{
				"id": "1366x768",
				"value": 4660004,
				"x": "1366x768",
				"name": "1366x768"
			}, {
				"id": "1024x768",
				"value": 1207908,
				"x": "1024x768",
				"name": "1024x768"
			}, {
				"id": "1280x800",
				"value": 628561,
				"x": "1280x800",
				"name": "1280x800"
			}],
			"name": "Screen resolution",
			"id": "screenResolution"
		}]
	};

	chart.draw(dataset);

});