var React = require('react');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var GridStore = require('GridStore');

function getRipplelinesState(key) {
    var ripplelines=RipplelinesStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      ripplelines:ripplelines
    }
}

function getRippleinfosState(key) {
    var rippleinfos=RippleinfosStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleinfos:rippleinfos
    }
}

var AccountOverview = React.createClass({

	getinitialstate: function() {
		rippleaccount = {},
		rippleinfos = {}

		return { rippleinfos:rippleinfos, ripplelines:ripplelines };

	},
	componentDidMount: function() {
    

		if(this.props.attributes.chart){
			var chartParams = {
			  anchorId: "#" + this.divId,
			  chartType: this.props.attributes.chart,
			  size: 'auto',
			  modeDebug: false
			};

			var chart = ChartEngine.create(chartParams);
			chart.draw(this.state.dataset);
		}

		// Listener
		RipplelinesStore.addChangeListener(this._onChangeRipplelines);
		RippleinfosStore.addChangeListener(this._onChangeRippleinfos);
      
    },

    componentWillUnmount: function() {
      RipplelinesStore.removeChangeListener(this._onChangeRipplelines);
      RippleinfosStore.removeChangeListener(this._onChangeRippleinfos);
    },

    render: function() {
    	this.divId= this.props.attributes.title +"_"+ this.props.attributes.chart;
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
          <div id={this.divId ? this.divId: ''}></div>
          </div>
        </div>
        );

    },

    _onChangeRipplelines: function() {
      var key = this.props.attributes.key;
      this.setState(getRipplelinesState(key));
    },
    _onChangeRippleinfos: function() {
      var key = this.props.attributes.key;
      this.setState(getRippleinfosState(key));
    }


});


module.exports = AccountOverview;