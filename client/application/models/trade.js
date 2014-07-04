define('trade', ['config', 'moment', 'DataSocketManager', 'backbone'], function(config, moment, DataSocketManager, Backbone) {

    var Trade = Backbone.Model.extend({

        defaults: {
            amount: 0,
            dateTrade: 1385903900,
            item: 'BTC',
            price: 0,
            priceCurrency: 'USD',
            tid: 11111111,
        },

        socketSync: function(params) {
            var self = this;
            this.params = params ||  this.params ||  {};
            var updateCallback = function(payload) {
                console.log('Trade update: ', JSON.stringify(payload));
                var objTrade = payload.data;
                self.update(objTrade);
            };
            var eventId
            if (this.isListening) {
                eventId = this.eventIdUpdate();

                DataSocketManager.removeAllListeners(eventId)//, updateCallback);
                
            }

            this.set('platform', this.params.platform);
            this.set('currency', this.params.currency);
            this.set('item', this.params.item);
            eventId = this.eventIdUpdate();
            DataSocketManager.on(eventId, updateCallback);
            this.isListening = true;
        },

        initialize: function(params) {
            this.params = params;
        },

        update: function(trade) {
            if (trade) {
                this.set('amount', +trade.amount);
                this.set('dateTrade', new Date(+trade.dateTrade * 1000));
                this.set('item', trade.item);
                this.set('price', +trade.price);
                this.set('priceCurrency', trade.priceCurrency);
                this.set('tid', trade.tid);
                this.trigger('update');
            }
            //  else {
            //     this.set('last', +trade.price);
            // }
            // var lastUpdate = {
            //     date: new Date(),
            //     model: this.toString()
            // };

            // EventManager.trigger('lastupdate', lastUpdate);
        },

        eventIdUpdate: function() {
            var sep = ":";
            var eventid = this.get('platform') + sep + this.get('item') + sep + this.get('currency') + sep + 'TRD';
            return eventid;
        },

        toString: function() {
            return "trade: " + this.get('platform') + " " + this.get('item') + "/" + this.get('currency');
        }

    });

    return Trade;

});