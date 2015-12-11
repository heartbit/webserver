var React = require('react/addons');
var BaseWidget = require('./BaseWidget');

var MaingraphStore = require('MaingraphStore');
var MovingAverageStore = require('MovingAverageStore');
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
	},

    _onMaUpdate: function() {
    	var sma = MovingAverageStore.getAll();
    	var maingraphes = this.state.maingraphes;
    	var _mainGraphParams = this.state._mainGraphParams;
    	_mainGraphParams['smaLayer'] = true;
    	this.setState({
    		indicators: {
    			sma: sma
    		},
    		maingraphes: maingraphes,
    		_mainGraphParams: _mainGraphParams
    	});
    },

    componentDidMount: function() {
    	var self = this;
      	MaingraphStore.addChangeListener("change" ,this._onUpdateState);
      	MovingAverageStore.addChangeListener("change", this._onMaUpdate);
      	this.resizeAll();
    },
    componentWillUnmount: function() {},

	render: function() {
		var data = this.state.maingraphes;
		var indicators = this.state.indicators;
		var params = this.state._mainGraphParams;

		if(_mainChart) _mainChart.draw(data ,params, indicators);
		return (<BaseWidget attributes={this.props.attributes}></BaseWidget>)
	},

	resizeAll: function() {
    	var self = this;
    	var data = this.state.maingraphes;
		var indicators = this.state.indicators;
		var params = this.state._mainGraphParams;
    	var rs = function() { 
    		_mainChart.resize();  
    	};
    	var waitrs;	
    	window.onresize = function() {
    		clearTimeout(waitrs);
    		waitrs = setTimeout(rs, 100);
    	}
	}

});

module.exports = MainChartWidget;