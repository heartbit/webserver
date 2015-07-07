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
			  <ul>
			    <li>Variation : {this.state.ticker.variation} % </li>
			    <li>Volume : {this.state.ticker.volume} BTC</li>
			    <li>N° : {this.state.ticker.last}</li>
			    <li>Open : {this.state.ticker.open} $</li>
			    <li>Close : {this.state.ticker.close} $</li>
			    <li>High : {this.state.ticker.high} $</li>
			    <li>Low : {this.state.ticker.low} $</li>
			  </ul>
			
			</BaseWidget>
		);
	},
	_onTickerReceived: function(){
		this.setState({ticker:TickerStore.get()});
	}
});

module.exports = TickerWidget;