define('depthDataHelper', ['FormatUtils'], function(FormatUtils) {

   var DepthDataHelper = function() {};

   DepthDataHelper.prototype.computeDepth = function(depth) {
      var data = depth.attributes;
      var bids = data.bids.slice(0, (data.bids.length / 3)); // on ne prend que 1/2 des résultats sinon échelle trop large & mur non représentatif
      var asks = data.asks.slice(0, (data.asks.length / 3));
      if (bids.length == 0 || asks.length == 0) return;

      var MurBids = []; //Tableau Prix-Somme des amounts achats [Prix,AmountCumulé];
      var AmountBids = [0];
      var PriceBids = [];
      var MurAsks = []; //Tableau Prix-Somme des amounts vente [Prix,AmountCumulé];
      var AmountAsks = [0];
      var PriceAsks = [];
      var maxNbPoints = 150;

      if (bids.asks > maxNbPoints) {
         bids = _.filter(bids, function(bid, index) {
            return index % 2 == 0;
         });
         asks = _.filter(asks, function(ask, index) {
            return index % 2 == 0;
         });
      }

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

      var maxBid = _.max(MurBids, function(bid) {
         return bid.price;
      });

      var minAsk = _.min(MurAsks, function(ask) {
         return ask.price;
      });

      return {
         DepthMax: DepthMax,
         DepthMin: DepthMin,
         Circles: Circles,
         MurBids: MurBids,
         MurAsks: MurAsks,
         maxBid: maxBid,
         minAsk: minAsk
      };

   }

   return DepthDataHelper;

});