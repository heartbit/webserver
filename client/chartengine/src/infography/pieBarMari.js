/**
Provides a base for a marimekko chart
@module ChartEngine
@submodule Chart
@class PieBarMari
*/

var AbstractChart = require('AbstractChart');

// Import subcharts
require('MarimekkoChart');
require('PieBarEvol');

var PieBarMari = d3.chart("AbstractChart").extend("PieBarMari", {

    zones: {
        pieBar: {
            type: 'PieBarEvol',
            attach: 'pieBarEvol',
            width: {
                start: 0,
                end: 1
            },
            height: {
                start: 0,
                end: .5
            }
        },
        marimekko: {
            type: 'MarimekkoChart',
            attach: 'marimekko',
            width: {
                start: 0,
                end: 1
            },
            height: {
                start: .5,
                end: 1
            }
        }
    },

    demux: function(name, data) {
        if (name === 'pieBarEvol') {
            return data.piebar;
        } else if (name === 'marimekko') {
            return data.mari;
        }
        return data;
    }

});

module.exports = PieBarMari;