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
	if(order.taker_gets_funded) {
		var TakerGetsValue = takerValue_funded(order.taker_gets_funded, order.TakerGets);
	} else {
		var TakerGetsValue = takerValue(order.TakerGets,order.TakerGets);
	}
	if(order.taker_pays_funded) {
		var TakerPaysValue = takerValue_funded(order.taker_pays_funded, order.TakerPays);
	} else {
		var TakerPaysValue = takerValue(order.TakerPays, order.TakerPays);
	}
	var price = getPrice(takerValue(order.TakerPays, order.TakerPays), takerValue(order.TakerGets,order.TakerGets), type);
	var volume = getVolume(TakerPaysValue, TakerGetsValue, type);

	var thinOrder = {
		takerGets: order.TakerGets,
		takerPays: order.TakerPays,
		price: price,
		volume: volume
		// type: type
	}

	return thinOrder;
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

function takerValue_funded(taker,obj) {
	if(isXRP(obj)) {
		return parseInt(taker)/Math.pow(10,6);
	}
	return parseFloat(taker);
}

function takerValue(taker,obj) {
	if(isXRP(obj)) {
		return parseInt(taker)/Math.pow(10,6);
	}
	return parseFloat(taker.value);
}


module.exports = orderbookParser;