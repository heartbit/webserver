define('newsView', ['news', 'moment', 'text!./newsView.html', 'text!./application/views/news/articleContentTpl.html'], function(News, moment, NewsViewTemplate, ArticleContentTemplate) {

    return Backbone.View.extend({

        el: '#js-news',

        events: {
            'mouseenter .news': 'renderContent',
        },

        template: _.template(NewsViewTemplate),
        articleContentTemplate: _.template(ArticleContentTemplate),

        initialize: function() {
            _.bindAll(
                this,
                "render"
            )
            this.news = new News();
            this.news.socketSync();
            this.news.on('update', this.render);
        },

        render: function() {
            var self = this;
            if (this.news && this.news.models.length > 0) {
                this.$el.html(this.template({
                    newsArray: this.news.models.reverse()
                }));
                this.renderContent(null, this.news.models[0].guid);
            }
            return this;
        },

        renderContent: function(event, id) {
            var newsGuid = event ? $(event.target).attr('id') : id;
            var news = this.news.getNewsByGuid(newsGuid);
            if (!news) return;

            var content;
            switch (news.params.type) {
                case 'rss':
                    content = this.articleContentTemplate({
                        news: news
                    });
                    break;
                case 'twitter':
                    content = this.$('#tweetTpl');
                    break;
            }

            $('.newsContent').html(content);
            return false;
        }

    });

});