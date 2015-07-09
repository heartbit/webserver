// import d3 base
require('d3');

// extend with d3.chart
require('d3chart');

// extend with d3.tip
d3.tip = require('d3tip');

d3.selection.prototype.moveToFront = function() {
	return this.each(function() {
		this.parentNode.appendChild(this);
	});
};

// Is one element's bounding rect contained in another's ?
d3.selection.prototype.containedIn = function(container, margin){
	margin = margin == undefined ? 5 : margin;
	var containerBox = container.getBoundingClientRect()
	var box = this.node().getBoundingClientRect()

	return containerBox.top < box.top - margin
	&& containerBox.right > box.right + margin
	&& containerBox.bottom > box.bottom + margin
	&& containerBox.left < box.left - margin
}

/* recursive function to lower the size of a text
in order to fit the element in another's bounding rect
*/
d3.selection.prototype.fitIn = function(container, margin, minFontSize, fitDy){
	var fontSize = +this.style('font-size').replace('px', '')
	if (fitDy){
		this.attr('dy', fontSize * 1.5 )
	}
	var contained = this.containedIn(container, margin)
	if (!contained){
		if (fontSize - 2 < minFontSize){
			this.attr('visibility', 'hidden')
			this.attr('data-tooSmall', true)
		} else {
			this.attr('data-tooSmall', null)
			this.attr('visibility', 'visible')
			this.style('font-size', fontSize - 2 )
			this.fitIn(container, margin, minFontSize, fitDy)
		}
	}
}

// Set a text's width so that it takes the whole width of a container
d3.selection.prototype.fillRect = function(container, margin){
	var fontSize = +this.style('font-size').replace('px', '')
	var contained = this.containedIn(container, margin)
	if (contained){
			this.style('font-size', fontSize + 1 )
			this.fillRect(container, margin)
	}
}



module.exports = d3;
