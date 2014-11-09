define('AnalyticsManager', ['backbone'], function(Backbone) {

    var instance = null;

    function AnalyticsManager() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one AnalyticsManager, use AnalyticsManager.getInstance() faggot ;-) ");
        }
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        window._gaq = window._gaq || [];

        _gaq.push(['_setAccount', 'UA-47874156-2']);
        ga('create', 'UA-47874156-2', 'heartbit.io');
        ga('require', 'displayfeatures');
        _gaq.push(['_trackPageview']);
        ga('send', 'pageview');
    };

    AnalyticsManager.sendGAEvent = function(customEvents) {
        var _this = this;
        _.each(customEvents, function(e) {
            ga('send', 'event', e.category, e.action || ' ', e.label || '', e.value || null);
        });
    };

    AnalyticsManager.getInstance = function() {
        if (instance === null) {
            instance = new AnalyticsManager();
        }
        return instance;
    };

    return AnalyticsManager.getInstance();

});