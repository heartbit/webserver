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
        width: 3,
        height: 1,
        col: 1,
        row: 1
      },
      {
        key: 'keyfact3',
        title:'Selector ',
        icon:'', //fa fa-bar-chart
        chart: 'ParameterSelectorWidget',
        width: 3,
        height: 1,
        col: 1,
        row: 2
      },
      {
        key: 'timeline',
        title: 'Timeline',
        icon:'fa fa-line-chart',
        width: 3,
        height: 3,
        chart: 'MainChartWidget',
        col: 1,
        row: 3
      },
      {
        key:'orderbook',
        title:"Orderbook",
        icon:'fa fa-bar-chart',
        width: 3,
        height: 2,
        chart: 'OrderbookChartWidget',
        col: 1,
        row:7
      },
      {
        key:'bidask',
        title:'Bids/Asks',
        icon:'',
        width:2,
        height:3,
        chart: 'OrderbookListWidget',
        col:1,
        row:11
      },
      {
        key:'activeaccounts',
        title:'Active Accounts',
        icon:'',
        width:1,
        height:3,
        chart: 'ActiveAccountsWidget',
        col:3,
        row:11
      }]
    };
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
        <div className="gridster">
          <Grid widgets={widgets} params={this.props.params}/>
        </div>
    );
  }

});

module.exports = Dashboard;