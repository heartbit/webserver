var React = require('react/addons');
var BaseWidget = require('./BaseWidget');

var MaingraphStore = require('MaingraphStore');
var MainChart = require('MainChartD3');
var _mainChart,_mainGraphParams;

var MainChartWidget = React.createClass({
	getInitialState: function() {
    	return {}
	},
  _onUpdateState: function() {
	  
	  if(this.props.attributes.chart && !_mainChart){
	       _mainChart = new MainChart("#" + this.props.attributes.chart);
	       _mainGraphParams = {
	           area: true,
	           candle: false,
	           volume: false,
	           sma: false
	       };
	   }
	   var all = MaingraphStore.getAll();
	   this.setState({
		   maingraphes:{
	         candles: all.candles,
	         volumes: all.volumes
	       }
	   });
	   console.log("update Mainchartwidget")
       _mainChart.draw(this.state.maingraphes,_mainGraphParams);
   },

   componentDidMount: function() {
     MaingraphStore.addChangeListener("change" ,this._onUpdateState);
   },
   componentWillUnmount: function() {},

  render: function() {
 	return (<BaseWidget attributes={this.props.attributes}></BaseWidget>)
  }

});

module.exports = MainChartWidget;