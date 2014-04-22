requirejs.config({
    paths: {
        config: 'application/config',

        // General imports
        backbone: 'libs/backbone-min',
        'backbone-params': 'libs/backbone.queryparams',
        foundation: 'libs/foundation.min',
        d3: 'libs/d3.min',
        jquery: 'libs/jquery.min',
        modernizr: 'libs/modernizr',
        moment: 'libs/moment.min',
        text: 'libs/text',
        socketio: 'libs/socket.io.min',
        underscore: 'libs/underscore-min',
        cldr: 'libs/twitter_cldr',

        // Routers
        indexRouter: 'application/app.router',

        // Views
        homeView: 'application/views/home/homeView',
        marketcapView: 'application/views/marketcap/marketcapView',
        mainView: 'application/views/main/mainView',
        controllerView: 'application/views/controller/controllerView',
        keyFactsView: 'application/views/keyfacts/keyFactsView',
        timeseriesView: 'application/views/timeseries/timeseriesView',
        mainchartcheckcontrollerView: 'application/views/controller/mainchartcheckcontrollerView',
        sidecontrollerView: 'application/views/controller/sidecontrollerView',
        indicatorscontrollerView: 'application/views/controller/indicatorscontrollerView',
        lastupdateView: 'application/views/lastupdate/lastupdateView',
        indicatorsView: 'application/views/indicators/indicatorsView',
        miskView: 'application/views/misk/miskView',

        // Charts
        timeseriesChart: 'application/views/charts/timeseriesChart',
        mainchart: 'application/views/charts/mainchart',
        tooltip: 'application/views/charts/layers/tooltip/tooltip',
        chandelier: 'application/views/charts/chandelier',
        'indicator-depth': 'application/views/charts/indicator-depth',
        'misc-bignumber': 'application/views/charts/misc-bignumber',

        // DataHelpers
        dataHelper: 'application/helpers/dataHelper',

        // Models
        ticker: 'application/models/ticker',
        trade: 'application/models/trade',
        depth: 'application/models/depth',
        maingraphe: 'application/models/maingraphe',

        // Collections
        tickers: 'application/collections/tickers',
        trades: 'application/collections/trades',
        depths: 'application/collections/depths',
        platforms: 'application/collections/platforms',
        maingraphes: 'application/collections/maingraphes',

        // Manager
        EventManager: 'application/managers/EventManager',
        DataSocketManager: 'application/managers/sockets/dataSocketManager',
        ChatSocketManager: 'application/managers/sockets/chatSocketManager',
        CacheManager: 'application/managers/CacheManager',

        // Utils
        FormatUtils: 'application/utils/FormatUtils',
        GrapheExceptionsUtils: 'application/utils/GrapheExceptionsUtils'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone_params': {
            deps: ['backbone'],
            exports: 'Backone'
        },
        'd3': {
            deps: ['jquery'],
            exports: 'd3'
        },
        'foundation': {
            deps: ['jquery'],
            exports: 'foundation'
        }
    }
});