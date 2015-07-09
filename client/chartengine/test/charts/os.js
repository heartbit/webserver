require(['../../dist/ChartEngine'], function(ChartEngine) {

     var chartParams = {
          anchorId: "#test",
          chartType: "IconChart",
          size: 'auto',
          options: {
               iconSet: 'os'
          }
     };

     var chart = ChartEngine.create(chartParams);

     var dataset = {
          "lines": [{
               "points": [{
                    "id": "Linux",
                    "value": 7114552,
                    "x": "Linux",
                    "name": "Linux"
               }, {
                    "id": "Macintosh",
                    "value": 2380168,
                    "x": "Macintosh",
                    "name": "Macintosh"
               }, {
                    "id": "Windows",
                    "value": 2197160,
                    "x": "Windows",
                    "name": "Windows"
               }],
               "name": "os",
               "id": "os"
          }]
     };

     chart.draw(dataset);

});