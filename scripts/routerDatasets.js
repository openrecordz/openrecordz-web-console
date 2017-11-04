define([
	'jquery',
//	'underscore',
//	'backbone',
//	'spin',
	'core/Smart21Router',
	'views/DashboardHeaderView',
	'views/DashboardFooterView',
	'views/datasets/DatasetsView',
	'views/datasets/DatasetDetailView',
	'views/map/DataOnMapView',
	'views/datasets/RowFormView',
	'views/datasets/UpsertDatasetView',
	'views/datasets/UploadDataView',
	'views/datasets/PreviewUploadedDataView',
	'views/datasets/MappingFieldView',
	'views/datasets/GlobalSearchView',

//	'views/users/UserEditView',
//	'views/users/UserRolesView',
	'models/Dataset',
	'models/Data',
	'models/GlobalSearch',
	'models/CSV',
//	'bootstraptagsinput',
	'models/Utils',
	'bootbox',
	'waitingfor'

//	'Session'
], function(
		$, 
//		_, Backbone, 
//		Spinner, 
		Smart21Router,
		DashboardHeaderView, 
		DashboardFooterView,
		DatasetsView,
		DatasetDetailView,
		DataOnMapView,
		RowFormView,
		UpsertDatasetView,
		UploadDataView,
		PreviewUploadedDataView,
		MappingFieldView,
		GlobalSearchView,
//		,UserEditView, UserRolesView,
		Dataset,
		Data,
		GlobalSearch,
		CSV,
//		bootstraptagsinput,
		Utils,
		bootbox,
		waitingfor

//		,Session
		){

	var RouterDatasets = Smart21Router.extend({

//		data:null,

		initialize: function() {
			console.log('RouterDatasets.initialize');
			this.initSpinner();
			this.initHeaderAndFooter();
		},
		
		
		routes: {
//			'none': 'none',
			
			'search/:text': 	'search',
			'globalSearch/:text': 	'globalSearch',


			'ds/:dsSlug/resource': 	'datasetDetailAsResource',
			'ds/:dsSlug/page/:page/resource': 	'datasetDetailAsResource',
			'ds/:dsSlug/page/:page/text/:text/resource': 	'datasetDetailAsResource',

			'ds/:dsSlug': 	'datasetDetailAsAuto',
			'ds/:dsSlug/page/:page': 	'datasetDetailAsAuto',
			'ds/:dsSlug/page/:page/text/:text': 	'datasetDetailAsAuto',


			'ds/:dsSlug/table': 	'datasetDetailTable',
			'ds/:dsSlug/page/:page/table': 	'datasetDetailTable',
			'ds/:dsSlug/page/:page/text/:text/table': 	'datasetDetailTable',

/*
			'ds/:dsSlug/map': 	'datasetDetailAsMap',

			'dsmap/:dsSlug': 	'datasetDetailAsMap',
			'dsmap/:dsSlug/page/:page': 	'datasetDetailAsMap',
			'dsmap/:dsSlug/page/:page/text/:text': 	'datasetDetailAsMap',
*/

			'ds/:dsSlug/map': 	'datasetDetailAsMap',
			'ds/:dsSlug/page/:page/map': 	'datasetDetailAsMap',
			'ds/:dsSlug/page/:page/text/:text/map': 	'datasetDetailAsMap',  



			'ds/:dsSlug/id/:dataId': 	'rowDetail',
			'upsert': 	'insertDataset',
			'upsert/:dsSlug': 	'updateDataset',
			'uploaddata/:dsSlug': 	'uploadData',
			'previewUploadedData/:uploadedFilePath/ds/:dsSlug': 	'previewUploadedData',
			'previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter/skip/:skip': 	'previewUploadedData',
			'mappingfield/:uploadedFilePath/ds/:dsSlug': 	'mappingfield',
			'mappingfield/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter/skip/:skip': 	'mappingfield',
			'parse/:uploadedFilePath/ds/:dsSlug': 	'parseFile',
			'parse/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter/skip/:skip': 	'parseFile',

			
			'*default': 'home',	//La default route DEVE essere l'ultima!!!
		},
		
		
		
		//Funzione utilizzata per l'inizializzazione dell'header e del footer della pagina.
		initHeaderAndFooter: function(){
			//=================================================================
			//Creazione dell'header.
			this.dashboardHeaderView = new DashboardHeaderView({
				navBarActiveButton: '_datasets'	//Passare la classe dell'elemento 'li' da rendere attivo.
			});
			//=================================================================
			//Creazione del footer.
			this.dashboardFooterView = new DashboardFooterView();
		},
		
		//Funzione utilizzata per l'impostazione dell'header e del footer della pagina.
		setHeaderAndFooter: function(){
			//=================================================================
			//Impostazione dell'header.
			this.assign(this.dashboardHeaderView, '#dashboard_header');
			//=================================================================
			//Impostazione del footer.
			this.assign(this.dashboardFooterView, '#dashboard_footer');
			$('#dashboard_header').show();
			$('#dashboard_footer').show();
		},
		
		
		home: function(){
			console.log('RouterDatasets.home');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var datasetsView = new DatasetsView();
			this.changeView(datasetsView, '#dashboard_content');
		},

		search: function(){
			console.log('RouterDatasets.search');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var datasetsView = new DatasetsView();
			this.changeView(datasetsView, '#dashboard_content');
		},

		globalSearch: function(text){
			console.log('RouterDatasets.globalSearch');
			console.log("text", text);
			
			var view = this;
			var callback = function(data){		
				console.log('data :' + data);		
				view.globalSearchDataTaken(data,text);
			};
			
			var globalSearch = new GlobalSearch();
			//console.log('dsSlug :' + dsSlug);

			globalSearch.textAsMap("59b95378e4b0a018d1a61896",text, 0,callback,10);			
			

			return this;

		},

		globalSearchDataTaken: function(data,text){
			console.log('RouterDatasets.globalSearchDataTaken');
			console.log("data", data);
			console.log("text", text);
			this.setHeaderAndFooter();

			var globalSearchView = new GlobalSearchView({data: data, text: text});
			
			this.changeView(globalSearchView, '#dashboard_content');
			return this;
		},


		datasetDetailAsAuto: function(dsSlug, page,text){ 
			console.log('RouterDatasets.datasetDetailAsAuto');
//			dsSlug = dsSlug+"_resources";
			console.log("dsSlug", dsSlug);
			console.log("page", page);
			console.log("text", text);

//			waitingDialog.show('I\'m waiting');

			if (!page)
				page=0;

			var view = this;
			var callback = function(datasetMeta){				
				view.datasetDetailTaken(datasetMeta,dsSlug,page, text,'auto');
			};
			var dataset = new Dataset();		
			dataset.byId(dsSlug, callback, true, true, true);

			return this;
		},

		datasetDetailTable: function(dsSlug, page,text){
			console.log('RouterDatasets.datasetDetail');
			console.log("dsSlug", dsSlug);
			console.log("page", page);
			console.log("text", text);

//			waitingDialog.show('I\'m waiting');

			if (!page)
				page=0;

			var view = this;
			var callback = function(datasetMeta){				
				view.datasetDetailTaken(datasetMeta,dsSlug,page, text,'table');
			};
			var dataset = new Dataset();		
			dataset.byId(dsSlug, callback, true, true, true);
			
			return this;
		},

		
		datasetDetailAsResource: function(dsSlug, page,text){ 
			console.log('RouterDatasets.datasetDetailAsResource');
//			dsSlug = dsSlug+"_resources";
			console.log("dsSlug", dsSlug);
			console.log("page", page);
			console.log("text", text);

//			waitingDialog.show('I\'m waiting');

			if (!page)
				page=0;

			var view = this;
			var callback = function(datasetMeta){				
				view.datasetDetailTaken(datasetMeta,dsSlug,page, text,'resource');
			};
			var dataset = new Dataset();		
			dataset.byId(dsSlug, callback, true, true, true);
			
			return this;
		},

		datasetDetailAsMap: function(dsSlug, page,text){ 
			console.log('RouterDatasets.datasetDetailAsMap');
			console.log("dsSlug", dsSlug); // nome dataset su cui fare la ricerca
			console.log("page", page);
			console.log("text", text); // query

//			waitingDialog.show('I\'m waiting');

			if (!page)
				page=0;

			var view = this;
			var callback = function(datasetMeta){				
				view.datasetDetailTaken(datasetMeta,dsSlug,page, text,'map');
			};
			var dataset = new Dataset();		
			dataset.byId(dsSlug, callback, true, true, true);
			
			return this;
		},
		
		datasetDetailTaken: function(datasetMeta,dsSlug,page,text, showAsType){
			console.log('RouterDatasets.dataDetailTaken');
			console.log("datasetMeta", datasetMeta);
			console.log("dsSlug", dsSlug);
			console.log("page", page);
			console.log("text", text);
			console.log("showAsType", showAsType);

			_g_datasetMeta=datasetMeta;
			
			var view = this;
			var callback = function(data){				
				view.dataAndMetaDetailTaken(data, datasetMeta,page,text,showAsType);
			};
			
			var data = new Data();
			console.log('dsSlug :' + dsSlug);


			var pageSize;
			if (showAsType=="map")
				pageSize=1000;
			else
				pageSize=20;
			
			if (showAsType=="resource")
				var typeToSearch="binary";
			

			if (text)
				data.textAsMap(datasetMeta[0].id,text, page,callback,pageSize);			
			else
				data.searchAsMap(datasetMeta[0].id,null, page,callback,pageSize,typeToSearch);


			return this;

		},


		dataAndMetaDetailTaken: function(data, datasetMeta, page,text,showAsType){
			console.log('RouterDatasets.dataDetailTaken');
			console.log("datasetMeta", datasetMeta);
			console.log("data", data);
			console.log("showAsType", showAsType);
			this.setHeaderAndFooter();

//			var detailView =null;

//			if (showAsType=="table")
			var detailView = new DatasetDetailView({data: data.records, totalCount:data.count, currentPage: page, datasetMeta:datasetMeta[0], text: text, showAsType:showAsType});
//			else if (showAsType=="map")
//				detailView = new DataOnMapView({data: data.items, totalCount:data.count, currentPage: page, datasetMeta:datasetMeta[0], text: text});
			
			this.changeView(detailView, '#dashboard_content');
			return this;
		},


		rowDetail: function(dsSlug,dataId){
			console.log('RouterDatasets.rowDetail');
			//Definizione della callback da richiamare una volta recuperato il contenuto.
			var view = this;
			var callback = function(row){
				view.rowDetailTaken(row,dsSlug);
			};
			//Recupero il dataset.
			var data = new Data();
			console.log('dsSlug :' + dsSlug);
			console.log('dataId :' + dataId);
			data.getById(dsSlug,dataId, callback);
			return this;
		},
		
		rowDetailTaken: function(row, dsSlug){
			console.log('RouterDatasets.rowDetailTaken');
			
			this.setHeaderAndFooter();
			
			var rowFormView = new RowFormView({row: row, dsSlug:dsSlug});
			this.changeView(rowFormView, '#dashboard_content');
			return this;
		},



		insertDataset: function(){
			console.log('RouterDatasets.insertDataset');
			
			this.setHeaderAndFooter();
			
		
			var upsertDatasetView = new UpsertDatasetView();
			this.changeView(upsertDatasetView, '#dashboard_content');

			return this;
		},
		updateDataset: function(dsSlug){
			console.log('RouterDatasets.updateDataset');
			console.log('dsSlug: '+ dsSlug);
			var view = this;
			var callback = function(datasetMeta){				
				view.editDataset(datasetMeta,dsSlug);
			};
			var dataset = new Dataset();		
			dataset.search('{"_slug":"'+dsSlug+'"}',callback);

			return this;
		},

		editDataset: function(datasetMeta,dsSlug) {
			console.log('dsSlug: '+ dsSlug);
			console.log('datasetMeta: ',datasetMeta);

			this.setHeaderAndFooter();
		
			var upsertDatasetView = new UpsertDatasetView({datasetMeta:datasetMeta[0]});
			this.changeView(upsertDatasetView, '#dashboard_content');

			return this;
		},

		uploadData:function(dsSlug){
			console.log('RouterDatasets.uploadData');
			console.log('dsSlug :' + dsSlug);

			this.setHeaderAndFooter();
			
		
			var uploadDataView = new UploadDataView({dsSlug: dsSlug});
			this.changeView(uploadDataView, '#dashboard_content');

			return this;
		},

		previewUploadedData:function(uploadedFilePath,dsSlug,delimiter,skip) {
			console.log('RouterDatasets.uploadData');
			console.log('dsSlug: ' +dsSlug);
			console.log('delimiter: ' +delimiter);
			console.log('skip: ' +skip);
			
			var view = this;
			var callback = function(firstLines,status){
				view.previewUploadedDataCompleted(status,firstLines,uploadedFilePath,dsSlug,delimiter,skip);
			};
			//Recupero il dataset.
			var csvModel = new CSV();
			console.log('uploadedFilePath :' + uploadedFilePath);
//			var data = {};
//			data.file=uploadedFilePath;
//			var dataStr=JSON.stringify(data);
//			console.log("dataStr: ", dataStr);

			if (!delimiter)
				delimiter=",";


			if (!skip)
				skip=0;

			var queryStr="?file="+uploadedFilePath+"&charseparator="+delimiter+"&skip="+skip;
			console.log("queryStr", queryStr);

			csvModel.preview(queryStr, null, callback);
			return this;
		},
		previewUploadedDataCompleted:function(status, firstLines,uploadedFilePath,dsSlug,delimiter, skip) {
			console.log('RouterDatasets.previewUploadedDataCompleted');

			// if (status=="fail"){				
			// 	bootbox.alert({
			// 		title: 		'Esito operazione',
			// 		message:	"Errore nell'analisi del file CSV. Prego controllare la sintassi del file",
			// 		callback: function(){ Backbone.history.navigate("#uploaddata/"+dsSlug, { trigger : true });}
			// 	});
			// }else {
				console.log('uploadedFilePath', uploadedFilePath);
				console.log('dsSlug', dsSlug);

				this.setHeaderAndFooter();
			
				console.log("firstLines", firstLines);
				var previewUploadedDataView = new PreviewUploadedDataView({firstLines:firstLines,uploadedFilePath:uploadedFilePath, dsSlug:dsSlug,currentDelimiter:delimiter, skip: skip, status:status});
				this.changeView(previewUploadedDataView, '#dashboard_content');
			// }
			return this;
		},
		mappingfield:function(uploadedFilePath,dsSlug,delimiter, skip) {
			console.log('RouterDatasets.mappingfield');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);
			console.log('skip', skip);
			

			var view = this;
			var callback = function(headers,status){
				view.mappingfieldCompleted(status,headers,uploadedFilePath, dsSlug,delimiter,skip);
			};

			var csvUtil = new CSV();

			if (!delimiter)
				delimiter=",";

			var queryStr="?file="+uploadedFilePath+"&charseparator="+delimiter+'&ds='+dsSlug+"&skip="+skip;
			console.log("queryStr", queryStr);

			csvUtil.getHeaders(queryStr, null, callback);
			return this;
		},
		mappingfieldCompleted:function(status, headers,uploadedFilePath,dsSlug,delimiter,skip) {
			console.log('RouterDatasets.mappingfieldCompleted');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);
			console.log('skip', skip);
			
			this.setHeaderAndFooter();
			
			console.log("headers", headers);
			var mappingFieldView = new MappingFieldView({headers:headers,dataset:headers.dataset, uploadedFilePath:uploadedFilePath, dsSlug: dsSlug,currentDelimiter:delimiter,skip:skip});
			this.changeView(mappingFieldView, '#dashboard_content');

			return this;
		},
		parseFile:function(uploadedFilePath,dsSlug,delimiter,skip) {
			console.log('RouterDatasets.parseFile');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);
			console.log('skip', skip);

			var view = this;
			var callback = function(response,status){
				view.parsedFile(status,response,uploadedFilePath, dsSlug);
			};

			var csvUtil = new CSV();

			if (!delimiter)
				delimiter=",";


			var queryStr="?file="+uploadedFilePath+"&ds="+dsSlug+"&charseparator="+delimiter+"&skip="+skip;
			
			var data = {};
			var jsonValueColumnName = "";
			var jsonValueMapping = "";
			var jsonValueOrigColumnName = "";
			
			
			
			
			$("#mappingFieldForm").serializeArray().map(function(x){ 
				
				if (x.name=="columnname"){
					jsonValueColumnName = jsonValueColumnName+","+x.value;				
				}
				if (x.name=="mapping"){
					jsonValueMapping = jsonValueMapping+","+x.value;
				}
				if (x.name=="origcolumnname"){
					jsonValueOrigColumnName = jsonValueOrigColumnName+","+x.value;				
				}
				
			});
			//remove initial ,
			jsonValueColumnName=jsonValueColumnName.substring(1,jsonValueColumnName.length);
			console.log("jsonValueColumnName", jsonValueColumnName);

			jsonValueMapping=jsonValueMapping.substring(1,jsonValueMapping.length);
			console.log("jsonValueMapping", jsonValueMapping);

			jsonValueOrigColumnName=jsonValueOrigColumnName.substring(1,jsonValueOrigColumnName.length);
			console.log("jsonValueOrigColumnName", jsonValueOrigColumnName);



			var mappingArray = [];
			var mappingColumnObj = {};
			var serializedForm=$("#mappingFieldForm").serializeArray();
			for (var i=0; i<serializedForm.length; i++){
				console.log(serializedForm);

				if (serializedForm[i].name=="origcolumnname") {
					mappingColumnObj.origColumnName=serializedForm[i].value;
				}
				if (serializedForm[i].name=="mapping") {
					mappingColumnObj.columnType=serializedForm[i].value;
				}
				if (serializedForm[i].name=="columnname") {
					mappingColumnObj.columnName=serializedForm[i].value;
					mappingArray.push(mappingColumnObj);
					mappingColumnObj={};
				}				
			}
			console.log("mappingArray", mappingArray);
			


			data.columnname=jsonValueColumnName;
			data.mapping=jsonValueMapping;
			data.origcolumnname=jsonValueOrigColumnName;
			data.mappingArray=mappingArray;

			waitingDialog.show('Importazione dei dati in corso. Attendere!');

			csvUtil.import(queryStr, JSON.stringify(data), callback);
			return this;
		},
		parsedFile: function(status,response, uploadedFilePath,dsSlug){
			console.log('RouterDatasets.parsedFile');	
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);

			 waitingDialog.hide();

			if(status=='success'){												
				var route = '#ds/'+dsSlug;		
				Backbone.history.navigate(route, { trigger : true });
			}else {
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: 		'Esito operazione',
					message:	errMessage,
				});
			}
			return this;	

		}

		
