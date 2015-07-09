/**
 Computes lines based on the model's projections
 @class QubeAdapter
 @constructor
 @param model the chart model
 @module ChartEngine
 */

define('AbstractAdapter', function(AbstractAdapter) {

    var Point = require('Point');

    function QubeAdapter(model, options) {

        this.timeChart = options && options.timeChart
        this.absTimeChart = options && options.absTimeChart
        this.sort = options && options.sort
        this.sortBySum = options && options.sortBySum
        this.limit = options && options.limit
        this.filters = options && options.filters
        this.pleaseKeepTopLines = options && options.keepTopLines
        this.keepZeroValuesLines = options && options.keepZeroValuesLines
        this.dimensionLimit = options && options.dimensionLimit
    };

    /**
     Compute the lines from the chart model
     @method computeLines
    */
    QubeAdapter.prototype.computeLines = function() {
        var _this = this;

        /* Check for the x dimension */
        var x = this.model.getXAxis()
        if (!x) {
            return;
        }

        var xDimProjections = this.model.getProjections(x.id);

        var nonAxisDimensions = [],
            nonAxisProjections = [],
            lines = [];

        // List all non-axis nodes
        for (var dimension in this.model.projections) {
            if (dimension != x.id) {
                nonAxisDimensions.push(dimension);
                nonAxisProjections.push(this.model.getProjections(dimension));
            }
        }

        if (this.timeChart) {
            xDimProjections = this.cleanTimeDimension(xDimProjections);

            /* Enrich dates */
            xDimProjections.forEach(function(xProjection) {
                if (xProjection && !('time' in xProjection)) {
                    xProjection.time = _this.enrichDate(xProjection.id);
                }
            });
        }

        // If there is no projection, just the axis and the measure, there is one line
        if (nonAxisDimensions.length === 0) {
            /* If the cube contains only one measure OR our chart is not a linechart (other charts will get multiple lines through dimensions) */
            if (this.model.cube.measureIds.length <= 1 || this.model.chartType != 'line2D') {
                var line = _this.computeLine(xDimProjections, [], x);
                line = _this.orderLine(line);
                /* Attach unitLabel and prefix to line, in order to be appended to labels */
                line = _this.attachUnitLabel(line);

                if (this.limit) {
                    line.points = _(line.points).first(this.limit)
                }

                if (!_this.isEmptyLine(line)) {
                    lines.push(line);
                }
            }

            // Multi measures : multi lines
            else {
                var measureIds = _this.model.cube.measureIds;
                measureIds.forEach(function(measureId, i) {
                    var measure = _this.model.cube.measures[measureId];
                    var line = _this.computeLine(xDimProjections, [], x, measure);
                    line = _this.orderLine(line);
                    line = _this.attachUnitLabel(line, measure);
                    if (_this.limit) {
                        line.points = _(line.points).first(_this.limit)
                    }
                    if (!_this.isEmptyLine(line)) {
                        lines.push(line);
                    }
                });
            }
        }

        // Else, every different combination of non axis projection is a new line
        else {
            var projectionCombinations = _this.allPossibleCombinations(nonAxisProjections);
            projectionCombinations.forEach(function(projections, i) {
                var line = _this.computeLine(xDimProjections, projections, x);
                line = _this.orderLine(line);

                /* Attach unitLabel to line, in order to be appended to labels */
                line = _this.attachUnitLabel(line);

                if (_this.limit) {
                    line.points = _(line.points).first(_this.limit)
                }

                if (!_this.isEmptyLine(line)) {
                    lines.push(line);
                }
            });

            lines = this.orderLines(lines, xDimProjections, nonAxisDimensions)
            if (this.pleaseKeepTopLines) {
                lines = this.keepTopLines(lines, xDimProjections, nonAxisDimensions, this.pleaseKeepTopLines)
            }
            if (this.dimensionLimit) {
                lines = this.limitDimension(lines, xDimProjections, nonAxisDimensions, this.dimensionLimit)
            }
        }

        return lines;
    };

    /**
     Return the line and points for a combination of projections
     @method computeLine
     @private
     @param xDimProjections
     @param projections
     @return line
     */
    QubeAdapter.prototype.computeLine = function(xDimProjections, projections, x, measure) {
        var _this = this;

        /* Sometimes chart will autonomously ask specific metrics.
        Sometimes a specific metric will be asked in the cubeChart params,
        we will set the points's .value to this metric.
        E.g. base100::all::avg
                ->  Give me the base100 function for each point,
                    applied with the 'all' node as a base and computed on node averages
        */
        var metric = this.model.metric;

        if (metric != undefined) {
            var split = metric.split('::')

            if (_(['base100', 'evol']).contains(split[0])) {
                if (projections.length > 0) {
                    throw 'Specifying a "base" or "evol" metric when the cube has more than one dimension is not supported'
                }
                if (split.length < 3) {
                    throw 'Please provide a metric with three arguments like : base100::all::avg'
                }
                metric = {
                    name: 'base100',
                    underlyingMetric: split[2],
                    base: {}
                }
                metric.base[x.id] = split[1]
            } else if (split.length === 1) {
                metric = {
                    name: split[0]
                }
            }
        }

        var line = {
            xGroup: x.group,
            id: '',
            points: []
        };

        line.projections = projections;
        if (measure) {
            line.id = measure.id
            line.label = measure.label
        } else {
            line.id = projections.length > 0 ? _.pluck(projections, 'id').join('') : '';
        }

        /* Create a point for each axis projection */
        _.each(xDimProjections, function(xProjection) {

            /* Build the query object ({dimId1: nodeId1, dimId2: nodeId2, ...}) */
            var coords = {};
            _.each(projections, function(projection) {
                coords[projection.dimId] = projection.id;
            });
            coords[xProjection.dimId] = xProjection.id;

            if (_this.model.measureId) {
                coords.measures = [_this.model.measureId];
            }
            if (measure) {
                coords.measures = [measure.id];
            }

            /* Query the cube */
            var response = _this.model.cube.getPoints(coords)[0];

            var point = new Point(response, xProjection, metric, _this.model.chartType, coords, projections, _this.model.projections)
            if (point != undefined && !point.invalid) {
                line.points.push(point);
            }
        });

        var commonStyle = _(line.points)
            .chain().pluck('style').compact()
            .reduce(function(reduced, style, index) {
                if (index === 0) {
                    return style
                }
            }, null)
            .value()

        if (commonStyle != undefined) {
            line.style = commonStyle
        }
        return line
    };

    /**
     Order the points in the line
     */
    QubeAdapter.prototype.orderLine = function(line) {
        if (line === null) return;
        if (this.timeChart) {
            line.points.sort(function(a, b) {
                var aUri = a.x.id;
                var bUri = b.x.id;
                if (a.x.time && b.x.time) {
                    return a.x.time.center.getTime() - b.x.time.center.getTime();
                }
                if (aUri > bUri) return 1;
                else if (aUri < bUri) return -1;
                else return 0;
            });
        }

        if (this.absTimeChart) {
            line.points.sort(function(a, b) {
                var aUri = a.x.id;
                var bUri = b.x.id;
                if (aUri > bUri) return 1;
                else if (aUri < bUri) return -1;
                else return 0;
            });
        }

        if (this.sort) {
            var sortOperator = this.sort === "ascending" ? 1 : -1
            line.points = _(line.points).sortBy(function(point) {
                return sortOperator * point.value
            })
        }

        return line;
    };

    /* For each axis node, get the sum on the other dimension's points.
    Usecase : order a stacked bar chart with the highest bars first. */
    QubeAdapter.prototype.orderLines = function(lines, xDimProjections, nonAxisDimensions) {
        var _this = this

        if (!lines || lines.length === 0) return;
        if (this.sortBySum) {
            var sortOperator = this.sortBySum === "descending" ? -1 : 1

            var xDimId = this.model.getXAxis().id

            var commonRequest = {}
            _(nonAxisDimensions).each(function(dimId) {
                commonRequest[dimId] = 'all'
            })

            lines = _(lines).map(function(line) {
                line.points = _(line.points).sortBy(function(point) {
                    var request = _.clone(commonRequest)
                    request[xDimId] = point.x.id
                    var point = _this.model.cube.getPoints(request)

                    return sortOperator * point[0].value
                })

                return line
            })
        }
        return lines;
    };

    /* Keep only the n lines with the highest cumulated value.

    Usecase :
    pleaseKeepTopLines = {n: 5, include: 'social'} will keep only the lines with high cumulated values,
    but won't apply this filter to a node we want to keep, social (social vs other medium multiline chart)
    */
    QubeAdapter.prototype.keepTopLines = function(lines, xDimProjections, nonAxisDimensions, pleaseKeepTopLines) {
        var n = 5,
            include,
            pktl = pleaseKeepTopLines
        if (typeof pktl === 'number') {
            n = pktl
        } else if (typeof pktl === 'object') {
            n = pktl.n
            include = pktl.include
        }

        var survivors = [],
            scores = {}

        _(lines).each(function(line) {
            scores[line.id] = _(line.points).reduce(function(memo, p) {
                return memo + p.value
            }, 0)
        })

        var ordered = _(scores).chain().keys().sortBy(function(lineId) {
            return scores[lineId]
        }).value().reverse()

        var scoreByLineId = {};

        _(ordered).each(function(lineId, score) {
            scoreByLineId[lineId] = score
        })

        survivors = _(lines).reject(function(line) {
            line.rank = scoreByLineId[line.id]
            return scoreByLineId[line.id] > n - 1
        })

        var included = _(survivors).find(function(line) {
                return line.id === include
            })
            /* Make sure the request line to include survives */
        if (!included) {
            survivors = _(survivors).reject(function(line) {
                return line.rank === n - 1
            })
            var lineToInclude = _(lines).find(function(line) {
                return line.id === include
            })
            survivors.push(lineToInclude)
        }

        return survivors
    }

    /* For each axis node, keep only N nodes from the splitting dimension

    Usecase :
    For a country stackBar split by socialNetwork, produce an 'other' line
    so that bars show distinctively only the top 6 social networks for each country

    TODO : Add the removed nodes to a 'other' line
    */
    QubeAdapter.prototype.limitDimension = function(lines, xDimProjections, nonAxisDimensions, dimensionLimit) {
        if (nonAxisDimensions.length != 1) {
            throw 'This method is not tested for a nonAxisDimensions count != 1'
        }
        var nonAxisDimensionId = nonAxisDimensions[0]
            // TODO var otherLine = {id: 'other', points: []}
        _(xDimProjections).each(function(xNode, xIndex) {
            var barPoints = _(lines).map(function(line) {
                return line.points[xIndex]
            })
            if (_(barPoints).compact().length === 0) {
                return
            }
            var orderedBarPoints = _(barPoints).sortBy(function(point) {
                return isNaN(point.value) ? 0 : point.value
            })

            _(orderedBarPoints).chain().initial(dimensionLimit).each(function(point) {

                if (!isNaN(point.value)) {
                    /* TODO Add it to the "other" line */

                    /* Remove it from its original line */
                    var lineId = point.coords[nonAxisDimensionId]
                    var originalLine = _(lines).findWhere({
                        id: lineId
                    })
                    originalLine.points[xIndex].value = NaN
                }

            })

        })

        return lines


    }

    /**
     Return false if at least one point of the line has a value
     */
    QubeAdapter.prototype.isEmptyLine = function(line) {
        if (line == undefined) {
            return true;
        }
        var empty = true;

        /* To exclude lines with only zero values */
        var zeroValuesLine = true

        _.each(line.points, function(point, index) {
            if (!isNaN(point.value)) {
                empty = false;
            }
            if (point.value !== 0) {
                zeroValuesLine = false
            }
        });
        return this.keepZeroValuesLines ? empty : empty || zeroValuesLine;
    };

    QubeAdapter.prototype.attachUnitLabel = function(line, measure) {
        line.unitLabel = "";
        if (measure) {
            line.unitLabel = measure.unitLabel;
            line.measurePrefix = measure.measurePrefix;
        } else {
            var selectedMetric = this.model.measureLabel;
            _.each(this.model.cube.measures, function(measure) {
                if (measure.label === selectedMetric) {
                    if (measure.unitLabel) {
                        line.unitLabel = measure.unitLabel;
                    }
                    if (measure.measurePrefix) {
                        line.measurePrefix = measure.measurePrefix;
                    }
                }
            });
        }
        return line;
    }

    QubeAdapter.prototype.allPossibleCombinations = function(arr) {
        if (arr.length === 0) {
            return [];
        } else if (arr.length === 1) {
            var newArr = [];
            _.each(arr[0], function(el) {
                newArr.push([el]);
            });
            return newArr;
        } else {
            var result = [];
            var allCasesOfRest = this.allPossibleCombinations(arr.slice(1));
            _.each(allCasesOfRest, function(el) {
                _.each(arr[0], function(el2) {
                    result.push(el.concat(el2));
                });
            });
            return result;
        }
    };

    /**************************
     ***** TIME FUNCTIONS ******
     ***************************/
    QubeAdapter.prototype.cleanTimeDimension = function(xDimension) {
        /* Make sure dimension is sorted */
        xDimension.sort(function(a, b) {
            if (a.uri > b.uri) return 1;
            else if (a.uri < b.uri) return -1;
            else return 0;
        });

        /* Remove undefined values and duplicate */
        _.each(xDimension, function(element, index) {
            if (!element) {
                delete xDimension[index];
            }
        });

        /* Remove duplicate */
        var uniq = _.uniq(xDimension, false, function(item, key, a) {
            return item.uri;
        });

        return uniq;
    };

    QubeAdapter.prototype.enrichDate = function(date) {
        var time = {};
        date = date.replace('time:', '');

        switch (date.length) {
            case 1:
                //century
                time.granularity = 'millenium';
                var millenium = date.substring(0, 1);
                time.begins = new Date(+millenium * 1000, 0, 1);
                time.ends = new Date(((+millenium + 1) * 1000) - 1, 0, 1);
                break;
            case 2:
                //century
                time.granularity = 'century';
                var century = date.substring(0, 2);
                time.begins = new Date(+century * 100, 0, 1);
                time.ends = new Date(((+century + 1) * 100) - 1, 0, 1);
                break;
            case 3:
                //decade
                time.granularity = 'decade';
                var decade = date.substring(0, 3);
                time.begins = new Date(+decade * 10, 0, 1);
                time.ends = new Date(((+decade + 1) * 10) - 1, 0, 1);
                break;
            case 4:
                //year
                time.granularity = 'year';
                var year = date.substring(0, 4);
                time.begins = new Date(+year, 0, 1);
                time.ends = new Date(+year + 1, 0, 1);
                break;
            case 5:
                time.granularity = 'semester';
                var year = date.substring(0, 4);
                var semester = date.substring(4, 5);

                var semesterMap = {
                    1: 1,
                    2: 7
                };
                var dayMonthMap = {
                    6: 30,
                    12: 31
                };
                var startMonth = semesterMap[semester];
                var endMonth = semesterMap[semester] + 5;

                time.begins = new Date(+year, startMonth, 1);
                time.ends = new Date(+year, endMonth, dayMonthMap[endMonth]);
                break;
            case 6:
                time.granularity = 'quarter';
                var year = date.substring(0, 4);
                var quarter = date.substring(5, 6);
                var quarterMap = {
                    1: 1,
                    2: 4,
                    3: 7,
                    4: 10
                };
                var dayMonthMap = {
                    3: 31,
                    6: 30,
                    9: 31,
                    12: 31
                };
                var startMonth = quarterMap[quarter];
                var endMonth = quarterMap[quarter] + 2;

                time.begins = new Date(+year, startMonth, 1);
                time.ends = new Date(+year, endMonth, dayMonthMap[endMonth]);
                break;

            case 8:
                time.granularity = 'month';
                var year = date.substring(0, 4);
                var month = date.substring(6, 8);
                time.begins = new Date(+year, +month - 1, 1);
                time.ends = new Date((month == 12) ? +year + 1 : +year, +month % 12, 1);
                break;
            case 10:
                time.granularity = 'week';
                var year = date.substring(0, 4);
                // var month = date.substring(6, 8);
                var week = date.substring(8, 10);
                // var firstDayOfWeek = getDay(year, week);
                // var day = firstDayOfWeek.getDate();
                time.begins = getDateFromYearAndWeek(year, week);
                time.ends = new Date(time.begins.getTime() + 24 * 3600 * 1000);
                break;

            case 12:
                time.granularity = 'day';
                var year = date.substring(0, 4);
                var month = date.substring(6, 8);
                var week = date.substring(8, 10);
                var day = date.substring(10, 12);
                time.begins = new Date(+year, +month - 1, +day);
                time.ends = new Date(time.begins.getTime() + 24 * 3600 * 1000);
                break;
            case 14:
                time.granularity = 'hour';
                var year = date.substring(0, 4);
                var month = date.substring(6, 8);
                var week = date.substring(8, 10);
                var day = date.substring(10, 12);
                var hour = date.substring(12, 14);
                time.begins = new Date(+year, +month - 1, +day, hour, 00, 00);
                time.ends = new Date(time.begins.getTime() + 3600 * 1000);
                break;
            case 16:
                time.granularity = 'minute';
                var year = date.substring(0, 4);
                var month = date.substring(6, 8);
                var week = date.substring(8, 10);
                var day = date.substring(10, 12);
                var hour = date.substring(12, 14);
                var minute = date.substring(14, 16);
                time.begins = new Date(+year, +month - 1, +day, hour, minute, 00);
                time.ends = new Date(time.begins.getTime() + 60 * 1000);
                break;
            case 18:
                time.granularity = 'second';
                var year = date.substring(0, 4);
                var month = date.substring(6, 8);
                var week = date.substring(8, 10);
                var day = date.substring(10, 12);
                var hour = date.substring(12, 14);
                var minute = date.substring(14, 16);
                var second = date.substring(16, 18);
                time.begins = new Date(+year, +month - 1, +day, hour, minute, second);
                time.ends = new Date(time.begins.getTime() + 1000);
                break;

            default:
                throw new Error("Unsupported format: " + date + ".");
                break;
        }

        time.center = new Date((time.begins.getTime() + time.ends.getTime()) / 2);

        return time;
    };

    function getDay(year, week) {
        var j10 = new Date(year, 0, 10, 12, 0, 0),
            j4 = new Date(year, 0, 4, 12, 0, 0),
            mon = j4.getTime() - j10.getDay() * 86400000,
            result = [];
        return new Date(mon + ((week - 1) * 6) * 86400000);
    };

    function getDateFromYearAndWeek(year, week) {
        var j10 = new Date(year, 0, 10, 12, 0, 0),
            j4 = new Date(year, 0, 4, 12, 0, 0),
            mon1 = j4.getTime() - j10.getDay() * 86400000;
        return new Date(mon1 + ((week - 1) * 7) * 86400000);
    };

    /**
        Returns the current timeRange based on the x-axis nodes

        @method getTimeRange
    */
    QubeAdapter.prototype.getTimeRange = function() {
        var _this = this;

        var xDimension = this.model.getProjections(this.model.getXAxis().id);
        // Make sure every node is time-enriched
        xDimension.forEach(function(node) {
            node.time = _this.enrichDate(node.id);
        });

        return [_.min(xDimension, function(node) {
            return node.time.begins;
        }).time.begins, _.max(xDimension, function(node) {
            return node.time.ends;
        }).time.begins];
    };

    return QubeAdapter;

});