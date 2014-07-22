requirejs.config({

    paths: {
        // Tests
        parametersManagerTests: 'tests/parametersManager.test',

        // Configs
        parametersManagerConfig: 'application/config/parametersManagerConfig',
        config: 'application/config/global',

        // General imports
        tablesorter_widget: 'libs/jquery/jquery.tablesorter.widgets.min',
        gridster: 'libs/jquery/jquery.gridster.with-extras.min',
        'backbone-params': 'libs/backbone/backbone.queryparams',
        tablesorter: 'libs/jquery/jquery.tablesorter.min',
        metadata: 'libs/jquery/jquery.metadata',
        backbone: 'libs/backbone/backbone.min',
        jquerySpin: 'libs/jquery/jquery.spin',
        foundation: 'libs/foundation.min',
        underscore: 'libs/underscore-min',
        jquery: 'libs/jquery/jquery.min',
        socketio: 'libs/socket.io.min',
        modernizr: 'libs/modernizr',
        keymaster: 'libs/keymaster',
        text: 'libs/require/text',
        moment: 'libs/moment.min',
        numeral: 'libs/numeral',
        spin: 'libs/spin.min',
        fuse: 'libs/fuse.min',
        d3tip: 'libs/d3tip',
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
        embedDepthRouter: 'application/routers/depth.embed.router',
        embedNewsRouter: 'application/routers/news.embed.router',
        appRouter: 'application/routers/app.router',

        // Views
        selectCurrencyView: 'application/views/price/selectCurrencyView',
        currenciesView: 'application/views/currencies/currenciesView',
        controllerView: 'application/views/controller/controllerView',
        platformsView: 'application/views/platforms/platformsView',
        shortcutsView: 'application/views/shortcuts/shortcutsView',
        headerView: 'application/views/header/headerView',
        itemsView: 'application/views/items/itemsView',
        pairsView: 'application/views/pairs/pairsView',

        // Embeddable views
        volumewidgetView: 'application/views/volumewidget/volumewidgetView',
        calculatorView: 'application/views/calculator/calculatorView',
        lastupdateView: 'application/views/lastupdate/lastupdateView',
        marketcapView: 'application/views/marketcap/marketcapView',
        weeknewsView: 'application/views/weeknews/weeknewsView',
        keyFactsView: 'application/views/keyfacts/keyFactsView',
        priceView: 'application/views/price/priceView',
        depthView: 'application/views/depth/depthView',
        mainView: 'application/views/main/mainView',
        miskView: 'application/views/misk/miskView',
        newsView: 'application/views/news/newsView',
        boxView: 'application/views/price/boxView',

        // Menu
        offcanvasmenuView: 'application/views/menus/offcanvasmenuView',
        graphmenuView: 'application/views/menus/graphmenuView',

        // Charts
        /// Mainchart
        candleLayer: 'application/views/charts/mainchart/candleLayer',
        volumeLayer: 'application/views/charts/mainchart/volumeLayer',
        areaLayer: 'application/views/charts/mainchart/areaLayer',
        newsLayer: 'application/views/charts/mainchart/newsLayer',
        mainchart: 'application/views/charts/mainchart/mainchart',

        //marketcap
        bubbleMarketcapChart: 'application/views/charts/marketcap/bubblemarketcapChart',
        marketcapchart: 'application/views/charts/marketcap/marketcapchart',
        bubbleTooltip: 'application/views/charts/marketcap/bubbleTooltip',

        horizBarChart: 'application/views/charts/misk/horizBarChart',
        bignumber: 'application/views/charts/utils/bignumber',
        miskpiechart: 'application/views/charts/misk/miskpiechart',
        tooltip: 'application/views/charts/layers/tooltip/tooltip',
        miskbarchart: 'application/views/charts/misk/miskbarchart',
        depthchart: 'application/views/charts/depth/depthchart',
        // News timelinejs
        storyjs: 'libs/timelinejs/storyjs-embed',
        timelinejs: 'libs/timelinejs/timeline',

        // DataHelpers
        depthDataHelper: 'application/helpers/depthDataHelper',
        dataHelper: 'application/helpers/dataHelper',

        // Models
        information: 'application/models/information',
        networkdata: 'application/models/networkdata',
        maingraphe: 'application/models/maingraphe',
        calculator: 'application/models/calculator',
        marketcap: 'application/models/marketcap',
        currency: 'application/models/currency',
        platform: 'application/models/platform',
        ticker: 'application/models/ticker',
        fbpost: 'application/models/fbpost',
        tweet: 'application/models/tweet',
        trade: 'application/models/trade',
        depth: 'application/models/depth',
        pair: 'application/models/pair',
        item: 'application/models/item',

        //Models util
        screenshot: 'application/models/utils/screenshot',

        // Collections
        networkdatas: 'application/collections/networkdatas',
        maingraphes: 'application/collections/maingraphes',
        calculators: 'application/collections/calculators',
        currencies: 'application/collections/currencies',
        marketcaps: 'application/collections/marketcaps',
        platforms: 'application/collections/platforms',
        tickers: 'application/collections/tickers',
        fbposts: 'application/collections/fbposts',
        tweets: 'application/collections/tweets',
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
        AnalyticsManager: 'application/managers/AnalyticsManager',
        CacheManager: 'application/managers/CacheManager',
        EventManager: 'application/managers/EventManager',

        // Utils
        GrapheExceptionsUtils: 'application/utils/GrapheExceptionsUtils',
        FormatUtils: 'application/utils/FormatUtils'
    },

    shim: {
        'storyjs': {},
        'timelinejs': {
            deps: ['jquery', 'storyjs']
        },
        'underscore': {
            exports: '_'
        },
        'jquerySpin': {
            deps: ['jquery'],
            exports: '$'
        },
        'tablesorter': {
            deps: ['jquery'],
            exports: '$'
        },
        'tablesorter_widget': {
            deps: ['jquery'],
            exports: '$'
        },
        'gridster': {
            deps: ['jquery'],
            exports: '$'
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
        'numeral': {
            exports: 'numeral'
        },
        'd3tip': {
            deps: ['d3'],
            exports: 'd3tip'
        },
        'foundation': {
            deps: ['jquery'],
            exports: 'foundation'
        },
        'keymaster': {
            exports: 'keymaster'
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