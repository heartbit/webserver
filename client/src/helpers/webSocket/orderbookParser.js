function orderbookParser() {}

orderbookParser.prototype.filterInit = function(orders, type) {
	var self = this;
	var result = [];
	_.each(orders, function(order) {
		var formatedOrder = self.thinOrder(order, type);
		result.push(formatedOrder);
	});

	return result;
}

orderbookParser.prototype.thinOrder = function(order, type, pair) {
	// if(!type) {
	// 	var type = findType(pair);
	// }
	var TakerGetsValue = takerValue(order.TakerGets);
	var TakerPaysValue = takerValue(order.TakerPays);
	var price = getPrice(TakerPaysValue, TakerGetsValue, type);
	var volume = getVolume(TakerPaysValue, TakerGetsValue, type);
	var thinOrder = {
		account: order.Account,
		takerGets: order.TakerGets,
		takerPays: order.TakerPays,
		price: price,
		volume: volume
	}

	return thinOrder;
}

function findType(pair) {

}

function getPrice(TakerPaysValue,TakerGetsValue,type) {
	if (type == 'ask') {
		return TakerPaysValue/TakerGetsValue;
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
		return true;
	}
	return false;
}

function takerValue(taker) {
	if(isXRP(taker)) {
		return parseInt(taker)/Math.pow(10,6);
	}
	return parseFloat(taker.value);
}


module.exports = orderbookParser;