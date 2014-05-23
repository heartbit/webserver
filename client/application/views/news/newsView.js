define('newsView', ['news', 'storyjs', 'timelinejs', 'moment', 'text!./newsView.html', 'text!./application/views/news/articleContentTpl.html'], function(News, storyjs, timelinejs, moment, NewsViewTemplate, ArticleContentTemplate) {

    return Backbone.View.extend({

        el: '#js-news',

        events: {
            'click .slider-item': 'clickOnArticle'
        },

        template: _.template(NewsViewTemplate),
        articleContentTemplate: _.template(ArticleContentTemplate),

        initialize: function() {
            _.bindAll(
                this,
                "render"
            );
            this.news = new News();
            this.news.socketSync();
            this.news.on('update', this.render);
            console.log(typeof Timelinejs);
        },

        clickOnArticle: function(event) {
            this.$currentNewsItem = $(event.target).closest('.slider-item');
            if (!this.$currentNewsItem.hasClass('seen')) {
                this.$currentNewsItem.addClass('seen');
            }
            var newsGuid = this.$currentNewsItem.attr('id');
            this.currentNews = this.news.getNewsByGuid(newsGuid);
            window.open(this.currentNews.link, '_blank');
            event.preventDefault();
        },

        render: function() {
            var self = this;
            if (this.news && this.news.models.length > 0) {
                this.$el.html(this.template());
                createStoryJS({
                    type: 'timeline',
                    width: '100%',
                    height: '400',
                    start_at_end: true,
                    hash_bookmark: false,
                    lang: 'en',
                    maptype: 'osm',
                    source: this.news.toTimelineJSON(),
                    embed_id: 'timeline-news'
                });
            }
            $(document).foundation({
                equalizer: {
                    equalize_on_stack: true
                }
            });
            return this;
        },

        // renderContent: function(event, id) {
        //     var newsGuid = event ? $(event.target).attr('id') : id;
        //     var news = this.news.getNewsByGuid(newsGuid);
        //     if (!news) return;

        //     var content;
        //     switch (news.params.type) {
        //         case 'rss':
        //             content = this.articleContentTemplate({
        //                 news: news
        //             });
        //             break;
        //         case 'twitter':
        //             content = this.$('#tweetTpl');
        //             break;
        //     }

        //     $('.newsContent').html(content);
        //     return false;
        // }

    });

});