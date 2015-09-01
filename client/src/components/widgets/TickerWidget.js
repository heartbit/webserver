var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var TickerStore = require('TickerStore');

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
		return (
			<BaseWidget attributes={this.props.attributes}>
			  <ul className="right">
			    <li>Open : {this.state.ticker.open} {this.state.ticker.currency}</li>
			    <li>Last : {this.state.ticker.close} {this.state.ticker.currency}</li>
			    <li>High : {this.state.ticker.high} {this.state.ticker.currency}</li>
			    <li>Low : {this.state.ticker.low} {this.state.ticker.currency}</li>
			  </ul>
			  <ul>
			    <li>Variation : {this.state.ticker.variation} % </li>
			    <li>Volume : {this.state.ticker.volume} {this.state.ticker.item}</li>
			    <li>N° of trades: {this.state.ticker.last} </li>
			  </ul>
			
			
			</BaseWidget>
		);
	},
	_onTickerReceived: function(){
		this.setState({ticker:TickerStore.get()});
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