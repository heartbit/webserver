define('tooltip', ['config', 'text!./tooltip.html', 'd3', 'FormatUtils', 'moment'], function(config, TooltipTpl, d3, formatutils) {

	var Tooltip = function(el, appliedClass) {
		this.el = el
			.append('g')
			.append('text')
			.attr('class', 'tooltip ' + appliedClass)
			.style("visibility", "hidden")
			.style('display', 'block');

		this.el.on("mouseover", function(){
			console.log('mouseover')
		})
		this.el.on("mouseout", function(){
			console.log('mouseout')
		})
		this.el.on("mousemove", function(){
			console.log('mousemove')
		})
	};

	Tooltip.prototype.mouseover = function() {
		this.el
			.style("visibility", "visible");
		return this;
	};

	Tooltip.prototype.mouseout = function() {
		this.el
			.text('')
			.style("visibility", "hidden");
		return this;
	};

	Tooltip.prototype.render = function(variables, position) {
		// var html = this.formatTooltipContent(variables);

		this.el.html("je t'aime <3")
			.style('left', position.left)
			.style('top', position.top);
		return this;
	};

	Tooltip.prototype.formatTooltipContent = function(tooltipVariables) {
		var self = this;

		var html = "blatte";

		// var tplVariables = {
		// 	tooltipVariables: tooltipVariables
		// };

		// var tpl = _.template(TooltipTpl);
		// var html = tpl(tplVariables);

		// Template HERE

		// var formattedDate = moment(tooltipVariables.candle.middleDate).format('MMM Do YYYY, h:mm a');
		// html += "<li>" + formattedDate + "</li>";

		// var formattedClose = tooltipVariables.candle.close;
		// html += "<li>Close : " + formattedClose + "</li>";

		// var formattedOpen = tooltipVariables.candle.open;
		// html += "<li>Open : " + formattedOpen + "</li>";

		// var formattedHigh = tooltipVariables.candle.high;
		// html += "<li>High : " + formattedHigh + "</li>";

		// var formattedLow = tooltipVariables.candle.low;
		// html += "<li>Low : " + formattedLow + "</li>";

		// var formattedVolume = tooltipVariables.volume.amount;
		// html += "<li>Volume : " + formatutils.truncToNdecimal(formattedVolume, 2) + "</li>";

		return html;
	};

	Tooltip.prototype.update = function(){
		return false;
	};

	Tooltip.prototype.draw = function(){
		return false;
	};

	return Tooltip;

});