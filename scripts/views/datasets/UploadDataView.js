/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
//	'datatables',
	
	'models/Dataset',
	'models/Data',
	'models/File',
	'models/Utils',
	'moment',
	'bootbox',
	'text!templates/datasets/uploadDataTemplate.html',
	'waitingfor'
], function(BaseView, Session, 
//		DataTable, 
		Dataset,
		Data,
		File,  
		Utils, 
		moment, bootbox,
		uploadDataTemplate,
		waitingfor){ 
	
	var UploadDataView = BaseView.extend({
		uploadedFilePath:null,
		dsId:null,
		dsSlug:null,
		template:_.template(uploadDataTemplate),	
		events : {
//			"submit #uploadData" : "upload",

			"click #btnResSave" : "upload",
			"click #btnResSaveAndTrasform" : "upload",
		},
		

		
		initialize: function() {
			console.log('UploadDataView.initialize');
		//	this.dsId=this.options.dsId;
			this.dsSlug=this.options.dsSlug;
							
			
//			_.bindAll(this);
			
			
		},
		
		
		render: function(){
			console.log('UploadDataView.render');	
			
			var dataset = new Dataset();		
			var view = this;
			dataset.search('{"_slug":"'+this.dsSlug+'"}',function(datasetMeta){				
						view.dsId=datasetMeta[0].id;
						console.log("view.dsId : "+ view.dsId);
						_g_uploadDataView_this=view;
					}
			);

			
			
			this.$el.html(this.template({dsSlug:this.dsSlug}));

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


		isFormValid: function() {
			var that = this;
			var valid = true;
			
			//Nascondo tutti gli errori.
			Utils.hideAllError();

			var file= $('#file').val();
			if (file=="") {
				//username is not valid. 
				Utils.showError(that, 'file', 'Selezionare una risorsa dal proprio computer!');
				valid = false;
			}

			var name= $('#_name').val();
			if (name=="") {
				//username is not valid. 
				Utils.showError(that, '_name', 'Inserire il nome della risorsa !');
				valid = false;
			}
									
/*				
			var description= $('#_description').val();
			if (description=="") {
				Utils.showError(that, '_description', 'Inserire la descrizione della risorsa !');
				valid = false;
			}
*/


			if(!valid){
				$('#formAlert').show();
			}
			return valid;
		},

		upload: function(e) {
			console.log('UploadDataView.upload');	
			e.preventDefault();
//			e.stopPropagation();

			
			if(this.isFormValid()){
	//			var BtnSalveId = $(this.id).context.activeElement;
				var BtnSalveId=e.target.id;

				waitingDialog.show('Caricamento del file in corso. Attendere!');

				var view = this;
				var callback = function(result, response){
	//				view.fileUploaded(result, response);
					view.fileUploadedNowSaveMeta(result, response,BtnSalveId);
				};
				var file = new File();
				
				var name = $("#file").prop('files')[0].name;
				console.log('UploadDataView.upload.name',name);	

				var path = null;
				//http://stackoverflow.com/questions/12281775/get-data-from-file-input-in-jquery
				var fileToUpload = $("#file").prop('files')[0];
				console.log("fileToUpload", fileToUpload);

				file.save(name, path, fileToUpload, callback);
			}
			return this;
		},
		
		
		fileUploadedNowSaveMeta: function(result, response,BtnSalveId){
			console.log('UploadDataView.fileUploadedNowSaveMeta');
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
			console.log(result);	
			console.log(response);	
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

			
			

			var view = this;

			if(result=='success'){
//				bootbox.alert({
//				title: "Esito operazione",
//					message: 'File caricato!',
//				});
				this.uploadedFilePath = response.name;
				console.log('uploadedFilePath : '+ this.uploadedFilePath);
				console.log('this.dsId : '+ this.dsId);
				

				// if (BtnSalveId=="btnResSaveAndTrasform"){
				// 	waitingDialog.hide();
				// 	var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug;
				// 	Backbone.history.navigate(route, { trigger : true });
				// 	return this;
				// }


				var callback = function(result, response){
					view.fileUploadedAndMetaSaved(result, response, BtnSalveId);
				};
			
				//Recupero della lista dei dataset.
				var data = new Data();
	
				var jsonValue = {};
				jsonValue.file=this.uploadedFilePath;

				$("#uploadData").serializeArray().map(function(x){ 
					if (x.value!=null && x.value!=""){
						jsonValue[x.name] = x.value;
					}
				});
				var jsonString = JSON.stringify(jsonValue);
				
				data.add(this.dsId,jsonString, callback,"binary");
				
				return this;



//			

				return this;
				
			}else{
				waitingDialog.hide();
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: "Esito operazione",
					message: errMessage,
				});
			}
		},


		fileUploadedAndMetaSaved: function(result, response,BtnSalveId){
			console.log('UploadDataView.fileUploadedAndMetaSaved');
			console.log('UploadDataView.BtnSalveId',BtnSalveId);
			console.log('UploadDataView.fileUploadedAndMetaSaved.result',result);
			
			waitingDialog.hide();

			var route;
		//	if (BtnSalveId=="btnResSaveAndTrasform"){
		//		route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug;
		//	} else {
				route = "#ds/"+this.dsSlug;
		//	}

			Backbone.history.navigate(route, { trigger : true });

			return this;
		},
		





		//vecchio metodo per avviare la preview ora non in uso
		
		fileUploaded: function(result, response){
			console.log('UpsertDatasetView.filePhonesUploaded');
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
			console.log(result);	
			console.log(response);	
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

			waitingDialog.hide();


			if(result=='success'){
//				bootbox.alert({
//				title: "Esito operazione",
//					message: 'File caricato!',
//				});
				this.uploadedFilePath = response.name;
				console.log('uploadedFilePath : '+ this.uploadedFilePath);
			console.log('this.dsSlug : '+ this.dsSlug);


				var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug;
				Backbone.history.navigate(route, { trigger : true });
				
			}else{
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: "Esito operazione",
					message: errMessage,
				});
			}
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

	return UploadDataView;
});
