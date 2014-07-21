define('fbposts', ['config', 'fbpost', 'backbone', 'moment'], function(config, Fbpost, Backbone, moment) {

    var Tweets = Backbone.Collection.extend({

        model: Fbpost,

        url: config.fbpost.urlCollection,

        initialize: function() {},

        update: function(fbposts) {
            this.models = this.parse(fbposts);
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