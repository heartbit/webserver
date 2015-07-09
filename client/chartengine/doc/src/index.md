# qunb chart engine 2014

> Using [d3js][] & co

This chart engine currently works with raw data  as inputs, and 'cube charts' that you can find in the [qube][] repository.

## Installation

If you haven't already done so, install [nodejs][], [gruntjs][] and [bowerjs][].

```
npm install
grunt install
```

## Build 

```
grunt dispatch
```
## Using it as a dependency

This is a development repository. To use it as a dependency, 
please add this bower.json dependency line to your project :

```
    "qube": "git@github.com:qunb/chartlabs.git",

```

You then need to compile it, e.g. using a grunt shell task : 

```

shell: {
      buildChartEngine: {
        command: [
          'cd app/bower_components/chartlabs/app/chartengine', // Or your custom bower components directory
          'grunt dispatch'
        ].join('&&')
      },
    },
```

Finally, import the just compiled files build/ChartEngine.js and build/css/charts.css

Important : At the moment, Chart Engine needs an underscore-compatible version of lodash, and jQuery.

If using requirejs to manage client dependencies, use this kind of config : 
require.config({
  paths: {
    ChartEngine: '../bower_components/chart-engine/build/ChartEngine',
    lodash: '../bower_components/lodash/dist/lodash.underscore',
    jquery: '../bower_components/jquery/jquery',
  },
  shim: {
    'ChartEngine': {
      deps: ['lodash', 'jquery'],
      exports: 'ChartEngine'
    },
  },
});

***

# Usage
```
  var options: {
    anchor: '#id',
    type: 'PieBarChart',
    duration: 500,
    ...
  };

  var chart = ChartEngine.create(options);
  chart.draw(data);
  chart.remove();
```

***

# Contribute

[d3js]: http://d3js.org
[d3chart]: http://misoproject.com/d3-chart/
[nodejs]: http://nodejs.org
[gruntjs]: http://gruntjs.com
[bowerjs]: https://github.com/bower/bower
[Cube]: https://github.com/qunb/qube
