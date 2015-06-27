var bootstrap = require('bootstrap');
var React = require('react');
var storeMixin = require('storeMixin');
var RouterStore = require('RouterStore');

var AppRouter = React.createClass({
    mixins: [storeMixin(RouterStore)],

    getInitialState: function() {
        return { RouterStore: RouterStore };
    },

    getComponentClass: function(route) {
        switch (route) {
            case 'settings':
                return require('Settings');
            case 'dashboard':
            default:
                return require('Dashboard');
        }
    },

    render: function() {
        var props = {
            route: this.state.RouterStore.get('route'),
            routeParams: this.state.RouterStore.get('params')
        };
        var Component = this.getComponentClass(props.route);
        return <Component {...props} />;
    }
});

module.exports = AppRouter;