var React = require('react/addons');
var gridster = require('gridster');
var ChartEngine = require('ChartEngine');

  var TestItem = React.createClass({
    getInitialState: function() {
      return {
        dataset : {
         lines: [ {
      id: "Social",
      name: "Social",
      points: [{
        id: "redirect_disqus_com",
        value: 6000,
        x: "redirect.disqus.com",
        name: "redirect.disqus.com"
      }, {
        id: "facebook_com",
        value: 11000,
        x: "facebook.com",
        name: "facebook.com"
      }, {
        id: "reddit_com",
        value: 6000,
        x: "reddit.com",
        name: "reddit.com",
      }, {
        id: "l_facebook_com",
        value: 4000,
        value: 2,
        x: "l.facebook.com",
        name: "l.facebook.com"
      }]
    },{
      id: "prout",
      name: "Email",
      points: [{
        id: "nl1409",
        value: 30000,
        x: "nl1409",
        name: "nl1409",
        status: 'other'
      }]
    }, {
      id: "Referral",
      name: "Referral",
      points: [{
        id: "duplicateid",
        value: 50000,
        x: "moodle.bucknell.edu",
        name: "moodle.bucknell.edu"
      }, {
        id: "google_de",
        value: 10000,
        x: "google.de",
        name: "google.de",
        status: 'other'
      }, {
        id: "google_fr",
        value: 5000,
        x: "google.fr",
        name: "google.fr"
      }]
    }, {
      id: "Direct",
      name: "Direct",
      points: [{
        id: "duplicateid",
        value: 98000,
        x: "direct traffic",
        name: "direct traffic"
      }]
    }],
        name: "2014/08",
        id: "time:20142308"
      }}
    },
    componentDidMount: function() {
      if(this.props.attributes.chart){
        var chartParams = {
          anchorId: "#" + this.props.attributes.chart,
          chartType: this.props.attributes.chart,
          size: 'auto',
          modeDebug: false
        };

        var chart = ChartEngine.create(chartParams);
        chart.draw(this.state.dataset);
       }
    },
    
    componentWillUnmount: function() {
    },

    render: function() {
      return (
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
              <i className={this.props.attributes.icon}></i>
              <span className="panel-title-text">{this.props.attributes.title}</span>
            </div>
            <div className="panel-title pull-right">
            <a href="#">
              <i className="fa fa-minus"></i>
              </a>
              <a href="#">
              <i className="fa fa-plus"></i>
              </a>
              <a href="#">
              <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div className="panel-body">
          <div id={this.props.attributes.chart ? this.props.attributes.chart: ''}></div>
          </div>
        </div>
        );
    }
  });

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
        var key = "item" + attributes.key;
        gridster.add_widget(
          '<li class="item" id={key}></li>'.replace('{key}', key), 
          attributes.width,
          attributes.height,
          attributes.col,
          attributes.row
        );
        React.render(item, document.getElementById(key));
      });
      this.setState({gridster: gridster});
    }
  });

  var Dashboard = React.createClass({
    getInitialState: function() {
      return {
        items: [{
          key: 'keyfact1',
          title:'Keyfact 1',
          icon:'fa fa-bar-chart',
          width: 1,
          height: 1,
          col: 1,
          row: 1
        },
        {
          key: 'keyfact2',
          title:'Keyfact 2',
          icon:'fa fa-bar-chart',
          width: 1,
          height: 1,
          col: 2,
          row: 1
        },
        {
          key: 'keyfact3',
          title:'Keyfact 3',
          icon:'fa fa-bar-chart',
          width: 1,
          height: 1,
          col: 3,
          row: 1
        },
        {
          key: 'timeline',
          title: 'Timeline',
          icon:'fa fa-line-chart',
          width: 2,
          height: 2,
          chart: 'MarimekkoChart',
          col: 1,
          row: 2
        },
        {
          key: 'orderbook',
          title: 'Orderbook',
          icon:'fa fa-list',
          width: 1,
          height: 3,
          col: 3,
          row: 2
        },
        {
          key: 'depth',
          title: 'Depth',
          icon:'fa fa-area-chart',
          width: 2,
          height: 1,
          col: 1,
          row: 4
        },
        {
          key: 'volume',
          title: 'Volume',
          icon:'fa fa-pie-chart',
          chart: 'PieChart',
          width: 1,
          height: 2,
          col: 1,
          row: 6
        },
        {
          key: 'other',
          title: 'Other',
          icon:'fa fa-bar-chart',
          width: 1,
          height: 1,
          col: 1,
          row: 8
        },
        {
          key: 'news',
          title: 'News',
          icon:'fa fa-newspaper-o',
          width: 2,
          height: 3,
          col: 2,
          row: 5
        }]
      };
    },
    render: function() {
      var items = this.state.items.map(function(item) {
        return (<TestItem attributes={item}>{item.key}</TestItem>);
      });
      return (
        <div className="gridster">
          <Grid items={items} />
        </div>
      );
    }
  });

module.exports = Dashboard;