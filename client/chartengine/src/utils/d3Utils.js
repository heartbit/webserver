/**
	d3Utils
	@module ChartEngine
	@namespace d3Utils
*/
var d3Utils = {

	/**
         Executes a callback when all transitions are over
         See Mike's answer here : https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
         @param {function} transitions: d3 transitions
         @param {function} callbackAll: callback function to be called once when all transitions are done
         @param {function} [callbackEach]: callback function to be called every time a transition is over
         @memberof d3Utils
         */
	endAll: function(transitions, callbackAll, callbackEach) {
		var n = 0;
		if (transitions.empty()) {
			if (typeof callBackAll === 'function') callbackAll.apply(this, arguments)
			return;
		}
		transitions.each(function() {
			++n;
		}).each('end', function() {
			if (callbackEach) callbackEach.apply(this, arguments);
			if (!--n && callbackAll) callbackAll.apply(this, arguments);
		});
	},

	/**
         Counts the number of items in a d3 selection
         @param {selection} selection: a d3 selection
         @return the number of items in the selection
         @memberof d3Utils
         */
	count: function(selection) {
		var n = 0;
		selection.each(function() {
			++n;
		});
		return n;
	},

	/**
         Computes the extent of a list of lines, using the provided accessor function
         @param {Array} lines the list of lines, each one must have a line.points element
         @param {function} accessor the function used to access the values for a point
         @param {Array} [timeRange] [Tmin, Tmax] if provided, the extent won't take in account the points outside of this range (needs more testing)
         @return {Array} [minValue, maxValue]
         @memberof d3Utils
         */
	extent: function(lines, accessor, timeRange) {
		var min;
		var max;
		lines.forEach(function(line) {
			line.points.forEach(function(d) {
				var values = accessor(d)
				if (typeof values === 'number') {
					values = [values]
				}
				values.forEach(function(value) {
					if (isNaN(value)) return

					if (timeRange === undefined || (d.x.time.center >= timeRange[0] && d.x.time.center <= timeRange[1])) {
						if (min > value || min === undefined) min = value;
						if (max < value || max === undefined) max = value;
					}
				})

			});
		});

		return [min, max];
	},


	/**
         Calls a function with the d3 context as the fourth argument
         Useful when the function needs access to its original this
         but also want to now the this set by d3 (the element on which the event was triggered), if
         the function has be bound to its object with _.bindAll before
         @param func func(d,i,j,el) the function
         @memberof d3Utils
         */
	fn: function(func) {
		return function(d, i, j) {
			return func(d, i, j, this);
		};
	},

	/**	
		Detect and repair collisions through d3 selection items on the y-axis   
         @param items: d3 selection 
         @memberof d3Utils
         */
	detectAndRepairYCollision: function(items) {
		var offset = 15;
		var yCollision = function(el, index) {
			var currentBbox = '';
			try {
				currentBbox = el.getBBox();
				var prevBbox;
				items.select(function(d, i) {
					if (i === index - 1) {
						prevBbox = this.getBBox();
					}
				});
				if (!prevBbox) {
					return false;
				} else {
					var yPrev = prevBbox.y;
					var yCurrent = currentBbox.y;
					var heightCurrent = currentBbox.height;
					if (yCurrent + heightCurrent > yPrev) {
						return true;
					} else {
						return false;
					}
				}
			} catch (e) {
				console.error(e);
				return false;
			}
		};
		var nbCollision = 1;
		items.each(function(d, i) {
			if (yCollision(this, i)) {
				var currentY = this.getBBox().y;
				d3.select(this)
					.attr('y', function(d, i, j) {
						return currentY - nbCollision * offset;
					});
				++nbCollision;
			}
		});
	},

	/**
		Detect and repair collisions through d3 selection items on the x-axis  
         @param items: d3 selection 
         @memberof d3Utils
         */
	detectAndRepairXCollision: function(items) {
		var _this = this;
		var index = 0;

		// y translation if collision
		var offset = 15;

		var xCollision = function(el, index) {
			var currentBbox = '';
			try {
				currentBbox = el.getBBox();

				var prevBbox;
				items.select(function(d, i) {
					if (i === index - 1) {
						prevBbox = this.getBBox();
					}
				});
				if (!prevBbox) {
					return false;
				} else {
					var xPrev = prevBbox.x;
					var xCurrent = currentBbox.x;
					var widthCurrent = currentBbox.width;
					if (xCurrent + widthCurrent > xPrev) {
						return true;
					} else {
						return false;
					}
				}
			} catch (e) {
				console.error(e);
				return false;
			}

		};

		var nbCollision = 1;
		items.each(function(d, i) {
			if (xCollision(this, i)) {
				var currentY = this.getBBox().y;
				d3.select(this)
					.attr('y', function(d, i, j) {
						return currentY - nbCollision * offset;
					});
				++nbCollision;
			}
		});
	},

	/**
         Find the closest item in an array minimizing the distance with an external element 
         @param items: array
         @param target: external element
         @memberof d3Utils
         */
	findClosest: function(items, target) {
		var min, closest, index;
		items.forEach(function(el, i) {
			var dist = Math.abs(el - target);
			if (min === undefined || dist < min) {
				min = dist;
				closest = el;
				index = i;
			}
		});
		return {
			element: closest,
			index: index
		};
	},

	/**
        Function to move, remove or generalize
         @param label 
         @memberof d3Utils
         */
	sanitizePieChartLabel: function(label) {
		if (label[0] === '/') {
			label = label.slice(1, label.length);
		}
		if (label[label.length - 1] === '/') {
			label = label.slice(0, label.length - 1);
		}
		label = label.replace('https://', '');
		label = label.replace('http://', '');
		return label;
	}

};

module.exports = d3Utils;