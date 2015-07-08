var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var TickerStore = require('TickerStore');

var ParameterSelectorWidget = React.createClass({
	
   getInitialState: function() {
	    return {
	    	properties:{
	    		platform:"BISTAMP",
	    		currency:"USD",
	    		item:"BTC",
	    		interval:"1H",
	    		timeframe:"From .. To .."
	    	}
	    }
   },
   componentDidMount: function() {
   },
    
   componentWillUnmount: function() {
   },
   render: function() {
		return (
			<BaseWidget attributes={this.props.attributes}>
			  <ul>
			    <li>Platform: {this.state.properties.platform}</li>
			    <li>Currency: {this.state.properties.currency} </li>
			    <li>Item: {this.state.properties.item}</li>
			    <li>Interval: {this.state.properties.interval} </li>
			    <li>TimeFrame: {this.state.properties.timeframe} </li>
			  </ul>
			</BaseWidget>
		);
	}

});

module.exports = ParameterSelectorWidget;