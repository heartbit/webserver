var React = require('react');

var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
// <AppRouter />

var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar />
            <SideMenu />
            <Dashboard dashboard_config= { this.props.dashboard_config } />
			<Footer />
        </div>);
    }
});

module.exports = App;