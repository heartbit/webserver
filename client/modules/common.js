requirejs.config({

    baseUrl: "../",

    paths: {
        config: 'application/config/global',
        parametersManagerConfig: 'application/config/parametersManagerConfig',

        // General imports
        'backbone-params': 'libs/backbone.queryparams',
        foundation: 'libs/foundation.min',
        underscore: 'libs/underscore-min',
        modernizr: 'libs/modernizr',
        backbone: 'libs/backbone-min',
        socketio: 'libs/socket.io.min',
        jquery: 'libs/jquery.min',
        moment: 'libs/moment.min',
        text: 'libs/text',
        cldr: 'libs/twitter_cldr',
        fuse: 'libs/fuse.min',
        d3: 'libs/d3.min',

        // Screenshot
        html2canvas: 'libs/html2canvas',
        stackBlur: 'libs/canvg/StackBlur',
        rgbcolor: 'libs/canvg/rgbcolor',
        canvg: 'libs/canvg/canvg',

        // Routers
        appRouter: 'application/routers/app.router',
        embedMarketCapRouter: 'application/routers/marketcap.embed.router',
        embedKeyfactsRouter: 'application/routers/keyfacts.embed.router',
        embedMaingraphRouter: 'application/routers/maingraph.embed.router',
        embedVolumeRouter: 'application/routers/volume.embed.router',

        // Views
        currenciesView: 'application/views/currencies/currenciesView',
        controllerView: 'application/views/controller/controllerView',
        platformsView: 'application/views/platforms/platformsView',
        headerView: 'application/views/header/headerView',
        itemsView: 'application/views/items/itemsView',
        pairsView: 'application/views/pairs/pairsView',
        homeView: 'application/views/home/homeView',

        // Embeddable views
        mainchartcheckcontrollerView: 'application/views/controller/mainchartcheckcontrollerView',
        indicatorscontrollerView: 'application/views/controller/indicatorscontrollerView',
        sidecontrollerView: 'application/views/controller/sidecontrollerView',
        calculatorView: 'application/views/calculator/calculatorView',
        lastupdateView: 'application/views/lastupdate/lastupdateView',
        indicatorsView: 'application/views/indicators/indicatorsView',
        marketcapView: 'application/views/marketcap/marketcapView',
        weeknewsView: 'application/views/weeknews/weeknewsView',
        keyFactsView: 'application/views/keyfacts/keyFactsView',
        mainView: 'application/views/main/mainView',
        miskView: 'application/views/misk/miskView',
        newsView: 'application/views/news/newsView',
        volumewidgetView: 'application/views/volumewidget/volumewidgetView',

        // Menu
        graphmenuView: 'application/views/menu/graphmenuView',

        // Charts
        /// Mainchart
        candleLayer: 'application/views/charts/mainchart/candleLayer',
        volumeLayer: 'application/views/charts/mainchart/volumeLayer',
        areaLayer: 'application/views/charts/mainchart/areaLayer',
        mainchart: 'application/views/charts/mainchart/mainchart',

        miskhorizbarchart: 'application/views/charts/misk/miskhorizbarchart',
        'misc-bignumber': 'application/views/charts/utils/misc-bignumber',
        miskpiechart: 'application/views/charts/misk/miskpiechart',
        miskbarchart: 'application/views/charts/misk/miskbarchart',
        depthchart: 'application/views/charts/depth/depthchart',
        tooltip: 'application/views/charts/layers/tooltip/tooltip',

        // DataHelpers
        dataHelper: 'application/helpers/dataHelper',

        // Models
        maingraphe: 'application/models/maingraphe',
        marketcap: 'application/models/marketcap',
        currency: 'application/models/currency',
        platform: 'application/models/platform',
        ticker: 'application/models/ticker',
        trade: 'application/models/trade',
        depth: 'application/models/depth',
        pair: 'application/models/pair',
        item: 'application/models/item',

        //Models util
        screenshot: 'application/models/utils/screenshot',

        // Collections
        maingraphes: 'application/collections/maingraphes',
        currencies: 'application/collections/currencies',
        marketcaps: 'application/collections/marketcaps',
        platforms: 'application/collections/platforms',
        tickers: 'application/collections/tickers',
        pairs: 'application/collections/pairs',
        items: 'application/collections/items',
        news: 'application/collections/news',

        // Manager
        DataSocketManager: 'application/managers/sockets/dataSocketManager',
        ChatSocketManager: 'application/managers/sockets/chatSocketManager',
        NewsSocketManager: 'application/managers/sockets/newsSocketManager',
        CacheManager: 'application/managers/CacheManager',
        EventManager: 'application/managers/EventManager',
        ParametersManager: 'application/managers/ParametersManager',
        
        // Utils
        GrapheExceptionsUtils: 'application/utils/GrapheExceptionsUtils',
        FormatUtils: 'application/utils/FormatUtils'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-params': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'd3': {
            deps: ['jquery'],
            exports: 'd3'
        },
        'foundation': {
            deps: ['jquery'],
            exports: 'foundation'
        },
        'html2canvas': {
            exports: 'html2canvas'
        },
        'fuse': {
            exports: 'fuse'
        },
        'canvg': {
            deps: ['rgbcolor', 'stackBlur'],
            exports: 'canvg'
        }
    }
});
