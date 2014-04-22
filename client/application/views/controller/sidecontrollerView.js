define ('sidecontrollerView', ['config','EventManager','dataHelper','text!sidecontrollerView.html','mainView'], function(config, EventManager, DataHelper, SidecontrollerTemplate, MainView){

	return Backbone.View.extend ({

		el: '#js-sidecontroller',
        template: _.template(SidecontrollerTemplate),


        render:function(){
        	var self=this;
        	this.$el.html(this.template());

        },


	});

}); 