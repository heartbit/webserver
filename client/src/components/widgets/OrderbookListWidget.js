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
						<td className='orderbookTable_td'> {Math.floor(order.sum)} </td>
						<td className='orderbookTable_td'> {Math.floor(order.volume)} </td>
						<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
					</tr>
				);
			})
		}
		if(ask.length != 0) {
			var tablebodyAsk = [];
			_.each(ask, function(order) {
				tablebodyAsk.push(
					<tr>
						<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
						<td className='orderbookTable_td'> {Math.floor(order.volume)} </td>
						<td className='orderbookTable_td'> {Math.floor(order.sum)} </td>
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
								<th className='orderbooTable_th'> Total </th>
								<th className='orderbooTable_th'> Size  </th>
								<th className='orderbooTable_th'> Bid Price </th>
							</thead>
							<tbody>
								{tablebodyBid}
							</tbody>
						</table>
					: "" }
					{ this.state.bid.length != 0 ?
						<table className='orderbookAskList'>
						 	<thead>
						 		<th className='orderbooTable_th'> Ask Price </th>
						 		<th className='orderbooTable_th'> Size </th>
						 		<th className='orderbooTable_th'> Total </th>
						 	</thead>
						 	<tbody>
						 		{tablebodyAsk}
						 	</tbody>
						</table>
					: <img className='loading_orderbookList' src='./img/load_medium_blue.GIF' />}
				</div>
			</BaseWidget>
		);
	},

	_onUpdateBook: function() {
		var orderbook = OrderbookStore.getAll();
		this.setState({
			ask: orderbook.ask,
			bid: orderbook.bid
		});
	}
});

module.exports = OrderbookListWidget;

