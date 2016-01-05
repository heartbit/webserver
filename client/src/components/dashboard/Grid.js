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
  	
  },
  componentDidMount: function() {
    var self=this;
    var options = {
      width:12,
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