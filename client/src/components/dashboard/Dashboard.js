var React = require('react/addons');
var Grid = require('./Grid');

// Widgets
var BaseWidget = require('BaseWidget');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {
      widgets: [{
        key: 'keyfact1',
        title:'Keyfact',
        icon:'fa fa-bar-chart',
        chart: 'TickerWidget',
        width: 2,
        height: 1,
        col: 1,
        row: 1
      },
      {
        key: 'keyfact3',
        title:'Selector ',
        icon:'fa fa-bar-chart',
        chart: 'ParameterSelectorWidget',
        width: 1,
        height: 1,
        col: 3,
        row: 1
      },
      {
        key: 'timeline',
        title: 'Timeline',
        icon:'fa fa-line-chart',
        width: 3,
        height: 3,
        chart: 'MainChartWidget',
        col: 1,
        row: 2
      }]
    };
  },

  render: function() {
    var widgets = this.state.widgets.map(function(widget) {
      var result={};
      result.attributes = widget;
      
      if(widget.chart){
    	  var Widget = require('../widgets/'+widget.chart+'.js');
    	  return (<Widget attributes={result.attributes}></Widget>);
      }
      else{
    	  return (<BaseWidget attributes={result.attributes}></BaseWidget>);
      }
    });
    console.log(this.props)
    return (
        <div className="gridster">
          <Grid widgets={widgets} params={this.props.params}/>
        </div>
    );
  }

});

module.exports = Dashboard;