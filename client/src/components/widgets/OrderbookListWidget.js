var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var OrderbookStore = require('OrderbookStore');

var OrderbookListWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	ask: [],
	    	bid: []
	    }
    },
    componentDidMount: function() {
   		OrderbookStore.addChangeListener('change', this._onUpdateBook);
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		var ask = this.state.ask;
		var bid = this.state.bid;
		if(bid.length != 0) {
			var tablebodyBid = [];
			_.each(bid, function(order) {
				tablebodyBid.push(
					<tr>
						<td> {order.sum} </td>
						<td> {order.volume} </td>
						<td> {order.price} </td>
					</tr>
				);
			})
		}
		if(ask.length != 0) {
			var tablebodyAsk = [];
			_.each(ask, function(order) {
				tablebodyAsk.push(
					<tr>
						<td> {order.price} </td>
						<td> {order.volume} </td>
						<td> {order.sum} </td>
					</tr>
				);
			});
		}

		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					{ this.state.ask.length !=0 ?
						<table className='orderbookBidList'>
							<thead>
								<th> Total </th>
								<th> Size  </th>
								<th> Bid Price </th>
							</thead>
							<tbody>
								{tablebodyBid}
							</tbody>
						</table>
					: 'loading' }
					{ this.state.bid.length != 0 ?
						<table className='orderbookAskList'>
						 	<thead>
						 		<th> Ask Price </th>
						 		<th> Size </th>
						 		<th> Total </th>
						 	</thead>
						 	<tbody>
						 		{tablebodyAsk}
						 	</tbody>
						</table>
					: 'loading'}
				</div>
			</BaseWidget>
		);
	},

	_onUpdateBook: function() {
		var orderbook = OrderbookStore.getAll();
		console.log("ordebrookList_View", orderbook);
		this.setState({
			ask: orderbook.ask,
			bid: orderbook.bid
		});
	}
});

module.exports = OrderbookListWidget;

