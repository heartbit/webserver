if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(['ParametersManager'], function(ParametersManager) {
    return {
        run: function(params) {
            describe('ParametersManager tests', function() {

                before(function(done) {
                    console.log('before done');
                    done();
                });
                
                after(function(done) {
                    console.log('after done');
                    done();
                });

                it('Should create a many to many relation', function(done) {
                    assert(1, true);
                    done();
                });

            });
        }
    };
});