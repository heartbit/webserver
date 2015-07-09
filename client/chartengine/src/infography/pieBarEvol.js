/**
Provides an infography
@module ChartEngine
@submodule Chart
@class PieBarEvol
*/

var AbstractChart = require('AbstractChart');
var PieBarEvolAdapter = require('PieBarEvolAdapter');
// Import subcharts

require('PieChart');
require('HorizontalBarChart');

var PieBarEvol = d3.chart("AbstractChart").extend("PieBarEvol", {

    zones: {
        first: {
            type: 'PieChart',
            attach: 'pie',
            width: {
                start: .0,
                end: .6
            },
            height: {
                start: 0,
                end: 1
            }
        },
        second: {
            type: 'HorizontalBarChart',
            attach: 'barevol',
            width: {
                start: .6,
                end: .95
            },
            height: {
                start: .2,
                end: .8
            }
        }
    },

    transform: function(data) {
        return PieBarEvolAdapter.computeLines(data);
    },

    demux: function(name, data) {
        if (name === 'pie') {
            return data.last;
        } else if (name === 'barevol') {
            return data.evol;
        }
        return data;
    }

});

module.exports = PieBarEvol;