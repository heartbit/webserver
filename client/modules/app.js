require.config({
	baseUrl: '../',
	waitSeconds: 10
});

requirejs(['modules/common'], function() {
	require(['appRouter', 'underscore', 'backbone-params', 'foundation', 'jquerySpin', 'gridster'], function(AppRouter, _, Backbone, foundation, $) {
		new AppRouter();
	});
});