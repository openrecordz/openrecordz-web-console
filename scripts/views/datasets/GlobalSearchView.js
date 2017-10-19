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
			
			if(this.data == null)
				this.data =  []; // an array


			this.$el.html(this.template({data: this.data}));
			return this;
		}
	});

	return GlobalSearchView;
});
