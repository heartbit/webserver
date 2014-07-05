define('FormatUtils', ['cldr', 'moment'], function() {

	var numberFormatter = new TwitterCldr.DecimalFormatter();
	var shortNumberFormatter = new TwitterCldr.ShortDecimalFormatter();
	var abbreviatedNumberFormatter = new TwitterCldr.AbbreviatedNumberFormatter();
	var currencyFormatter = new TwitterCldr.CurrencyFormatter();
	var longDecimalFormatter = new TwitterCldr.LongDecimalFormatter();
	var percentFormatter = new TwitterCldr.PercentFormatter();
	var timespanFormatter = new TwitterCldr.TimespanFormatter();

	var roundToN = function(num, n) {
		return +(Math.round(num + "e+" + n) + "e-" + n);
	};

	var roundToNString = function(num, n) {
		var blatte = num.toFixed(n);
		return blatte;
	};

	var FormatUtils = {};

	FormatUtils.truncToNdecimal = function(num, n) { //similaire roundToN
		return +(Math.round(num + "e+" + n) + "e-" + n);
	};

	FormatUtils.isEmpty = function(obj) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		if (obj == null) return true;
		if (obj.length > 0) return false;
		if (obj.length === 0) return true;
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) return false;
		}
		return true;
	};

	FormatUtils.formatEvol = function(evol) {
		var result = (Math.abs(evol) >= 10) ? this.formatValue(evol, 0) : this.formatValue(evol, 2);
		if (evol >= 0) {
			result = "+" + result;
		}
		return result + '%';
	};

	FormatUtils.formatPrice = function(value, unit) {
		if (value > 1000) {
			return this.formatCurrencyLabel(unit) + this.formatValueShort(value);
		}
		if (value <= 999 && value >= 100) {
			return this.formatCurrencyLabel(unit) + this.formatValue(value, 2);
		}
		if (value <= 100 && value >= 1) {
			return this.formatCurrencyLabel(unit) + this.formatValue(value, 3);
		}
		if (value < 1 && value >= 0.00001) {
			return this.formatCurrencyLabel(unit) + this.formatValue(value, 5);
		}
		return this.formatCurrencyLabel(unit) + String(value);
	};

	FormatUtils.formatValue = function(value, n) {
		return numberFormatter.format(roundToN(value, n));
	};

	FormatUtils.formatItem = function(value, unit) {
		return this.formatValue(value, 0) + ' ' + this.formatCurrencyLabel(unit);
	};

	FormatUtils.formatValueShort = function(value, maxDigits) {

		var addCommas = function(value) {
			if (value) {
				var valueStr = value.toString();
				var i = valueStr.length - 3;
				while (i > 0) {
					valueStr = valueStr.substring(0, i) + ',' + valueStr.substring(i, valueStr.length);
					i -= 3;
				}
				return valueStr;
			}
			return "error";
		};

		var valueStr = {
			value: addCommas(value),
			multiple: ""
		};

		var thousandsOffset = 0;
		var mults = ['k', 'M', 'Bn'];
		if (value >= 1000) {
			// If we have a very big number
			while (String(valueStr.value).length > maxDigits && thousandsOffset < mults.length) {
				value = Math.round(value / 1000);

				valueStr = {
					value: addCommas(value),
					multiple: mults[thousandsOffset]
				};

				thousandsOffset++;
			}
		} else {
			return this.truncToNdecimal(value, 0);
		}

		return valueStr.value + valueStr.multiple;
	};

	FormatUtils.formatPercent = function(value) {
		return roundToNString(value, 2) + '%';
	};

	FormatUtils.formatAgo = function(value) {
		return roundToNString(value, 2) + 's. ago';
	};

	FormatUtils.formatTime = function(time, format) {
		if (moment(time, 'X').isValid()) {
			return moment(time, 'X').format('HH:mm:ss');
		} else {
			return time;
		}
	};

	FormatUtils.formatDate = function(date, format) {
		return new moment(date).format(format);
	};

	FormatUtils.formatCurrencyLabel = function(currencyId) {
		if (!currencyId) {
			return "";
		}

		var symbol = currencyId;
		switch (currencyId) {
			// dollars
			case 'USD':
				symbol = "$";
				break;
				// bitcoin
			case 'BTC':
				symbol = "Ƀ";
				image: "CHEMIN/images/Logoscrypto/Bitcoin-64x64.png";
				break;
				// euro
			case 'EUR':
				symbol = "€";
				break;
				// yuan
			case 'CNY':
				symbol: "¥";
				break;
				// rouble
			case 'RUR':
				symbol: '&#8381;';
				break;
				// feathercoin
			case 'FTC':
				symbol = "FTC";
				image: "CHEMIN/images/Logoscrypto/Feathercoin-64x64.png";
				break;
				// litecoin
			case 'LTC':
				symbol = "Ł";
				image: "CHEMIN/images/Logoscrypto/Litecoin-64x64.png";
				break;
				// Dogecoin
			case 'DOGE':
				symbol = "Ɖ";
				break;
				// Namecoin
			case 'NMC':
				symbol = "ℕ";
				image: "CHEMIN/images/Logoscrypto/namecoin-64x64.png";
				break;
			case 'NVC':
				symbol = "NVC";
				image: "CHEMIN/images/Logoscrypto/novacoin-64x64.png";
				break;
				// peercoin
			case 'PPC':
				symbol = "Ᵽ";
				image: "CHEMIN/images/Logoscrypto/ppc.jpg";
				break;
				// Terracoin
			case 'TRC':
				symbol = "Ŧ";
				image: "CHEMIN/images/Logoscrypto/terracoin.jpg";
				break;
				// Primecoin
			case 'XPM':
				Prime
				symbol = "Ψ";
				image: "CHEMIN/images/Logoscrypto/primecoin.jpg";
				break;
				// Auroracoin
			case 'AUR':
				symbol = "AUR";
				break;
				// 42
			case 'XRP':
				symbol = "XRP";
				image: "CHEMIN/images/Logoscrypto/xrp.jpg";
				break;
				// 42
			case '42':
				symbol = "42";
				break;
				// Alphacoin
			case 'ALF':
				symbol = "ALF";
				break;
				// AmericanCoin
			case 'AMC':
				symbol = "AMC";
				break;
				// Anoncoin
			case 'ANC':
				symbol = "ANC";
				image: "CHEMIN/images/Logoscrypto/Anoncoin-64x64.png";
				break;
				// Argentum
			case 'ARG':
				symbol = "ARG";
				break;
				// Battlecoin
			case 'BCX':
				symbol = "BCX";
				break;
				// Benjamins
			case 'BEN':
				symbol = "BEN";
				break;
				// BBQcoin
			case 'BBQ':
				symbol = "BBQ";
				image: "CHEMIN/images/Logoscrypto/BBQCoin-64x64.png";
				break;
				// Bitbar
			case 'BTB':
				symbol = "BTB";
				image: "CHEMIN/images/Logoscrypto/Bitbar-64x64.png";
				break;
				// Bytecoin
			case 'BTE':
				symbol = "BTE";
				break;
				// Bitgemcoin
			case 'BTG':
				symbol = "BTG";
				image: "CHEMIN/images/Logoscrypto/Bitgem-64x64.png";
				break;
				// CryptoBuck
			case 'BUK':
				symbol = "BUK";
				break;
				// CACHeCOin
			case 'CACH':
				symbol = "CACH";
				break;
				// BottleCaps
			case 'CAP':
				symbol = "CAP";
				image: "CHEMIN/images/Logoscrypto/Bottlecaps-64x64.png";
				break;
				// CashCoin
			case 'CASH':
				symbol = "CASH";
				break;
				// CatCoin
			case 'CAT':
				symbol = "CAT";
				break;
				// CryptogenicBullion 
			case 'CGB':
				symbol = "CGB";
				break;
				// CopperLark
			case 'CLR':
				symbol = "CLR";
				break;
				// CosmosCoin 
			case 'CMC':
				symbol = "CMC";
				image: "CHEMIN/images/Logoscrypto/Cosmocoin-64x64.png";
				break;
				// Chinacoin 
			case 'CNC':
				symbol = "CNC";
				break;
				// CraftCoin 
			case 'CRC':
				symbol = "CRC";
				image: "CHEMIN/images/Logoscrypto/Craftcoin-64x64.png";
				break;
				// CasinoCoin 
			case 'CSC':
				symbol = "CSC";
				image: "CHEMIN/images/Logoscrypto/Casinocoin-64x64.png";
				break;
				// eMark
			case 'DEM':
				symbol = "DEM";
				break;
				// DigitalCoin 
			case 'DGC':
				symbol = "DGC";
				image: "CHEMIN/images/Logoscrypto/Digitalcoin-64x64.png";
				break;
				// Diamond 
			case 'DMD':
				symbol = "DMD";
				image: "CHEMIN/images/Logoscrypto/Diamond-64x64.png";
				break;
				//DarkCoin
			case 'DRK':
				symbol = "DRK";
				break;
				//DevCoin
			case 'DVC':
				symbol = "DVC";
				break;
				//EarthCoin
			case 'EAC':
				symbol = "EAC";
				break;
				//Elacoin
			case 'ELC':
				symbol = "ELC";
				break;
				//Emerald
			case 'EMD':
				symbol = "EMD";
				image: "CHEMIN/images/Logoscrypto/Emerald-64x64.png";
				break;
				//EZCoin
			case 'EZC':
				symbol = "EZC";
				break;
				//FirelyCoin
			case 'FFC':
				symbol = "FFC";
				break;
				//FlappyCoin
			case 'FLAP':
				symbol = "FLAP";
				break;
				//FreiCOin
			case 'FRC':
				symbol = "FRC";
				break;
				//Franko
			case 'FRK':
				symbol = "FRK";
				break;
				//Fastcoin
			case 'FST':
				symbol = "FST";
				image: "CHEMIN/images/Logoscrypto/Fastcoin-64x64.png";
				break;
				//Grandcoin
			case 'GDC':
				symbol = "GDC";
				image: "CHEMIN/images/Logoscrypto/Grandcoin-64x64.png";
				break;
				//Globalcoin
			case 'GLC':
				symbol = "GLC";
				image: "CHEMIN/images/Logoscrypto/Globalcoin-64x64.png";
				break;
				//goldcoin
			case 'GLD':
				symbol = "GLD";
				image: "CHEMIN/images/Logoscrypto/Goldcoin-64x64.png";
				break;
				//Galaxycoin
			case 'GLX':
				symbol = "GLX";
				break;
				//Hobonickles
			case 'HBN':
				symbol = "HBN";
				image: "CHEMIN/images/Logoscrypto/HoboNickels-64x64.png";
				break;
				//Infinitecoin
			case 'IFC':
				symbol = "IFC";
				break;
				//IXCoin
			case 'IXC':
				symbol = "IXC";
				break;
				//Junkcoin
			case 'JKC':
				symbol = "JKC";
				break;
				//Krugercoin
			case 'KGC':
				symbol = "KGC";
				image: "CHEMIN/images/Logoscrypto/Krugercoin-64x64.png";
				break;
				//leafcoin
			case 'LEAF':
				symbol = "LEAF";
				break;
				//Lucky7coin
			case 'LK7':
				symbol = "LK7";
				break;
				//Luckycoin
			case 'LKC':
				symbol = "LKC";
				image: "CHEMIN/images/Logoscrypto/Luckycoin-64x64.png";
				break;
				//Lottocoin
			case 'LOT':
				symbol = "LOT";
				break;
				//Maxcoin
			case 'MAX':
				symbol = "MAX";
				break;
				//Megacoin
			case 'MEC':
				symbol = "MEC";
				image: "CHEMIN/images/Logoscrypto/Megacoin-64x64.png";
				break;
				//Kittehcoin
			case 'MEOW':
				symbol = "MEOW";
				break;
				//Mintcoin
			case 'MINT':
				symbol = "MINT";
				break;
				//Mincoin
			case 'MNC':
				symbol = "MNC";
				image: "CHEMIN/images/Logoscrypto/Mincoin-64x64.png";
				break;
				//Mooncoin
			case 'MOON':
				symbol = "MOON";
				break;
				//Mazacoin
			case 'MZC':
				symbol = "MZC";
				break;
				//Nanotoken
			case 'NAN':
				symbol = "NAN";
				break;
				//Nibble
			case 'NBL':
				symbol = "NBL";
				break;
				//Neocoin
			case 'NEC':
				symbol = "NEC";
				break;
				//Netcoin
			case 'NET':
				symbol = "NET";
				break;
				//Noirsbits
			case 'NRB':
				symbol = "NRB";
				image: "CHEMIN/images/Logoscrypto/Noirbits-64x64.png";
				break;
				//Nextcoin
			case 'NXT':
				symbol = "NXT";
				break;
				//Orbitcoin
			case 'ORB':
				symbol = "ORB";
				break;
				//Opensourcecoin
			case 'OSC':
				symbol = "OSC";
				break;
				//PhilosopherStone
			case 'PHS':
				symbol = "PHS";
				break;
				//Points
			case 'Points':
				symbol = "Points";
				break;
				//Protoshares
			case 'PTS':
				symbol = "PTS";
				break;
				//Phoenixcoin
			case 'PXC':
				symbol = "PXC";
				image: "CHEMIN/images/Logoscrypto/Phenixcoin-64x64.png";
				break;
				//Paycoin
			case 'PYC':
				symbol = "PYC";
				break;
				//Quarkcoin
			case 'QRK':
				symbol = "QRK";
				break;
				//RonPaulcoin
			case 'RPC':
				symbol = "RPC";
				break;
				//Stablecoin
			case 'SBC':
				symbol = "SBC";
				image: "CHEMIN/images/Logoscrypto/Stablecoin-64x64.png";
				break;
				//Smartcoin
			case 'SMC':
				symbol = "SMC";
				break;
				//Spots
			case 'SPT':
				symbol = "SRC";
				image: "CHEMIN/images/Logoscrypto/Spots-64x64.png";
				break;
				//Securecoin
			case 'SRC':
				symbol = "SRC";
				break;
				//Starcoin
			case 'STR':
				symbol = "STR";
				break;
				//Sexcoin
			case 'SXC':
				symbol = "SXC";
				break;
				//Tagcoin
			case 'TAG':
				symbol = "TAG";
				image: "CHEMIN/images/Logoscrypto/Tagcoin-64x64.png";
				break;
				//Takeicoin
			case 'TAK':
				symbol = "TAK";
				break;
				//Tekcoin
			case 'TEK':
				symbol = "TEK";
				break;
				//Tigercoin
			case 'TGC':
				symbol = "TGC";
				break;
				//Unobtanium
			case 'UNO':
				symbol = "UNO";
				break;
				//Ultracoin
			case 'UTC':
				symbol = "UTC";
				break;
				//Vertcoin
			case 'VTC':
				symbol = "VTC";
				break;
				//Worldcoin
			case 'WDC':
				symbol = "WDC";
				break;
				//Joulecoin
			case 'XJO':
				symbol = "XJO";
				break;
				//Yacoin
			case 'YAC':
				symbol = "YAC";
				break;
				//YBcoin
			case 'YBC':
				symbol = "YBC";
				break;
				//Zetacoin
			case 'ZET':
				symbol = "ZET";
				break;
		}
		return symbol;
	};

	return FormatUtils;

});