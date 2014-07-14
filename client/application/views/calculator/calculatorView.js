define('calculatorView', ['config', 'networkdatas','marketcaps', 'text!calculatorView.html', 'FormatUtils'], function(config, Networkdatas,Marketcaps, templateCalculator, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-calculatorModal',

        templateCalculator: _.template(templateCalculator),

        events: {
            // 'click .js-calculatorOption':'changeCalculatorOption',
             //'change input#hashpower':'changeCalculatorOption'
            'click #js-calculatorButton':'userData'
        },

        initialize: function(params) {
            var self = this;
            this.networkdatas = new Networkdatas();
            this.marketcaps= new Marketcaps();
            this.networkdatas.on('reset',  this.update,this);
            this.marketcaps.on('reset',  this.render2,this);
            //console.log(this.networkdatas);
        },

        userData: function() {
            
            var userdata = $("#calculatorForm").serializeArray();
            _.each(userdata,function(data) {
                userdata[data.name]=data.value;  
            });
            console.log(userdata);
            this.calculate(userdata);
        },
        calculate:function(data) {
            console.log(data);
            var 
            reward=25,
            difficulty=data.difficulty,
            hashrate=data.hashpower,
            hash_unit=data.hash_unit,
            price=data.price;
            
            switch(hash_unit) {
                case "GH":
                    hashrate=data.hashpower;
                    break;
                 case "MH":
                    hashrate=data.hashpower/1000;
                    break;
                 case "TH":
                    hashrate=data.hashpower*1000;
                    break;
            }

            var nbrjourToBlock = difficulty * Math.pow(2, 32) / (hashrate * Math.pow(10, 9)) / 60 / 60 / 24,
                dailyGain = reward / nbrjourToBlock,
                weeklyGain = dailyGain*7,
                monthlyGain= dailyGain*(365/12);
            console.log(nbrjourToBlock);
            var dayCoin=FormatUtils.truncToNdecimal(dailyGain,8),
                dayDollar=FormatUtils.truncToNdecimal(dailyGain*price,2),
                weekCoin=FormatUtils.truncToNdecimal(weeklyGain,8),
                weekDollar=FormatUtils.truncToNdecimal(weeklyGain*price,2),
                monthCoin=FormatUtils.truncToNdecimal(monthlyGain,8),
                monthDollar=FormatUtils.truncToNdecimal(monthlyGain*price,2);
            console.log(weeklyGain);
            console.log(monthlyGain);
            $("#dayCoin").html(dayCoin+"Ƀ");
            $("#dayDollar").html(dayDollar+"$");
            $("#weekCoin").html(weekCoin+"Ƀ");
            $("#weekDollar").html(weekDollar+"$");
            $("#monthCoin").html(monthCoin+"Ƀ");
            $("#monthDollar").html(monthDollar+"$");
   
        },
        render2:function() {
             this.networkdatas.fetch();  
        },
        render:function() {
            self=this;
            
              this.marketcaps.fetch(); 
            this.render2=function() {
                
                             
            }  
            
        },
        update: function(update) {
            var self = this;
            
            this.networkdata=[];
            
            this.price=[];
            _.each(this.networkdatas.models, function(networkdata) {
                    
                    self.networkdata[networkdata.attributes.currencyName]=_.clone(networkdata.attributes);
                    self.networkdata[networkdata.attributes.currencyName].marketcap.totalCoin=(_.clone(networkdata.attributes.marketcap.totalCoin*Math.pow(10,-8)));
                    self.networkdata[networkdata.attributes.currencyName].marketcap.difficulty=FormatUtils.truncToNdecimal((_.clone(networkdata.attributes.marketcap.difficulty)),0);
                    self.networkdata[networkdata.attributes.currencyName].currencyName=_.clone(networkdata.attributes.currencyName);
                
            });
            _.each(this.marketcaps.models ,function(marketcap) {
                //console.log(marketcap.attributes.currencyId);
                    self.price[marketcap.attributes.currencyId]=FormatUtils.formatValue(_.clone(marketcap.attributes.price));
            })
            // console.log(this.marketcaps.models);
            // console.log(this.price);
            // console.log(this.networkdata["BTC"]);

            this.$el.html(this.templateCalculator({
                networkdata: this.networkdata["BTC"],
                price: this.price["BTC"]
            }));
          
        }

    });

});


