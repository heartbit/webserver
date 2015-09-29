var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var OrderbookStore = require('OrderbookStore');
var OrderbookChart = require('OrderbookChartD3');
var _orderbookChart;

var OrderbookWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	orderbook: {}
	    }
    },
    componentDidMount: function() {
   		OrderbookStore.on('change', this._onUpdateState);
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		var data = this.state.orderbook;
		if(_orderbookChart) _orderbookChart.draw(data);


		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
				</div>
			</BaseWidget>
		);
	},
	_onUpdateState: function() {
		if(this.props.attributes.chart && !_orderbookChart){
	       	_orderbookChart = new OrderbookChart("#" + this.props.attributes.chart);
	  	}

		var orderbook = OrderbookStore.getAll();
		this.setState({
			orderbook: orderbook
		});
	}

});

module.exports = OrderbookWidget;

