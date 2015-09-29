var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var FormatUtils = require('FormatUtils');
var MarketTraderStore = require('MarketTraderStore');

var ActiveAccountsWidget = React.createClass({
	
    getInitialState: function() {
	    return {
	    	orderbook: {}
	    }
    },
    componentDidMount: function() {
    	MarketTraderStore.addChangeListener('change',this._update);
    },
    
    componentWillUnmount: function() {

    },
	render: function() {
		return (
			<BaseWidget attributes={this.props.attributes}>
				<div>
					Active Accounts!
				</div>
			</BaseWidget>
		);
	},

	_update: function() {
		var mt = MarketTraderStore.getAll();
		console.log('mt from view', mt);
	}
});

module.exports = ActiveAccountsWidget;

