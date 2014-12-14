var React = require('react');
var subcomponentselector = require('SubcomponentSelector');
var Dispatcher = require('Dispatcher');
var Constants = require('Constants');

var removeWidget = {
  
  several: function(items) {

    var gridster = $('.gridster >ul').gridster().data('gridster');

    for (i = items.end; i>items.start; i--) {
      // var unmount = React.unmountComponentAtNode($('#keyfact'+i)); //marche pas ?
      // console.log("UNMOUNT!!",unmount);
  		gridster.remove_widget($('.gridster #'+"keyfact"+i));
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