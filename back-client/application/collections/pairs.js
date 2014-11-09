define('pairs', ['config', 'pair', 'fuse'], function(config, Pair, Fuse) {

    var Pairs = Backbone.Collection.extend({

        initFromIds: function(ids) {
            var self = this;
            _.each(ids, function(id) {
                self.add(new Pair(id));
            });

            var options = {
                keys: ['id'],
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