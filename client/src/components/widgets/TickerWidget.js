var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var TickerStore = require('TickerStore');
var FormatUtils = require('FormatUtils');

var TickerWidget = React.createClass({
	
   getInitialState: function() {
	    return {
	    	ticker: {}
	    }
   },
   componentDidMount: function() {
      TickerStore.addChangeListener("change", this._onTickerReceived);
   },
    
   componentWillUnmount: function() {
     TickerStore.removeChangeListener(this._onTickerReceived);
   },
	render: function() {
		var ticker = this.state.ticker;
		var lastPrice = Math.trunc(ticker.lastPrice*1000000)/1000000;
		var variation = FormatUtils.formatPercentV(ticker.variation);
		var VariationColor = this.variationColor(ticker.variation);
		var volume = Math.trunc(ticker.volume);
		var currency = ticker.currency;
		var item = ticker.item;
		var open =  Math.trunc(ticker.open*1000000)/1000000
		var high =  Math.trunc(ticker.high*1000000)/1000000
		var low =  Math.trunc(ticker.low*1000000)/1000000
		var nbTrade = ticker.nbTrade;
		return (
			<BaseWidget attributes={this.props.attributes}>
				{ this.state.ticker.lastPrice ?
					<div>
						<div className={'lastPriceBlock'}>
							<div>
								<span id='lastPrice'>{lastPrice}</span>
								<span id='pair'>{item}/{currency}</span>
							</div>
							<div className={VariationColor} id='variation'>
								{variation}
							</div>
						</div>
						<div id='statstitle'> 24h stats </div>
						<div className={'lastStats'}>
							<div id='highLow'>
								<div>
									<span id='24hhigh' className={'positive'}> High: {high} </span>
								</div>
								<div>
									<span id='24Hlow' className={'negative'}> Low: {low} </span>
								</div>
							</div>
							<div id='volumeNbTrade'>
								<div>
									<span id='24hvolume' className={'volumeColor'}> Volume: {volume}</span>
									<span id='itemVolume'> {item} </span>
								</div>
								<div>
									<span id='24hnbtrade'> Trades: {nbTrade} </span>
								</div>
							</div>
						</div>
					</div>

				: "" }
			</BaseWidget>
		);
	},
				// <ul>
				// 	<li>Open : {this.state.ticker.open} {this.state.ticker.currency}</li>
				// 	<li>High : {this.state.ticker.high} {this.state.ticker.currency}</li>
				// 	<li>Low : {this.state.ticker.low} {this.state.ticker.currency}</li>
				// </ul>
				// <ul>
				// 	<li>Volume : {this.state.ticker.volume} {this.state.ticker.item}</li>
				// 	<li>N° of trades: {this.state.ticker.last} </li>
				// </ul>
	_onTickerReceived: function(){
		this.setState({ticker:TickerStore.get()});
	},

	variationColor: function(variation) {
		return variation>0 ? 'positive' : 'negative';
	}
});

module.exports = TickerWidget;


// { lastPrice: 0.007740203574811515,
//   lastVolume: 1013.996785,
//   nbTrade: 962,
//   high: 0.007873160756886877,
//   low: 0.007517440252194941,
//   open: 0.007578032996608282,
//   volume: 8593550.528348,
//   variation: 2.14000887,
//   currency: 'USD',
//   item: 'XRP',
//   platform: 'BITSTAMP' }