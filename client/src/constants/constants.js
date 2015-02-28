var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    ASK_RIPPLEID: null,
    ASK_RIPPLELINES: null,
    ASK_RIPPLEINFOS: null,
    ASK_RIPPLEEXCHANGERATES:null,
    ASK_RIPPLEACCOUNTOVERVIEW:null,
    REGISTER_CURRENTREFGRID: null,
    REGISTER_CURRENTGRID: null,
    ADD_WIDGET: null,
    REMOVE_WIDGET: null,
    LOADING_GIF: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};