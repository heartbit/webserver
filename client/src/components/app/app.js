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
	    	  width : window.innerWidth
	    	}  
		}
	},
	componentDidMount: function() {
		var self = this;
        SizeManager.execute();
        // var delay = (function(){
        //     var timer;
        //     return function(callback, ms){
        //         clearTimeout(timer);
        //         timer = setTimeout(callback, ms);
        //     };
        // })();
        // $( window ).resize(function() {
        //     var callback = function() {
        //         console.log("resize with delay hack!",window.innerWidth);
        //         var w = window.innerWidth;
        //         params = {
        //             width : w
        //         }
        //         self.setState({params:params})
        //     };
        //     delay(callback, 1000);
        // });
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