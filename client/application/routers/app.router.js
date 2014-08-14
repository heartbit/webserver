define(function(require) {

    var ParametersManager = require('ParametersManager'),
        EventManager = require('EventManager');

    AnalyticsManager = require('AnalyticsManager'),
    NewsSocketManager = require('NewsSocketManager'),
    DataSocketManager = require('DataSocketManager'),
    ChatSocketManager = require('ChatSocketManager'),
    ShortcutsManager = require('ShortcutsManager');

    var config = require('config');

    var HeaderView = require('headerView'),
        KeyFactsView = require('keyFactsView'),
        MainView = require('mainView'),
        ControllerView = require('controllerView'),
        DepthView = require('depthView'),
        MiskView = require('miskView'),
        NewsView = require('newsView'),
        OffcanvasmenuView = require('offcanvasmenuView');
        VolumeWidgetView = require('volumewidgetView');
        PriceWidgetView = require ('pricewidgetView');

    var Router = Backbone.Router.extend({

        routes: {
            "app*": "app",
        },

        initialize: function() {
            var self = this;
            _.bindAll(this, 'refresh', 'render', 'update', 'initSockets');

            this.datarooms = [];
            this.appEl = '#js-app';
            this.isRender = false;

            this.views = {
                offcanvasmenu: new OffcanvasmenuView(),
                controller: new ControllerView(),
                volumeWidget: new VolumeWidgetView(),
                priceWidget: new PriceWidgetView(),
                keyfacts: new KeyFactsView(),
                header: new HeaderView(),
                main: new MainView(),
                depth: new DepthView(),
                news: new NewsView()
            };

            Backbone.history.start({
                pushState: true
            });

            ShortcutsManager.init();
            // ShortcutsManager.addShortcut('t', function() {
            // 	console.log('t')
            // });

            DataSocketManager.once('roomlist', function(roomlist) {
                // console.log('roomlist', roomlist);
                this.roomlist = roomlist;
            });
            DataSocketManager.emit('roomlist');

            DataSocketManager.once('leave-dataroom', function(response) {
                if (response.error) console.log('LEAVE DATAROOM ERROR : ', response.error);
                else {
                    self.datarooms.unset(response.dataroom);
                    // console.log('leave dataroom ok ', response.dataroom);
                    // console.log('LEAVE DATAROOMS ', self.datarooms);
                }
            });

            DataSocketManager.once('enter-dataroom', function(response) {
                if (response.error) console.log('ENTER DATAROOM ERROR : ', response.error);
                else {
                    if (self.datarooms.indexOf(response.dataroom) === -1) {
                        self.datarooms.push(response.dataroom);
                        // console.log('enter dataroom ok ', response.dataroom);
                        // console.log('ENTER DATAROOMS ', self.datarooms);
                    }
                }
            });

            $(document).foundation();

        },

        /*	README
			Mini doc tous les params sont optionnels
			var params = {
				item: itemId,
				currency: currencyId,
				platforms: [platformId],
				status:{
					socket: boolean
					(... NE PAS ABUSER...)
				},
				mainview:{
					candle: true
					(... NE PAS ABUSER...)
				}
			}
		*/
        app: function(params) {
            this.params = params || this.params || {};
            ParametersManager.isInit ? this.refresh() : ParametersManager.init(this.refresh);
            // console.log('params : ', params);
        },

        refresh: function() {
            ParametersManager.updateUserInputParams(this.params);
            this.render(this.initSockets);
        },

        render: function(callback) {
            var self = this;
            if (!this.isRender) {
                _.each(_.keys(this.views), function(viewKey) {
                    self.views[viewKey].render(ParametersManager.getCurrentParams());
                });
                this.isRender = true;
            } else {
                _.each(_.keys(this.views), function(viewKey) {
                    self.views[viewKey].update(ParametersManager.getCurrentParams());
                });
            }
            if (callback) {
                callback();
            }
        },

        initSockets: function() {
            this.joinDataroom(ParametersManager.getCurrentParams());
        },

        update: function(callback) {
            var self = this;
            _.each(_.keys(this.views), function(viewKey) {
                 console.log(self.views[viewKey]);
                self.views[viewKey].update(ParametersManager.getCurrentParams());
            });
            if (callback) {
                callback();
            }
        },

        clearDatarooms: function(dataRooms, params) {
            var self = this;
            var item = params.item,
                currency = params.currency;
            _.each(this.datarooms, function(dataroom) {
                if (dataRooms.indexOf(dataroom) === -1 || (dataroom.indexOf(item) != -1 && dataroom.indexOf(currency) != -1)) {
                    DataSocketManager.emit('leave-dataroom', dataroom);
                }
            });

        },

        joinDataroom: function(params) {
            var self = this;
            var sep = ':';
            var dataroom = params.item + sep + params.currency;
            var dataRooms = ParametersManager.getTickerRoom(params);
            this.clearDatarooms(dataRooms, params);
            var item = params.item,
                currency = params.currency;
            DataSocketManager.once('roomlist', function(roomlist) {
                console.log(roomlist);
            });
            _.each(dataRooms, function(pair) {
                dataroom = pair;
                if (self.datarooms.indexOf(dataroom) === -1 ||  (dataroom.indexOf(item) != -1 && dataroom.indexOf(currency) != -1)) {
                    DataSocketManager.emit('enter-dataroom', dataroom);
                    // console.log('enter dataroom ok', dataroom);
                }
            });


        }

    });

    return Router;

});