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
	'text!templates/datasets/rowFormTemplate.html',
], function(BaseView, Session, 
//		DataTable, 
		Data, 
//		Utils, 
		moment, bootbox,
		rowFormTemplate){ 
	
	var RowFormView = BaseView.extend({
		template:_.template(rowFormTemplate),
//		datasetId: null,	
		row:null,
		dsSlug:null,
		header:null,
		headerWithScore:null,
//		table: null,	//Oggetto DataTables che conterrà la tabella utenti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
//			"submit #searchForm" : "search",
//			'click #btnSearch': 'search',
			
//			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('RowFormView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
			this.row = this.options.row;
			this.dsSlug=this.options.dsSlug;
			_g_row=this.row;

		    if (this.row !=null) {	
				this.header=[];		
				this.headerWithScore=[];
				var headerScore={};		
				
					for (var key in this.row) {
						if (this.row.hasOwnProperty(key) && this.header.indexOf(key) == -1 						
						&& key!="id" && key!="_dataset_ref_id" && key!="_type" 
							&& key!="_location" 
							&& key!="_createdby" && key!="_createdon" && key!="_modifiedy" && key!="_modifiedon" 
							/*&& key!="_status"*/
							)  { 
							
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
							/*else if (key=="_createdby")
								headerScore.score=196;
							else if (key=="_createdon")
								headerScore.score=197;*/
							else if (key=="_type")
								headerScore.score=198;
							else if (key=="_status")
								headerScore.score=199;
							else if (key=="_location")
								headerScore.score=200;
							else 
								headerScore.score=100;

							this.headerWithScore.push(headerScore);
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
			console.log('RowFormView.render');
//			console.log('===========================================');
//			console.log(this.dataset);
//			console.log('===========================================');
			this.$el.html(this.template({row:this.row, dsSlug: this.dsSlug, headers:this.header}));

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

	return RowFormView;
});
