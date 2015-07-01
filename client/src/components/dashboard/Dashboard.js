var React = require('react/addons');
var gridster = require('gridster');
var ChartEngine = require('ChartEngine');
var MainChart = require('MainChart');
var DataSocketManager = require('DataSocketManager');

var MaingraphStore = require('MaingraphStore');
var _mainChart,_mainGraphParams;

var TestItem = React.createClass({
  
  getInitialState: function() {
    return {};
  },
  _onUpdateState: function() {
	  var all = MaingraphStore.getAll()
 	  console.log(all)
	  this.setState({
		  maingraphes:{
	        candles: all.candles,
	        volumes: all.volumes
	      }
	  })
	  
  },

  componentDidMount: function() {
    MaingraphStore.addChangeListener("change" ,this._onUpdateState);
	  if(this.props.attributes.chart){
      console.log('Before init');
      _mainChart = new MainChart("#" + this.props.attributes.chart);
      _mainGraphParams = {
          area: true,
          candle: false,
          volume: false,
          sma: false
      };
     }
  },
  
  componentWillUnmount: function() {
  },

  render: function() {
    if(!_.isEmpty(this.state)){
      console.log('Before draw: ', this.state.maingraphes.candles.length, '  ', this.state.maingraphes.volumes.length);
      _mainChart.draw(this.state.maingraphes, _mainGraphParams);
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
            <i className={this.props.attributes.icon}></i>
            <span className="panel-title-text">{this.props.attributes.title}</span>
          </div>
          <div className="panel-title pull-right">
          <a href="#">
            <i className="fa fa-minus"></i>
            </a>
            <a href="#">
            <i className="fa fa-plus"></i>
            </a>
            <a href="#">
            <i className="fa fa-times"></i>
            </a>
          </div>
        </div>
        <div className="panel-body">
        <div id={this.props.attributes.chart ? this.props.attributes.chart: ''}></div>
        </div>
      </div>
      );
  }

});

var Grid = React.createClass({

  render: function() {
    return (<ul />);
  },  

  componentDidMount: function() {
    var gridster = $(this.getDOMNode()).gridster({
      widget_margins: [10, 10],
      widget_base_dimensions: [350, 150],
      resize: {
          enabled: false
        },
      draggable: {
          handle: '.panel-heading, .panel-handel'
        }
    }).data('gridster');

    gridster.disable();

    this.props.items.map(function(item, i) {
      var attributes = item.props.attributes;
      var key = "item" + attributes.key;
      gridster.add_widget(
        '<li class="item" id={key}></li>'.replace('{key}', key), 
        attributes.width,
        attributes.height,
        attributes.col,
        attributes.row
      );
      React.render(item, document.getElementById(key));
    });
    this.setState({gridster: gridster});
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      items: [{
        key: 'keyfact1',
        title:'Keyfact 1',
        icon:'fa fa-bar-chart',
        // chart: 'PieChart',
        width: 1,
        height: 1,
        col: 1,
        row: 1
      },
      {
        key: 'keyfact2',
        title:'Keyfact 2',
        icon:'fa fa-bar-chart',
        // chart: 'PieChart',
        width: 1,
        height: 1,
        col: 2,
        row: 1
      },
      {
        key: 'keyfact3',
        title:'Keyfact 3',
        icon:'fa fa-bar-chart',
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
        chart: 'CandlesVolumes',
        col: 1,
        row: 2
      }]
    };
  },

  render: function() {
    var items = this.state.items.map(function(item) {
      return (<TestItem attributes={item}>{item.key}</TestItem>);
    });
    return (
      <div className="gridster">
        <Grid items={items} />
      </div>
    );
  }
});

module.exports = Dashboard;