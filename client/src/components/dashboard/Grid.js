var React = require('react/addons');
// var gridster = require('gridster');
var gridstack = require('gridstack');
var BaseWidget = require('BaseWidget');
// var gridster;
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
	      gridstack.add_widget(
	        '<div class="grid-stack-item widget" id={key}></div>'.replace('{key}', key), 
	        attributes.col,
	        attributes.row,
          attributes.width,
          attributes.height
	      );
	      React.render(widget, document.getElementById(key));
	  });

	},
  componentDidUpdate: function() {
	//3 columns max per row 
  	//Height never changes
  	// Keyfact = 2, Parameter manager = 1, Timeline=3
	// var self = this;

 //  	this.props.widgets.map(function(widget, i) {
 // 	      var attributes = widget.props.attributes;
 // 	      var key = "widget" + attributes.key;
 //    	  // gridster.resize_widget($("#"+key),attributes.width,attributes.height);
	//       React.render(widget, document.getElementById(key));
 //  	});
 //  	var ratio = this.props.params.width*0.025;
 //  	// gridster.options.widget_base_dimensions= [this.props.params.width/3, 150];
 //  	gridster.resize_widget_dimensions({
 //    	widget_base_dimensions: [self.props.params.width/3-20, 150],
 //  	});
 //  	gridster.generate_grid_and_stylesheet(); 
 //  	gridster.get_widgets_from_DOM(); 
 //  	gridster.set_dom_grid_height(); 
 //  	gridster.set_dom_grid_width();
  	
  },
  componentDidMount: function() {
    var self=this;
    var options = {
      width:12,
      // always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      // resizable: {
      //     handles: 'e, se, s, sw, w'
      // },
      // vertical_margin: 10,
      cell_height:125,
      static_grid: true
    };
    var gridstack = $('.grid-stack').gridstack(options).data('gridstack');
    var renderGrid = function() {
      self.props.widgets.map(function(widget, i) {
        var attributes = widget.props.attributes;
        var key = "widget" + attributes.key;
        gridstack.add_widget(
            '<div class="grid-stack-item widget" id={key}></div>'.replace('{key}', key), 
            attributes.col,
            attributes.row,
            attributes.width,
            attributes.height
        );
        React.render(widget, document.getElementById(key));
      });
    }

    renderGrid();
  }
});


module.exports = Grid;