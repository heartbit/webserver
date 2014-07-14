define('ticker', ['config', 'moment', 'DataSocketManager', 'EventManager', 'FormatUtils'], function(config, moment, DataSocketManager, EventManager, FormatUtils) {

    var Ticker = Backbone.Model.extend({
        socketSync: function(params) {
            var self = this;
            this.params = params || this.params;

            var updateCallback = function(payload) {
                console.log('Ticker update: ', JSON.stringify(payload));
                var objTicker = payload.data;
                if (objTicker) {
                    self.update(objTicker);
                }
            };
            var eventId;
            if (this.isListening) {
                eventId = this.eventIdUpdate();
                DataSocketManager.removeAllListeners(eventId) //, updateCallback);
            }
            this.set('platform', this.params.platform);
            this.set('currency', this.params.currency);
            this.set('item', this.params.item);
            eventId = this.eventIdUpdate();
            this.set('idAttribute',eventId);

            DataSocketManager.on(eventId, updateCallback);
            this.isListening = true;
        },
        killListener: function(){
            DataSocketManager.removeAllListeners(this.eventIdUpdate());
        },
        initialize: function(params) {
            this.params = params;
        },

        update: function(ticker) {
            if (ticker.candle) {
                this.set('high', +ticker.candle.high);
                this.set('low', +ticker.candle.low);
                this.set('wavg', +ticker.weightedAverage);
                this.set('id', ticker.id);
                this.set('updated', new Date(+ticker.updated * 1000));
                this.set('vol', +ticker.volume.amount);
                this.set('daily', +ticker.volume.dailyChange);
            } else {
                this.set('last', +ticker.price);
            }
            eventId = this.eventIdUpdate();
            this.set('idAttribute',eventId);
            this.trigger('update');
           // var lastUpdate = {
            //     date: new Date(),
            //     model: this.toString()
            // };

            // EventManager.trigger('lastupdate', lastUpdate);
        },

        eventIdUpdate: function() {
            var sep = ":";
            var eventid = this.get('platform') + sep + this.get('item') + sep + this.get('currency') + sep + 'TCK';
            return eventid;
        },

        toString: function() {
            return "ticker: " + this.get('platform') + " " + this.get('item') + "/" + this.get('currency');
        }

    });

    return Ticker;

});