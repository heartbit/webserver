

   var DataHelper = function() {};

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

   DataHelper.prototype.getVolumes = function(tickers) {
      var self = this;
      this.volumesRaw = new Array();
      this.volumesFormatted=  new Array();
      _.each(tickers.models, function(model) {
         //Pure Json for PieChart
         var modelRaw = model.toJSON();
         self.volumesRaw.push(modelRaw);
         //Format price for Display
         var model = model.toJSON();
         model.vol = FormatUtils.formatPrice(model.vol, model.item);
         model.currency = FormatUtils.formatCurrencyLabel(model.currency);
         self.volumesFormatted.push(model);
      });
      if (this.volumesFormatted.length > 0) {
         this.volumeTotal = FormatUtils.formatPrice(tickers.volumeTotal, this.volumesFormatted[0].item);
      }
      return this;
   };

   DataHelper.prototype.getPrices = function(trades) {
      var self=this;
      this.pricesRaw= new Array();
      this.pricesFormatted = new Array();
      _.each(trades.models, function(model) {
         // console.log(model);
         // console.log(model.get("price"));
         var modelPrice=model.toJSON();
         self.pricesRaw.push(modelPrice);
      });

      return this;
   };


module.exports = DataHelper;

