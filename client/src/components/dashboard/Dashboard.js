var React = require('react/addons');
var Grid = require('./Grid');
var DashboardConfig = require('DashboardConfig');
var ResizeManager = require('ResizeManager');
// Widgets
var BaseWidget = require('BaseWidget');
var widgetList = [];

var Dashboard = React.createClass({

  getInitialState: function() {
    var conf = DashboardConfig[this.props.params.conf];
    return conf;
  },

  render: function() {
	  var self = this;
    var widgets = this.state.widgets.map(function(widget) {
      var result={};
      result.attributes = widget;
      
      if(widget.chart){
    	  var Widget = require('../widgets/'+widget.chart+'.js');
        widgetList.push(Widget);
    	  return (<Widget attributes={result.attributes} params={self.props.params}></Widget>);
      }
      else{
    	  return (<BaseWidget attributes={result.attributes}></BaseWidget>);
      }
    });
    return (
        <div className="grid-stack">
          <Grid widgets={widgets} params={this.props.params}/>
        </div>
    );
  },

  componentDidMount:  function() {
    this.resizeAll()
  },

  resizeAll: function() {
    window.onresize = function() {
      _.each(ResizeManager, function(widget_resize) {
        widget_resize();
      });
    }
  }

});

module.exports = Dashboard;