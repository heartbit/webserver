require(['../../dist/ChartEngine'], function(ChartEngine) {

     var chartParams = {
          anchorId: '#test',
          chartType: 'IconChart',
          size: 'auto',
          options: {
               iconSet: 'browser'
          },
          // colors: {
          //      highlight: 'orange'
          // }
     };

     var chart = ChartEngine.create(chartParams);

     var dataset = {
          lines: [{
               points: [{
                    id: "Chrome",
                    value: 7114552,
                    x: "Chrome",
                    name: "Chrome"
               }, {
                    id: "Internet Explorer",
                    value: 2380168,
                    x: "Internet Explorer",
                    name: "Internet Explorer"
               }, {
                    id: "Firefox",
                    value: 2197160,
                    x: "Firefox",
                    name: "Firefox"
               }, {
                    id: "Android",
                    value: 2197160,
                    x: "Android",
                    name: "Android"
               }, {
                    id: "Opera",
                    value: 2197160,
                    x: "Opera",
                    name: "Opera"
               }, {
                    id: "Safari",
                    value: 2197160,
                    x: "Safari",
                    name: "Safari"
               }],
               name: "browser",
               id: "browser"
          }]
     };

     chart.draw(dataset);

});