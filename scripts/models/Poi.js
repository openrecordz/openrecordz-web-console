define([
	'jquery',
	'backbone',
	'models/Properties'
//	'Session'
], function($, Backbone, Properties){
//], function($, Backbone, Session){
	
	/**
	 * ========================  INSTRUCTIONS  ========================
	 * 
	 * ************************  Callback define  ************************
	 * var that = this;
	 * var callback = function(result, response){
	 * 		that.testDone(result, response);
	 * };
	 * 
	 * ************************  Add new Poi  	************************
	 * var poiDetails = {
	 * 		name: 'Test',
	 * 		lat: 0.0, 
	 * 		lon: 0.0
	 * };
	 * var poi = new Poi();
	 * poi.add(poiDetails, callback);
	 * ************************  Get Poi by id  ************************
	 * var id = '550ae1b7e4b014c959840062';
	 * var poi = new Poi();
	 * poi.getById(id, callback);
	 * ************************  Search Poi  	************************
	 * var params = {
	 * 		name: 'test',
	 * 		lat: 42.0,
	 * 		lon: 18.0
	 * };
	 * var poi = new Poi();
	 * poi.search(params, callback);
	 * ************************  Update Poi  	************************
	 * var params = {
	 * 		id: '550add0be4b014c959840060',
	 * 		name: 'TestUpdated',
	 * 		lat: 42.0,
	 * 		lon: 18.0
	 * };
	 * var poi = new Poi();
	 * poi.update(params, callback);
	 * ************************  Delete Poi  	************************
	 * var id = '550add0be4b014c959840060';
	 * var poi = new Poi();
	 * poi.deleteById(id, callback);
	 */
	
	var Poi = Backbone.Model.extend({
		
		//model default values.
		defaults: {
			id: '',
			file: null,
			name: '',
			description: '',
			city: '',
			country: '',
			address: '',
			phone: '',
			source: '',
			reference: '',
			lat: '',
			lon: '',
			category: '',
			properties: '',
			propertiesObject: new Properties()
        },
//		defaults: {
//			name: '',
//			lat: config.position.lat,
//			lon: config.position.lon
//		},
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(){
			console.log('Poi.initialize');
			//Inizializzazione del default Poi con quello specificato nel file di configurazione.
//			this.initDefaultPoi();
		},
		
		//add new poi.
		//parameters:
		//	- poiDetails = {name: 'poiName', lat: xx, lon: yy};
		//	- callback   = function which to return the result.
		add: function(poiDetails, callback){
			console.log('Poi.add');
			console.log(poiDetails);
			var add = $.ajax({
				url: tenant + '/service/v1/shops/add',
				data : poiDetails,
				type : 'POST'
			});
			add.done(function(response){
				console.log('Poi.add.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var items = json_string.items;
				var poi = items.length>0 ? items[0] : null;
				callback(poi, response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.add.fail');
				callback(null, jqXHR);
			});
		},
		
		
		
		//update poi.
		//parameters:
		//	- poiDetails = {
		//		id:	poiId,				REQUIRED
		//		name: 'poiName', 		REQUIRED
		//		description: '...',
		//		city: '..',
		//		country: '..',
		//		address: '..',
		//		phone: '..',
		//		source: '..',
		//		reference: '..',
		//		lat: xx, 				REQUIRED
		//		lon: yy,				REQUIRED
		//		category: '..',
		//		properties: '..',
		//	  };
		//	- callback   = function which to return the result.
		update: function(callback){
			console.log('Poi.update');
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			console.log(this.attributes);
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
			var that = this;
			
			var poiDetails = {
				id: 			this.attributes.id,
				name: 			this.attributes.name,
				description: 	this.attributes.description,
				city: 			this.attributes.city,
				country:		this.attributes.country,
				address: 		this.attributes.address,
				phone: 			this.attributes.phone,
				lat: 			this.attributes.lat,
				lon: 			this.attributes.lon,
				category: 		this.attributes.category,
			};
			
			var upd = $.ajax({
        	    url: tenant + '/service/v1/shops/update',
				data: poiDetails,
				type: 'POST'
			});
			upd.done(function(response){
				console.log('Poi.update.done');
				callback('success', response);
			});
			upd.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.update.fail');
				callback('fail', jqXHR);
			});
		},
		
//		update: function(poi, callback){
//			console.log('Poi.update');
////			console.log(poiDetails);
//			
//			var poiDetails = {
//				id: 			poi.attributes.id,
//				name: 			poi.attributes.name,
//				description: 	poi.attributes.description,
//				city: 			poi.attributes.city,
//				country:		poi.attributes.country,
//				address: 		poi.attributes.address,
//				phone: 			poi.attributes.phone,
//				lat: 			poi.attributes.lat,
//				lon: 			poi.attributes.lon,
//				category: 		poi.attributes.category,
//			};
//			
//			
//			var upd = $.ajax({
//				url: tenant + '/service/v1/shops/update',
//				data : poiDetails,
//				type : 'POST'
//			});
//			upd.done(function(response){
//				console.log('Poi.update.done');
//				//Conversione della stringa in json.
//				var json_string = jQuery.parseJSON(response);
//				var items = json_string.items;
//				var poi = items.length>0 ? items[0] : null;
//				callback(poi, response);
//			});
//			upd.fail(function(jqXHR, textStatus, errorThrown){
//				console.log('Poi.update.fail');
//				callback(null, jqXHR);
//			});
//		},
		
//		//update poi.
//		//parameters:
//		//	- poiDetails = {
//		//		id: poiId,
//		//		name: 'poiName', 
//		//		lat: xx, 
//		//		lon: yy
//		//	  };
//		//	- callback   = function which to return the result.
//		update: function(poiDetails, callback){
//			console.log('Poi.update');
//			console.log(poiDetails);
//			var upd = $.ajax({
//				url: tenant + '/service/v1/shops/update',
//				data : poiDetails,
//				type : 'POST'
//			});
//			upd.done(function(response){
//				console.log('Poi.update.done');
//				//Conversione della stringa in json.
//				var json_string = jQuery.parseJSON(response);
//				var items = json_string.items;
//				var poi = items.length>0 ? items[0] : null;
//				callback(poi);
//			});
//			upd.fail(function(){
//				console.log('Poi.update.fail');
//				callback(null);
//			});
//		},
		
		
		
		//delete poi by id.
		deleteById: function(id, callback){
			console.log('Poi.deleteById');
			var del = $.ajax({
        	    url: tenant + '/service/v1/shops/' + id + '/delete',
				type : 'GET'
			});
			del.done(function(response){
				console.log('Poi.deleteById.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.deleteById.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		//get poi by id.
		getById: function(id, callback){
			console.log('Poi.getById');
			var getPoi = $.ajax({
        	    url: tenant + '/service/v1/shops/' + id,
				type : 'GET'
			});
			getPoi.done(function(response){
				console.log('Poi.getById.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var items = json_string.items;
				var poi = items.length>0 ? items[0] : null;
				callback(poi, response);
			});
			getPoi.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.getById.fail');
				callback(null, jqXHR);
			});
		},
		
		
		//search poi by text.
		//http://default.frontiere21.it/service/v1/shops/search?name=hotel&lat=40.178262&lon=18.1800372
		//parameters:
		//	- params = {name: 'poiName', lat: xx, lon: yy };
		//	- callback   = function which to return the result.
		search: function(params, callback){
			console.log('Poi.search');
			console.log(params);
			var pois = $.ajax({
				url: tenant + '/service/v1/shops/search?name=' + params.name + '&lat=' + params.lat + '&lon=' + params.lon,
				type : 'GET'
			});
			pois.done(function(response){
				console.log('Poi.search');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var pois = json_string.items;
				callback(pois);
			});
			pois.fail(function(){
				console.log('Poi.search.fail');
				callback(null);
			});
		},
		
		
		//Search by text of all pois from db (mongo).
		//http://default.frontiere21.it/service/v1/search/shops?q=*&page=0&pageSize=10
		//parameters:
		//	- params = {text: *, page: x, pageSize: y};
		//	- callback   = function which to return the result.
		searchByText: function(params, callback){
			console.log('Poi.searchByText');
			console.log(params);
//			var urlService = tenant + '/service/v1/search/shops';
			
			var data = {
					q: params.searchFor, 
					page: params.page, 
					pageSize: params.pageSize,
			};
			console.log(data);
		
			var search = $.ajax({
        	    url: tenant + '/service/v1/search/shops',
				data : data,
				type : 'GET'
			});
			search.done(function(response){
				console.log('Poi.searchByText.done');
				callback('success', response, params);
			});
			search.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.searchByText.fail');
				callback('fail', jqXHR, params);
			});
			
		},
		
		
		//Get all pois from db (mongo).
		//http://default.frontiere21.it/service/v1/shops?page=0&pageSize=10
		//parameters:
		//	- params = {page: x, pageSize: y};
		//	- callback   = function which to return the result.
		getAll: function(params, callback){
			console.log('Poi.getAll');
			console.log(params);
			var urlService = tenant + '/service/v1/shops';
			if (params && params.page && params.pageSize){
				urlService = urlService + '?page=' + params.page + '&pageSize=' + params.pageSize;
			}
			
			var pois = $.ajax({
				url: urlService,
				type : 'GET'
			});
			pois.done(function(response){
				console.log('Poi.getAll.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var pois = json_string.items;
				callback(pois);
			});
			pois.fail(function(){
				console.log('Poi.getAll.fail');
				callback(null);
			});
		},
		
		
		
		
		//Get suggested pois.
		//http://default.frontiere21.it/service/v1/shops?lat=40.178262&lon=18.1800372
		//parameters:
		//	- params = {lat: xx, lon: yy }; (lat and lon optional)
		//	- callback   = function which to return the result.
		getSuggested: function(params, callback){
			console.log('Poi.getSuggested');
			console.log(params);
			var urlService = tenant + '/service/v1/shops';
			if (params && params.lat && params.lon){
				urlService = urlService + '?lat=' + params.lat + '&lon=' + params.lon;
			}
			
			var pois = $.ajax({
//				url: tenant + '/service/v1/shops?lat=' + params.lat + '&lon=' + params.lon,
				url: urlService,
				type : 'GET'
			});
			pois.done(function(response){
				console.log('Poi.getSuggested');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var pois = json_string.items;
				callback(pois);
			});
			pois.fail(function(){
				console.log('Poi.getSuggested.fail');
				callback(null);
			});
		},
		

		//Update della cover di un Poi (passare file=null per rimuovere la cover).
		updateCover: function(poiId, file, callback){
			console.log('Poi.updateCover');
			var data = new FormData();
			data.append('id', poiId);
			data.append('file', file);
			var upload = $.ajax({
        	    url: tenant + '/service/v1/shops/updatecover',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			upload.done(function(response){
				console.log('Poi.updateCover.done');
				callback('success', response);
			});
			upload.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Poi.updateCover.fail');
				callback('fail', jqXHR);
			});
		},
		
		
	});
    
//	return new PoiModel();
	return Poi;
});