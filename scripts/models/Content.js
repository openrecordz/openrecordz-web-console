define([
	'jquery',
	'backbone',
	'models/Utils',
	'models/Properties'
], function($, Backbone, Utils, Properties){
	
	/**
	 * public static Integer STATUS_DELETED = -100;
	 * public static Integer STATUS_REJECTED = -10;
	 * public static Integer STATUS_DISABLED = -1;
	 * public static Integer STATUS_ENABLED = 1;
	 * public static Integer STATUS_VISIBLE = 10;
	 * public static Integer STATUS_VERIFIED = 20;
	 */
	
	/**
	 * ========================  INSTRUCTIONS  ========================
	 * 
	 * ************************  Callback define  ************************
	 * var that = this;
	 * var callback = function(result, response){
	 * 		that.testDone(result, response);
	 * };
	 * 
	 * ************************  Add new Content  	************************
	 * var properties = new Properties();
	 * var phoneValues = [$('#phone').val()];
	 * properties.addProperty('phone', 'telefono', phoneValues);
	 * var contentDetails = {
	 * 		file: this.imageFile.prop('files')[0],
	 * 		title: $('#title').val(),
	 * 		description: $('#description').val(),
	 * 		category: $('#dropdownCategories').attr('data-value'),
	 * 		phone: '',
	 * 		shop: $('#shopId').val(),
	 * 		brand: '',
	 * 		startPrice: $('#startPrice').val(),
	 * 		price: $('#price').val(),
	 * 		startDate: strStartDate,
	 * 		endDate: strEndDate,
	 * 		source: '', 
	 * 		reference: '',
	 * 		properties: properties.get("properties")
	 * };
	 * var content = new Content();
	 * content.add(contentDetails, callback);
	 * ************************  Get Content by id  ************************
	 * var id = '550ae1b7e4b014c959840062';
	 * var content = new Content();
	 * content.getById(id, callback);
	 * ************************  Search Content  	************************
	 * var params = {
	 * 		name: 'test',
	 * 		lat: 42.0,
	 * 		lon: 18.0
	 * };
	 * var content = new Content();
	 * content.search(params, callback);
	 * ************************  Update Content  	************************
	 * var properties = new Properties();
	 * var phoneValues = [$('#phone').val()];
	 * properties.addProperty('phone', 'telefono', phoneValues);
	 * var contentDetails = {
	 * 		id: this.item.id,
	 * 		title: $('#title').val(),
	 * 		description: $('#description').val(),
	 * 		category: $('#dropdownCategories').attr('data-value'),
	 * 		phone: '',
	 * 		shop: $('#shopId').val(),
	 * 		brand: '',
	 * 		startPrice: $('#startPrice').val(),
	 * 		price: $('#price').val(),
	 * 		startDate: strStartDate,
	 * 		endDate: strEndDate,
	 * 		source: '', 
	 * 		reference: '',
	 * 		properties: properties.get("properties")
	 * };
	 * var content = new Content();
	 * content.update(contentDetails, callback);
	 * ************************  Delete Content  	************************
	 * var id = '550add0be4b014c959840060';
	 * var content = new Content();
	 * content.deleteById(id, callback);
	 */
	
	var Content = Backbone.Model.extend({
		
		defaults: {
			id: '',
			category: '',
			file: null,
			title: '',
			description: '',
			startPrice: '',
			status: '10',
			price: '',
			phone: '',
			startDate: '',
			endDate: '',
			shop: '',
			brand: '',
			source: '',
			reference: '',
			properties: '',
			propertiesObject: new Properties()
        },
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(){
			console.log('Content.initialize');
		},
		
		//save new poi.
		//parameters:
		//	- content = {
		//			file: null,
		//			title: titleValue, 
		//			description: descriptionValue,
		//			category: categoryId,
		//			phone: phoneValue,
		//			shop: shopId,
		//			brand: '',
		//			startPrice: startPriceValue, 
		//			price: priceValue, 
		//			startDate: strStartDateValue, 
		//			endDate: strEndDateValue, 
		//			source: '', 
		//			reference: '',
		//			properties: propertiesJson,
		//			propertiesObject: properties
		//	  };
		//	- callback   = function which to return the result.
		add: function(callback){
			console.log('Content.add');
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			console.log(this.attributes);
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
			
			var data = new FormData();
			data.append('file', 		this.attributes.file);
			data.append('title', 		this.attributes.title);
			data.append('description',	this.attributes.description);
			data.append('category', 	this.attributes.category);
			data.append('phone', 		this.attributes.phone);
			data.append('shop', 		this.attributes.shop);
			data.append('brand', 		this.attributes.brand);
			data.append('startPrice', 	this.attributes.startPrice);
			data.append('price', 		this.attributes.price);
			data.append('startDate', 	this.attributes.startDate);
			data.append('endDate', 		this.attributes.endDate);
			data.append('source', 		this.attributes.source);
			data.append('reference', 	this.attributes.reference);
			data.append('properties', 	this.attributes.properties);
			
			var add = $.ajax({
        	    url: tenant + '/service/v1/products/add',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			add.done(function(response){
				console.log('Content.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.add.fail');
				callback('fail', jqXHR);
			});
		},

		
		
		update: function(callback){
			console.log('Content.update');
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			console.log(this.attributes);
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
			var that = this;
			
			var contentDetails = {
				id: this.attributes.id,
//				file: null,
				title: this.attributes.title,
				description: this.attributes.description,
				category: this.attributes.category,
				status: this.attributes.status,
				phone: this.attributes.phone,
//				shop: $('#shopId').val(),
				shop: this.attributes.shop,
				brand: this.attributes.brand,
				startPrice: this.attributes.startPrice,
				price: this.attributes.price,
				startDate: this.attributes.startDate,
				endDate: this.attributes.endDate,
				source: this.attributes.source, 
				reference: this.attributes.reference,
				properties: this.attributes.properties,
			};
//			console.log(contentDetails);
		
			var update = $.ajax({
        	    url: tenant + '/service/v1/products/update',
				data: contentDetails,
				type: 'POST'
			});
			update.done(function(response){
				console.log('Content.update.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.update.fail');
				callback('fail', jqXHR);
			});
		},
		

		updateNew: function(callback){
			console.log('Content.updateNew');
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			console.log(this.attributes);
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
			var that = this;
			
			var contentDetails = {
				id: this.attributes.id,
//				file: null,
				title: this.attributes.title,
				description: this.attributes.description,
				category: this.attributes.category,
				status: this.attributes.status,
				phone: this.attributes.phone,
//				shop: $('#shopId').val(),
//				shop: this.attributes.shop,
				brand: this.attributes.brand,
				startPrice: this.attributes.startPrice,
				price: this.attributes.price,
				startDate: this.attributes.startDate,
				endDate: this.attributes.endDate,
				source: this.attributes.source, 
				reference: this.attributes.reference,
				properties: this.attributes.properties,
			};
//			console.log(contentDetails);
			if (this.attributes.shop!=null && this.attributes.shop!=''){
				contentDetails.shop = this.attributes.shop
			}
//			console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
//			console.log(contentDetails);
//			console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
		
			var update = $.ajax({
        	    url: tenant + '/service/v1/contents/update',
				data: contentDetails,
				type: 'POST'
			});
			update.done(function(response){
				console.log('Content.updateNew.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.updateNew.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		setStatus: function(id, status, callback){
			console.log('Content.setStatus');
			var data = {id: id, status: status};
			console.log(data);
			
			var update = $.ajax({
        	    url: tenant + '/service/v1/products/setstatus',
				data : data,
				type : 'POST'
			});
			update.done(function(response){
				console.log('Content.setStatus.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.setStatus.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		deleteById: function(id, callback){
			console.log('Content.deleteById');
			
			var myDelete = $.ajax({
        	    url: tenant + '/service/v1/products/' + id + '/delete',
				type : 'GET'
			});
			myDelete.done(function(response){
				console.log('Content.deleteById.done');
				callback('success', response);
			});
			myDelete.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.deleteById.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		
		updateImage: function(id, file, callback){
			console.log('Content.updateImage');
			var data = new FormData();
			data.append('id', id);
			data.append('file', file);
			var upload = $.ajax({
        	    url: tenant + '/service/v1/products/updateimage',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			upload.done(function(response){
				console.log('Content.updateImage.done');
				callback('success', response);
			});
			upload.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.updateImage.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		//Funzione per eseguire la ricerca tra i vari Content.
		//params json array con la seguente struttura:
		//	var params = {
		//		searchFor: searchFor,	//testo da ricercare
//				categoryId: categoryId, //'_none' ==> qualsiasi categoria
		//		categoryId: categoryId, //null ==> qualsiasi categoria
		//		state: state,			//'all' o 'enabled' o 'disabled' o 'toBeApproved'
		//		status: status,			//'1'=tutti, '-10'=daApprovare
		//		page: 0,
		//		pageSize: 20
		//	};
		/**
		 * Funzione per la ricerca contenuti.
		 * Parametri
		 * 	- text:			testo in base al quale cercare
		 *  - categoryId:	filtro in base all'id della categoria
		 *  - state:		può essere pari a 'all' o 'enabled' o 'disabled' o 'toBeApproved'
		 *  - status: 		può essere pari a '1'=tutti, '-10'=daApprovare
		 *  - createdby:	creatore del contenuto
		 *  - page:			numero della pagina da recuperare
		 *  - pageSize:		dimensione della pagina
		 *  - callback:		riferimento della funzione alla quale restituire i dati
		 */
		search: function(text, categoryId, state, status, createdby, page, pageSize, callback){
			console.log('Content.search');
			//q=*&sort=modifiedon desc&fq=categories:<id_categoria>/*
			var query = Utils.cleanAndProcessQuery(text);
			var q = 'q=' + query + '*';
//			var q = 'q=' + query;
//			var sort = '&sort=modifiedon desc';
			var sort = '&sort=_score desc, modifiedon desc';
			var fq='';
//			if (params.categoryId!='_none'){
			if (categoryId!=null){
				fq = '&fq=categories:' + categoryId + '*';
			}
			var _status = '&fq=status:[1 TO *]';
			if (state=='enabled'){
				_status = '&fq=status:10';
			}else if (state=='disabled'){
				_status = '&fq=status:1';
			}else if (state=='toBeApproved'){
				_status = '&fq=status:[-10 TO -1]';
			}
			
//			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
//			console.log(createdby);
//			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
			
			var _createdby = '';
			if (createdby!=null && createdby!='' && createdby!='null'){
				_createdby = '&fq=createdby:' + createdby;
			}
			var fquery = q + sort + fq + _status + _createdby;
			console.log(fquery);
			var data = {
					fquery: fquery, 
					page: page, 
					pageSize: pageSize,
					status: status
//					status: '1'
			};
			console.log(data);
		
			var search = $.ajax({
        	    url: tenant + '/service/v1/search/products',
				data : data,
				type : 'GET'
			});
			search.done(function(response){
				console.log('Content.search.done');
//				callback('success', response, params);
				callback('success', response);
			});
			search.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.search.fail');
//				callback('fail', jqXHR, params);
				callback('fail', jqXHR);
			});
		},
		
		
//		//Funzione per eseguire la ricerca tra i vari Content.
//		//params json array con la seguente struttura:
//		//	var params = {
//		//		searchFor: searchFor,	//testo da ricercare
////				categoryId: categoryId, //'_none' ==> qualsiasi categoria
//		//		categoryId: categoryId, //null ==> qualsiasi categoria
//		//		state: state,			//'all' o 'enabled' o 'disabled' o 'toBeApproved'
//		//		status: status,			//'1'=tutti, '-10'=daApprovare
//		//		page: 0,
//		//		pageSize: 20
//		//	};
//		search: function(params, callback){
//			console.log('Product.search');
//			//q=*&sort=modifiedon desc&fq=categories:<id_categoria>/*
//			var query = Utils.cleanAndProcessQuery(params.searchFor);
//			var q = 'q=' + query + '*';
////			var sort = '&sort=modifiedon desc';
//			var sort = '&sort=_score desc, modifiedon desc';
//			var fq='';
////			if (params.categoryId!='_none'){
//			if (params.categoryId!=null){
//				fq = '&fq=categories:' + params.categoryId + '*';
//			}
//			var status = '&fq=status:[1 TO *]';
//			if (params.state=='enabled'){
//				status = '&fq=status:10';
//			}else if (params.state=='disabled'){
//				status = '&fq=status:1';
//			}else if (params.state=='toBeApproved'){
//				status = '&fq=status:[-10 TO -1]';
//			}
//			var fquery = q + sort + fq + status;
//			console.log(fquery);
//			var data = {
//					fquery: fquery, 
//					page: params.page, 
//					pageSize: params.pageSize,
//					status: params.status
////					status: '1'
//			};
//			console.log(data);
//		
//			var search = $.ajax({
//        	    url: tenant + '/service/v1/search/products',
//				data : data,
//				type : 'GET'
//			});
//			search.done(function(response){
//				console.log('Product.search.done');
//				callback('success', response, params);
//			});
//			search.fail(function(jqXHR, textStatus, errorThrown){
//				console.log('Product.search.fail');
//				callback('fail', jqXHR, params);
//			});
//		},
		
		
		
		
		
		
		getById: function(id, callback){
			console.log('Content.getById');
			console.log(id);
		
			var contents = $.ajax({
        	    url: tenant + '/service/v1/products/' + id,
				type : 'GET'
			});
			contents.done(function(response){
				console.log('Content.getById.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var items = json_string.items;
				var item = items.length>0 ? items[0] : null;
				console.log(item);
				if(callback){
					callback(item);
					return item;	
				}
			});
			contents.fail(function(){
				console.log('Content.getById.fail');
				callback(null);
				return null;
			});
		},
		
		
		/**
		 * Funzione per la modifica relativa dello score di un contenuto.
		 * Utilizzata per modificare il posizionamento di un contenuto
		 * all'interno della lista (-x per spostare di x posizioni in basso,
		 * +x per spostare di x posizioni in alto).
		 * id ==> identificativo del contenuto
		 * relativeScore ==> valore che andrà sommato allo score del contenuto
		 */
		changeScore: function(id, relativeScore, callback){
			console.log('Content.changeScore');
			console.log(id);
			console.log(relativeScore);
		
			var data = new FormData();
			data.append('id', id);
			data.append('score', relativeScore);
			var move = $.ajax({
        	    url: tenant + '/service/v1/products/changescore',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			move.done(function(response){
				console.log('Content.changeScore.done');
				callback('success', response);
			});
			move.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Content.changeScore.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		//Restituisce il numero di prodotti associati ad un determinato POI.
		//http://default.frontiere21.it/service/v1/products.count?q={%22shop%22:%22f0d5d48c6bb1eed1205d9c2cdf55c890ab373871%22}
		countByPoiId: function(poiId, callback){
			console.log('Content.countByPoiId');
			
			var count = $.ajax({
        	    url: tenant + '/service/v1/products.count?q={"shop": "' + poiId + '"}',
				type : 'GET'
			});
			count.done(function(response){
				console.log('Content.countByPoiId.done');
				callback(response, poiId);
			});
			count.fail(function(){
				console.log('Content.countByPoiId.fail');
				callback(null, poiId);
			});
		},
		
		
		//Restituisce il numero di prodotti associati ad una determinata Categoria.
		//http://default.frontiere21.it/service/v1/products.count?q={%22categories%22:%22/deal/beauty-deal%22}
		countByCategoryId: function(categoryId, callback){
			console.log('Content.countByCategoryId');
			
			var count = $.ajax({
        	    url: tenant + '/service/v1/products.count?q={"categories": "' + categoryId + '"}',
				type : 'GET'
			});
			count.done(function(response){
				console.log('Content.countByCategoryId.done');
				callback(response, categoryId);
			});
			count.fail(function(){
				console.log('Content.countByCategoryId.fail');
				callback(null, categoryId);
			});
		},
		
		
		
		getProperties: function(){
			console.log('Content.getProperties');
			return this.attributes.propertiesObject;
		},
		
	});
    
//	return new ProductModel();
	return Content;
});