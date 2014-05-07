define('marketcapView', ['config','marketcap', 'text!marketcapView.html', 'FormatUtils'], 
    function(config,Marketcap, MarketcapViewTemplate, FormatUtils) {

    return Backbone.View.extend({

        el:'#js-marketcapDiv',

        templateMarketCap: _.template(MarketcapViewTemplate),
        

        item:"BTC",
        currency:"USD",
        initialize: function(params) {
            var self = this;
            this.viewName = params ? params.viewName: 'marketcap' ;
            this.marketcap = new Marketcap({url:config.marketcap.urlModel+"item="+this.item+"&currency="+this.currency});
            //_.bindAll(this, 'render', 'update');
            //this.render({viewName:'none'});
            //this.listenTo(this.marketcap,'change', this.render({viewName:'marketcap'})); 
            this.marketcap.fetch().done(function(){
                self.render({viewName:'marketcap'});
                self.initListener();
            });

        },
        initListener: function(){
            var self = this;
            $("#js-marketcap").click(function(){
                self.render({viewName:'marketcap'});
                self.initListener();
            });
            $("#js-price").click(function(){
                self.render({viewName:'price'});
                self.initListener();
            });
            $("#js-volume").click(function(){
                self.render({viewName:'volume'});
                self.initListener();
            });
        },
        render: function(params) {
            this.viewName= params ? params.viewName : this.viewName ;
            FormatUtils.formatCurrencyLabel
            this.marketCapJson = this.marketcap.toJSON();
            this.marketCapJson.price = FormatUtils.formatPrice( this.marketCapJson.price,'USD');
            this.marketCapJson.volume = FormatUtils.formatPrice( this.marketCapJson.volume,'BTC');
            this.marketCapJson.totalcoin = FormatUtils.formatPrice( this.marketCapJson.totalcoin,'BTC');
            this.marketCapJson.marketcap = FormatUtils.formatPrice( this.marketCapJson.marketcap,'USD');
            this.$el.html(this.templateMarketCap({viewName:params.viewName,marketcapTemplate:this.marketCapJson}));
            return this;
        }

    });

});