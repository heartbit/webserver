define('mainView', ['config', 'EventManager', 'text!mainView.html', 'mainchart', 'maingraphes', 'graphmenuView'], function(config, EventManager, MainTemplate, MainChart, Maingraphes, GraphmenuView) {

    return Backbone.View.extend({

        events: {
            'click .js-timeperiod': 'changeTimePeriod',
            'click #js-volumeLayer': 'toggleVolumeLayer'
        },

        el: '#js-mainview',

        template: _.template(MainTemplate),

        initialize: function() {
            var self = this;
            _.bindAll(
                this,
                'toggleVolumeLayer',
                'update'
            );
            this.maingraphes = new Maingraphes();
            // this.maingraphmenu = new GraphmenuView();
            // this.maingraphmenu.initParent(this.$el);
            this.timeperiods = config.maingraph.timeperiods;
            this.currentTimeperiodId = config.maingraph.defaultTimeperiodId;
        },

        update: function(params) {
            this.render(params);
        },

        render: function(params) {
            var self = this;

            this.currentTimeperiodId = params.timeperiod || config.maingraph.defaultTimeperiodId;
            _.each(this.timeperiods, function(timeperiod, index) {
                if (timeperiod.id == self.currentTimeperiodId) {
                    self.currentTimeperiod = timeperiod;
                    self.currentTimeperiodIndex = index;
                }
            });

            var tplVariables = {
                timeperiods: this.timeperiods,
                currentTimeperiodId: this.currentTimeperiodId
            };

            this.$el.html(this.template(tplVariables));
            // this.maingraphmenu.setElement($('#maingraphmenu')).render();
            this.mainChart = new MainChart(this, '#js-mainchart', params);

            this.maingraphes.fetch({
                    "platform": params.platform,
                    "item": params.item,
                    "currency": params.currency,
                    "typeDuration": this.currentTimeperiod.typeDuration,
                    "duration": this.currentTimeperiod.duration
                },
                function(maingraphes) {
                    if (maingraphes) {
                        // self.$('#js-mainchart').removeClass('loading');

                        var mainGraphParams = {
                            area: true,
                            candle: false,
                            volume: false,
                            sma: false
                        };

                        self.mainChart.draw(maingraphes, mainGraphParams);
                        $(window).resize(_.debounce(self.mainChart.resize, 100));
                    }
                }
            );
            return this;
        },

        changeTimePeriod: function(event, delta) {
            var self = this;
            if (event) {
                var $a = $(event.target);
                var currentTimeperiodId = $a.attr('id');
                _.each(this.timeperiods, function(timeperiod, index) {
                    if (timeperiod.id == currentTimeperiodId) {
                        self.currentTimeperiod = timeperiod;
                        self.currentTimeperiodIndex = index;
                    }
                });
            } else if (delta) {
                // decrease index if possible
                if (delta < 0) {
                    if (this.currentTimeperiodIndex > 0) {
                        this.currentTimeperiodIndex--;
                        this.currentTimeperiod = this.timeperiods[this.currentTimeperiodIndex];
                    } else {
                        return;
                    }
                }
                // increase index if possible
                else {
                    if (this.currentTimeperiodIndex < this.timeperiods.length - 1) {
                        this.currentTimeperiodIndex++;
                        this.currentTimeperiod = this.timeperiods[this.currentTimeperiodIndex];
                    } else {
                        return;
                    }
                }
                var $a = $('#' + this.currentTimeperiod.id);
            }
            this.$('.timeperiods li').removeClass('current');
            $a.parent().addClass('current');

            this.maingraphes.fetch({
                    "typeDuration": this.currentTimeperiod.typeDuration,
                    "duration": this.currentTimeperiod.duration
                },
                function(maingraphes) {
                    if (maingraphes) {
                        self.mainChart.update(maingraphes);
                    }
                }
            );
            return false;
        },

        toggleVolumeLayer: function() {
            this.mainChart.toggleVolumeLayer();
        }

    });

});