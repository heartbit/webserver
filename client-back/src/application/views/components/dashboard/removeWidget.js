var React = require('react');
var subcomponentselector = require('SubcomponentSelector');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');

var removeWidget = {
  
  several: function(items) {

    var gridster = $('.gridster >ul').gridster().data('gridster');

    var remove = function(i) {
        // var grid = gridster.remove_widget($('.gridster #'+"keyfact"+i));
        var grid = gridster.remove_widget($('.gridster[data-row='+i+']'));
        var res = $.when(null,grid);

        return res;

    };
   
    for (i = items.end; i>items.start; i--) {
      // gridster.remove_widget($('.gridster[data-row='+i+']'))
      // console.log($('.gridster li').eq(todelete));
      gridster.remove_widget($('.gridster #'+"keyfact"+i));

      // gridster = $('.gridster >ul').gridster().data('gridster');
      // remove(i).then(function() {
      //   remove(i);
      // });
    };

  }

};


Dispatcher.register(function(payload) {
  var action = payload.action;
  var result;
  switch(action.actionType) {
    case Constants.ActionTypes.REMOVE_WIDGET:   
    removeWidget.several(action.result.items);   
    break;
  }
});

module.exports = removeWidget;