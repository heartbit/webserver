var React = require('react');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var RippleexchangeratesStore = require('RippleexchangeratesStore');
var GridStore = require('GridStore');
var piechart = require('pie_accountoverview');
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
var DropDown = require('DropDown');


function calculateShares(toresolve,datasets) {
  var data = [];

  _.map(datasets.ripplelines[toresolve].lines,function(line) {
    if( line.balance > 0 ) {
      var balance = { balance:parseFloat(line.balance), currency:line.currency, xrpequ:"" , issuer:line.account };
      // Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
       _.each(datasets.rippleexchangerates[toresolve], function(account) {
        if(_.isObject(account)) {
          if( line.currency == account.base.currency && line.account == account.base.issuer ) {
            var xrpequivalent = line.balance*account.last;          
            balance.xrpequ = xrpequivalent; 
          }
        };
      });        
      data.push(balance);
    } 
  });
  //Add XRP
  var xrpbalance ={ 
    balance:parseFloat((datasets.rippleinfos[toresolve].account_data.Balance)*Math.pow(10,-6)), 
    currency:"XRP",
    xrpequ:parseFloat((datasets.rippleinfos[toresolve].account_data.Balance)*Math.pow(10,-6))
  };

  data.push(xrpbalance);

  data.sort(function(a,b) {
    if (a.currency < b.currency) 
      return -1;
    if(a.currency > b.currency)
      return 1;
    return 0
  });

  return data;
}

function calculateFiatTotal(shares,fiat,issuer) {
  var result = {};
  result.totalfiat = 0;
  var rate; 
  // console.log(shares);
  // Cas si uniquement des XRP comme balance
  if (fiat== "XRP" ) {
    var xrpshare = _.filter(shares, function(share) {
      return share.currency == "XRP";
    });

    result.totalfiat = xrpshare[0].balance;
    result.issuer = "";

    return result ;
  }

  console.log("SHARES!!!",shares);
  _.each(shares,function(share) {
    if(share.currency==fiat && share.issuer==issuer) {
      console.log("share",share,"issuer",issuer);
      rate = share.xrpequ/share.balance;
      result.issuer = share.issuer;  
      console.log("RATE",rate);
    }
  });
  _.each(shares, function(share) {
    result.totalfiat += share.xrpequ/rate;
  });

  return result;
}

function getCurrencyList(shares) {

  var list = _.map(shares, function(share) {
    var name = _.filter(gatewayNames,function(gateway) {
        return gateway.address == share.issuer;
    });
    if (share.currency == 'XRP') {
      el = { currency:share.currency, issuer:undefined, name:undefined };
    } else {
      el = { currency:share.currency, issuer:share.issuer, name:name[0].name };
    }
    return el;
  });

  return list;
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

function getRippleexchangeratesState(key) {
    var rippleexchangerates = RippleexchangeratesStore.getSpecific(key);

    return {
      id: new Date().getTime(),
      rippleexchangerates:rippleexchangerates
    }
}

var AccountOverview = React.createClass({

	getInitialState: function() {
		var ripplelines = {};
		var rippleinfos = {};
    var rippleexchangerates = {};

		return { rippleinfos:rippleinfos, ripplelines:ripplelines, rippleexchangerates:rippleexchangerates };

	},
	componentDidMount: function() {
    var key =  this.props.attributes.blocknum;
    var address = "address"+key;
    // Listener
		RipplelinesStore.addChangeListener(address,this._onChangeRipplelines);
		RippleinfosStore.addChangeListener(address,this._onChangeRippleinfos);
    RippleexchangeratesStore.addChangeListener(address,this._onChangeRippleexchangerates);
     
  },

  componentWillUnmount: function() {
    RipplelinesStore.removeChangeListener(this._onChangeRipplelines);
    RippleinfosStore.removeChangeListener(this._onChangeRippleinfos);
    RippleexchangeratesStore.removeChangeListener(this._onChangeRippleexchangerates);

  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.blocknum;
    piechart.remove(this.props.attributes.key);

    if( this.state.rippleinfos[toresolve]!=undefined &&this.state.ripplelines[toresolve]!=undefined &&this.state.rippleexchangerates[toresolve]!=undefined) {
      piechart.draw(this.props.attributes.key, "address" + this.props.attributes.blocknum, this.state);
    };

    if(this.props.currencylist) {
      var optlist = _.map(this.props.currencylist, function(currency) { 
        return <option value={[currency.currency, currency.issuer]}> {currency.currency} {currency.name} </option> 
      });
    } else {
      var optlist = undefined;      
    }
  
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

  shouldComponentUpdate: function(nextProps, nextState) {
    var key = this.props.attributes.blocknum;
    return (this.props.ripplelines=="ready" && this.props.rippleinfos=="ready" && this.props.rippleexchangerates=="ready"); 
  },
  _onChangeRipplelines: function() {
    var key = this.props.attributes.blocknum;
    this.props.ripplelines = "ready";
    this.setState(getRipplelinesState("address"+key));
  },
  _onChangeRippleinfos: function() {
    var key =  this.props.attributes.blocknum;
    this.props.rippleinfos = "ready";
    this.setState(getRippleinfosState("address"+key));
  },
  _onChangeRippleexchangerates: function() {
    var key =  this.props.attributes.blocknum;
    this.props.rippleexchangerates = "ready";
    this.setState(getRippleexchangeratesState("address"+key));
    var toresolve = "address" + this.props.attributes.blocknum;

    // calculate piechartshares& init totalfiat state to USD
    if( this.state.rippleinfos[toresolve]!=undefined &&this.state.ripplelines[toresolve]!=undefined &&this.state.rippleexchangerates[toresolve]!=undefined) {  
      
      var shares=calculateShares("address" + this.props.attributes.blocknum, this.state);
      this.props.currencylist = getCurrencyList(shares);
 
      var totalfiat = calculateFiatTotal(shares,'XRP');;
      var issuer = totalfiat.issuer;
      var amount = FormatUtils.truncToNdecimal(totalfiat.totalfiat,2);
      this.props.selectedcurrency = ["XRP",undefined];

      this.setState(
        { totalfiat: 
          { amount:amount,
            issuer:issuer
          }
        });
    };

  },

  onSelectCurrency: function(e) {

    var currency = ($(e.target).val()).split(",");
    var shares=calculateShares("address" + this.props.attributes.blocknum, this.state);
    this.props.currencylist = getCurrencyList(shares);
    console.log("e.VAl",currency);
    if(currency[0] == "XRP") {
      var totalfiat = calculateFiatTotal(shares,'XRP');
      var issuer = totalfiat.issuer;
      var amount = FormatUtils.truncToNdecimal(totalfiat.totalfiat,2);
      this.props.selectedcurrency = [currency[0],undefined];
    } else {
      var totalfiat = calculateFiatTotal(shares,currency[0],currency[1]);
      var issuer = totalfiat.issuer;
      this.props.selectedcurrency = [currency[0],currency[1]];
      // var name = _.filter(gatewayNames,function(gateway) {
      //   return gateway.address == issuer;
      // });
      var amount=FormatUtils.formatPrice(totalfiat.totalfiat,currency[0]);
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