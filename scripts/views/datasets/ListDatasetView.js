/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'datatables',
	'text!templates/datasets/listDatasetTemplate.html',
	'models/Dataset',
//	'models/Utils',
	'moment',
	'bootbox',
//	'bootstraptagsinput',
], function(BaseView, Session, 
		DataTable, listDatasetTemplate, Dataset, 
//		Utils, 
		moment,
		bootbox
//		bootstraptagsinput
		){
	
	var ListDatasetView = BaseView.extend({
		template : _.template(listDatasetTemplate),
		datasets: null,	//Elenco dei dataset.
		table: null,	//Oggetto DataTables che conterrà la tabella utenti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
//			"submit #searchForm" : "search",
			'click #btnSearch': 'search',
			
			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('ListDatasetView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
//			this.onContentSelectedCallback = this.options.onContentSelectedCallback;
		},

		search: function(e){
			e.preventDefault();
			e.stopPropagation();

			console.log('ListDatasetView.search');
//			this.$el.html(this.template());
			var view = this;
			
			//Definizione della callback da eseguire al termine del download dei dataset.
			var callback = function(datasets){
				view.datasetsTaken(datasets);
			};
			
			//Recupero della lista dei dataset.
			var dataset = new Dataset();
			var text = ($('#text').val()!=null && $('#text').val()!='') ? $('#text').val() : null;
			if (text!=null) {
				//var queryString = '{"_name":"'+ text +'"}';
				dataset.text(text, callback);
			}else 
				dataset.getAll(callback);
		},
		
		
		render: function(){
			console.log('ListDatasetView.render');
//			this.$el.html(this.template());
			var view = this;
			
			//Definizione della callback da eseguire al termine del download dei dataset.
			var callback = function(datasets){
				view.datasetsTaken(datasets);
			};
			
			//Recupero della lista dei dataset.
			var dataset = new Dataset();
			dataset.getAll(callback);
		},
		
		
		datasetsTaken: function(datasets){
			console.log('ListDatasetView.datasetsTaken');
//			console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
//			console.log(datasets);
//			console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
			this.datasets = datasets;
			this.myRender();
		},
		
		
		myRender: function(){
			console.log('ListDatasetView.myRender');
			this.$el.html(this.template({datasets: this.datasets}));
		},
		
		
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

	return ListDatasetView;
});
