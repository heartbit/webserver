var React = require('react');

/** @jsx React.DOM */
var Topbar = React.createClass({
  render: function(){
    return (
      <div className="container-fluid expanded-panel">
        <div className="row">
          <div id="logo" className="col-xs-12 col-sm-2">
            <a href="/">heartbit</a>
          </div>
          <div id="top-panel" className="col-xs-12 col-sm-10">
            <div className="row">
              <div className="col-xs-8 col-sm-4">
              </div>
              <div className="col-xs-4 col-sm-8 top-panel-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = Topbar;
                // <a href="#" className="show-sidebar">
                //   <i className="fa fa-bars"></i>
                // </a>
                // <div id="search">
                //   <input type="text" placeholder="search"/>
                //   <i className="fa fa-search"></i>
                // </div>
                // <ul className="nav navbar-nav pull-right panel-menu">
                //   <li className="hidden-xs">
                //     <a href="#" className="modal-link">
                //       <i className="fa fa-lock"></i>
                //     </a>
                //   </li>
                //   <li className="dropdown">
                //     <a href="#" className="dropdown-toggle account" data-toggle="dropdown">
                //       <div className="avatar">
                //         <img src="./img/avatar.jpg" className="img-rounded" alt="avatar" />
                //       </div>
                //       <i className="fa fa-angle-down pull-right"></i>
                //       <div className="user-mini pull-right">
                //         <span className="welcome">Welcome,</span>
                //         <span>mysterious user</span>
                //       </div>
                //     </a>
                //     <ul className="dropdown-menu">
                //       <li>
                //         <a href="#">
                //           <i className="fa fa-user"></i>
                //           <span>Profile</span>
                //         </a>
                //       </li>
                //       <li>
                //         <a href="#">
                //           <i className="fa fa-cog"></i>
                //           <span>Settings</span>
                //         </a>
                //       </li>
                //       <li>
                //         <a href="#">
                //           <i className="fa fa-power-off"></i>
                //           <span>Logout</span>
                //         </a>
                //       </li>
                //     </ul>
                //   </li>
                // </ul>