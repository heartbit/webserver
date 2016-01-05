var React = require('react');

/** @jsx React.DOM */
var Topbar = React.createClass({
  render: function(){
    return (
      <div className="container-fluid expanded-panel topbar">
        <div className="row">
          <div id="logo" className="col-xs-12 col-sm-2">
            <a href="/">Real Time</a>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = Topbar;
  