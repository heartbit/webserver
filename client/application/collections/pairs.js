define('pairs', ['config', 'pair', 'fuse'], function(config, Item, Fuse) {

    var Items = Backbone.Collection.extend({

        url: config.item.urlCollection,

        initialize: function() {
            this.on('change reset add remove', this.indexItems, this);
            this.searchIndex = new Fuse();
        },

        indexItems: function() {
            var options = {
                keys: ['name', 'id'],
            };
            this.searchIndex = new Fuse(this.models, options);
        },

        search: function(query) {
            var results = this.searchIndex.search(query);
            return results;
        },

        parse: function(response) {
            this.models = _.uniq(response, function(item) {
                return item.id;
            });
            this.trigger('change');
        }

    });

    return Items;

});