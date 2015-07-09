/**
Provides generic behavior for chart objects
@module ChartEngine
@submodule Charts
@class AbstractChart
@abstract
*/
require('script!modernizr');
var ModelSchemas = require('ModelSchemas');
var Exceptions = require('Exceptions');
var ColorManager = require('ColorManager');

var defaultWidth = 950,
    defaultHeight = 350;

var defDivId = 'chartEngineDefinitions';

var AbstractChart = d3.chart("AbstractChart", {

    zones: {},

    modes: {
        small: function() {
            return this.width() <= 650;
            //return Modernizr.mq("only all and (max-width: 650px)");
        },
        medium: function() {
            return this.width() > 650 && this.width() <= 900;
            //return Modernizr.mq("only all and (min-width: 651px) and (max-width: 800px)");
        },
        large: function() {
            return this.width() > 900;
            //return Modernizr.mq("only all and (min-width: 801px)");
        }
    },

    initialize: function(params) {
        var chart = this;
        this.params = params || {};

        _.bindAll(this, 'resize', 'scaleAndPlaceZone', 'initZones', 'initListeners');

        this._layersArguments = {};
        this._modes = this.modes || {};
        delete this.modes;
        this._modeLayers = {};

        this._margin = {
            bottom: 0
        };

        // Test master chart or subchart
        if (params.parent) {
            chart.width(chart.params.parent.width() * (chart.params.width.end - chart.params.width.start));
            chart.height(chart.params.parent.height() * (chart.params.height.end - chart.params.height.start));
            chart.colorManager = chart.params.parent.colorManager;
        }
        // Master
        else {
            this.initSize();
            this.colorManager = new ColorManager(params.colors);
            this.initDefs();
        }

        this.initTitle();
        this.initZones();

        _determineMode.call(this);
        this.initListeners();

        // Show the mode in the middle of the chart for debugging
        if (params.modeDebug) {
            var modeText = chart.base.append('text')

            function formatModeText() {
                modeText
                    .classed('modeDebug', true)
                    .attr('x', chart.width() / 2)
                    .attr('y', chart.height() / 2)
                    .text(chart.mode())
                    .style({
                        'text-anchor': 'middle',
                        'font-size': '50px',
                        'fill': 'red'
                    })
                    .moveToFront()
            }
            formatModeText()
            chart.on('change:mode', function() {
                formatModeText()
            });
            chart.on('resize', function() {
                formatModeText()
            });
        }

        chart.setModeClass(chart.mode())
        chart.on('change:mode', function(mode) {
            chart.setModeClass(mode)
        })
    },

    setModeClass: function(mode) {
        var chart = this;
        //Update the chart base's size css class
        _(chart.modes).chain().keys().each(function(key) {
            chart.base.classed(key, key === mode)
        })
    },

    initTitle: function() {
        var chart = this;
        if (chart.params.options && chart.params.options.title) {
            chart._margin.bottom = 60;
            chart.titleInstance = chart.base
                .append('text')
                .classed('chartTitle', true)
                .attr('x', chart.width() / 2)
                .attr('y', chart.height() + chart._margin.bottom - 15);
            chart.titleInstance.html(chart.params.options.title);
        }
    },

    initSize: function() {
        var chart = this;
        // If auto: take the size of anchorId
        if (chart.params.size == "auto" && chart.params.anchorId) {
            chart.width(d3.select(chart.params.anchorId).style("width"));
            chart.height(d3.select(chart.params.anchorId).style("height"));
        }
        // If predefined size
        else if (chart.params.size.width && chart.params.size.height) {
            chart.width(chart.params.size.width);
            chart.height(chart.params.size.height);
        }
        // Default values
        else  {
            chart.width(defaultWidth);
            chart.height(defaultHeight);
        }
    },

    initDefs: function() {
        if (d3.select('#' + defDivId).empty()) {
            d3.select('body').append('div').attr('id', defDivId);
        }
    },

    loadDefs: function(defs, id) {
        if (d3.select('#' + defDivId + ' #' + id).empty()) {
            $('#' + defDivId).append(defs);
        }
    },

    initZones: function() {
        var chart = this;
        _.each(_.keys(chart.zones), function(key) {

            var id = chart.zones[key].attach;
            var title = chart.params.options && chart.params.options[id] && chart.params.options[id].title;

            var zone = chart.zones[key] = _.extend(chart.zones[key], {
                parent: chart,
                options: {
                    title: title
                }
            });

            zone.anchor = chart.base.append('g');

            if (zone.type && zone.attach) {
                zone.anchor.classed(zone.attach, true);
                zone.chart = zone.anchor.chart(zone.type, zone);
                chart.attach(zone.attach, zone.chart);
            }

            chart.scaleAndPlaceZone(zone);

            if (chart.zones[key].hidden) {
                zone.anchor.attr('visibility', 'hidden')
            }
        });
    },

    initListeners: function() {
        var chart = this;

        // Resize event
        // bind to window resize end to the master chart
        if (!this.params.parent && chart.params.size == "auto") {
            $(window).resize(_.debounce(function() {
                chart.resize();
            }, 150));
        }
        // Listen to resize event
        else if (this.params.parent) {
            chart.params.parent.on('resize', function() {
                chart.resize();
            });
            chart.params.parent.on('change:height', function() {
                chart.resize();
            });
            chart.params.parent.on('change:width', function() {
                chart.resize();
            });
        }

        // Over element event
        this.on('over', function(params) {
            // Propagate to parent only if needed
            if (chart.params.parent && params.chart != 'parent') {
                chart.params.parent.trigger('over', params);
            }
            // Propagate to children only if needed
            if (chart.zones) {
                _.each(_.keys(chart.zones), function(key) {
                    var zone = chart.zones[key];
                    if (zone.attach != params.chart.attach) {
                        params.chart = 'parent';
                        zone.chart.trigger('over', params);
                    }
                });
            }
            // Propagate to layers
            chart.overEvent(params);
        });
        this.on('out', function(params) {
            // Propagate to parent only if needed
            if (chart.params.parent && params.chart != 'parent') {
                chart.params.parent.trigger('out', params);
            }
            // Propagate to children only if needed
            if (chart.zones) {
                _.each(_.keys(chart.zones), function(key) {
                    var zone = chart.zones[key];
                    if (zone.attach != params.chart.attach) {
                        params.chart = 'parent';
                        zone.chart.trigger('out', params);
                    }
                });
            }
            // Propagate to layers
            chart.outEvent(params);
        });

        // Change mode event
        chart.on("change:mode", function() {
            _onModeChange.call(chart);
        });
    },

    // To be override by all charts
    overEvent: function(params) {},

    outEvent: function(params) {},

    scaleAndPlaceZone: function(zone) {
        var chart = this;
        zone.anchor.attr('transform', function() {
            var x = 0,
                y = 0;
            if (!zone.isAxis) {
                x = zone.width.start * chart.width();
                y = zone.height.start * chart.height();
            }
            return 'translate(' + x + ',' + y + ')';
        });
    },

    width: function(newWidth, options) {
        options = options || {};
        if (arguments.length === 0) {
            if (this._width && !isNaN(+this._width)) {
                return this._width;
            } else {
                return _toNumFromPx(_style.call(this, "width"));
            }
        }

        var oldWidth = this._width;
        this._width = newWidth;
        if (this._width !== oldWidth) {
            this.base.style("width", isNaN(this._width) ? this._width : this._width + "px");
            if (!options.silent) {
                this.trigger("change:width", this._width, oldWidth);
            }
            if (this.data && !options.noDraw) {
                this.draw(this.data);
            }
        }
        return this;
    },

    height: function(newHeight, options) {
        options = options || {};
        if (arguments.length === 0) {
            if (this._height && !isNaN(+this._height)) {
                return this._height - this._margin.bottom;
            } else {
                return _toNumFromPx(_style.call(this, "height")) - this._margin.bottom;
            }
        }

        var oldHeight = this._height;
        this._height = newHeight;
        if (this._height !== oldHeight) {
            this.base.style("height", isNaN(this._height) ? this._height : this._height + "px");
            if (!options.silent) {
                this.trigger("change:height", this._height, oldHeight);
            }
            if (this.data && !options.noDraw) {
                this.draw(this.data);
            }
        }
        return this;
    },

    resize: function() {

        var chart = this;
        if (chart.params.parent) {
            chart.width(chart.params.parent.width() * (chart.params.width.end - chart.params.width.start));
            chart.height(chart.params.parent.height() * (chart.params.height.end - chart.params.height.start));
        }

        if (!chart.params.parent && chart.params.size == 'auto') {
            chart.width(d3.select(chart.params.anchorId).style('width'), {
                noDraw: true
            });
            chart.height(d3.select(chart.params.anchorId).style('height'), {
                noDraw: true
            });
        }

        // update current mode and trigger event for sub layers if changed
        var changed = _determineMode.call(this);
        if (changed) {
            this.trigger('change:mode', this._currentMode);
        }

        // update internal zones
        _.each(_.keys(chart.zones), function(key) {
            chart.scaleAndPlaceZone(chart.zones[key]);
        });

        // update title
        if (this.titleInstance) {
            this.titleInstance
                .attr('x', chart.width() / 2)
                .attr('y', chart.height() + chart._margin.bottom - 15);
        }

        // Trigger event for children
        this.trigger('resize');
        // only redraw if there is data

        if (!chart.params.parent && chart.data) {
            chart.draw(this.data);
        }
    },

    mode: function() {
        // returns current mode
        return this._currentMode;
    },

    recomputeMode: function() {
        var changed = _determineMode.call(this);
        if (changed) {
            this.trigger('change:mode', this._currentMode);
        }
        return changed;
    },

    duration: function(durationAnim) {
        this._duration = durationAnim || 0;
        return this;
    },

    color: function(colors) {
        this.colorManage.setColors(colors);
        return this;
    },

    title: function(title) {
        this.params.title = title;
        this.titleInstance.html(title);
        return this;
    }

});

