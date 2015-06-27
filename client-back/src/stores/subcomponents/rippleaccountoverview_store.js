var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var RippleidStore = require('RippleidStore');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var RippleexchangeratesStore = require('RippleexchangeratesStore');

var CHANGE_EVENT = 'change';
var _RippleAccountOverviews = {};
var datasets = {};
var shares;
var defaultCurrency;
var gatewayNames = require('gatewayNames');

function registerAccountOverviews(result) {
	_RippleAccountOverviews = result;
}

function createStoreObject(datasets) {
	var result = {};
	_.each(datasets, function(dataset) {
		result[dataset.id] = {};
 		result[dataset.id]['shares'] = calculateShares(dataset.id, dataset);
 		result[dataset.id]['currencylist'] = getCurrencyList(result[dataset.id]['shares']);
 		result[dataset.id]['totalfiat'] = {};
 		_.each(result[dataset.id]['currencylist'], function(currency) {
 			result[dataset.id]['totalfiat'][currency.currency] = calculateFiatTotal(result[dataset.id]['shares'], currency.currency, currency.issuer);
 		});
		// console.log("SHARESSSS",dataset);
	})

 //      this.props.currencylist = getCurrencyList(shares);
 	return result;
}

function initDatasets(ids) {
	
	var ids = ids;
	_.each(ids, function(id) {
		datasets[id.id] = {
			ripplelines : {},
			rippleinfos : {},
    		rippleexchangerates : {},
    		id: id.id
		};
	});
	defaultCurrency='XRP';
}

function registerRippleLines(lines) {
	var lines = lines;
	_.each(lines, function(line) {
		datasets[line.id]['ripplelines'] = line;
	});
}

function registerRippleInfos(infos) {
	var infos = infos;
	_.each(infos, function(info) {
		datasets[info.id]['rippleinfos'] = info;
	});
}

function registerRippleExchangerates(rates) {
	var rates = rates;
	_.each(rates, function(rate) {
		datasets[rate.id]['rippleexchangerates']= rate;
	});
}


function calculateShares(toresolve,dataset) {
  var data = [];
  // console.log('ripinfos',dataset.rippleinfos);
  _.map(dataset.ripplelines.lines,function(line) {
  	// console.log("line!",line);
    if( line.balance > 0 ) {
      var balance = { balance:parseFloat(line.balance), currency:line.currency, xrpequ:"" , issuer:line.account };
      // Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
       _.each(dataset.rippleexchangerates, function(account) {
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
    balance:parseFloat((dataset.rippleinfos.account_data.Balance)*Math.pow(10,-6)), 
    currency:"XRP",
    xrpequ:parseFloat((dataset.rippleinfos.account_data.Balance)*Math.pow(10,-6))
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

  // console.log("SHARES!!!",shares);
  _.each(shares,function(share) {
    if(share.currency==fiat && share.issuer==issuer) {
      // console.log("share",share,"issuer",issuer);
      rate = share.xrpequ/share.balance;
      result.issuer = share.issuer;  
      // console.log("RATE",rate);
    }
  });
  _.each(shares, function(share) {
    result.totalfiat += share.xrpequ/rate;
  });
  console.log("shares",shares,'fiat',fiat,'issuer',issuer);
  // console.log("resultFIATTOTAAAAL",result);
  return result;
}


var RippleaccountoverviewsStore = assign( {}, EventEmitter.prototype, {
	getAll: function() {
		return _RippleAccountOverviews;
		// return datasets;
	},

	getDatasets: function() {
		return datasets;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleAccountOverviews[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}


});


RippleaccountoverviewsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var self=this;
	var action = payload.action;
	var result;
	
	switch(action.actionType) {
		// case Constants.ActionTypes.ASK_RIPPLEACCOUNTOVERVIEW:

		case Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES:
			Dispatcher.waitFor([
				// RippleinfosStore.dispatcherIndex
			]);
			// console.log("overviewstore",payload);
			// console.log("je veux les chaussures!!");

			initDatasets(RippleidStore.getAll());
			registerRippleInfos(RippleinfosStore.getAll());
			registerRippleLines(RipplelinesStore.getAll());
			registerRippleExchangerates(RippleexchangeratesStore.getAll());
			console.log('infos',RippleinfosStore.getAll(),'line',RipplelinesStore.getAll(),'xchangerate',RippleexchangeratesStore.getAll());
			console.log('datasets!!!',datasets);
			var tosave = createStoreObject(datasets);
			console.log("tosave",tosave);
			// console.log(RippleinfosStore.getAll(), RipplelinesStore.getAll());
			registerAccountOverviews(tosave);
			RippleaccountoverviewsStore.emitChange(action.result);
			console.log('ACTION_ACCOUNTSTORE',action.result);
				
			break;
	}

	return true;
});

module.exports = RippleaccountoverviewsStore;
