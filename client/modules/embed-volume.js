require.config({
	baseUrl: '../',
	waitSeconds: 10
});
requirejs(['modules/common'], function() {
    require(['embedVolumeRouter', 'underscore', 'backbone-params', 'foundation'], function(EmbedVolumeRouter, _ , Backbone, foundation) {
        new EmbedVolumeRouter();
    });
});