var oldLayer = AbstractChart.prototype.layer;
AbstractChart.prototype.layer = function(name, selection, options) {

    var chart = this;

    // just return an existing layer if all we are
    // passed is the name argument
    if (arguments.length === 1) {
        return oldLayer.call(this, name);
    }

    // save all the layer arguments. For layers that are created
    // but do not need to be rendered in the current mode, this
    // will ensure their arguments are intact for when they do
    // need to be created.
    chart._layersArguments[name] = {
        name: name,
        selection: selection,
        options: options,
        showing: false, // default hidden
        layer: null // layer handle
    };

    // create the layer if it should exist in the current mode.
    var layer;
    if (typeof options.modes === "undefined" || ("modes" in options && options.modes.indexOf(chart.mode()) > -1)) {
        // run default layer code
        layer = oldLayer.call(this, name, selection, options);
        // mark layer as showing.
        chart._layersArguments[name].showing = true;
        chart._layersArguments[name].layer = layer;
    }

    if ("modes" in options) {

        // save available modes on the layer if we created it
        if (layer) {
            layer._modes = options.modes;
        }

        // cache the layer under the mode name. This will be useful
        // when we are repainting layers.
        options.modes.forEach(function(mode) {

            // make sure mode exists
            if (mode in chart._modes) {

                chart._modeLayers[mode] = chart._modeLayers[mode] || [];

                // save the layer as being mapped to this mode.
                chart._modeLayers[mode].push(name);

            } else {
                throw new Error("Mode " + mode + " is not defined");
            }
        });

        // make sure this layer has all modes if none were
        // specified as an option.
    } else if (chart._modes) {
        var allModes = Object.keys(chart._modes);

        if (layer) {
            layer._modes = allModes;
        }

        allModes.forEach(function(mode) {
            chart._modeLayers[mode] = chart._modeLayers[mode] || [];
            chart._modeLayers[mode].push(name);
        });

        // mark layer as showing.
        chart._layersArguments[name].showing = true;
        chart._layersArguments[name].layer = layer;
    }

    return layer;
};

