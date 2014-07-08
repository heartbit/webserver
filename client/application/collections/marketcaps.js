define('marketcaps', ['config','marketcap'], function(config, Marketcap) {

    var Marketcaps = Backbone.Collection.extend({

        model: Marketcap,
        url: config.marketcap.urlCollection,

        fetch:function() {
        	var self=this;
			$.ajax({
			 	crossDomain: true,
			 	type: 'GET',
			 	url: this.url,
			 	success: function(response) {
			 		//console.log(response);
			 		//self.marketcap=JSON.parse(response);

			 	},
			 	error: function(error) {
			 		console.log(error);
			 	}
			});
		}

    });

    return Marketcaps;

});