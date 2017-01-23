/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
//	'datatables',
	
	'models/Dataset',
//	'models/Utils',
	'moment',
	'bootbox',
	'text!templates/datasets/upsertDatasetTemplate.html',
//	'bootstraptagsinput',
	'select2',
	'models/Utils'
], function(BaseView, Session, 
//		DataTable, 
		Dataset, 
//		Utils, 
		moment, bootbox,
		upsertDatasetTemplate,
//		bootstraptagsinput,
		select2,
		Utils){ 
	
	var UpsertDatasetView = BaseView.extend({
		template:_.template(upsertDatasetTemplate),
		datasetMeta:null,		
		events : {
//			"submit #upsertDataset" : "save",
			//"submit #saveAndImportbnt" : "save",
			"click #savebnt" : "save",
			"click #saveAndImportbnt" : "save",
			"keyup #_name" : "onkeyUpName"
//			'click #btnSearch': 'search',
			
//			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('UpsertDatasetView.initialize');
			//ciccio4=bootstraptagsinput;
//			console.log("bootstraptagsinput",bootstraptagsinput);
			this.datasetMeta= this.options.datasetMeta;
			console.log("this.datasetMeta",this.datasetMeta);
//			_.bindAll(this);
			
			
		},
		
		
		render: function(){
			console.log('UpsertDatasetView.render');			
			this.$el.html(this.template({datasetMeta:this.datasetMeta}));
			
			var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];
	
			this.$el.find("#_tag").select2({
			  tags: true,
			  data:data
			});

			// var view = this;
			
			// //Definizione della callback da eseguire al termine del download dei dataset.
			// var callback = function(rows){
			// 	view.rowsTaken(rows);
			// };
			
			// //Recupero della lista dei dataset.
			// var data = new Data();
			// data.search('{"_type":"testslug"}',callback);
		//	console.log("bootstraptagsinput",bootstraptagsinput);
			return this;
		},
		parameterizeNameField: function(string) {
		  var sep = "-";
		  // Turn unwanted chars into the separator
		  var safeStr = string.replace(/[^-\w]+/gi, sep);

		  // No more than one of the separator in a row.
		  safeStr = safeStr.replace(/-{2,}/gi, sep);

		  // Remove leading/trailing separator.
		  safeStr = safeStr.replace(/^-|-$/gi, "");

		  return safeStr.toLowerCase();
		},

		onkeyUpName: function(e) {
			console.log("e.target.value : "+e.target.value);
			$("#_slug").val(this.parameterizeNameField(e.target.value));
			return this;
		},
		isFormValid: function() {
			var that = this;
			var valid = true;
			
			//Nascondo tutti gli errori.
			Utils.hideAllError();

			//Validazione dell fullname.
			var slug= $('#_slug').val();
			if (slug=="") {
				//username is not valid. 
				Utils.showError(that, '_slug', 'Inserire il permalink!');
				valid = false;
			}
									

			if(!valid){
				$('#formAlert').show();
			}
			return valid;
		},

		save: function(e) {
			console.log('UpsertDatasetView.save');	
			e.preventDefault();
//			e.stopPropagation();

			var view = this;
			
			if(this.isFormValid()){

				var buttonId=e.target.id;
				console.log("buttonId",buttonId);

				//Definizione della callback da eseguire al termine del download dei dataset.
				var callback = function(result, response){
					view.saved(result, response, buttonId);
				};
			
				//Recupero della lista dei dataset.
				var dataset = new Dataset();
	
				var jsonValue = {};
				$("#upsertDataset").serializeArray().map(function(x){ 
					if (x.value!=null && x.value!=""){
						jsonValue[x.name] = x.value;
					}
				});
				var jsonString = JSON.stringify(jsonValue);
				if (this.datasetMeta){
					var dsId=this.datasetMeta.id;
					console.log("dsIs", dsId);
					//dataset.update(dsId, jsonString, callback);
					dataset.patch(dsId, jsonString, callback);
				}else{
					dataset.add(jsonString, callback);
				}
			} else {
			
			}
			return this;
		},
		saved: function(result, response, buttonId) {
			console.log('UpsertDatasetView.saved');	
			console.log("buttonId",buttonId);
			console.log("response",response);
//			ciccio= response;
			var slugName= response._slug;
			console.log("response._slug: "+ slugName);

			var view = this;
			if(result=='success'){
				
				var route=null;
				if (buttonId=="savebnt") {
					
					if (view.datasetMeta=null){
						route = '#';
						bootbox.alert({
							title: 		'Dataset creato',
							message:	'Il tuo Dataset è stato creato con successo!',
						});
					}else{
						route = '#ds/'+slugName;
						bootbox.alert({
							title: 		'Dataset aggiornato',
							message:	'Il tuo Dataset è aggiornato con successo!',
						});
					}
					
				} else {					
					route = '#uploaddata/'+slugName;
				}
				Backbone.history.navigate(route, { trigger : true });
				//Definizione della callback da eseguire al termine dell'update delle categorie.				
			}else{
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: 		'Esito operazione',
					message:	errMessage,
				});
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

	return UpsertDatasetView;
});
