var React = require('react');

var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var AppRouter = require('AppRouter');
var Footer = require('Footer');
// <AppRouter />


var App = React.createClass({
    render: function() {
        return (
        <div>
            <Topbar />
            <SideMenu />
			<Footer />
        </div>);
    }
});

module.exports = App;