var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var MarketTraderStore = require('MarketTraderStore');

var ActiveAccountsWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	market_traders: {}
	    }
    },
    componentDidMount: function() {
    	MarketTraderStore.addChangeListener('change',this._update);
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		console.log(this.state);
		var tableTraders = [];
		if (!_.isEmpty(this.state.market_traders)) {
			// market_traders.sort(function(x,y) {
			// 	if(x[baseVolume] > y[baseVolume])
			// })
			_.each(this.state.market_traders, function(trader) {
				var address = { address: trader.account};
				tableTraders.push(
					<tr>
						<td className='market_traders_address orderbookTable_td'>  <a href={"http://ledgermonitor.heartbit.io/app?"+ JSON.stringify(address)} target="_blank"> { trader.account} </a></td>
						<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(trader.baseVolume))} </td>
						<td className='orderbookTable_td'> { FormatUtils.formatPercent(trader.total.currencyVolume) }  </td>
					</tr>
				);
			});

		}

		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					{ !_.isEmpty(this.state.market_traders) ?
						<table >
							<thead>
									<th className='orderbooTable_th'> Address </th>
									<th className='orderbooTable_th'> Volume  </th>
									<th className='orderbooTable_th'> %Total </th>
								</thead>
								<tbody>
									{tableTraders}
								</tbody>
						</table>
					: <img className='loading_orderbookList' src='./img/load_medium_blue.GIF' /> }
				</div>
			</BaseWidget>
		);
	},

	_update: function() {
		var mt = MarketTraderStore.getAll();
		// console.log('mt from view', mt);
		this.setState({
			market_traders: mt
		});
	}
});

module.exports = ActiveAccountsWidget;

