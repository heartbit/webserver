var React = require('react');
var ChartEngine = require('ChartEngine');
var RippleidStore = require('RippleidStore');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var GridStore = require('GridStore');

function getRippleidState(key) {
    var rippleid=RippleidStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleids:rippleid
    }
}

function getRipplelinesState(key) {
    var ripplelines=RipplelinesStore.getSpecific(key);
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
      // Listener
      RippleidStore.addChangeListener(this._onChangeRippleid);
      RipplelinesStore.addChangeListener(this._onChangeRipplelines);
      RippleinfosStore.addChangeListener(this._onChangeRippleinfos);

      // Register
      
    },
    
    componentWillUnmount: function() {
      RippleidStore.removeChangeListener(this._onChangeRippleid);
      RipplelinesStore.removeChangeListener(this._onChangeRipplelines);
      RippleinfosStore.removeChangeListener(this._onChangeRippleinfos);
    },

    render: function() {
      // console.log("STATE!",this.props.attributes.key,this.state);
      // console.log("POOOOOOOOOORRRPRPS",this.props.attributes.key);
      // console.log(this.props);
     
      this.prout= "Enter an adress or a name in the searchbar";
      this.chartId= this.props.attributes.key +"_"+ this.props.attributes.chart;
      return (
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
              <i className={this.props.attributes.icon}></i>
              <span className="panel-title-text">
                {this.props.attributes.title}: &nbsp;
                  {this.state.rippleids[this.props.attributes.key]  ? this.state.rippleids[this.props.attributes.key].address : ""} &nbsp; 
                  {this.state.rippleids[this.props.attributes.key]  ? "~"+this.state.rippleids[this.props.attributes.key].username : ""}         
              </span>
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
                  {this.state.rippleinfos[this.props.attributes.key] ?
                        <div>XRP Balance: {(this.state.rippleinfos[this.props.attributes.key].account_data.Balance)/Math.pow(10,6)} xrp    
                        </div> 
                      :"Enter a name or an address in the searchbar" }
                  {this.state.ripplelines[this.props.attributes.key] ?
            
                        this.state.ripplelines[this.props.attributes.key].lines.map(function(line,i) {
                 
                          
                            return  <div>  ------------------------------------------------------------ 
                                      <ul>
                                        <li></li>
                                        <li>Account:&nbsp;&nbsp; {line['account']} </li>  
                                        <li>Balance:&nbsp;&nbsp; {line['balance']} </li> 
                                        <li>Currency:&nbsp;&nbsp; {line['currency']} </li>  
                                        <li>Limit:&nbsp;&nbsp; {line['limit']} </li> 
                                        <li>Limit_peer:&nbsp;&nbsp; {line['limit_peer']} </li> 
                                        <li>No_ripple:&nbsp;&nbsp; {line['no_ripple']?"true":"false"} </li> 
                                        <li>Quality_in:&nbsp;&nbsp; {line['quality_in']} </li> 
                                        <li>Quality_out:&nbsp;&nbsp; {line['quality_out']} </li> 
                                      </ul>
                                    </div>;
                                  
                          // _.map(line, function(element) {
                          //   console.log(element);
                          //   return element;
                          // })
                        })
             
                  : ""}
            <div id={this.chartId ? this.chartId: ''}>

            </div>
          </div>
        </div>
        );
    },

    _onChangeRippleid: function() {
      var key = this.props.attributes.key;
      this.setState(getRippleidState(key));
    },
    _onChangeRipplelines: function() {
      var key = this.props.attributes.key;
      this.setState(getRipplelinesState(key));
    },
    _onChangeRippleinfos: function() {
      var key = this.props.attributes.key;
      this.setState(getRippleinfosState(key));
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