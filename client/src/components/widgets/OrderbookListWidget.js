var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var OrderbookStore = require('OrderbookStore');

var OrderbookListWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	ask: [],
	    	bid: [],
	    	params: null
	    }
    },
    componentDidMount: function() {
   		OrderbookStore.addChangeListener('change', this._onUpdateBook);
   		OrderbookStore.addChangeListener('isloading', this._onLoading);
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		var ask = this.state.ask;
		var bid = this.state.bid;
		if (this.state.msg == "available") {
			var size = {
			  width: window.innerWidth || document.body.clientWidth,
			  height: window.innerHeight || document.body.clientHeight
			}

			if(size.width <= 600) {
				var limit = 8;
			} else {
				var limit = 23;
			}

			if(bid.length != 0) {
				var tablebodyBid = [];
				for(i = 0; i <= limit; i++) {
					var order = bid[i];
					if(size.width <= 500) {
						tablebodyBid.push(
							<tr>
								<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.volume))} </td>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.sum,0))} </td>
							</tr>
						);

						var theadBid = <thead>
									<th className='orderbooTable_th bidTitle'> Bid Price {this.state.params.currency} </th>
									<th className='orderbooTable_th'> Order Size {this.state.params.item} </th>
									<th className='orderbooTable_th'> Total {this.state.params.item} </th>
								</thead>;	
					} else {
						tablebodyBid.push(
							<tr>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.sum,0))} </td>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.volume))} </td>
								<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
							</tr>
						);
						var theadBid = <thead>
									<th className='orderbooTable_th'> Total {this.state.params.item} </th>
									<th className='orderbooTable_th'> Order Size {this.state.params.item} </th>
									<th className='orderbooTable_th bidTitle'> Bid Price {this.state.params.currency} </th>
								</thead>;
					}
				}
			}
			if(ask.length != 0) {
				var tablebodyAsk = [];
				for(i = 0; i <= limit; i++) {
					var order = bid[i];
					if(size.width <= 500) {
						tablebodyAsk.push(
							<tr>
								<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.volume))} </td>
								<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(order.sum,0))} </td>
							</tr>
						);
					} else {
						tablebodyAsk.push(
							<tr>
								<td className='orderbookTable_td'> {Math.floor(order.price*Math.pow(10,9))/Math.pow(10,9)} </td>
								<td className='orderbookTable_td'> {FormatUtils.formatValue(Math.floor(order.volume))} </td>
								<td className='orderbookTable_td'> {FormatUtils.formatValue(Math.floor(order.sum))} </td>
							</tr>
						);
					}
				}
			} 
		} else if(this.state.msg == "unavailable") {
			var loadblock = <div> "Data unavailable yet" </div>;
		} else {
			var loadblock = <img className='loading_orderbookList' src='./img/load_medium.GIF' />;
		}

		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					{ this.state.msg == "available" ?
						this.state.ask.length !=0 ?
							<table className='orderbookBidList'>
								{theadBid}
								<tbody>
									{tablebodyBid}
								</tbody>
							</table>
						: "" 
					: "" }
					{ this.state.msg == "available" ?
						this.state.bid.length != 0 ?
							<table className='orderbookAskList'>
							 	<thead>
							 		<th className='orderbooTable_th askTitle'> Ask Price {this.state.params.currency} </th>
							 		<th className='orderbooTable_th'> Order Size {this.state.params.item}  </th>
							 		<th className='orderbooTable_th'> Total {this.state.params.item} </th>
							 	</thead>
							 	<tbody>
							 		{tablebodyAsk}
							 	</tbody>
							</table>
						: <img className='loading_orderbookList' src='./img/load_medium.GIF' />
					:  loadblock }
				</div>
			</BaseWidget>
		);
	},

	_onUpdateBook: function() {
		var orderbook = OrderbookStore.getAll();
		if (orderbook.msg == "unavailable") {
			this.setState({
				msg: orderbook.msg
			});
		} else {
			this.setState({
				ask: orderbook.ask,
				bid: orderbook.bid,
				params: orderbook.params,
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

module.exports = OrderbookListWidget;

