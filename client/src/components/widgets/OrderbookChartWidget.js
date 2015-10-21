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
   		OrderbookStore.addChangeListener('isloading', this._onLoading);

    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		var data = this.state.orderbook;

		if(_orderbookChart && this.state.msg == "available") {
			_orderbookChart.show();
			_orderbookChart.draw(data);
		} else if(this.state.msg == "unavailable") {
				_orderbookChart.hide();
				var loading = <div> Data not available yet </div>;
		} else {
			var loading = <img className='loading_orderbookList' src='./img/load_medium.GIF' />
		}


		return (
			<BaseWidget attributes={this.props.attributes}>
				{loading}
			</BaseWidget>
		);
	},
	_onUpdateState: function() {
		var orderbook = OrderbookStore.getAll();
		if( orderbook.msg == "available") {
			// console.log("book_chart AVAILABLE !!!");
			if(this.props.attributes.chart && !_orderbookChart){
		       	_orderbookChart = new OrderbookChart("#" + this.props.attributes.chart);
		  	}
			this.setState({
				orderbook: orderbook,
				msg: orderbook.msg
			});
		} else {
			// console.log("book_chart NOT AVAILABLE");
			this.setState({
				msg: orderbook.msg
			});
		}
	},
	_onLoading: function() {
		// this.setState({
		// 	msg: 'loading'
		// });
	}
});

module.exports = OrderbookWidget;

