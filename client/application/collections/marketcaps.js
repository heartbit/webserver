define('marketcaps', ['config','marketcap'], function(config, Marketcap) {

    var Marketcaps = Backbone.Collection.extend({

        model: Marketcap,
        url: config.marketcap.urlModel,
        // parse: function(reponse) {
        // 	console.log(reponse);
	      	// return reponse.marketcap;
        // }

        fetch:function() {
        	var self=this;
			$.ajax({
			 	crossDomain: true,
			 	type: 'GET',
			 	url: this.url,
			 	success: function(response) {
			 		//self.MMM=response;
			 		// var oResponse = {};
			 		// try {
			 		// 	oResponse = JSON.parse(response);
			 		// } catch (e) {
			 		// 	console.log('error fetch trades :', e);
			 		// }

			 		// self.candles = oResponse.candles;
			 		// _.each(self.candles, function(candle) {
			 		// 	candle.middleDate = new Date((candle.startDate + (candle.endDate - candle.startDate) / 2) * 1000);
			 		// 	candle.startDate = new Date(candle.startDate * 1000);
			 		// 	candle.endDate = new Date(candle.endDate * 1000);
			 		// });

			 		// self.volumes = oResponse.volumes;
			 		// _.each(self.volumes, function(volume) {
			 		// 	volume.startDate = new Date(volume.startDate * 1000);
			 		// 	volume.endDate = new Date(volume.endDate * 1000);
			 		// });

			 		// callback(self);
			 	},
			 	error: function(error) {
			 		console.log(error);
			 	}
			)
		}

    });

    return Marketcaps;

});