var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_app');
// <AppRouter />

var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar  searchbar={Searchbar} />
            <SideMenu />
            <Dashboard dashboard_config= { this.props.dashboard_config } />
			<Footer />
        </div>);
    }
});

module.exports = App;