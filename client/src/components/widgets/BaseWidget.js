var React = require('react/addons');
var MainChartWidget = require('./MainChartWidget')
// Attributes: Title, close, minimize
var BaseWidget = React.createClass({

	// componentDidMount: function() {

	// },
	getInitialState: function() {
    	return {}
	},
	render: function() {
		
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
	            <i className="fa fa-times"></i>
	            </a>
	          </div>
	        </div>
	        <div className="panel-body widget-content">
		        {<this.props.attributes.component/>}
        	</div>
	      </div>
	      );
	}
});

module.exports = BaseWidget;