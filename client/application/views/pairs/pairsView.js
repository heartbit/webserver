define('pairsView', ['config', 'text!pairsView.html', 'ParametersManager'], function(config, PairsTemplate, ParametersManager) {

    return Backbone.View.extend({

        template: _.template(PairsTemplate),
        events: {
          'click .js-pair': 'changeGlobalPair',
          'click .js-item': 'displayairs'
        },
        initialize: function() {
          var self = this;
          _.bindAll(this,
            'render'
          );
        },

        render: function() {
          var models = ParametersManager.getPairs().models;
          var item = ParametersManager.getCurrentParams().item;
          var platform = ParametersManager.getCurrentPlatformPairs();
          models.sort(
            function(m1, m2) {
              var item1 = m1.id.split("/")[0];
              var item2 = m2.id.split("/")[0];
              if (item2 === item && item1 === item) {
                return 0;
              } else if (item2 === item && item1 !== item) {
                return 1;
              } else if (item1 === item && item2 !== item) {
                return -1;
              }
              return m1.id > m2.id ? 1 : -1;
            });
          var platformItems = _.unique(
              _.map(
                _.filter(models, function(model) {
                  return model.id.split("/")[0];
                })
              ));
              var items = _.unique(
                _.map(_.filter(models, function(model) {
                  return (_.contains(model.platforms, platform.id) && model.platforms.length > 1) || (!_.contains(model.platforms, platform.id) && model.platforms.length > 0)
                }), function(model) {
                  return model.id.split("/")[0];
                })
              ); this.$el.html(this.template({
                platformItems: platformItems,
                items: items,
                pairs: models,
                platform: platform,
                item: item
              })); $(document).foundation();
              return this;
            },
            changeGlobalPair: function(event) {
              var currentPlatform = ParametersManager.getCurrentPlatformPairs();
              var pairId = $(event.target).attr('data-pair-id');
              var platformId = currentPlatform.id;
              if (!_.contains(currentPlatform.pairs, pairId)) {
                platformId = ParametersManager.getPlatformByPairId(pairId);
              }
              ParametersManager.changeGlobalPair(pairId, platformId);
              this.$el.foundation('reveal', 'close');
              return false;
            },
            displayairs: function(event) {
              var itemId = $(event.target).attr('data-item-id');
              var item = $("." + itemId);
              if (!item.hasClass('displayed')) {
                $("." + itemId).addClass('displayed');
                $("." + itemId).show();
                //$("#"+itemId +" span.close").show();
              } else {
                $("." + itemId).removeClass('displayed');
                $("." + itemId).hide();
              }
            }


        });

    });