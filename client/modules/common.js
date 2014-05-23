requirejs.config({

    baseUrl: "../",

    waitSeconds: 10,

    paths: {
        // Tests
        parametersManagerTests: 'tests/parametersManager.test',

        // Configs
        parametersManagerConfig: 'application/config/parametersManagerConfig',
        config: 'application/config/global',

        // General imports
        'backbone-params': 'libs/backbone/backbone.queryparams',
        backbone: 'libs/backbone/backbone.min',
        foundation: 'libs/foundation.min',
        underscore: 'libs/underscore-min',
        jquery: 'libs/jquery/jquery.min',
        socketio: 'libs/socket.io.min',
        modernizr: 'libs/modernizr',
        keymaster: 'libs/keymaster',
        text: 'libs/require/text',
        moment: 'libs/moment.min',
        cldr: 'libs/twitter_cldr',
        fuse: 'libs/fuse.min',
        d3: 'libs/d3.min',

        // Screenshot
        stackBlur: 'libs/export/canvg/StackBlur',
        html2canvas: 'libs/export/html2canvas',
        rgbcolor: 'libs/export/canvg/rgbcolor',
        canvg: 'libs/export/canvg/canvg',

        // Routers
        embedMarketCapRouter: 'application/routers/marketcap.embed.router',
        embedKeyfactsRouter: 'application/routers/keyfacts.embed.router',
        embedMaingraphRouter: 'application/routers/maingraph.embed.router',
        embedVolumeRouter: 'application/routers/volume.embed.router',
        embedPriceRouter: 'application/routers/price.embed.router',
        embedNewsRouter: 'application/routers/news.embed.router',
        appRouter: 'application/routers/app.router',

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
        volumewidgetView: 'application/views/volumewidget/volumewidgetView',
        selectCurrencyView: 'application/views/price/selectCurrencyView',
        calculatorView: 'application/views/calculator/calculatorView',
        lastupdateView: 'application/views/lastupdate/lastupdateView',
        indicatorsView: 'application/views/indicators/indicatorsView',
        marketcapView: 'application/views/marketcap/marketcapView',
        weeknewsView: 'application/views/weeknews/weeknewsView',
        keyFactsView: 'application/views/keyfacts/keyFactsView',
        priceView: 'application/views/price/priceView',
        mainView: 'application/views/main/mainView',
        miskView: 'application/views/misk/miskView',
        newsView: 'application/views/news/newsView',
        boxView: 'application/views/price/boxView',

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
        tooltip: 'application/views/charts/layers/tooltip/tooltip',
        miskbarchart: 'application/views/charts/misk/miskbarchart',
        depthchart: 'application/views/charts/depth/depthchart',
        // Timelinejs
        timelinejs: 'libs/timelinejs/timeline',
        storyjs: 'libs/timelinejs/storyjs-embed',

        // DataHelpers
        dataHelper: 'application/helpers/dataHelper',

        // Models
        information: 'application/models/information',
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
        trades: 'application/collections/trades',
        pairs: 'application/collections/pairs',
        items: 'application/collections/items',
        news: 'application/collections/news',

        // Manager
        DataSocketManager: 'application/managers/sockets/dataSocketManager',
        ChatSocketManager: 'application/managers/sockets/chatSocketManager',
        NewsSocketManager: 'application/managers/sockets/newsSocketManager',
        ParametersManager: 'application/managers/ParametersManager',
        ShortcutsManager: 'application/managers/ShortcutsManager',
        CacheManager: 'application/managers/CacheManager',
        EventManager: 'application/managers/EventManager',

        // Utils
        GrapheExceptionsUtils: 'application/utils/GrapheExceptionsUtils',
        FormatUtils: 'application/utils/FormatUtils'
    },

    shim: {
        'timelinejs': {
            deps: ['jquery', 'storyjs']
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-shortcuts': {
            deps: ['backbone'],
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