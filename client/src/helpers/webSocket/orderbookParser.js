function orderbookParser() {}

orderbookParser.prototype.filterInit = function(orders, type) {
	var self = this;
	var result = [];
	_.each(orders, function(order) {
		var formatedOrder = self.thinOrder(order, type);
		if(formatedOrder.volume != 0 && formatedOrder.price != 0) {
			result.push(formatedOrder);
		}
	});

	return result;
}
orderbookParser.prototype.parseUpdate = function(order) {
	this.thinOrder(order);
}

orderbookParser.prototype.thinOrder = function(order, type, pair) {
	// Check if order is funded
	// console.log("INIT ORDER",order);
	if(order.taker_gets_funded) {
		var TakerGetsValue = takerValue_funded(order.taker_gets_funded, order.TakerGets);
	} else {
		var TakerGetsValue = takerValue(order.TakerGets);
	}
	// if(order.taker_pays_funded) {
	// 	var TakerPaysValue = takerValue(order.taker_pays_funded, order.TakerPays);
	// } else {
		// if(!order.TakerPays || order.TakerPays == 0) {
		// 	console.log("dpoazkpoadkpoazd", order);
		// }
		var TakerPaysValue = takerValue(order.TakerPays, order.TakerPays);
	// }
	// if(order.Account == "rKQ7nB9LkfhtvkvEKQMsxAgf7QgFgXFeBv") {
	// 	console.log(order,TakerPaysValue,TakerGetsValue, price);
	// }
	// 	account: order.Account,
	var price = getPrice(TakerPaysValue, TakerGetsValue, type);
	var volume = getVolume(TakerPaysValue, TakerGetsValue, type);
	console.log(type,"price",price,"volume",volume,"pays",TakerPaysValue,"gets",TakerGetsValue, order);

	var thinOrder = {
		takerGets: order.TakerGets,
		takerPays: order.TakerPays,
		price: price,
		volume: volume
		// type: type
	}

	return thinOrder;
}



// function findType(takergets,item) {
// 	// console.log(takergets,tgets);
// 	if(!isXRP(takergets)) {
// 		var tgets = 'XRP';
// 	} else {
// 		var tgets = takergets.currency;
// 	}
// 	if(tgets == item) {
// 		return 'ask';
// 	}

// 	return 'bid';
// 	// takergets  == item ==> sell/ask
// 	// takergets == currency ==> buy/bid
// }

function getPrice(TakerPaysValue,TakerGetsValue,type) {
	if (type == 'ask') {
		if(TakerGetsValue < 1) {
			return TakerPaysValue*TakerGetsValue;
		}
		return TakerPaysValue/TakerGetsValue;
	}
	if(TakerPaysValue < 1) {
		return TakerGetsValue*TakerPaysValue;
	}
	return TakerGetsValue/TakerPaysValue;
}

function getVolume(TakerPaysValue,TakerGetsValue,type) {
	if (type == 'ask') {
		return TakerGetsValue;
	}
	return TakerPaysValue;
}


function isXRP(taker) {
	if(!_.isObject(taker)) {
		// console.log(taker, true);
		return true;
	}
	// console.log(taker, false);
	return false;
}

function takerValue_funded(taker,obj) {
	if(isXRP(obj)) {
		// console.log(parseInt(taker)/Math.pow(10,6));
		return parseInt(taker)/Math.pow(10,6);
	}
	return parseFloat(taker);
}

function takerValue(taker,obj) {
	if(isXRP(obj)) {
		// console.log(parseInt(taker)/Math.pow(10,6));
		return parseInt(taker)/Math.pow(10,6);
	}
	return parseFloat(taker.value);
}


module.exports = orderbookParser;