// obtains element computed style
// context is chart
function _style(attr) {
    var style, element = this.base[0][0];
    if (window.getComputedStyle) {
        style = window.getComputedStyle(element);
    } else if (element.currentStyle) {
        style = element.currentStyle;
    }

    if (!attr) {
        return style;
    } else {
        return style[attr];
    }
};

// converts pixel values
var _toNumFromPx = (function() {
    var rx = /px$/;
    return function(value) {
        if (rx.test(value)) {
            return +(value.replace(rx, ""));
        } else {
            return value;
        }
    };
}());

// helper attribute setter on chart base.
// context is chart
function _initAttr(internalName, d3Name, defaultValue) {
    var current = _toNumFromPx(_style.call(this, d3Name));
    if (current === null || current === 0 || current === "") {
        this[internalName] = defaultValue;
        this.base.style(d3Name, defaultValue);
    } else {
        this[internalName] = _toNumFromPx(_style.call(this, d3Name));
    }
};

// go over existing modes and determine which we are in
// returns true if a mode change occured, false otherwise.
function _determineMode() {
    var oldMode = this._currentMode;
    this._currentMode = null;

    if ("modes" in this) {
        var result = false;
        for (var mode in this._modes) {
            result = this._modes[mode].call(this);
            if (result) {
                this._currentMode = mode;
                break;
            }
        }
    }
    return oldMode !== this._currentMode;
};

// takes care of removing/adding appropriate layers
function _onModeChange() {
    var chart = this;
    var mode = chart.mode()

    for (var layerName in chart._layersArguments) {
        // is this chart in the current mode?
        var layerArgs = chart._layersArguments[layerName];
        // if this layer should not exist in the current mode
        // unlayer it and then save it so we can reattach it
        // later.
        if (layerArgs.options.modes.indexOf(mode) === -1) {
            // is it showing?
            if (layerArgs.showing === true) {
                // nope? remove it.
                var removedLayer = chart.unlayer(layerName);
                removedLayer.style("display", "none");
                chart._layersArguments[layerName].showing = false;
                chart._layersArguments[layerName].layer = removedLayer;
            }
        } else {
            // this layer is not showing, we need to add it
            if (chart._layersArguments[layerName].showing === false) {
                // if the layer has already been created, just re-add it
                if (chart._layersArguments[layerName].layer !== null) {
                    oldLayer.call(chart, layerName, chart._layersArguments[layerName].layer);
                    chart._layersArguments[layerName].layer.style("display", "inline");
                } else {
                    // this layer must not have been drawn in the initial rendering
                    // but we do have the arguments, so render it using the
                    // old layering.
                    oldLayer.call(chart,
                        chart._layersArguments[layerName].name,
                        chart._layersArguments[layerName].selection,
                        chart._layersArguments[layerName].options);
                }
                chart._layersArguments[layerName].showing = true;
            }
        }
    }
};

module.exports = AbstractChart;