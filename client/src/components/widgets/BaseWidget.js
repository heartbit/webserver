var React = require('react/addons');
// Attributes: Title, close, minimize
var BaseWidget = React.createClass({

	// componentDidMount: function() {

	// },
	getInitialState: function() {
    	return {}
	},
	render: function() {
	          // <a href="#">
	          //   <i className="fa fa-minus"></i>
	          //   </a>
	          //   <a href="#">
	          //   <i className="fa fa-times"></i>
	          //   </a>
		return (
	      <div className="panel panel-default grid-stack-item-content">
	        <div className="panel-heading clearfix">
	          <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
	            <i className={this.props.attributes.icon}></i>
	            <span className="panel-title-text">{this.props.attributes.title}</span>
	          </div>
	          <div className="panel-title pull-right">
	          </div>
	        </div>
	        <div className="panel-body" id={this.props.attributes.chart}>
		        {this.props.children}
        	</div>
	      </div>
	      );
	}
});

module.exports = BaseWidget;