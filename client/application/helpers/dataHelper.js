define('dataHelper', ['FormatUtils'], function(FormatUtils) {

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