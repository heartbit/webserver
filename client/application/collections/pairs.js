define('pairs', ['config', 'pair', 'fuse'], function(config, Pair, Fuse) {

    var Pairs = Backbone.Collection.extend({

        initialize: function(ids) {

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

    return Pairs;

});