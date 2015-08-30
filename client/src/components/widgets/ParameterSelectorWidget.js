var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var SelectorStore = require('SelectorStore');
var SelectorActions = require('SelectorActions');
var moment = require('moment')
var ParameterSelectorWidget = React.createClass({
	
   getInitialState: function() {
	    return {
	    	selector:{
		    	params:{
		    		platform:'BITSTAMP',
		    		currency:'USD',
		    		item:'BTC',
		    		agregat_type:'1h',
		    	}
	    	},
	    	platforms: ['BITSTAMP','TOKYOJPY','BITFINEX','RIPPLEFOX'],
	    	pairs: ['XRP/USD','XRP/BTC','BTC/USD']
	    }
   },
   _onUpdateState : function(){
	   var selector = SelectorStore.getAll();
	   this.setState({
		   selector:selector
	   });
   },
   componentDidMount: function() {
	   SelectorStore.addChangeListener("change" ,this._onUpdateState);
   },
    
   componentWillUnmount: function() {
   },
   _onPlatformChange:function(e){
	   var selector = this.state.selector; 
	   selector.params.platform = e.target.value;
	   SelectorActions.refreshGraphAndKeyfact(selector.params);
	   this.setState({selector:selector});
   },
   _onPairsChange:function(e){
	   
   },
   _onAgregatChange:function(e){
	   var selector = this.state.selector; 
	   selector.params.agregat_type = e.target.value;
	   SelectorActions.refreshGraphAndKeyfact(selector.params);
	   this.setState({selector:selector});
   },
   _formatNewDateAndReturnSelector:function(date,dateType){
	   var selector = this.state.selector; 
	   var newDate = moment.utc(date).valueOf()/1000;
	   selector.params[dateType] = newDate;
	   return selector
   },
   _changeDateEnd:function(e){
	   var selector =this._formatNewDateAndReturnSelector(e.target.value,'dateEnd');
	   SelectorActions.refreshGraphAndKeyfact(selector.params);
	   this.setState({selector:selector});
   },
   _changeDateStart:function(e){
	   var selector = this._formatNewDateAndReturnSelector(e.target.value,'dateStart')
	   SelectorActions.refreshGraphAndKeyfact(selector.params);
	   this.setState({selector:selector});
   },
   render: function() {
	   var selector = this.state.selector;
	   var platforms = this.state.platforms;

	   var pairs = _.map(platforms,function(value,key){
	    	 return _.map(value,function(pair){
	    		var ic = pair.split("-");
			    return <option value={pair} name={key} >{pair}</option>
			 })
		});
	    var platforms = _.map(platforms,function(value,key){
	    	console.log("valuuuuue,keyyy",value,key);
			return <option value={value}>{value}</option>
		});
	    
		if(this.state.selector.params.dateStart){
			var startDate = moment.unix(this.state.selector.params.dateStart).format('YYYY-MM-DD');
			var endDate = moment.unix(this.state.selector.params.dateEnd).format('YYYY-MM-DD');
		}
		// console.log(startDate)
		var newValue = this.state.selector.params.timeframe;
		/*
		 *  <div>
				<select id="pairs" onChange={this._onPairsChange}>
				  {pairs}
				</select>
			  </div>
		 */
		return (
			<BaseWidget attributes={this.props.attributes}>
				<div className="platformSelector">
					<label> Platform : 
						<select id="platforms" className={"simpleSelector"} value={this.state.selector.params.platform} onChange={this._onPlatformChange}>
						  {platforms}
						</select>
					</label>
			  	</div>
			  	<div className="dateField">
					<div>
						<label className={"dateLabel"} >Date Start :
							<input type="date" className={"dateInput"} value={startDate} onChange={this._changeDateStart}/>
						</label>
					</div>
					<div>
						<label className={"dateLabel"} >Date End :
							<input type="date" className={"dateInput"} id="dateEnd" onChange={this._changeDateEnd} value={endDate} />
						</label>
					</div>
					<div>
						<label>Agregat Type :
						  	<select id="aggregatType" className={"simpleSelector"} value={this.state.selector.params.agregat_type} onChange={this._onAgregatChange}>
						  		<option value="1m">1m</option>
						  		<option value="15m">15m</option>
						  		<option value="1h">1h</option>
						  		<option value="6h">6h</option>
						  		<option value="12h">12h</option>
						  		<option value="24h">24h</option>
						  	</select>
					  	</label>
				 	</div>
		      	</div>			  
			</BaseWidget>
		);
	}

});

module.exports = ParameterSelectorWidget;