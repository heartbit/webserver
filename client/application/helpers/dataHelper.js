define('dataHelper', function() {

   var DataHelper = function() {};

   DataHelper.prototype.computeDepth = function(depth) {
      var data = depth.attributes;
      var bids = data.bids.slice(0, (data.bids.length) / 2); // on ne prend que 1/2 des résultats sinon échelle trop large & mur non représentatif
      var asks = data.asks.slice(0, (data.asks.length) / 2);
      if (bids.length == 0 || asks.length == 0) return;

      var MurBids = []; //Tableau Prix-Somme des amounts achats [Prix,AmountCumulé];
      var AmountBids = [0];
      var PriceBids = [];
      var MurAsks = []; //Tableau Prix-Somme des amounts vente [Prix,AmountCumulé];
      var AmountAsks = [0];
      var PriceAsks = [];

      _.each(bids, function(bid, index) {
         if (index == 0) index = 1
         AmountBids[index] = AmountBids[index - 1] + bid.amount;
         PriceBids[index] = bid.price;
         MurBids.push({
            price: PriceBids[index],
            amount: AmountBids[index]
         });
      });

      _.each(asks, function(ask, index) {
         if (index == 0) index = 1
         AmountAsks[index] = AmountAsks[index - 1] + ask.amount;
         PriceAsks[index] = ask.price;
         MurAsks.push({
            price: PriceAsks[index],
            amount: AmountAsks[index]
         });
      });

      LastBidsAmount = _.last(MurBids).amount;
      LastAsksAmount = _.last(MurAsks).amount;

      if (LastBidsAmount > LastAsksAmount) {
         DepthMin = MurAsks;
         DepthMax = MurBids;
      } else {
         DepthMin = MurBids;
         DepthMax = MurAsks;
      };

      return {
         DepthMax: DepthMax,
         DepthMin: DepthMin,
         MurAsks: MurAsks,
         MurBids: MurBids
      };
   };

   DataHelper.prototype.sanitizeMainChartModels = function(maingraphes) {
      var models = {};
      models.candles = _.filter(maingraphes.candles, function(candle) {
         var checkValues = candle.close > 0 && candle.open > 0 && candle.high > 0 && candle.low > 0
         var checkDates = _.isDate(candle.startDate) && _.isDate(candle.startDate) && _.isDate(candle.middleDate);
         return checkValues && checkDates;
      });
      models.volumes = _.filter(maingraphes.volumes, function(volume) {
         var checkValues = volume.amount >= 0;
         var checkDates = _.isDate(volume.startDate) && _.isDate(volume.endDate);
         return checkValues && checkDates;
      });
      return models;
   };

   return DataHelper;

});