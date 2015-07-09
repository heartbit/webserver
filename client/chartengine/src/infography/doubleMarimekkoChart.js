/**
Provides a base for a marimekko chart
@module ChartEngine
@submodule Chart
@class DoubleMarimekkoChart
*/

var AbstractChart = require('AbstractChart');

// Import subcharts
require('MarimekkoChart');

var DoubleMarimekkoChart = d3.chart("AbstractChart").extend("DoubleMarimekkoChart", {

    zones: {

        // first: {
        //     type: 'MarimekkoChart',
        //     attach: 'marimekko_first',
        //     width: {
        //         start: 0,
        //         end: .5
        //     },
        //     height: {
        //         start: 0,
        //         end: .5
        //     }
        // },
        // second: {
        //     type: 'MarimekkoChart',
        //     attach: 'marimekko_second',
        //     width: {
        //         start: .5,
        //         end: 1
        //     },
        //     height: {
        //         start: 0,
        //         end: .5
        //     }
        // },
        // trois: {
        //     type: 'MarimekkoChart',
        //     attach: 'trois',
        //     width: {
        //         start: 0,
        //         end: .5
        //     },
        //     height: {
        //         start: .5,
        //         end: 1
        //     }
        // },
        // quatre: {
        //     type: 'MarimekkoChart',
        //     attach: 'quatre',
        //     width: {
        //         start: .5,
        //         end: 1
        //     },
        //     height: {
        //         start: .5,
        //         end: 1
        //     }
        // }

        first: {
            type: 'MarimekkoChart',
            attach: 'marimekko_first',
            width: {
                start: 0,
                end: 1
            },
            height: {
                start: 0,
                end: .5
            }
        },
        second: {
            type: 'MarimekkoChart',
            attach: 'marimekko_second',
            width: {
                start: 0,
                end: 1
            },
            height: {
                start: .5,
                end: 1
            }
        }

    }

});

module.exports = DoubleMarimekkoChart;