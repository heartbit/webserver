var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var OrderbookStore = require('OrderbookStore');

var OrderbookWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	orderbook: {}
	    }
    },
    componentDidMount: function() {
   		// console.log(OrderbookSocket);
   		// OrderbookSocket.create();
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					Orderbook!
				</div>
			</BaseWidget>
		);
	}
});

module.exports = OrderbookWidget;

