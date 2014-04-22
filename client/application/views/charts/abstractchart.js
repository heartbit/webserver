var AbstractChart = function(options) {
	this.layers = [];
	this._width = this.params.width || 950;
	this._height = this.params.height || 350;

	this._padding = this.defaultPadding || {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	this.dom = {};

	_.bindAll(this, 'stopListening', 'initListeners', 'update', 'cleanWorkspace', 'adaptWorkspace');

	this._drawn = false;
};

AbstractChart.prototype.render = function() {
};

AbstractChart.prototype.update = function() {
};
