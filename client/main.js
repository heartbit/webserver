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
        fuse: 'libs/fuse.min',

        // Screenshot
        html2canvas: 'libs/html2canvas',
        canvg: 'libs/canvg/canvg',
        rgbcolor: 'libs/canvg/rgbcolor',
        stackBlur: 'libs/canvg/StackBlur',

        // Routers
        indexRouter: 'application/app.router',

        // Views
        homeView: 'application/views/home/homeView',
        controllerView: 'application/views/controller/controllerView',
        headerView: 'application/views/header/headerView',
        itemControllerView: 'application/views/header/itemControllerView',

        // Embeddable views
        calculatorView:'application/views/calculator/calculatorView',
        weeknewsView: 'application/views/weeknews/weeknewsView',
        marketcapView: 'application/views/marketcap/marketcapView',
        mainView: 'application/views/main/mainView',
        keyFactsView: 'application/views/keyfacts/keyFactsView',
        mainchartcheckcontrollerView: 'application/views/controller/mainchartcheckcontrollerView',
        sidecontrollerView: 'application/views/controller/sidecontrollerView',
        indicatorscontrollerView: 'application/views/controller/indicatorscontrollerView',
        lastupdateView: 'application/views/lastupdate/lastupdateView',
        indicatorsView: 'application/views/indicators/indicatorsView',
        miskView: 'application/views/misk/miskView',
        newsView: 'application/views/news/newsView',

        // Menu
        graphmenuView: 'application/views/menu/graphmenuView',

        // Charts
        ////Mainchart
        mainchart: 'application/views/charts/mainchart/mainchart',
        candleLayer: 'application/views/charts/mainchart/candleLayer',
        areaLayer: 'application/views/charts/mainchart/areaLayer',
        volumeLayer: 'application/views/charts/mainchart/volumeLayer',

        miskbarchart: 'application/views/charts/misk/miskbarchart',
        miskhorizbarchart: 'application/views/charts/misk/miskhorizbarchart',
        miskpiechart: 'application/views/charts/misk/miskpiechart',
        depthchart: 'application/views/charts/depth/depthchart',
        'misc-bignumber': 'application/views/charts/utils/misc-bignumber',
        tooltip: 'application/views/charts/layers/tooltip/tooltip',

        // DataHelpers
        dataHelper: 'application/helpers/dataHelper',

        // Models
        depth: 'application/models/depth',
        maingraphe: 'application/models/maingraphe',
        ticker: 'application/models/ticker',
        trade: 'application/models/trade',
        item: 'application/models/item',
        // informationEvent: 'application/models/informationEvent',
        marketcap: 'application/models/marketcap',

        //Models util
        screenshot: 'application/models/utils/screenshot',

        // Collections
        maingraphes: 'application/collections/maingraphes',
        platforms: 'application/collections/platforms',
        tickers: 'application/collections/tickers',
        items: 'application/collections/items',
        news: 'application/collections/news',
        marketcaps: 'application/collections/marketcaps',

        // Manager
        EventManager: 'application/managers/EventManager',
        CacheManager: 'application/managers/CacheManager',
        DataSocketManager: 'application/managers/sockets/dataSocketManager',
        ChatSocketManager: 'application/managers/sockets/chatSocketManager',
        NewsSocketManager: 'application/managers/sockets/newsSocketManager',

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

requirejs(['backbone-params', 'd3', 'foundation'], function() {
    require(['indexRouter'], function(IndexRouter) {
        var router = new IndexRouter();
    });
});