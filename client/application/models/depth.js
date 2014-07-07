define('depth', ['config', 'moment', 'DataSocketManager', 'backbone'], function(config, moment, DataSocketManager, Backbone) {

    var Depth = Backbone.Model.extend({

        defaults: {
            platform: undefined,
            currency: undefined,
            item: undefined,
            asks: [],
            bids: []
        },

        maxNbPoints: 150,

        socketSync: function(params) {
            var self = this;
            var updateCallback = function(payload) {
                // console.log('Depth update: ', payload);
                var objDepth = payload.data;
                self.update(objDepth);
            };

            var eventId;
            if (this.isListening) {
                eventId = this.eventIdUpdate();
                DataSocketManager.removeAllListeners(eventId) //, updateCallback);
            }

            this.set('platform', params.platform);
            this.set('currency', params.currency);
            this.set('item', params.item);
            eventId = this.eventIdUpdate();
            DataSocketManager.on(eventId, updateCallback);
            this.isListening = true;
        },

        initialize: function() {},

        update: function(depth) {
            if (depth && depth.order_book) {
                var asks = _.filter(depth.order_book, function(order) {
                    return order.tradeType === 'ASK';
                });
                var bids = _.filter(depth.order_book, function(order) {
                    return order.tradeType === 'BID';
                });
                this.set('asks', asks);
                this.set('bids', bids);
            }
            this.trigger('update');
        },

        eventIdUpdate: function() {
            var sep = ":";
            var eventid = this.get('platform') + sep + this.get('item') + sep + this.get('currency') + sep + 'DEPTH';
            return eventid;
        },

        toString: function() {
            return "ticker: " + this.get('platform') + " " + this.get('item') + "/" + this.get('currency');
        }

    });
    return Depth;

});