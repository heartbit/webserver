var React = require('react');
var mainChart = require('mainChart');


var mainChart = React.createClass({

	componentDidMount: function() {
		var el = React.findDOMNode(this);
		this.mainChart = new barChartD3(el, this.getChartState().data, this.getChartState().id,this.getChartState().size);
	},

	componentDidUpdate: function() {
		var el = React.findDOMNode(this);
		this.barChartD3.update(el, this.getChartState().data, this.getChartState().id,this.getChartState().size); 
	},

	componentWillUnmount:  function() {
		// console.log("unmoouunnnnnnnnnnnnnnnnnnnnn");
		// var el = React.findDOMNode(this);
		// this.pieChartD3.remove(el);
	},

	getChartState: function() {
		return {
			data: this.props.data,
			id: this.props.id,
			size: this.props.size
		}
	},

	render: function() {
		return (
			<div id={this.props.id} className="mainchart"></div>
		);
	}

});

module.exports = mainChart;