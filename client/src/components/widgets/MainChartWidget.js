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
	    	_mainGraphParams = MaingraphStore.getSpecific('params');
	       	_mainChart = new MainChart("#" + this.props.attributes.chart, _mainGraphParams);
	  	}
	   var all = MaingraphStore.getAll();
	   this.setState({
		   maingraphes:{
	         candles: all.candles,
	         volumes: all.volumes
	       },
	       _mainGraphParams: all.params
	   });
	   console.log("mainchartwidgetstate",this.state);
   },

   componentDidMount: function() {
     MaingraphStore.addChangeListener("change" ,this._onUpdateState);
   },
   componentWillUnmount: function() {},

  render: function() {
  	var data = this.state.maingraphes;
  	var params = this.state._mainGraphParams;

    if(_mainChart) _mainChart.draw(data ,params);
 	return (<BaseWidget attributes={this.props.attributes}></BaseWidget>)
  }

});

module.exports = MainChartWidget;