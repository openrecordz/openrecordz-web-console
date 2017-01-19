/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
//	'datatables',
	
	'models/CustomFunction',
//	'models/Utils',
	'moment',
	'bootbox',
	'text!templates/datasets/mappingFieldTemplate.html',
], function(BaseView, Session, 
//		DataTable, 
		Data, 
//		Utils, 
		moment, bootbox,
		mappingFieldTemplate){ 
	
	var MappingFieldView = BaseView.extend({
		template:_.template(mappingFieldTemplate),
		headers:null,
		uploadedFilePath:null,
		dsSlug:null,
		currentDelimiter:",",
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
			"change select" : "typeFieldChanged",
//			"submit #saveMappingFieldbtn" : "saveMapping",
			//"submit #saveMappingFieldbtn" : "saveMapping",
		
			
//			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('MappingFieldView.initialize');
//			_.bindAll(this);
			this.headers=this.options.headers;	
			this.uploadedFilePath= this.options.uploadedFilePath;	
			this.dsSlug=this.options.dsSlug;		
			this.currentDelimiter=this.options.currentDelimiter;
		},
		
		
		render: function(){
			console.log('MappingFieldView.render');
//			console.log('===========================================');
			console.log("this.headers",this.headers);
//			console.log('===========================================');
			this.$el.html(this.template({myheaders:this.headers, uploadedFilePath: this.uploadedFilePath, dsSlug:this.dsSlug, currentDelimiter: this.currentDelimiter}));

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
		typeFieldChanged: function(e) {
			console.log('MappingFieldView.typeFieldChanged');

			 var selectId=e.target.id;
		   	console.log("select changed: "+selectId);
			var currentSelect = $("#"+selectId);
//			andrea=currentSelect;

			 if (currentSelect.val()=="_location" 
				|| currentSelect.val()=="_latitude" 
				|| currentSelect.val()=="_longitude"
				|| currentSelect.val()=="_title" 
				|| currentSelect.val()=="_description" 
				|| currentSelect.val()=="_email"
				|| currentSelect.val()=="_phone"
				|| currentSelect.val()=="_website"  
				|| currentSelect.val()=="_main_image"
				|| currentSelect.val()=="_idext"   
				|| currentSelect.val()=="_skipcolumn") {

//			  if (currentSelect.val()=="_location") {
					//se value di  select corrente è _location trovo l'input text di nome della colonna è lo setto a _location
		  		console.log("select con option value _location: "+currentSelect.parent().parent().find("input").attr("id"));
				var columnNameForce=currentSelect.parent().parent().find("input");
	//					se _location allora setto il nome della colonna a _location etc..
				columnNameForce.val(currentSelect.val());
				columnNameForce.attr("readonly","readonly");
//			   }
				
				//trovo tutte le altre select che hanno il valore loc è le resetto a generic
				 if (currentSelect.val()=="_location" 
					|| currentSelect.val()=="_latitude" 
					|| currentSelect.val()=="_longitude"
					|| currentSelect.val()=="_title" 
					|| currentSelect.val()=="_description" 
					|| currentSelect.val()=="_email"
					|| currentSelect.val()=="_phone"
					|| currentSelect.val()=="_website"  
					|| currentSelect.val()=="_main_image"
					|| currentSelect.val()=="_idext"   
					) {
					    $( "select option:selected" ).each(function() {
						testthis=$(this);
		     			        //console.log("testthis: "+testthis.parent().attr("id"));
					      if ( $(this).parent().attr("id")!=currentSelect.attr("id") && $(this).val()==currentSelect.val()) {
							//alert("trovato");
							console.log("found duplicate with id: " +$(this).parent().attr("id"));
							$(this).removeAttr("selected");
							var columnNameForce=$(this).parent().parent().parent().find("input");
							console.log("remove readonly form input with id: "+columnNameForce.attr("id"));
							columnNameForce.removeAttr("readonly");
							//riprendo il valore della colonna dalla colonna originaria
							columnNameForce.val($(this).parent().parent().parent().find(".tofind").html().replace(/ /g, ''));
					
						}
					    });
				}

		   	}else if (currentSelect.val()=="gen"){
				var columnNameForce=currentSelect.parent().parent().find("input");
				columnNameForce.removeAttr("readonly");
				columnNameForce.val(currentSelect.parent().parent().find(".tofind").html().replace(/ /g, ''));
			 }else {
				alert("error");
			}

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

	return MappingFieldView;
});