//		//=================================================================
//		//Edit di un utente.
//		userEdit: function(username){
//			console.log('RouterDatasets.userEdit');
//			//Definizione della callback da richiamare una volta recuperato l'utente.
//			var view = this;
//			var callback = function(user){
//				view.userToEditTaken(user);
//			};
//			//Recupero l'utente da editare.
//			var user = new User();
//			user.getByUsername(username, callback);
//			return this;
//		},
//		
//		userToEditTaken: function(user){
//			console.log('RouterDatasets.userToEditTaken');
//			
//			this.setHeaderAndFooter();
//			
//			//=================================================================
//			//Creazione del contenuto.
//			var userEditView = new UserEditView({user: user});
//			this.changeView(userEditView, '#dashboard_content');
//			return this;
//		},
//		
//		
//		
//		//=================================================================
//		//Permessi di un utente.
//		userRoles: function(username){
//			console.log('RouterDatasets.userRoles');
//			//Definizione della callback da richiamare una volta recuperati i permessi.
//			var view = this;
//			var callback = function(username, roles){
//				view.userRolesTaken(username, roles);
//			};
//			//Recupero dei permessi dell'utente.
//			var user = new User();
//			user.getRoles(username, callback);
//			return this;
//		},
//		
//		userRolesTaken: function(username, roles){
//			console.log('RouterDatasets.userRolesTaken');
//			
//			this.setHeaderAndFooter();
//			
//			//=================================================================
//			//Creazione del contenuto.
//			var userRolesView = new UserRolesView({
//				username: 	username,
//				roles: 		roles
//			});
//			this.changeView(userRolesView, '#dashboard_content');
//			return this;
//		},
		
		
		
//		fetchError : function(error){
//			//If during fetching data from server, session expired
//			// and server send 401, call getAuth to get the new CSRF
//			// and reset the session settings and then redirect the user
//			// to login
//			if(error.status === 401){
//				Session.getAuth(function(){
//					Backbone.history.navigate('showLogin', { trigger : true });
//				});
//			}
//		}
		
	});

	return RouterDatasets;
});