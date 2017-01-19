/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
//	'datatables',
	
	'models/Data',
//	'models/Utils',
	'moment',
	'bootbox',
//	'views/datasets/ListDataDetailView',
	'text!templates/datasets/resourcedatasetDetailTemplate.html',
], function(BaseView, Session, 
//		DataTable, 
		Data, 
//		Utils, 
		moment, bootbox,
//		ListDataDetailView,
		resourcedatasetDetailTemplate){ 
	
	var ResourceDatasetDetailView = BaseView.extend({
		template:_.template(resourcedatasetDetailTemplate),
//		datasetId: null,	
		datasetMeta:null,
		data:null,
		header:null,
		totalCount:0,
		currentPage:0,
		numberOfPages:0,
		rowPerPage: 20,
		text:null,
		showAsType:"resource",
//		rows: null,	
//		table: null,	//Oggetto DataTables che conterrà la tabella utenti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
//			"click #btnDataSearch" : "search",
			
		},
		

		
		initialize: function() {
			console.log('ResourceDatasetDetailView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
			this.data = this.options.data;
			this.totalCount = this.options.totalCount;
			this.currentPage= parseInt(this.options.currentPage);
			console.log("currentPage", this.currentPage);
			this.datasetMeta=this.options.datasetMeta;
			console.log("datasetMeta", this.datasetMeta);

			this.text=this.options.text;

			this.showAsType=this.options.showAsType;

			this.numberOfPages=Math.ceil(this.totalCount/this.rowPerPage);
			console.log("numberOfPages", this.numberOfPages);
		
			if (this.data !=null && this.data.length>0) {	
				this.header=[];		
				for (var key in this.data[0]) {
					if (this.data[0].hasOwnProperty(key)) { 
						this.header.push(key);
					}
				}
//			    console.log("header: " + this.header);
//				pippo3=this.header;
			}
		},
		
		
		render: function(){
			console.log('ResourceDatasetDetailView.render');
//			console.log('===========================================');
//			console.log(this.dataset);
//			console.log('===========================================');
			this.$el.html(this.template({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text}));



			
			return this;
		},

		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		

		
		
	});

	return ResourceDatasetDetailView;
});
