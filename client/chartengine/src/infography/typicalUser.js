/**
Provides an infography 
@module ChartEngine
@submodule Chart
@class TypicalUser
*/

var AbstractChart = require('AbstractChart');
var TypicalUserAdapter = require('TypicalUserAdapter');
require('OsChart');
require('BrowserChart');

var TypicalUser = d3.chart("AbstractChart").extend("TypicalUser", {

    zones: {
        first: {
            type: 'OsChart',
            attach: 'os',
            width: {
                start: .0,
                end: .3
            },
            height: {
                start: 0,
                end: 1
            }
        },
        // second: {
        //     type: '',
        //     attach: 'barevol',
        //     width: {
        //         start: .5,
        //         end: .95
        //     },
        //     height: {
        //         start: .25,
        //         end: .75
        //     }
        // },
        third: {
            type: 'BrowserChart',
            attach: 'browser',
            width: {
                start: .6,
                end: 1
            },
            height: {
                start: 0,
                end: 1
            }
        }
    },

    transform: function(data) {
        var data = TypicalUserAdapter.computeLines(data);
        return data;
    },

    demux: function(name, data) {
        if (name === 'os') {
            return data.os;
        } else if (name === 'browser') {
            return data.browser;
        }
        return data;
    }

});

module.exports = TypicalUser;