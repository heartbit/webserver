var React = require('react/addons');
var gridster = require('gridster');
var BaseWidget = require('BaseWidget');
var gridster;
var Grid = React.createClass({

  render: function() {
    return (<ul/>);
  },
  _generateGridster: function(params){
	  return $(this.getDOMNode()).gridster(params).data('gridster');
  },
  _renderGrid: function(){
	  this.props.widgets.map(function(widget, i) {
	      var attributes = widget.props.attributes;
	      var key = "widget" + attributes.key;
	      gridster.add_widget(
	        '<li class="widget" id={key}></li>'.replace('{key}', key), 
	        attributes.width,
	        attributes.height,
	        attributes.col,
	        attributes.row
	      );
	      React.render(widget, document.getElementById(key));
	    });
  },
  componentDidUpdate: function() {
	//3 columns max per row 
  	//Height never change
  	// Keyfact = 2, Parameter manager = 1, Timeline=3
	

  	this.props.widgets.map(function(widget, i) {
 	      var attributes = widget.props.attributes;
 	      var key = "widget" + attributes.key;
    	  //gridster.resize_widget($("#"+key),attributes.width,attributes.height);
	      React.render(widget, document.getElementById(key));
    	  console.log('resize' + key);
  	});
  	gridster.options.widget_base_dimensions= [this.props.params.width/4, 150];
  	gridster.generate_grid_and_stylesheet(); 
  	gridster.get_widgets_from_DOM(); 
  	gridster.set_dom_grid_height(); 
  	gridster.set_dom_grid_width();
  	
  },
  componentDidMount: function() {
	  var w = (this.props.params.width/4);
	  var params= {
		      widget_margins: [10,10],
		      widget_base_dimensions: [w, 150],
		      resize: {
		          enabled: false
   	        },
		      draggable: {
		          handle: '.panel-heading, .panel-handel'
		        }
		    }
    gridster = this._generateGridster(params);
    this._renderGrid();
  }
});


module.exports = Grid;