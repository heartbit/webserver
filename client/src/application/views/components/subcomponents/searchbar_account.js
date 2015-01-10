var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');
var RippledataActions = require('RippledataActions');
var GridStore = require('GridStore');
var addWidget = require('AddWidget'); //need to be loaded once to register itself to the dispatcher
var removeWidget = require('RemoveWidget');
/** @jsx React.DOM */


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},

	handleClick: function() {
		var orderGrid = function() {
			var $ungrid = $('.gridster >ul').children();

		};

		var loadGrid = function() {
			var gridsterChildren = GridStore.getSpecific('current');
			var gridsterKeys = [];
			// console.log(gridsterChildren);
			_.each(gridsterChildren.current.$widgets, function(children) {
				var isdatatype = $(children).attr("datatype");
				if(isdatatype!="undefined") {
					gridsterKeys.push($(children).attr("id"));
				}
			});
			// console.log("gridsterkeys",gridsterKeys);
			AccountActions.rippleid(toresolve,gridsterKeys);
			// RippledataActions.exchangerates();
		}

		var input = $('#search input').val();
		toresolve = input.split(",");

		var existingblock = ($('.gridster >ul').children().length);
		var neededblock = Config.dashboards.account.items.length*toresolve.length;
		var todelete = {start:(neededblock),end:existingblock};
		var toadd = (neededblock/3)-(existingblock/3);

		if( neededblock > existingblock ) {

			var blocknum = existingblock/3;
			for(i=0; i<toadd; i++) {
				var newBlock = [];
				_.each(Config.dashboards.account.items, function(itemtoclone) {
					newBlock.push(_.clone(itemtoclone));
				});
				DashboardActions.addwidget(newBlock,blocknum);
				blocknum = blocknum+1;
			}
			loadGrid($('.gridster >ul').children());
			// console.log($('.gridster >ul').children());
		} else if( existingblock > neededblock) {	
			var removewidget = DashboardActions.removewidget(todelete);	
		}else {
			loadGrid($('.gridster >ul').children());

		};
	
	},

	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	render: function(){

		return ( 
		 <div id="search">
                  <input onKeyPress={this.handleKeyPress} type="text"  placeholder="btc/xrp address or ~ripplename"/>
                  <i onClick={this.handleClick}  className="fa fa-search"></i>
         </div>
		)
		
	}
});

module.exports = SearchBar;