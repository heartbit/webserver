var React = require('react');

var Grid = React.createClass({

    render: function() {
      return (<ul />);
    },

    componentDidMount: function() {
      var gridster = $(this.getDOMNode()).gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [300, 100],
        resize: {
            enabled: false
          },
        draggable: {
            handle: '.panel-heading, .panel-handel'
          }
      }).data('gridster');

      // gridster.disable();

      this.props.items.map(function(item, i) {
   
        var attributes = item.props.attributes;
        // var key = "item" + attributes.key;  
        var key = attributes.key;
        var datatype = attributes.datatype;

        gridster.add_widget(
            ('<li class="item" id={key} datatype={datatype}>  </li>'.replace('{key}', key)).replace('{datatype}',datatype), 
            attributes.width,
            attributes.height,
            attributes.col,
            attributes.row
          );

        // console.log("GRIDSTERRRRRR",$('.gridster >ul'));
        React.render(item, document.getElementById(key));

      });

      // this.setState({gridster: gridster});

    }
});

module.exports = Grid;