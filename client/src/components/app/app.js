var React = require('react');

var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var AppRouter = require('AppRouter');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
// <AppRouter />
// <Footer />
// <SideMenu />

var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar />
            
            <Dashboard />
        </div>);
    }
});

module.exports = App;