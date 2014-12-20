var React = require('react');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');

var GridElements = React.createClass({

    render: function() {
      return (<ul />);
    },

    componentDidMount: function() {
      var self=this;
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


      var renderWidget = function() {
        var mapping = 
          self.props.items.map(function(item, i) {
       
            var attributes = item.props.attributes; 
            var key = attributes.key;
            var datatype = attributes.datatype;

            gridster.add_widget(
                ('<li class="item" id={key} datatype={datatype}>  </li>'.replace('{key}', key)).replace('{datatype}',datatype), 
                attributes.width,
                attributes.height,
                attributes.col,
                attributes.row
              );

            React.render(item, document.getElementById(key));

          });

          var res = $.when.apply(null,mapping);

          return res;
      }

      renderWidget().then(function() {
        DashboardActions.registerCurrentRef(gridster);
      });

    }
});

module.exports = GridElements;