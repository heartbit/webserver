var React = require('react');

var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');

var App = React.createClass({
	getInitialState: function(){
		return  {
			params : {
	    	  width : window.innerWidth
	    	}  
		}
	},
	componentDidMount: function() {
		var self = this;
		$( window ).resize(function() {
    		var w = this.innerWidth;
    		params = {
        	  width : w
        	}
    		self.setState({params:params})
        });
	},
    render: function() {
        return (
        <div>
            <Topbar />
            <Dashboard params={this.state.params}/>
        </div>);
    }
    
});

module.exports = App;