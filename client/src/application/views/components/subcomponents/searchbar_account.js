var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');

var addWidget = require('AddWidget'); //need to be loaded once to register itself to the dispatcher
var removeWidget = require('RemoveWidget');
/** @jsx React.DOM */


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},

	handleClick: function() {
		var loadGrid = function() {
	
			var gridsterChildren= $('.gridster >ul').children();
			var gridsterKeys = [];
			// console.log("LOADGRID",gridsterChildren);
			_.each(gridsterChildren, function(children) {
				var isdatatype = $('#'+children.id).attr('datatype');
				if(isdatatype!="undefined") {
					gridsterKeys.push(children.id);
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
			loadGrid();
		} else if( existingblock > neededblock) {
			DashboardActions.removewidget(todelete);
			loadGrid();
		}else {
			loadGrid();
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