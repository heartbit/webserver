var React = require('react');


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},

	render: function(){

		return ( 
		 <div id="search">
                  <input onKeyPress={this.handleKeyPress} type="text"  placeholder="pair/platform"/>
                  <i onClick={this.handleClick}  className="fa fa-search"></i>
         </div>
		)
		
	}

});

module.exports = SearchBar;