define('tweets', ['config', 'tweet', 'NewsSocketManager', 'backbone', 'moment'], function(config, Tweet, NewsSocketManager, Backbone, moment) {

    var Tweets = Backbone.Collection.extend({

        model: Tweet,

        url: config.tweet.urlCollection,

        maxNbPoints: 150,

        initialize: function() {},

        // fetch: function(params, callback) {
        //     var self = this;
        //     params = params || {};
        //     var meta = {
        //         "startDate": params.startDate,
        //         "endDate": params.endDate,
        //         "limit": params.limit,
        //         "filters": params.filters
        //     };

        //     this.metadata = meta;

        //     $.ajax({
        //         data: meta,
        //         crossDomain: true,
        //         type: 'POST',
        //         url: this.url,
        //         success: function(response) {
        //             var oResponse = {};
        //             try {
        //                 oResponse = JSON.parse(response);
        //             } catch (e) {
        //                 console.log('error fetch trades :', e);
        //                 callback();
        //                 return;
        //             }

        //             self.models = oResponse;

        //             _.each(self.models, function(tweet) {
        //                 tweet.middleDate = new Date((candle.startDate + (candle.endDate - candle.startDate) / 2) * 1000);
        //             });

        //             _.each(self.volumes, function(volume) {
        //                 volume.startDate = new Date(volume.startDate * 1000);
        //                 volume.endDate = new Date(volume.endDate * 1000);
        //             });

        //             callback(self);
        //         },
        //         error: function(error) {
        //             console.log(error);
        //         }
        //     });
        // },

        // parse: function(oResponse) {
        //     var oResponse = {};
        //     try {
        //         oResponse = JSON.parse(response);
        //         return oResponse;
        //     } catch (e) {
        //         console.log('error fetch trades :', e);
        //         return [];
        //     }
        // },

        update: function(news) {

            this.models = this.parse(news);
            this.trigger('update');
        },

        getNewsByGuid: function(guid) {
            return _.find(this.models, function(model) {
                return model.guid == guid;
            });
        }

    });

    return Tweets;

});