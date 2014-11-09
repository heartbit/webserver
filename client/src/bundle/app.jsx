require('jquery');
require('bootstrap');
var Backbone = require('backbone');
var React = require("react");

var Topbar = require('Topbar');
var Sidemenu = require('Sidemenu');
var Bottombar = require('Bottombar');
var Dashboard = require('Dashboard');


function MessagesMenuWidth() {
	var W = window.innerWidth;
	var W_menu = $('#sidebar-left').outerWidth();
	var w_messages = (W - W_menu) * 16.666666666666664 / 100;
	$('#messages-menu').width(w_messages);
};

var launch = function() {
	React.render(Topbar, document.querySelector('#topbar'));
	// React.render(Sidemenu, document.querySelector('#sidebar-left'));
	// React.render(<Dashboard /> , document.querySelector('#content'));
	// React.render(Bottombar, document.querySelector('#bottombar'));

	$('.show-sidebar').on('click', function(e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});

	return Backbone.history.start({
		pushState: false
	});
};

launch();