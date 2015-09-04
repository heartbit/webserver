var React = require('react/addons');
var BaseWidget = require('BaseWidget');
var SelectorStore = require('SelectorStore');
var PlatformStore = require('PlatformStore');
var MaingraphStore = require('MaingraphStore');
var SelectorActions = require('SelectorActions');
var DashboardActions = require('DashboardActions');
var moment = require('moment')
var RangeIntervalMatch = require('RangeIntervalMatch');
var PairsPlatformsMatch = require('PairsPlatformsMatch');
var Config = require('Config');


var ParameterSelectorWidget = React.createClass({
	
   getInitialState: function() {
	    return {
	    	selector:{
		    	params:{
		    		platform:'BITSTAMP',
		    		currency:'XRP',
		    		item:'USD',
		    		interval:'15m',
		    		range:'1d',
		    		pair: 'XRP/USD'
		    	}
	    	},
	    	platforms: [],
	    	pairs: [],
	    	allPlatforms: {},
	    	range: ['12h','1d','3d','1w','2w','1m','3m','6m','1y','Max', 'Custom'],
	    	interval: ['1m','15m','1h','6h','12h','24h'],
	    	mainGraphParams: MaingraphStore.getSpecific('params')
	    }
   },
   _onUpdateState : function(){
	    var selector = SelectorStore.getAll();
	    selector.pair = selector.item + '/' + selector.currency;
	    this.setState({
			selector: {
				params:selector
		    }
	    });
   },
   componentDidMount: function() {
	   SelectorStore.addChangeListener("change" ,this._onUpdateState);
	   PlatformStore.addChangeListener("change", this._onUpdatePlatforms);
	   MaingraphStore.addChangeListener("change", this._onMaingraphNewparams);
   },
    
   componentWillUnmount: function() {
   },
   render: function() {
   		var self = this;
	    var selector = this.state.selector;
	    var platforms = this.state.platforms;
	    var pairs = this.state.pairs;
	    var range = this.state.range;
	    var interval = this.state.interval;
	    var currentInterval = this.state.selector.params.interval;
	    var currentRange = this.state.selector.params.range;

		var pairs = _.map(pairs, function(value, key) {
			return <option value={value}>{value}</option>
		});
	    var platforms = _.map(platforms,function(value,key){
			return <option value={value}>{value}</option>
		});

		var range = RangeIntervalMatch.range(range, currentInterval);

		var interval = RangeIntervalMatch.interval(interval, currentRange, currentInterval);

		if(this.state.selector.params.dateStart){
			var startDate = moment.unix(this.state.selector.params.dateStart).format('YYYY-MM-DD');
			var endDate = moment.unix(this.state.selector.params.dateEnd).format('YYYY-MM-DD');
		}


	    if(this.state.selector.params.range == 'Custom') {
		    var dateStart = <div>
								<label className={"dateLabel"} >Date Start :
									<input type="date" className={"dateInput"}  onChange={this._changeDateStart} value={startDate} />
								</label>
							</div>;
	        var dateEnd = 	<div>
								<label className={"dateLabel"} >Date End :
									<input type="date" className={"dateInput"} id="dateEnd" onChange={this._changeDateEnd} value={endDate} />
								</label>
							</div>;
		} else {
			var dateStart = null;
			var dateEnd = null;
		}

		if(this.state.mainGraphParams) {
			var checkboxes = {};
			_.each(this.state.mainGraphParams, function(value, param) {
				if(value) {
					checkboxes[param] = <input onChange={self._onSelectGraphParams} type="checkbox"  value={param} checked/>;
				} else {
					checkboxes[param] = <input onChange={self._onSelectGraphParams} type="checkbox" value={param} />;
				}
			});
		}

		return (
			<BaseWidget attributes={this.props.attributes}>
				<div className="mainSelector">
					<div>
						<label className={"platformLabel"}> Pairs : 
							<select id="pairs" className={"simpleSelector platformSelect"} value={this.state.selector.params.pair} onChange={this._onPairChange}>
							  {pairs}
							</select>
						</label>
					</div>
					<div>
						<label className={"platformLabel"}> Platform : 
							<select id="platforms" className={"simpleSelector platformSelect"} value={this.state.selector.params.platform} onChange={this._onPlatformChange}>
							  {platforms}
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
		      	{ this.state.mainGraphParams ?
			      	<div className="secondarySelector">
			      		<div>
				      		<label > Area
				      			{checkboxes.areaLayer}
				      		</label>
				      	</div>
				      	<div>
				      		<label> Volume
				      			{checkboxes.volumeLayer}
				      		</label>
				      	</div>
			      	</div>
			    : "" }			  
			</BaseWidget>
		);
	},

	_onUpdatePlatforms: function() {
		var p = PlatformStore.getAll();
   		var platforms = [];
   		var pairs = [];
   		_.each(p.platforms, function(pair, platform) {
   			platforms.push(platform);
   			_.each(pair, function(value, key) {
   				value = (value.split(';')).join('/');
   				pairs.push(value);
   			});
   		});
   		pairs = _.uniq(pairs);
   		this.setState({
   			platforms: platforms,
   			pairs: pairs,
   			allPlatforms: p
   		});
	},

   _onPlatformChange:function(e){
   		var selectedPlatform = e.target.value;
   		var allPlatforms = this.state.allPlatforms;
   		var defaultPairs = Config.platforms.defaultpairs;
	   	var selector = this.state.selector.params; 
	   	var newPair = PairsPlatformsMatch.getPair(selectedPlatform,selector, allPlatforms, defaultPairs);

	    selector.platform = e.target.value;
	    selector.item = newPair[0];
	    selector.currency = newPair[1];
	    selector.pair = newPair.join('/');
	   	SelectorActions.changeSelector(selector);
	   	this.setState({
	   		selector: {
	   			params:selector	   			
	   		}
	   	});
   },
   _onPairChange:function(e){
   		var selectedPair = e.target.value;
   		var allPlatforms = this.state.allPlatforms;
   		var defaultPlatforms = Config.platforms.defaultplatforms;
	   	var selector = this.state.selector.params; 
	   	var newPlatform = PairsPlatformsMatch.getPlatform(selectedPair, selector, allPlatforms, defaultPlatforms);   

	   	selector.platform = newPlatform;
	   	selector.item = selectedPair.split('/')[0];
	   	selector.currency = selectedPair.split('/')[1];
	   	selector.pair = selectedPair;
	   	SelectorActions.changeSelector(selector);
	   	this.setState({
	   		selector: {
	   			params:selector
	   		}
	   	});
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
   		var currentDate = Math.floor(new Date().getTime()/1000);
   		if(e.target.value == '') {
   			var newDateEnd = currentDate; 
   		} else {
   			newDateEnd = parseInt(moment(e.target.value).format('X'));
   		}
   		var range = this.state.selector.params.range;
   	    var callback = function() {
   			if(newDateEnd > currentDate) { newDateEnd = currentDate;}

            var newParams = self.state.selector.params;
            newParams.dateEnd = newDateEnd;
            if(newParams.dateEnd <= newParams.dateStart) {
        		newParams.dateStart = newParams.dateEnd - 86400;
        	}
   			var defaultInterval = RangeIntervalMatch.defaultInterval(range,newParams);
            newParams.interval = defaultInterval;
            SelectorActions.changeSelector(newParams);
        };
        this.delay()(callback, 500);
   },
   _changeDateStart:function(e){
   		var self=this;
   		var currentDate = Math.floor(new Date().getTime()/1000);
   		if(e.target.value == '') {
   			var newDateStart = currentDate - 86400; 
   		} else {
   			var newDateStart = parseInt(moment(e.target.value).format('X'));
   		}
   		var range = this.state.selector.params.range;
   	    var callback = function() {
   	    	if(newDateStart > currentDate) { newDateEnd = currentDate - 86400;}
        	var newParams = self.state.selector.params;
        	newParams.dateStart = newDateStart;
        	if(newParams.dateStart >= newParams.dateEnd) {
        		newParams.dateEnd = newParams.dateStart + 86400;
        	}
   			var defaultInterval = RangeIntervalMatch.defaultInterval(range,newParams);
        	newParams.interval = defaultInterval;
        	SelectorActions.changeSelector(newParams);
        };
        this.delay()(callback, 500);
   },

   _onMaingraphNewparams: function() {
   		var params = MaingraphStore.getSpecific('params');
   		this.setState({
   			mainGraphParams:params
   		});
   },

   _onSelectArea: function(e) {
   		var selectCandleLayer = d3.select(".candleLayer");
   		// console.log("SELECT CANDLE LAYER", selectCandleLayer);

   },

   _onSelectGraphParams: function(e) {
   		var isChecked = $(e.target)[0].checked;
   		var value = $(e.target)[0].value;
   		var params = {};
   		params[value] = isChecked;
   		DashboardActions.updateMainGraphParams(params)
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