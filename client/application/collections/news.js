define('news', ['config', 'NewsSocketManager'], function(config, NewsSocketManager) {

    var News = Backbone.Collection.extend({

        initialize: function() {},

        socketSync: function(params) {
            _.bindAll(
                this,
                'update'
            );
            NewsSocketManager.on('news', this.update);
            NewsSocketManager.emit('news');
        },

        update: function(news) {
            console.log('News update: ', news);
            this.models = news;
            this.trigger('update');
        },

        getNewsByGuid: function(guid){
            return _.find(this.models, function(model){
                return model.guid == guid;
            });
        }

    });

    return News;

});