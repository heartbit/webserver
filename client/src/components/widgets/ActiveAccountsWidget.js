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
    	if(this.props.attributes.id == 'app') {
    		MarketTraderStore.addChangeListener('app',this._update);
    	} else {
    		MarketTraderStore.addChangeListener(this.props.attributes.id, this._update);
    	}
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		var tableTraders = [];
		if (!_.isEmpty(this.state.market_traders)) {
			if(!this.state.market_traders.msg) {
			
				_.each(this.state.market_traders, function(trader) {
					if(trader.buysellratio*100>=50) {
						var color = "positive";
					} else {
						var color = "negative";
					}
					var address = trader.account;
					tableTraders.push(
						<tr>
							<td className='market_traders_address orderbookTable_td'>  <a href={"http://ledgermonitor.heartbit.io/app/"+ address} target="_blank"> { trader.account} </a></td>
							<td className='orderbookTable_td'> { FormatUtils.formatValue(Math.floor(trader.baseVolume))} </td>
							<td className='orderbookTable_td'> { FormatUtils.formatPercent(trader.total.currencyVolume) }  </td>
							<td className={'orderbookTable_td ' + color}> { FormatUtils.formatPercent(trader.buysellratio*100) }  </td>
						</tr>
					);
				});
			}
		}

		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					{ !_.isEmpty(this.state.market_traders) ?
						this.state.market_traders.msg == "unavailable" ?
						<div className="unavailableData"> Data not available yet </div>
						:<table >
							<thead>
								<th className='orderbooTable_th'> Address </th>
								<th className='orderbooTable_th'> Volume {this.state.market_traders.params.item }  </th>
								<th className='orderbooTable_th'> %Total </th>
								<th className='orderbooTable_th'> %Buy </th>	
							</thead>
								<tbody>
									{tableTraders}
								</tbody>
						</table>
					: <img className='loading_orderbookList' src='./img/load_medium.GIF' /> }
				</div>
			</BaseWidget>
		);
	},

	_update: function() {
		console.log("getspecific!",MarketTraderStore.getSpecific(this.props.attributes.id), this.props.attributes.id);
		var mt = MarketTraderStore.getSpecific(this.props.attributes.id);
		// console.log('mt from view', mt);
		this.setState({
			market_traders: mt
		});
	}
});

module.exports = ActiveAccountsWidget;

