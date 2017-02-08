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
	'text!templates/datasets/tabledatasetDetailTemplate.html',
], function(BaseView, Session, 
//		DataTable, 
		Data, 
//		Utils, 
		moment, bootbox,
//		ListDataDetailView,
		tabledatasetDetailTemplate){ 
	
	var TableDatasetDetailView = BaseView.extend({
		template:_.template(tabledatasetDetailTemplate),
//		datasetId: null,	
		datasetMeta:null,
		data:null,
		header:null,
		headerWithScore:null,
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
///			"click #btnDataSearch" : "search",
			
		},
		

		
		initialize: function() {
			console.log('TableDatasetDetailView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
			this.data = this.options.data;
			console.log("this.data", this.data);
			this.totalCount = this.options.totalCount;
			console.log("this.totalCount", this.totalCount);
			this.currentPage= parseInt(this.options.currentPage);
			console.log("currentPage", this.currentPage);
			this.datasetMeta=this.options.datasetMeta;
			console.log("datasetMeta", this.datasetMeta);

			this.text=this.options.text;

			this.showAsType=this.options.showAsType;

			this.numberOfPages=Math.ceil(this.totalCount/this.rowPerPage);
			console.log("numberOfPages", this.numberOfPages);
		
			_g_data=this.data;
			if (this.data !=null && this.data.length>0) {	
				this.header=[];		
				this.headerWithScore=[];
				var headerScore={};		
				for (var i=0;i<this.data.length;i++ ) {
					for (var key in this.data[i]) {
						if (this.data[i].hasOwnProperty(key) && this.header.indexOf(key) == -1 
							&& key!="id" && key!="_dataset_ref_id" && key!="_type" 
							&& key!="_location" && key!="_status") { 
							
							this.header.push(key);
						
						    headerScore={};
							headerScore.name=key;
							
							if (key=="_main_image")
								headerScore.score=1;
							else if (key=="_title")
								headerScore.score=2;
							else if (key=="_description")
								headerScore.score=3;
							else if (key=="_latitude")
								headerScore.score=177;
							else if (key=="_longitude")
								headerScore.score=178;
							else if (key=="_idext")
								headerScore.score=179;
							else if (key=="_createdby")
								headerScore.score=180;
							else if (key=="_createdon")
								headerScore.score=181;
							else if (key=="_modifiedby")
								headerScore.score=182;
							else if (key=="_modifiedon")
								headerScore.score=183;
							/*else if (key=="_status")
								headerScore.score=199;
							else if (key=="_type")
								headerScore.score=198;*/
							/*else if (key=="_location")
								headerScore.score=200;*/
							else 
								headerScore.score=100;

							this.headerWithScore.push(headerScore);
						}
					}
				}
				
				
				// sort by score
				this.headerWithScore.sort(function (a, b) {
					return a.score - b.score;
				});				

				_g_headerWithScore=this.headerWithScore;

				var headerScoreOrderedArray = [];
				for (var i=0;i<this.headerWithScore.length;i++ ) {
					headerScoreOrderedArray.push(this.headerWithScore[i].name);
				}

				//override this.header var
				this.header=headerScoreOrderedArray;

				console.log("header: " + this.header);
				_g_header=this.header;
			}
		},
		
		
		render: function(){
			console.log('TableDatasetDetailView.render');
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

	return TableDatasetDetailView;
});
