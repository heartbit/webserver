var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var SelectorStore = require('SelectorStore');
var SelectorActions = require('SelectorActions');
var moment = require('moment')
var RangeIntervalMatch = require('RangeIntervalMatch');


var ParameterSelectorWidget = React.createClass({
	
   getInitialState: function() {
	    return {
	    	selector:{
		    	params:{
		    		platform:'BITSTAMP',
		    		currency:'USD',
		    		item:'BTC',
		    		interval:'15m',
		    		range:'1d'
		    	}
	    	},
	    	platforms: ['BITSTAMP','TOKYOJPY','BITFINEX','RIPPLEFOX'],
	    	pairs: ['XRP/USD','XRP/BTC','BTC/USD'],
	    	range: ['12h','1d','3d','1w','2w','1m','3m','6m','1y','Max', 'Custom'],
	    	interval: ['1m','15m','1h','6h','12h','24h']
	    }
   },
   _onUpdateState : function(){
	    var selector = SelectorStore.getAll();
	    this.setState({
			selector: {
				params:selector
		    }
	    });
   },
   componentDidMount: function() {
	   SelectorStore.addChangeListener("change" ,this._onUpdateState);
   },
    
   componentWillUnmount: function() {
   },
   render: function() {
	    var selector = this.state.selector;
	    var platforms = this.state.platforms;
	    var pairs = this.state.pairs;
	    var range = this.state.range;
	    var interval = this.state.interval;
	    var currentInterval = this.state.selector.params.interval;
	    var currentRange = this.state.selector.params.range;



	 //   var pairs = _.map(platforms,function(value,key){
	 //    	 return _.map(value,function(pair){
	 //    		var ic = pair.split("-");
		// 	    return <option value={pair} name={key} >{pair}</option>
		// 	 })
		// });
		var pairs = _.map(pairs, function(value, key) {
			return <option value={value}>{value}</option>
		});
	    var platforms = _.map(platforms,function(value,key){
			return <option value={value}>{value}</option>
		});

		var range = RangeIntervalMatch.range(range, currentInterval);

		var interval = RangeIntervalMatch.interval(interval, currentRange, currentInterval);
	    console.log("STAAAAAAAAAAAAAAAAAAAAAAAAATTTEEEEEEEEEEEEEEEEEEE",this.state);
		if(this.state.selector.params.dateStart){

			var startDate = moment.unix(this.state.selector.params.dateStart).format('YYYY-MM-DD');
			var endDate = moment.unix(this.state.selector.params.dateEnd).format('YYYY-MM-DD');
			console.log("start-end",startDate,endDate);
		}
		// var newValue = this.state.selector.params.timeframe;

	    if(this.state.selector.params.range == 'Custom') {
		    var dateStart = <div>
								<label className={"dateLabel"} >Date Start :
									<input type="date" className={"dateInput"} defaultValue={startDate} onChange={this._changeDateStart}/>
								</label>
							</div>;
	        var dateEnd = 	<div>
								<label className={"dateLabel"} >Date End :
									<input type="date" className={"dateInput"} id="dateEnd" onChange={this._changeDateEnd} defaultValue={endDate} />
								</label>
							</div>;
		} else {
			var dateStart = null;
			var dateEnd = null;
		}
		// console.log(startDate)
		/*
		 *  <div>
				<select id="pairs" onChange={this._onPairsChange}>
				  {pairs}
				</select>
			  </div>
		 */
		return (
			<BaseWidget attributes={this.props.attributes}>
				<div className="mainSelector">
					<div>
						<label className={"platformLabel"}> Platform : 
							<select id="platforms" className={"simpleSelector platformSelect"} value={this.state.selector.params.platform} onChange={this._onPlatformChange}>
							  {platforms}
							</select>
						</label>
					</div>
					<div>
						<label className={"platformLabel"}> Pairs : 
							<select id="pairs" className={"simpleSelector platformSelect"} value={this.state.selector.params.platform} onChange={this._onPlatformChange}>
							  {pairs}
							</select>
						</label>
					</div>
			  	</div>
			  	<div className="dateField">
			  		<div>
						<label className={"dateLabel"}  >Range :
						  	<select id="range" className={"simpleSelector"} value={this.state.selector.params.range} onChange={this._onRangeChange}>
								{range}
						  	</select>
					  	</label>
				 	</div>
					{dateStart}
					{dateEnd}
					<div>
						<label className={"dateLabel"}  >Interval :
						  	<select id="interval" className={"simpleSelector"} value={this.state.selector.params.interval} onChange={this._onIntervalChange}>
						  		{interval}
						  	</select>
					  	</label>
				 	</div>
		      	</div>			  
			</BaseWidget>
		);
	},
   _onPlatformChange:function(e){
	   var selector = this.state.selector; 
	   selector.params.platform = e.target.value;
	   SelectorActions.refreshGraphAndKeyfact(selector.params);
	   this.setState({selector:selector});
   },
   _onPairsChange:function(e){
	   
   },

   _onRangeChange: function(e) {
   		var newRange = e.target.value;
   		if(newRange != "Custom") {
	   		var newParams = this.state.selector.params;
	   		var defaultInterval = RangeIntervalMatch.defaultInterval(newRange,newParams);
	   		newParams.range = newRange;
	   		newParams.interval = defaultInterval;
	   		SelectorActions.changeSelector(newParams);
	   	} else {
	   		var selector = this.state.selector;
	   		selector.params.range = 'Custom';
	   		this.setState({
	   			selector: selector
	   		});
	   	}
   },

   _onIntervalChange:function(e){
	   var newInterval = e.target.value;
	   var newParams = this.state.selector.params;
	   newParams.interval = newInterval;
	   SelectorActions.changeSelector(newParams);
   },
   _formatNewDateAndReturnSelector:function(date,dateType){
	   var selector = this.state.selector; 
	   var newDate = moment.utc(date).valueOf()/1000;
	   selector.params[dateType] = newDate;
	   return selector
   },
   _changeDateEnd:function(e){
   		var self = this;
   		var newDateEnd = moment(e.target.value).format('X');
   		var range = this.state.selector.params.range;
   		var defaultInterval = RangeIntervalMatch.defaultInterval(range,this.state.selector.params);
   	    var callback = function() {
            var newParams = self.state.selector.params;
            newParams.dateEnd = newDateEnd;
            newParams.interval = defaultInterval;
            SelectorActions.changeSelector(newParams);
        };
        this.delay()(callback, 500);
   },
   _changeDateStart:function(e){
   		var self=this;
   		var newDateStart = parseInt(moment(e.target.value).format('X'));
   		var range = this.state.selector.params.range;
   		var defaultInterval = RangeIntervalMatch.defaultInterval(range,this.state.selector.params);
   	    var callback = function() {
        	var newParams = self.state.selector.params;
        	newParams.dateStart = newDateStart;
        	newParams.interval = defaultInterval;
        	SelectorActions.changeSelector(newParams);
        };
        this.delay()(callback, 500);
   },

    delay: function() {
    	var self = this;
        this.timer;
   		return (function(){
            return function(callback, ms){
                clearTimeout(self.timer);

                self.timer = setTimeout(callback, ms);
            };
        })();
    }

});

module.exports = ParameterSelectorWidget;