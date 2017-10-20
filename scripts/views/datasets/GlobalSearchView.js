/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'text!templates/datasets/globalSearchTemplate.html',
	'models/Dataset',
//	'models/Utils',
	'moment',
	'bootbox',
//	'bootstraptagsinput',
], function(BaseView, Session, 
	 	globalSearchTemplate, Dataset, 
//		Utils, 
		moment,
		bootbox
//		bootstraptagsinput
		){
	
	var GlobalSearchView = BaseView.extend({
		template : _.template(globalSearchTemplate),
		data: null,
		text:null,
		
		events : {
		},
		

		
		initialize: function() {
			console.log('GlobalSearchView.initialize');
			this.data = this.options.data;
			this.text = this.options.text;

		},		
		
		render: function(){
			console.log('GlobalSearchView.render');
//			this.$el.html(this.template());

			console.log("data", this.data);

			if(this.data != null && this.data != undefined) {
				console.log("data.count", data.count);

				if(data.dataset != null && data.dataset != undefined) {
					console.log("data.dataset", data.dataset);
				}

				if(data.records != null && data.records != undefined) {
					console.log("data.records", data.records);
				}
			}


			
			console.log("data", this.data);

			this.$el.html(this.template({data: this.data}));
			return this;
		}
	});

	return GlobalSearchView;
});
