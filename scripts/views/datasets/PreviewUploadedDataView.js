/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'moment',
	'bootbox',
	'text!templates/datasets/previewUploadedDataTemplate.html',
], function(BaseView, Session, 
		moment, bootbox,
		previewUploadedDataTemplate){ 
	
	var PreviewUploadedDataView = BaseView.extend({
		template:_.template(previewUploadedDataTemplate),
		firstLines:null,
		uploadedFilePath:null,
		dsSlug:null,
		currentDelimiter:",",
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
			"change input[type=radio][name=cvsformat]" : "delimiterChanged",
//			'click #btnSearch': 'search',
			
//			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('PreviewUploadedDataView.initialize');
//			_.bindAll(this);
			this.firstLines=this.options.firstLines;	
			this.uploadedFilePath= this.options.uploadedFilePath;		
			this.dsSlug=this.options.dsSlug;	
			this.currentDelimiter=this.options.currentDelimiter;
		},
		
		
		render: function(){
			console.log('PreviewUploadedDataView.render');
//			console.log('===========================================');
//			console.log(this.dataset);
//			console.log('===========================================');
			this.$el.html(this.template({firstLines:this.firstLines, uploadedFilePath: this.uploadedFilePath,dsSlug:this.dsSlug, currentDelimiter:this.currentDelimiter}));

			// var view = this;
			
			// //Definizione della callback da eseguire al termine del download dei dataset.
			// var callback = function(rows){
			// 	view.rowsTaken(rows);
			// };
			
			// //Recupero della lista dei dataset.
			// var data = new Data();
			// data.search('{"_type":"testslug"}',callback);
			
			return this;
		},
		
		delimiterChanged: function(e){
			//alert("ciao");
			var curDelimiter=e.target.value;		
			console.log("curDelimiter", curDelimiter);
//previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter'
				var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug+"/delimiter/"+curDelimiter;		
				Backbone.history.navigate(route, { trigger : true });
			return this;
		},
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

	return PreviewUploadedDataView;
});
