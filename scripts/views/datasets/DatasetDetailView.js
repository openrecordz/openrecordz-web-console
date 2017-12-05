/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
//	'datatables',
	
	'models/Data',
	'models/Dataset',
//	'models/Utils',
	'moment',
	'bootbox',
//	'views/datasets/ListDataDetailView',
	'views/datasets/TableDatasetDetailView',
	'views/datasets/ResourceDatasetDetailView',
	'views/datasets/InfoDatasetDetailView',
	'views/map/DataOnMapView',
	'text!templates/datasets/datasetDetailTemplate.html',
], function(BaseView, Session, 
//		DataTable, 
		Data,
		Dataset, 
//		Utils, 
		moment, bootbox,
//		ListDataDetailView,
		TableDatasetDetailView,
		ResourceDatasetDetailView,
		InfoDatasetDetailView,
		DataOnMapView,
		datasetDetailTemplate){ 
	
	var DatasetDetailView = BaseView.extend({
		template:_.template(datasetDetailTemplate),
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

		asLocationData: false,
		asBinaryData:false,
		asTableData:false,

		countRecords:0,
		countBinaries:0,
//		rows: null,	
//		table: null,	//Oggetto DataTables che conterrà la tabella utenti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
			"click #btnDataSearch" : "search",
			'click #btn-delete-all-data': 'deleteAllData',
			'click #btn-delete-dataset': 'deleteDataset',
			'shown.bs.tab #maptab' : "showmap",
//			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('DatasetDetailView.initialize');
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
			this.countRecords=this.datasetMeta._countRecords;
			this.countBinaries=this.datasetMeta._countBinaries;
			
			//this.asBinaryData=this.countBinaries>0;
			this.asTableData=this.countRecords>0;

			this.text=this.options.text;

			this.showAsType=this.options.showAsType;

			this.numberOfPages=Math.ceil(this.totalCount/this.rowPerPage);
			console.log("numberOfPages", this.numberOfPages);
		

			for (var head in this.header) {
				console.log("head", head);
						if (head=="_latitude"){
							 this.asLocationData=true;
							 break;
 						} 						
 			}
			
// 			if (this.data !=null && this.data.length>0) {	
// 				console.log("this.data[0]._type : "+ this.data[0]._type);
// 				if (this.data[0]._type=="binary") {
// 					this.asBinaryData=true;
// 				}else { //this.data[0]._type=="record"
// 					this.asTableData=true;
// 					this.asBinaryData=false;
// 				}
// 				this.header=[];		
// 				//iterate over all the columns of the first row
// 				for (var key in this.data[0]) {
// 					if (this.data[0].hasOwnProperty(key)) { 
// 						this.header.push(key);
// 						if (key=="_location"){
// 							this.asLocationData=true;
// 						}
// 						//if (key=="file") {
// 						//	this.asBinaryData=true;
// 						//}
// 					}
// 				}
// //			    console.log("header: " + this.header);
// //				pippo3=this.header;
// 			}



		},
		
		showmap:function() {
			alert("coa");
		},
		render: function(){
			console.log('DatasetDetailView.render');
//			console.log('===========================================');
//			console.log(this.dataset);
//			console.log('===========================================');
			console.log("this.asLocationData: "+this.asLocationData);
			console.log("this.asBinaryData: "+this.asBinaryData);
			console.log("this.asTableData: "+this.asTableData);

			this.$el.html(this.template({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text, showAsType: this.showAsType, asLocationData:this.asLocationData, asBinaryData: this.asBinaryData, asTableData:this.asTableData}));

			var subDatasetDetailView;
			if (this.showAsType=="table") {
				subDatasetDetailView = new TableDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});
			}else if (this.showAsType=="map") {
				subDatasetDetailView = new DataOnMapView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text,asLocationData:this.asLocationData});
//				subDatasetDetailView.resize();
			}else if (this.showAsType=="resource") {
				subDatasetDetailView = new ResourceDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});
			}else if (this.showAsType=="auto") {
				if (this.asTableData==true) {
					subDatasetDetailView = new TableDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});					
				} else { 
					subDatasetDetailView = new ResourceDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});					
				}
			} else if (this.showAsType == "info") {
				subDatasetDetailView = new InfoDatasetDetailView({ header: this.header, data: this.data, totalCount: this.totalCount, currentPage: this.currentPage, numberOfPages: this.numberOfPages, datasetMeta: this.datasetMeta, text: this.text });
			}						


			//Inietto la tabella dei contenuti nel template.
			this.assign(subDatasetDetailView, '#datasetDetailDiv');
			
			return this;
		},

		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		search: function(e){
			e.preventDefault();
			e.stopPropagation();
//			alert("search");
			console.log('DatasetDetailView.search');
//			this.$el.html(this.template());
			var view = this;
			
			//Definizione della callback da eseguire al termine del download dei dataset.
			var callback = function(datasets){
				view.datasetsTaken(datasets);
			};
			
			//Recupero della lista dei dataset.
			var data = new Data();
			var text = ($('#text').val()!=null && $('#text').val()!='') ? $('#text').val() : null;
			if (text!=null) {
				//var queryString = '{"_name":"'+ text +'"}';
				Backbone.history.navigate('#ds/'+view.datasetMeta._slug+"/page/0/text/"+text+"/table", { trigger : true });
			}else 
				//data.searchAsMap(view.datasetMeta._slug,null, view.currentPage, callback);
				Backbone.history.navigate('#ds/'+view.datasetMeta._slug+"/table", { trigger : true });
		},
		

		deleteAllData: function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('DatasetDetailView.deleteAllData');
		 	var view = this;

			bootbox.confirm("Sei sicuro di voler cancellare tutti i dati di questo dataset ?",  function(result){ 
				if (result==true) {
					var callback = function(){
					//Backbone.history.navigate('#ds/'+view.datasetMeta._slug, { trigger : true });
					//http://stackoverflow.com/questions/8901574/how-to-refresh-a-page-in-a-backbone-application
					  Backbone.history.loadUrl();
					};

					var data = new Data();
					data.deleteAll(view.datasetMeta.id, callback);
			
					return this;
				}
			 });


			return this;
		},
		confirmedDeleteAllData: function() {
			
		},
	
		deleteDataset: function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('DatasetDetailView.deleteDataset');
		 	var view = this;

			bootbox.confirm("Sei sicuro di voler cancellare questo dataset ?",  function(result){ 
				if (result==true) {
					var callback = function(){
						var dataset = new Dataset();
						dataset.deleteById(view.datasetMeta.id, function() {Backbone.history.navigate('#', { trigger : true });});

					};

					var data = new Data();
					data.deleteAll(view.datasetMeta.id, callback);
			
					return this;
				}
			 });


			return this;
		}
		
		
		
		
	});

	return DatasetDetailView;
});
