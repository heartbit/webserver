define('tweets', ['config', 'tweet', 'backbone', 'moment'], function(config, Tweet, Backbone, moment) {

    var Tweets = Backbone.Collection.extend({

        model: Tweet,

        url: config.tweet.urlCollection,

        initialize: function() {},

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