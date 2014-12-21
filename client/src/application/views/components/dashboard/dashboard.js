var React = require('react/addons');
var gridster = require('gridster');
var config = require('config');
var subcomponentselector = require('SubcomponentSelector');
var GridElements= require('GridElements');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');

function getDashboardState() {
    // on stock dans les props car on ne veut pas  rerender la vue. La vue doit être rerender uniquement 
    // lorsqu'on change de configuration global ( this.state.conf[original] ==> this.state.conf[perso])
    // var dashboard_conf=DashboardStore.getAll();
    // return {
    //   id:new Date().getTime(),
    //   dashboard_conf:dashboard_conf
    // }
}

var Dashboard = React.createClass({

  getInitialState: function() {
    // DashboarStore initial config_set (ie: classic, perso, mabite ...)
    return null
  },

  componentDidMount: function() {
    //Listener
    GridStore.addChangeListener(this._onChangeGrid);
    // if(this.props.attributes.chart){
    //   var chartParams = {
    //     anchorId: "#" + this.props.attributes.chart,
    //     chartType: this.props.attributes.chart,
    //     size: 'auto',
    //     modeDebug: false
    //   };

    //   var chart = ChartEngine.create(chartParams);
    //   chart.draw(this.state.dataset);
    // }
  },
  
  componentWillUnmount: function() {
    GridStore.removeChangeListener(this._onChangeGrid);
  },

  render: function() {

    var dashboard_config = this.props.dashboard_config.items;  
    var Items = subcomponentselector.selector(dashboard_config);

    var items = dashboard_config.map(function(item) {
      if(item.datatype) {
        var Element = Items[item.datatype];
        return (<Element attributes={item}></Element>);
      } else {
        var Element = Items['abstractsubcomponent'];
        return (<Element attributes={item}></Element>); 
      }
    });

    return (
      <div className="gridster"  ref="dashboardstate" >
        <GridElements items={items}/>
      </div>
    );

  },

  _onChangeGrid: function() {
    // console.log("from_dashboard:GRIDSTORE has changed");
  }
  
});



module.exports = Dashboard;