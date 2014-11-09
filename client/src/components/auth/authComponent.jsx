var React = require('react/addons');
    
var Auth = React.createClass({
 getInitialState: function() {
 	return { blatte: true};
 },
 render: function(){
  return (
      <button className="btn btn-default" type="button"> Auth </button>
    )
 }
});

module.exports = Auth;