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
            price=data.price;
          
            var nbrjourToBlock = difficulty * Math.pow(2, 32) / (hashrate * Math.pow(10, 9)) / 60 / 60 / 24,
                dailyGain = reward / nbrjourToBlock,
                weeklyGain = dailyGain*7,
                monthlyGain= dailyGain*(365/12);
            console.log(nbrjourToBlock);
            console.log(dailyGain);
            console.log(weeklyGain);
            console.log(monthlyGain);
            // var nbrjour_toblock_est = estimated * Math.pow(2, 32) / (hashrate * Math.pow(10, 9)) / 60 / 60 / 24;
            // var dailygain_est = reward / nbrjour_toblock_est;
            // var $form = $('form');
// $form.submit(function() {
//     var hashrate = $('#hrate').val();
//     var difficulty = <%= difficulty %> ;
//     var price = <%= price %> ;
//     var reward = <%= reward %> ;
//     var estimated = <%= estimated %> ;

//     var nbrjour_toblock = difficulty * Math.pow(2, 32) / (hashrate * Math.pow(10, 9)) / 60 / 60 / 24;
//     var dailygain = reward / nbrjour_toblock;

//     var nbrjour_toblock_est = estimated * Math.pow(2, 32) / (hashrate * Math.pow(10, 9)) / 60 / 60 / 24;
//     var dailygain_est = reward / nbrjour_toblock_est;
//     $('#result_block').html('<tr><td> Number of day to find a block:  ' + nbrjour_toblock + '</td></tr>');

//     $('#result').html('<caption class="titrecalc_caption">Result for this difficulty</caption><tr><th>Number of bitcoin earned </th> <th> Dollars earned</th></tr><tr><td> Daily ' + dailygain + '</td><td> ' + dailygain * price + '</td></tr><tr><td> Monthly ' + dailygain * 30 + '</td><td> ' + dailygain * price * 30 + '</td></tr><tr><td> Yearly ' + dailygain * 365 + '</td><td> Dollars earned:' + dailygain * price * 365 + '</td></tr>');
//     $('#result_estimated').html('<caption class="titrecalc_caption">Result for estimated difficulty</caption><tr><th>Number of bitcoin earned </th> <th> Dollars earned</th></tr><tr><td> Daily ' + dailygain + '</td><td> ' + dailygain_est * price + '</td></tr><tr><td> Monthly ' + dailygain_est * 30 + '</td><td> ' + dailygain_est * price * 30 + '</td></tr><tr><td> Yearly ' + dailygain_est * 365 + '</td><td> Dollars earned:' + dailygain_est * price * 365 + '</td></tr>');

    // alert(nbrjour_toblock);  
    // alert(price);

//     return false;
// });
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


