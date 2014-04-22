define('lastupdateView', ['text!lastupdateView.html', 'misc-bignumber', 'EventManager', 'moment'], function(LastUpdateViewViewTemplate, BigNumber, EventManager) {

    return Backbone.View.extend({

        el: '#js-lastupdate',

        template: _.template(LastUpdateViewViewTemplate),

        initialize: function() {
            var self = this;
            self.$el.html(self.template());

            this.updateTimestamp = new BigNumber("#js-lastupdateBigNumber");
            EventManager.on('lastupdate', function(update) {
                self.render(update);
            });

            this.timeagoTimestamp = new BigNumber("#js-timeagoBigNumber");
            this.$typeUpdate = $('#js-typeUpdate');
        },

        formatLastUpdate: function(update) {
            var updateString = "";
            if (update.model) {
                updateString = "New ";
                updateString += update.model.toString();
            }
            return updateString;
        },

        render: function(update) {
            var self = this;

            clearInterval(this.timeagoInterval);

            if (!update) {
                update = {
                    date: new Date(),
                    model: ''
                };
            }

            if (this.$typeUpdate.hasClass('loading')) {
                this.$typeUpdate.removeClass('loading')
            }

            this.$typeUpdate.fadeOut(function() {
                var text = self.formatLastUpdate(update);
                $(this).text(text).fadeIn();
            })

            var timestamp = +moment(update.date).format('X') || +moment().format('X');
            var updateParams = {
                unit: 'timestamp',
                value: timestamp,
                type: 'timestamp',
                delay: 0,
                duration: 600,
                fontSize: '15px'
            };
            this.updateTimestamp.render(updateParams);

            this.count = 0;
            var animationDuration = 10;
            this.timeagoInterval = setInterval(function() {
                    self.count += 0.01;
                    var timeagoParams = {
                        unit: 'millisecond',
                        value: self.count,
                        type: 'ago',
                        delay: 0,
                        duration: 0,
                        fontSize: '12px'
                    };
                    self.timeagoTimestamp.render(timeagoParams);
                },
                animationDuration);

            return this;
        }

    });

});