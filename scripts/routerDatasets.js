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

//	'views/users/UserEditView',
//	'views/users/UserRolesView',
	'models/Dataset',
	'models/Data',
	'models/CustomFunction',
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
//		,UserEditView, UserRolesView,
		Dataset,
		Data,
		CustomFunction,
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
			'previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter': 	'previewUploadedData',
			'mappingfield/:uploadedFilePath/ds/:dsSlug': 	'mappingfield',
			'mappingfield/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter': 	'mappingfield',
			'parse/:uploadedFilePath/ds/:dsSlug': 	'parseFile',
			'parse/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter': 	'parseFile',

			
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
			dataset.search('{"_slug":"'+dsSlug+'"}',callback);

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
			dataset.search('{"_slug":"'+dsSlug+'"}',callback);

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
			dataset.search('{"_slug":"'+dsSlug+'"}',callback);

			return this;
		},

		datasetDetailAsMap: function(dsSlug, page,text){ 
			console.log('RouterDatasets.datasetDetailAsMap');
			console.log("dsSlug", dsSlug);
			console.log("page", page);
			console.log("text", text);

//			waitingDialog.show('I\'m waiting');

			if (!page)
				page=0;

			var view = this;
			var callback = function(datasetMeta){				
				view.datasetDetailTaken(datasetMeta,dsSlug,page, text,'map');
			};
			var dataset = new Dataset();		
			dataset.search('{"_slug":"'+dsSlug+'"}',callback);

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

		previewUploadedData:function(uploadedFilePath,dsSlug,delimiter) {
			console.log('RouterDatasets.uploadData');
			console.log('dsSlug: ' +dsSlug);
			console.log('delimiter: ' +delimiter);

			var view = this;
			var callback = function(firstLines,status){
				view.previewUploadedDataCompleted(status,firstLines,uploadedFilePath,dsSlug,delimiter);
			};
			//Recupero il dataset.
			var customFunction = new CustomFunction();
			console.log('uploadedFilePath :' + uploadedFilePath);
//			var data = {};
//			data.file=uploadedFilePath;
//			var dataStr=JSON.stringify(data);
//			console.log("dataStr: ", dataStr);

			if (!delimiter)
				delimiter=",";


			var queryStr="?file="+uploadedFilePath+"&charseparator="+delimiter;
			console.log("queryStr", queryStr);

			customFunction.call("previewcsv",queryStr, null, callback);
			return this;
		},
		previewUploadedDataCompleted:function(status, firstLines,uploadedFilePath,dsSlug,delimiter) {
			console.log('RouterDatasets.previewUploadedDataCompleted');

			if (status=="fail"){				
				bootbox.alert({
					title: 		'Esito operazione',
					message:	"Errore nell'analisi del file CSV. Prego controllare la sintassi del file",
					callback: function(){ Backbone.history.navigate("#uploaddata/"+dsSlug, { trigger : true });}
				});
			}else {
				console.log('uploadedFilePath', uploadedFilePath);
				console.log('dsSlug', dsSlug);

				this.setHeaderAndFooter();
			
				console.log("firstLines", firstLines.firstLines);
				var previewUploadedDataView = new PreviewUploadedDataView({firstLines:firstLines.firstLines,uploadedFilePath:uploadedFilePath, dsSlug:dsSlug,currentDelimiter:delimiter});
				this.changeView(previewUploadedDataView, '#dashboard_content');
			}
			return this;
		},
		mappingfield:function(uploadedFilePath,dsSlug,delimiter) {
			console.log('RouterDatasets.mappingfield');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);

			var view = this;
			var callback = function(headers,status){
				view.mappingfieldCompleted(status,headers,uploadedFilePath, dsSlug,delimiter);
			};

			var customFunction = new CustomFunction();

			if (!delimiter)
				delimiter=",";

			var queryStr="?file="+uploadedFilePath+"&charseparator="+delimiter;
			console.log("queryStr", queryStr);

			customFunction.call("parsecsvheader",queryStr, null, callback);
			return this;
		},
		mappingfieldCompleted:function(status, headers,uploadedFilePath,dsSlug,delimiter) {
			console.log('RouterDatasets.mappingfieldCompleted');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);

			this.setHeaderAndFooter();
			
			console.log("headers", headers.headers);
			var mappingFieldView = new MappingFieldView({headers:headers.headers,uploadedFilePath:uploadedFilePath, dsSlug: dsSlug,currentDelimiter:delimiter});
			this.changeView(mappingFieldView, '#dashboard_content');

			return this;
		},
		parseFile:function(uploadedFilePath,dsSlug,delimiter) {
			console.log('RouterDatasets.parseFile');
			console.log('uploadedFilePath', uploadedFilePath);
			console.log('dsSlug', dsSlug);

			var view = this;
			var callback = function(response,status){
				view.parsedFile(status,response,uploadedFilePath, dsSlug);
			};

			var customFunction = new CustomFunction();

			if (!delimiter)
				delimiter=",";


			var queryStr="?file="+uploadedFilePath+"&ds="+dsSlug+"&charseparator="+delimiter;
			
			var data = {};
			var jsonValue = "";
			$("#mappingFieldForm").serializeArray().map(function(x){ 
				if (x.name=="columnname"){
					jsonValue = jsonValue+","+x.value;
				}
			});
			//remove initial ,
			jsonValue=jsonValue.substring(1,jsonValue.length);
			console.log("jsonValue", jsonValue);
//			data["columnname"]="ssss";
		
		//	var jsonDataStr=JSON.stringify(data);
//			console.log("jsonData : " + jsonDataStr);			
//			queryStr = queryStr +"&columnname="+ jsonValue;
//			console.log("queryStr", queryStr);
			data.columnname=jsonValue;
		
			waitingDialog.show('Importazione dei dati in corso. Attendere!');

			customFunction.call("parsecsv",queryStr, JSON.stringify(data), callback);
//			customFunction.call("parsecsv",queryStr, jsonDataStr, callback);
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