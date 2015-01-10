var React = require('react');
var ChartEngine = require('ChartEngine');
var RippleidStore = require('RippleidStore');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var RippleexchangeratesStore = require('RippleexchangeratesStore');
var GridStore = require('GridStore');
var Loading = require('Loading');
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
// React-bootstrap
var Accordion = require('react-bootstrap').Accordion;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Panel = require('react-bootstrap').Panel;


function isLoading(key) {

  var loadstate=RippleidStore.isLoading(key);
  return {
    rippleids:loadstate
  }
}

function getRippleidState(key) {

    var rippleid=RippleidStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleids:rippleid
    }
}

function getRipplelinesState(key) {

    var ripplelines=RipplelinesStore.getSpecific(key);
    console.log(ripplelines);
    return {
      id:new Date().getTime(),
      ripplelines:ripplelines
    }
}

function getRippleinfosState(key) {
    var rippleinfos=RippleinfosStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleinfos:rippleinfos
    }
}

var RippleAccount = React.createClass({

    getInitialState: function() {
      rippleids={};
      rippleinfos={};
      ripplelines={};

      return { rippleids:rippleids, rippleinfos:rippleinfos, ripplelines:ripplelines };
 
    },

    componentWillMount: function() {

    },
    
    componentDidMount: function() {
      var key =  this.props.attributes.blocknum;
      var address = "address"+key;
      //Listener --> Loading
      RippleidStore.addLoadListener(this._onLoadRippleid);
      // Listener --> Store loaded
      RippleidStore.addChangeListener(address,this._onChangeRippleid);
      RipplelinesStore.addChangeListener(address,this._onChangeRipplelines);
      RippleinfosStore.addChangeListener(address,this._onChangeRippleinfos);
      // Register
      // Loading.gif(this.props.attributes.key,this.state.loading);
      
    },
    
    componentWillUnmount: function() {
      RippleidStore.removeChangeListener(this._onChangeRippleid);
      RipplelinesStore.removeChangeListener(this._onChangeRipplelines);
      RippleinfosStore.removeChangeListener(this._onChangeRippleinfos);
    },

    render: function() {
      self=this;
      this.address= "address" + this.props.attributes.blocknum;
      this.chartId= this.props.attributes.key +"_"+ this.props.attributes.chart;

      if(this.state.rippleids[this.address]) {
        Loading.gif(this.props.attributes.key,this.state.rippleids[this.address].loading);
      }
      var panelstyle = { height:250+'px'};
      var linestyle = { 'margin-bottom': 5 +'px'};
      //format results to display
     



      return (
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
              <i className={this.props.attributes.icon}></i>
              <span className="panel-title-text">
                {this.props.attributes.title}: &nbsp;
                  {this.state.rippleids[this.address] && this.state.rippleids[this.address].address!=undefined  ? this.state.rippleids[this.address].address : ""} &nbsp; 
                  {this.state.rippleids[this.address] && this.state.rippleids[this.address].username!=undefined ? "~"+this.state.rippleids[this.address].username : ""}         
              </span>
            </div>
            <div className="panel-title pull-right">
              <a href="#"> <i className="fa fa-minus"></i> </a>
              <a href="#"> <i className="fa fa-plus"></i> </a>
              <a href="#"> <i className="fa fa-times"></i> </a>
            </div>
          </div>
          <div className="panel-body" style={panelstyle}>
              {this.state.rippleinfos[this.address] ?
                        <div>XRP Balance: {(this.state.rippleinfos[this.address].account_data.Balance)/Math.pow(10,6)} xrp    
                        </div> 
                      :"Enter a name or an address in the searchbar" }
                  {this.state.ripplelines[this.address] ?
            
                        this.state.ripplelines[this.address].lines.map(function(line,i) {
                          
                            return   <PanelGroup style={linestyle} accordion> 
                                        <Panel header= {line['balance'] + " " + line['currency'] + "  "+ line['name']} eventKey="1">
                                          <div> Account:&nbsp;&nbsp; {line['account']} </div> 
                                          <div> Limit:&nbsp;&nbsp; {line['limit']} </div>
                                          <div> Limit_peer:&nbsp;&nbsp; {line['limit_peer']} </div>
                                          <div> No_ripple:&nbsp;&nbsp; {line['no_ripple']?"true":"false"} </div>
                                          <div> Quality_in:&nbsp;&nbsp; {line['quality_in']} </div>
                                          <div> Quality_out:&nbsp;&nbsp; {line['quality_out']} </div> 
                                        </Panel>                           
                                     </PanelGroup>   ;
                        })             
                  : ""}
            <div id={this.chartId ? this.chartId: ''}>

            </div>
          </div>
        </div>
        ); 
    },

    _onLoadRippleid: function() {
      var key = this.props.attributes.blocknum;
      this.setState(isLoading("address"+key));
    },

    _onChangeRippleid: function() {
      var key = this.props.attributes.blocknum;
      this.setState(getRippleidState("address"+key));
    },
    _onChangeRipplelines: function() {
      var key = this.props.attributes.blocknum;
      var getlines = getRipplelinesState("address"+key);
      if(getlines.ripplelines["address"+key]!=undefined) {
        var toformat = _.map(getlines.ripplelines["address" + this.props.attributes.blocknum].lines,function(line) { 
         var balance = FormatUtils.truncToNdecimal(line['balance'],4);
          var name = _.filter(gatewayNames,function(gateway) {
            return gateway.address == line.account;
          });
          var obj = {
            balance: balance,
            currency:line['currency'],
            account: line['account'],
            limit: line ['limit'],
            limit_peer: line['limit_peer'],
            no_ripple: line['no_ripple'],
            quality_in: line['quality_in'],
            quality_out: line['quality_out']
          };
          if(line.currency == "XRP") {
            obj['name']=undefined;
          } else {
            if(name[0]) {
              obj['name']=name[0].name;
            } else { obj['name']=line['account'];}
          }
          return obj;
        });
      }
      getlines.ripplelines["address"+key].lines = toformat;
      console.log(getlines);
      this.setState(getlines);
    },
    _onChangeRippleinfos: function() {
      var key = this.props.attributes.blocknum;
      this.setState(getRippleinfosState("address"+key));
    }

});

module.exports = RippleAccount;



    // former getinitialestate()
    // // initialize data structure for the first rendering. Not an anti-pattern. Fuck you. 
      // rippleids[this.props.attributes.key] = {
      //   address: "",
      //   blobvault: "",
      //   emailVerified: "",
      //   id:"",
      //   identity_verified:"",
      //   exists: "",
      //   username: "", 
      //   recoverable: "",
      //   profile_verified: "",
      //   reserved: ""
      // };
      // rippleinfos[this.props.attributes.key] = {
      //   account_data: {
      //     Account: "",
      //     Balance: "mescouilles",
      //     Flags: "",
      //     LedgerEntryType: "",
      //     OwnerCount: "",
      //     PreviousTxnID: "",
      //     PreviousTxnLgrSeq: "",
      //     Sequence: "",
      //     index: ""
      //   },
      //   ledger_current_index: "",
      //   validated: ""
      // };
      // ripplelines[this.props.attributes.key] = {
      //    account: "",
      //    ledger_current_index: "",
      //    lines: [{}],
      //    validated: false
      // };