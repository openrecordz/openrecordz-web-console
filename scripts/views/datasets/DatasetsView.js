define([
	'core/BaseView',
	'Session',
	'views/datasets/ListDatasetView',
	'text!templates/datasets/datasetsTemplate.html'
], function(BaseView, Session, ListDatasetView, datasetsTemplate){

	var DatasetsView = BaseView.extend({
		template: _.template(datasetsTemplate),
		

//		events: {
//			'click #btnContents' : 	'clickTabContents',
//			'click #btnCategories':	'clickTabCategories',
//			'click #btnPois':		'clickTabPois',
//		},

		
		
		initialize: function(){
			console.log('DatasetsView.initialize');
		},
		
		
		render: function(){
			console.log('DatasetsView.render');
			this.$el.html(this.template());
			
			//=================================================================
			//Creazione tabella relativa alla lista dei dataset.
			var listDatasetView = new ListDatasetView({
//				onContentSelectedCallback: this.onContentSelectedModalCallback
			});
			//Inietto la tabella dei contenuti nel template.
			this.assign(listDatasetView, '#listDataset');
			
			return this;
		},
		
		
		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		
		
		
		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return DatasetsView;
});