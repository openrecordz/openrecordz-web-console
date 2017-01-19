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
		asBinaryData:true,
		asTableData:false,
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

			this.text=this.options.text;

			this.showAsType=this.options.showAsType;

			this.numberOfPages=Math.ceil(this.totalCount/this.rowPerPage);
			console.log("numberOfPages", this.numberOfPages);
		
			
			if (this.data !=null && this.data.length>0) {	
				console.log("this.data[0]._type : "+ this.data[0]._type);
				if (this.data[0]._type=="binary") {
					this.asBinaryData=true;
				}else { //this.data[0]._type=="record"
					this.asTableData=true;
					this.asBinaryData=false;
				}
				this.header=[];		
				for (var key in this.data[0]) {
					if (this.data[0].hasOwnProperty(key)) { 
						this.header.push(key);
						if (key=="_location"){
							this.asLocationData=true;
						}
						//if (key=="file") {
						//	this.asBinaryData=true;
						//}
					}
				}
//			    console.log("header: " + this.header);
//				pippo3=this.header;
			}
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
				if (this.asBinaryData==true) {
					subDatasetDetailView = new ResourceDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});
				} else { 
					subDatasetDetailView = new TableDatasetDetailView({header:this.header, data: this.data, totalCount:this.totalCount, currentPage:this.currentPage, numberOfPages: this.numberOfPages, datasetMeta:this.datasetMeta, text:this.text});
				}
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
					Backbone.history.navigate('#', { trigger : true });
					};

					var data = new Data();
					data.deleteAll(view.datasetMeta._slug, callback);
			
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
					data.deleteAll(view.datasetMeta._slug, callback);
			
					return this;
				}
			 });


			return this;
		}
		
// 		rowsTaken: function(rows){
// 			console.log('DatasetDetailView.rowsTaken');
// //			console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
// //			console.log(datasets);
// //			console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
// 			this.rows = rows;
// 			this.myRender();
// 		},
		
		
// 		myRender: function(){
// 			console.log('DatasetDetailView.myRender');
// 			this.$el.html(this.template({rows: this.rows}));
// 			//this.assign(this, '#listDataset');
// 		},

		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
//		assign: function (view, selector) {
//		    view.setElement(this.$(selector)).render();
//		},
		
		
//		myRender: function(){
//			console.log('ListDatasetView.myRender');
//			this.$el.html(this.template(this.datasets));
//			var that = this;
//			
//			//DataTables: fonte "https://datatables.net/reference/option/".
//			//Esempio: Server-side processing "http://www.datatables.net/examples/data_sources/server_side.html".
//			//Stackoverflow: "http://stackoverflow.com/questions/25211553/datatables-custom-response-handling".
//			this.table = this.$el.find('#tableDatasets').DataTable({
////				serverSide: true,
////				processing: true,
//				searching: true,
//				ordering: true,
//				pageLength: config.datasetsPageSize,
//				lengthChange: false,
//				data: this.datasets,
//				'columns': [
//					{
////						"data": "name",
//						"orderable": true, 
//					    "searchable": true,
//					    "mRender": function(data, type, row){
////					    	console.log(data);
////					    	console.log(row);
//							var html = '';
//							html += '<strong><p>' + row.name + '</p></strong>';
//							html += row.description;
//							return html;
//						}
//					},
////					{
////						"data": "name",
////						"orderable": true, 
////		                "searchable": true,
////					},
////					{
////						"data": "description",
////						"orderable": true, 
////		                "searchable": true,
////					},
////		            {	
////						"data": null,
////						"orderable": false, 
////		                "searchable": false,
////						"mRender": function(data, type, row){
////							var html = '';
////							html += '<button type="button" id="btnEdit" class="btn btn-default btn-xs" title="Visualizza/Modifica dati"><span class="glyphicon glyphicon-edit"></span></button>&nbsp;';
////							html += '<button type="button" id="btnDelete" class="btn btn-default btn-xs" title="Elimina"><span class="glyphicon glyphicon-trash"></span></button>&nbsp;';
////							return html;
////						}
////		            }
//				],
//			});
//			
//			
//			
//			this.table.on( 'click', 'tr', function () {
//				console.log('tableDatasets.click.tr');
//////				console.log(this);
//////				var a = $(this).parent();
////				var parentTag = $(this).parent().get(0).tagName;
//////				console.log(parentTag);
////				if (parentTag!='THEAD'){
////					var data = that.table.row(this).data();
////					that.categoryEdit(data);					
////				}
//			});
//			
//			
//			this.table.on( 'click', 'button', function(e) {
//				console.log('tableDatasets.click.button');
//				e.preventDefault();
//				e.stopPropagation();
////				var action = $(this).prop('id');
////				var data = that.table.row($(this).parents('tr')).data();
////				if (action=='btnEdit'){
////		        	that.categoryEdit(data);
////		        }else if (action=='btnDelete'){
////		        	that.categoryDelete(data);
////		        }
//		    } );
//			return this;
//		},
		
		
		
		
	});

	return DatasetDetailView;
});
