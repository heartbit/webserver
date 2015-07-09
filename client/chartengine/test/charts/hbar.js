requirejs.config({
  waitSeconds: 30
})

require(['../../dist/ChartEngine'], function(ChartEngine) {

  var chartParams = {
    anchorId: "#test",
    chartType: "HorizontalBarChart",
    size: 'auto'
  };

  var chart = ChartEngine.create(chartParams);

  var dataset = {

    points: [{
      id: "Direct",
      value: 10,
      x: "Direct",
      name: "Direct"
    }, {
      id: "Organic Search",
      value: 9,
      x: "Organic Search",
      name: "Organic Search"
    }, {
      id: "Referral",
      value: 7,
      x: "Referral",
      name: "Referral"
    }, {
      id: "Paid Search",
      value: 4,
      x: "Paid Search",
      name: "Paid Search"
    }, {
      id: "(Other)",
      value: 3,
      x: "(Other)",
      name: "(Other)"
    }, {
      id: "Other Advertising",
      value: 2,
      x: "Other Advertising",
      name: "Other Advertising"
    }, {
      id: "Social",
      value: 6,
      x: "Social",
      name: "Social"
    }, {
      id: "Email",
      value: -6,
      x: "Email",
      name: "Email"
    }, {
      id: "Display",
      value: -5,
      x: "Display",
      name: "Display"
    }],
    name: "2014/08",
    id: "time:20142308"

  };

  chart.draw(dataset);

});
