var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');
var GridStore = require('GridStore');
var addWidget = require('AddWidget'); //need to be loaded once to register itself to the dispatcher
var removeWidget = require('RemoveWidget');
/** @jsx React.DOM */


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},

	handleClick: function() {
		var loadGrid = function() {
			var gridsterChildren = GridStore.getSpecific('current');
			// var gridsterChildren= $('.gridster >ul').children();
			var gridsterKeys = [];
			console.log("LOADGRID",gridsterChildren);
			_.each(gridsterChildren.current.items, function(children) {
				console.log("children",children);
				var isdatatype = children.datatype;
				console.log("isdatatype",isdatatype);
				if(isdatatype!=undefined) {
					gridsterKeys.push(children.key);
				}
			});

			
			// console.log("gridsterkeysSearchbar",gridsterKeys);
			AccountActions.rippleid(toresolve,gridsterKeys);
		}
		var input = $('#search input').val();
		toresolve = input.split(",");

		var existingblock = ($('.gridster >ul').children().length);
		var neededblock = Config.dashboards.account.items.length*toresolve.length;
		var todelete = {start:(neededblock),end:existingblock};
		var toadd = (neededblock/3)-(existingblock/3);
		// console.log("neededblock",neededblock);
		// console.log("existingblock",existingblock);
		// console.log("todelete",todelete);

		if( neededblock > existingblock ) {
			for(i=0; i<toadd; i++) {
				newBlock = [];
				_.each(Config.dashboards.account.items, function(itemtoclone) {
					newBlock.push(_.clone(itemtoclone));
				});
				DashboardActions.addwidget(newBlock);
				
			}
			loadGrid($('.gridster >ul').children());
		} else if( existingblock > neededblock) {	
			var removewidget = DashboardActions.removewidget(todelete);	
			console.log("RETOURREMOVE",DashboardActions.removewidget(todelete));
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