var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_app');
// <SideMenu />
// <Footer />

var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar searchbar = {Searchbar} />
   			<Dashboard dashboard_config = {this.props.dashboard_config} />
        </div>);
    }
});

module.exports = App;