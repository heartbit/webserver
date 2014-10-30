require.config({
	baseUrl: '../',
	waitSeconds: 10
});

requirejs(['modules/common'], function() {
	require(['dashboardRouter', 'underscore', 'backbone-params', 'foundation', 'jquerySpin', 'gridster'], function(DashboardRouter, _, Backbone, foundation, $) {
		new DashboardRouter();
	});
});