var React = require('react');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var SizeManager = require('SizeManager');

var App = React.createClass({
	getInitialState: function(){
		return  {
			params : {
	    	  width : window.innerWidth,
	    	  conf: this.props.conf
	    	}  
		}
	},
	componentDidMount: function() {
		var self = this;
        SizeManager.execute();
    },
    render: function() {
        return (
        <div>
            <Topbar />
            <Dashboard params={this.state.params}/>
        </div>);
    },

    
});

module.exports = App;