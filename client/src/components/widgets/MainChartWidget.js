var React = require('react/addons');
var BaseWidget = require('./BaseWidget');

var MaingraphStore = require('MaingraphStore');
var MainChart = require('MainChart');
var _mainChart,_mainGraphParams;

var MainChartWidget = React.createClass({

  // getInitialState: function() {
  //   return {};
  // },

  // _onUpdateState: function() {
	 //  var all = MaingraphStore.getAll();
	 //  this.setState({
		//   maingraphes:{
	 //        candles: all.candles,
	 //        volumes: all.volumes
	 //      }
	 //  })
  // },

  // componentDidMount: function() {
  //   MaingraphStore.addChangeListener("change" ,this._onUpdateState);
	 //  if(this.props.attributes.chart){
  //     _mainChart = new MainChart("#" + this.props.attributes.chart);
  //     _mainGraphParams = {
  //         area: true,
  //         candle: false,
  //         volume: false,
  //         sma: false
  //     };
  //    }
  // },
  
  // componentWillUnmount: function() {},

  // {this.props.attributes.chart ? this.props.attributes.chart: ''}
  render: function() {
    console.log("HELLO");
    return (
        <div> Main</div>
    )
  }

});

module.exports = MainChartWidget;