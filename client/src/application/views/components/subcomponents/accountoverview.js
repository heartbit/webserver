var React = require('react');
var AccountActions = require('AccountActions');
var RippleaccountoverviewsStore = require('RippleaccountoverviewsStore');
var GridStore = require('GridStore');
var piechart = require('pie_accountoverview');
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
var DropDown = require('DropDown');



function getRippleAccountState(key) {
  var rippleaccount = RippleaccountoverviewsStore.getSpecific(key);

  return {
    id: new Date().getTime(),
    rippleaccount:rippleaccount
  }

}

var AccountOverview = React.createClass({

	getInitialState: function() {
		// var ripplelines = {};
		// var rippleinfos = {};
  //   var rippleexchangerates = {};

		// return { rippleinfos:rippleinfos, ripplelines:ripplelines, rippleexchangerates:rippleexchangerates };
    var datasets = {};
    return { datasets:datasets };
	},
	componentDidMount: function() {
    var key =  this.props.attributes.blocknum;
    var address = "address"+key;
    // Listener
    RippleaccountoverviewsStore.addChangeListener(address, this._onChangeRippleaccount);

     
  },

  componentWillUnmount: function() {
    RippleaccountoverviewsStore.removeChangeListener(this._onChangeRippleaccount);
  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.blocknum;
    piechart.remove(this.props.attributes.key);

    if( this.state.datasets["address" + this.props.attributes.blocknum] != undefined) {
      console.log('uuh');
      piechart.draw(this.props.attributes.key, "address" + this.props.attributes.blocknum, this.state.datasets["address" + this.props.attributes.blocknum]);
    }

    if(this.props.currencylist) {
      var optlist = _.map(this.props.currencylist, function(currency) { 
        return <option value={[currency.currency, currency.issuer]}> {currency.currency} {currency.name} </option> 
      });
    } else {
      var optlist = undefined;      
    }
    // console.log('STAAAAAATE',this.state, 'PROPS',this.props);
  	this.divId= "Overview" +this.props.attributes.key;
    
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
          <div id={this.divId ? this.divId: ''}></div>
          <div id={"OverviewTotal" + this.props.attributes.key}> 
            { this.props.currencylist ? <div>Total value in &nbsp;</div> : ""}
            <select className='fiatselector' onChange={this.onSelectCurrency} value={this.props.selectedcurrency}>
              { optlist }
            </select>
            { this.props.currencylist ? <div className="totalfiat"> { this.state.totalfiat.amount } </div> : ""}
            { this.props.currencylist ? <div className="gatewayname"> { this.state.totalfiat.name } </div> : "" }
            { this.props.currencylist ? <div className="issuer"> { this.state.totalfiat.issuer } </div> : "" }
          </div>
        </div>
      </div>
      );

  },

  _onChangeRippleaccount: function() {
      var key = this.props.attributes.blocknum;
      console.log('GETSPECIFIC', RippleaccountoverviewsStore.getSpecific('address'+key));
      var datasets = RippleaccountoverviewsStore.getDatasets();
      var address = RippleaccountoverviewsStore.getSpecific('address' + key);
      var amount = address['address'+key]['totalfiat']['XRP'].totalfiat;
      var issuer = address['address'+key]['totalfiat']['XRP'].issuer;
      amount = FormatUtils.truncToNdecimal(amount,2);
      this.props.selectedcurrency = ["XRP",undefined];
      this.props.currencylist = address['address'+key].currencylist;
      
      this.setState(
        { totalfiat: 
          {
            amount:amount,
            issuer:issuer
          },
          datasets: datasets
        });
      console.log(this.state,"STAAATE");
      console.log(this.state.datasets["address" + this.props.attributes.blocknum]);
  },

  onSelectCurrency: function(e) {

    var currency = ($(e.target).val()).split(",");
    var key = this.props.attributes.blocknum;

    var address = RippleaccountoverviewsStore.getSpecific('address' + key);
    var amount = address['address'+key]['totalfiat'][currency[0]].totalfiat;
    var issuer = address['address'+key]['totalfiat'][currency[0]].issuer;

    if(currency[0] == "XRP") {
      amount = FormatUtils.truncToNdecimal(amount,2);
      this.props.selectedcurrency = [currency[0],undefined];
    } else {
      amount=FormatUtils.formatPrice(amount,currency[0]);
      this.props.selectedcurrency = [currency[0],currency[1]];
    }

    this.setState(
      { totalfiat: 
        { amount:amount,
          issuer:issuer
        }
      });
    
  }


});


module.exports = AccountOverview;