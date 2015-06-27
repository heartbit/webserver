var React = require('react');
var Dispatcher = require("Dispatcher");
var Constants = require('Constants');
var subcomponentselector = require('SubcomponentSelector');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');
// var DashboardActions = require('DashboardActions');

var addWidget = {
  
  several: function(items,blocknum) {
    var self=this;
  	var subcomponents = subcomponentselector.selector(items);

    var gridster = $('.gridster >ul').gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [300, 100],
        resize: {
            enabled: false
          },
        draggable: {
            handle: '.panel-heading, .panel-handel'
          }
    }).data('gridster');

    // Set new key depending on existing keyfacts
    _.each(items,function(item,i) {  
      var loadeditemsnumber = GridStore.getKeyfactsNumber();
      var keyfactnumber = parseInt(loadeditemsnumber) + parseInt(i) +1;
      item.key = "keyfact" + keyfactnumber; 
      item.blocknum = blocknum;   
      // console.log(blocknum);
    });

    var newReactWidgets = items.map(function(item) {
        if(item.datatype !=undefined) {
          var Element = subcomponents[item.datatype];
        } else {
          var Element = subcomponents["abstractsubcomponent"];
        }
        return (<Element attributes={item}></Element>);
    });



    _.each(newReactWidgets,function(item, i) {
      // console.log(item);
      var loadeditemsnumber = GridStore.getKeyfactsNumber();
      var keyfactnumber = loadeditemsnumber + 1;

      var attributes = item.props.attributes;
      var key = attributes.key;
      attributes.key = "keyfact" + keyfactnumber;
   
  		var datatype = attributes.datatype;
  		attributes.row = 6 +i;
      // console.log("attributes.row", attributes.row);
  		gridster.add_widget.apply(gridster,
  			[(('<li class="item" id={key} datatype={datatype} blocknum={blocknum}>  </li>'.replace('{key}', key)).replace('{datatype}',datatype)).replace('{blocknum}',blocknum), 
  			attributes.width,
  			attributes.height,
  			attributes.col,
  			attributes.row]
  		);

		  React.render(item, document.getElementById(key));
      

    });

  }

};

Dispatcher.register(function(payload) {
  var action = payload.action;
  var result;
  switch(action.actionType) {
    case Constants.ActionTypes.ADD_WIDGET:   
    addWidget.several(action.result.items,action.result.blocknum);   
    break;
  }
});

module.exports = addWidget;