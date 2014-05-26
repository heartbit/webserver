define('dataHelper', ['FormatUtils'], function(FormatUtils) {

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

      // On garde seulement 1/10 points de l'union des 2 tableaux triée par prix croissant
      var Circles = _.chain(_.union(MurAsks, MurBids))
         .sortBy(function(point) {
            return point.price;
         })
         .filter(function(item, index) {
            return index % 10 == 0;
         })
         .value();

      return {
         DepthMax: DepthMax,
         DepthMin: DepthMin,
         Circles: Circles,
         MurBids: MurBids,
         MurAsks: MurAsks,
         
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

   DataHelper.prototype.buildVolumesForPieChart = function(tickers) {
      var self = this;
      this.volumesPieChart = new Array();
      this.volumes =  new Array();
      _.each(tickers.models, function(model) {
         //Pure Json for PieChart
         var modelPieChart = model.toJSON();
         self.volumesPieChart.push(modelPieChart);
         //Format price for Display
         var model = model.toJSON();
         model.vol = FormatUtils.formatPrice(model.vol, model.item);
         model.currency = FormatUtils.formatCurrencyLabel(model.currency);
         self.volumes.push(model);
      });
      if (this.volumes.length > 0) {
         this.volumeTotal = FormatUtils.formatPrice(tickers.volumeTotal, this.volumes[0].item);
      }
      return this;
   };

   return DataHelper;

});