require(['../../dist/ChartEngine'], function(ChartEngine) {

     var osParams = {
          anchorId: "#test1",
          chartType: "IconChart",
          size: 'auto',
          options: {
               iconSet: 'os',
               title: "Top OS"
          },
     };

     var osChart = ChartEngine.create(osParams);
     console.log('oschart');
     var osData = {
          "lines": [{
               "points": [{
                    "id": "Macintosh",
                    "value": 2380168,
                    "x": "Macintosh",
                    "name": "Macintosh"
               }],
               "name": "os",
               "id": "os"
          }]
     };

     osChart.draw(osData);


     var browserParams = {
          anchorId: "#test2",
          chartType: "BigTextChart",
          size: 'auto',
          options: {
               split: 'x',
               title: "Top resolution"
          }
     };

     var browserChart = ChartEngine.create(browserParams);

     var browserData = {
          lines: [{
               points: [{
                    id: "1950x1360",
                    value: "1950 x1360",
                    x: "1950x1360",
                    name: "1950x1360"
               }],
               name: "resolution",
               id: "resolution"
          }]
     };

     browserChart.draw(browserData);


     var browserParams = {
          anchorId: "#test3",
          chartType: "IconChart",
          size: 'auto',
          options: {
               iconSet: 'browser',
               title: "Top browser"
          }
     };

     var browserChart2 = ChartEngine.create(browserParams);

     var browserData = {
          lines: [{
               points: [{
                    id: "Firefox",
                    value: 7114552,
                    x: "Firefox",
                    name: "Firefox"
               }],
               name: "browser",
               id: "browser"
          }]
     };

     // $('#chartEngineDefinitions').innerHTML;

     browserChart2.draw(browserData);

});