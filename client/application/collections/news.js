define('news', ['config', 'information', 'NewsSocketManager', 'backbone', 'moment'], function(config, Information, NewsSocketManager, Backbone, moment) {

    var News = Backbone.Collection.extend({

        model: Information,

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
            this.models = this.parse(news);
            this.trigger('update');
        },

        getNewsByGuid: function(guid) {
            return _.find(this.models, function(model) {
                return model.guid == guid;
            });
        },

        toTimelineJSON: function() {
            var timelineJson = {
                timeline: {
                    headline: 'Crypto news',
                    type: 'default',
                    text: '',
                    startDate: '2012,1,26',
                    date: []
                }
            };
            _.each(this.models, function(model) {
                var news = {
                    startDate: new moment(model.pubDate).format('YYYY,M,D,H,m,s'),
                    headline: model.title,
                    text: "", //model.summary,
                    tag: model.params.name,
                    classname: "seen",
                    idname: model.guid,
                    asset: {
                        thumbnail: model.params.logo,
                        media: "",
                        credit: "",
                        caption: ""
                    }
                };
                timelineJson.timeline.date.push(news);
            });
            return timelineJson;
        }

    });

    return News;

});