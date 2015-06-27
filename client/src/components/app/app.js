var React = require('react');

var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var AppRouter = require('AppRouter');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
// <AppRouter />

var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar />
            <SideMenu />
            <Dashboard />
			<Footer />
        </div>);
    }
});

module.exports = App;