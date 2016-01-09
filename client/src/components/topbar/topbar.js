var React = require('react');

/** @jsx React.DOM */
var Topbar = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default topbar">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a id="bar_brand"className="navbar-brand" href="/"> Home </a>
        </div>
        <div className="container-fluid ">
           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li> <a href="/app" id="realtime"> Real Time </a> </li>
                <li> <a href="/marketmakers" id="marketmakers"> Market Makers </a> </li>
                <li className="dropdown">
                  <a id="ledgermonitor" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Ledgermonitor <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li>
                      <a id="ledgermonitor_account" href="http://ledgermonitor.heartbit.io/app"> Account Analytics </a>
                    </li>
                    <li>
                      <a id="ledgermonitor_transaction" href="http://ledgermonitor.heartbit.io/transaction"> Transaction Viewer </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    )
  }
});
module.exports = Topbar;
     // <div className="container-fluid expanded-panel topbar">
     //    <div className="row">
     //      <div id="logo" className="col-xs-12 col-sm-2">
     //        <a href="/">Real Time</a>
     //      </div>
     //      <div id="ledgermonitor">
     //        <a href="ledgermonitor.heartbit.io"> Ledgermonitor </a>
     //      </div>
     //    </div>
     //  </div>