var React = require('react/addons');
var gridster = require('gridster');
var BaseWidget = require('BaseWidget');

var Grid = React.createClass({

  render: function() {
    return (<ul/>);
  },

  componentDidMount: function() {
    var gridster = $(this.getDOMNode()).gridster({
      widget_margins: [10, 10],
      widget_base_dimensions: [350, 150],
      resize: {
          enabled: false
        },
      draggable: {
          handle: '.panel-heading, .panel-handel'
        }
    }).data('gridster');
    // gridster.disable();

    this.props.widgets.map(function(widget, i) {
      console.log(widget);
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
    this.setState({gridster: gridster});
  }
});


module.exports = Grid;