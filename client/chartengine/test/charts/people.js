require(['../../dist/ChartEngine'], function(ChartEngine) {

	var chartParams = {
		anchorId: "#test",
		chartType: "IconChart",
		size: 'auto',
		options: {
			iconSet: 'people'
		}
	};

	var chart = ChartEngine.create(chartParams);

	var dataset = {
		"lines": [{
			"points": [{
				"id": "desktop",
				"value": 0,
				"x": "desktop",
				"name": "desktop"
			}, {
				"id": "mobile",
				"value": 100,
				"x": "mobile",
				"name": "mobile"
			}, {
				"id": "tablet",
				"value": 100,
				"x": "tablet",
				"name": "tablet"
			}],
			"name": "Device category",
			"id": "deviceCategory"
		}]
	};

	chart.draw(dataset);

});