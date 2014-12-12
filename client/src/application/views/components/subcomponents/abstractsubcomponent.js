var React = require('react');
var ChartEngine = require('ChartEngine');
var AbstractSubcomponent = React.createClass({
    getInitialState: function() {
      return {
        dataset : {
          lines: [{}]
        }
      }
    },
    componentDidMount: function() {
          
      // if(this.props.attributes.chart){
      //   var chartParams = {
      //     anchorId: "#" + this.divId,
      //     chartType: this.props.attributes.chart,
      //     size: 'auto',
      //     modeDebug: false
      //   };

      //   var chart = ChartEngine.create(chartParams);
      //   chart.draw(this.state.dataset);
      //  }
    },
    
    componentWillUnmount: function() {
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
    }
});

module.exports = AbstractSubcomponent;