/**
Provides a base for a people chart
@module ChartEngine
@submodule Chart
@class IconChart
*/

var AbstractChart = require('AbstractChart');

var OsAdapter = require('OsAdapter');
var OsShapeLayer = require('OsShapeLayer');
var OsShapeDefinitions = require('OsShapeDefinitions');
    
var PeopleMobileAdapter = require('PeopleMobileAdapter');
var PeopleMobileLayer = require('PeopleMobileLayer');
var PeopleMobileShapeDefinitions = require('PeopleMobileShapeDefinitions'); // svg

var BrowserAdapter = require('BrowserAdapter');
var BrowserShapeLayer = require('BrowserShapeLayer');
var BrowsersShapeDefinitions = require('BrowsersShapeDefinitions');

var ScreenAdapter = require('ScreenAdapter');
var ScreenShapeLayer = require('ScreenShapeLayer');
var ScreenLabelsLayer = require('ScreenLabelsLayer');
var ScreenShapeDefinitions = require('ScreenShapeDefinitions');

var ordinalScale = d3.scale.ordinal();

var IconChart = d3.chart("AbstractChart").extend("IconChart", {

    initialize: function(params) {
        var chart = this;

        var internalPadding = .2;
        var externalPadding = .35;
        switch (params.options.iconSet) {
            case 'os':
                this.base.classed('osChart', true);
                this.adapter = OsAdapter;
                this.loadDefs(OsShapeDefinitions, 'os-defs');
                this.osLayer = this.base.append('g').classed('osShapesLayer', true);
                this.osLayerInstance = this.layer('osShapesLayer', this.osLayer, OsShapeLayer);
                break;
            case 'browser':
                this.base.classed('browserChart', true);
                this.adapter = BrowserAdapter;
                this.loadDefs(BrowsersShapeDefinitions, 'browser-defs');
                this.browserLayer = this.base.append('g').classed('browserShapesLayer', true);
                this.browserLayerInstance = this.layer('browserShapesLayer', this.browserLayer, BrowserShapeLayer);
                break;
            case 'people':
                this.base.classed('peopleMobileChart', true);
                this.adapter = PeopleMobileAdapter;
                internalPadding = -0.4;
                externalPadding = 1;
                this.loadDefs(PeopleMobileShapeDefinitions, 'mobile-defs');
                this.peopleMobileLayer = this.base.append('g').classed('peopleMobileShapesLayer', true);
                this.peopleMobileLayerInstance = this.layer('peopleMobileShapesLayer', this.peopleMobileLayer, PeopleMobileLayer);
                break;
            case 'screen':
                this.base.classed('screenChart', true);
                this.adapter = ScreenAdapter;
                this.loadDefs(ScreenShapeDefinitions, 'screen-defs');
                this.screenShapeLayer = this.base.append('g').classed('screenShapeLayer', true);
                this.screenShapeLayerInstance = this.layer('screenShapeLayer', this.screenShapeLayer, ScreenShapeLayer);
                this.screenLabelsLayer = this.base.append('g').classed('screenLabelsLayer', true);
                this.screenLabelsLayerInstance = this.layer('screenLabelsLayer', this.screenLabelsLayer, ScreenLabelsLayer);
        }

        this.ordinalScale = ordinalScale;
        var changeOrdinalscaleRange = function() {
            chart.ordinalScale.rangeRoundBands([0, chart.width()], internalPadding, externalPadding);
        };
        chart.on('change:width', changeOrdinalscaleRange);
        changeOrdinalscaleRange();
    },

    transform: function(data) {
        this.data = data;
        var points = this.adapter.computeLines(data);
        this.ordinalScale.domain(_.range(points.length));
        return points;
    }

});

module.exports = IconChart;