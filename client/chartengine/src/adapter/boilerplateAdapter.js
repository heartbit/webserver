/**
 Computes lines based on the model's projections
 @class BoilerplateAdapter
 @param model the chart model
 @constructor
 @module ChartEngine
 */

var AbstractAdapter = require('AbstractAdapter');

BoilerplateAdapter.prototype = Object.create(AbstractAdapter.prototype);

function BoilerplateAdapter(model) {
    AbstractAdapter.call(this, model);
}

/**
     Compute the lines from the chart model
     @method computeLines
     */
BoilerplateAdapter.prototype.computeLines = function(data) {
    // var lines = AbstractAdapter.prototype.computeLines.apply(this, data)
    var lines = data;
    lines = this.enrichLines(lines);
    return lines;
};

BoilerplateAdapter.prototype.enrichLines = function(lines) {
    return lines;
};

// BoilerplateAdapter.prototype.enrichLines = function(lines) {
//     _.each(lines, function(line, index) {
//         var points = line.points;
//         var sum = 0;
//         _.each(points, function(point, index) {
//             // last point
//             if (index === points.length - 1) {
//                 point.inprogress = true;
//             } else {
//                 sum += point.value;
//             }
//         })
//         var avg = Math.round(sum / (points.length - 1));
//         line.avg = avg;
//     });
//     return lines;
// };

module.exports = BoilerplateAdapter;