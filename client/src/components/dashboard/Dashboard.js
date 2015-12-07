var React = require('react/addons');
var Grid = require('./Grid');
var DashboardConfig = require('DashboardConfig');

// Widgets
var BaseWidget = require('BaseWidget');

var Dashboard = React.createClass({

  getInitialState: function() {
    var conf = DashboardConfig.Conf1;
    return conf;
  },

  render: function() {
	  var self = this;
    var widgets = this.state.widgets.map(function(widget) {
      var result={};
      result.attributes = widget;
      
      if(widget.chart){
    	  var Widget = require('../widgets/'+widget.chart+'.js');
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
  }

});

module.exports = Dashboard;