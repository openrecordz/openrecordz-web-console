define([
	'jquery',
	'backbone',
	'models/Utils',
], function($, Backbone, Utils){
	
	
	var CustomData = Backbone.Model.extend({
		
//		defaults: {
//			id: '',
//			code: '',
//			message: '',
//        },
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(attributes, options){
			console.log('CustomData.initialize');
		},
		
		
		
		getAll: function(className, callback){
			console.log('CustomData.getAll');
		
			var properties = $.ajax({
        	    url: tenant + '/service/v1/cdata/' + className,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('CustomData.getAll.done');
//				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('CustomData.getAll.fail');
				callback(null);
				return null;
			});
		},
		
		
		get: function(className, page, pageSize, callback){
			console.log('CustomData.get');
			var data = {
					page: page, 
					pageSize: pageSize,
			};
			var properties = $.ajax({
        	    url: tenant + '/service/v1/cdata/' + className,
        	    data: data,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('CustomData.get.done');
//				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('CustomData.get.fail');
				callback(null);
				return null;
			});
		},
		
		
		getById: function(className, id, callback){
			console.log('CustomData.getById');
			console.log(id);
		
			var properties = $.ajax({
        	    url: tenant + '/service/v1/cdata/' + className + '/' + id,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('CustomData.getById.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('CustomData.getById.fail');
				callback(null);
				return null;
			});
		},
		
		
		
		//Funzione utilizzata per il salvataggio di una nuova property.
		//json={"code":"tenants.settings.default.sitetype","message":"ciccio"}
		//json={"code":"tenants.settings.default.send.email.from","message":"info@frontiere21.it"}
		add: function(className, json, callback){
			console.log('CustomData.add');
			
			console.log(json);
//			var jsonString = JSON.stringify(json);
//			console.log(jsonString);
			
			var data = new FormData();
//			var jsonValue = '{"code":"' + code + '","message":"' + message + '"}';
			data.append('json', JSON.stringify(json));
			
			var add = $.ajax({
        	    url: tenant + '/service/v1/cdata/' + className + '/add',
				data: data,
				cache: false,
			    contentType: false,
			    processData: false,
				type: 'POST'
			});
			add.done(function(response){
				console.log('CustomData.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('CustomData.add.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		//Funzione utilizzata per la modifica di una property esistente.
		//json={"code":"tenants.settings.default.sitetype","message":"ciccio"}
		update: function(className, id, json, callback){
			console.log('CustomData.update');
			
//			var jsonValue = 'json={"id": "' + id + '","code":"' + code + '","message":"' + message + '"}';
//			console.log(jsonValue);
			console.log(json);
			var jsonString = JSON.stringify(json);
			console.log(jsonString);
			
			var update = $.ajax({
//        	    url: tenant + '/service/v1/cdata/' + className + '/' + id + '?' + jsonValue,
				url: tenant + '/service/v1/cdata/' + className + '/' + id + '?json=' + jsonString,
				cache: false,
			    contentType: false,
			    processData: false,
				type: 'PUT'
			});
			update.done(function(response){
				console.log('CustomData.update.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('CustomData.update.fail');
				callback('fail', jqXHR);
			});
		},		
		
		
		//delete tenant property by id.
		deleteById: function(className, id, callback){
			console.log('CustomData.deleteById');
			var del = $.ajax({
        	    url: tenant + '/service/v1/cdata/' + className + '/' + id,
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('CustomData.deleteById.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('CustomData.deleteById.fail');
				callback('fail', jqXHR);
			});
		},
		
			
	});
    
	return CustomData;
});