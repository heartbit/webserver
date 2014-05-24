define('pairsView', ['config', 'text!pairsView.html', 'ParametersManager'], function(config, PairsTemplate, ParametersManager) {

    return Backbone.View.extend({

        template: _.template(PairsTemplate),
        events: {
            'click .js-pair': 'changeGlobalPair'
        },
        initialize: function() {
            var self = this;
            _.bindAll(this,
                'render'
            );
        },

        render: function() {
            var models =  ParametersManager.getPairs().models;
            var item = ParametersManager.getCurrentParams().item;
            models.sort(
                function(m1,m2){
                    var item1 = m1.id.split("/")[0];
                    var item2 = m2.id.split("/")[0];
                    if ( item2 === item && item1 === item ) {
                        return 0;
                    }
                    else if ( item2 === item && item1 !== item ) {
                        return 1;
                    }
                    else if ( item1 === item && item2 !== item ) {
                        return -1;
                    }
                    return m1.id > m2.id ? 1 : -1;
                });

            this.$el.html(this.template({
                pairs:models,
                platform:ParametersManager.getCurrentPlatformPairs(),
                item:item
            }));
            $(document).foundation();
            return this;
        },
        changeGlobalPair: function(event) {
            var currentPlatform =  ParametersManager.getCurrentPlatformPairs();
            var pairId = $(event.target).attr('data-pair-id');
            var platformId = currentPlatform.id;
            if ( !_.contains(currentPlatform.pairs,pairId) ){
                platformId = ParametersManager.getPlatformByPairId(pairId);
            }
            ParametersManager.changeGlobalPair(pairId,platformId);
            this.$el.foundation('reveal', 'close');
            return false;
        }


    });

});