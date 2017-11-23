define([
	'jquery',
	'backbone',
	'models/Utils',
], function($, Backbone, Utils){
	
	
	var TenantProperty = Backbone.Model.extend({
		
//		defaults: {
//			id: '',
//			code: '',
//			message: '',
//        },
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(){
			console.log('TenantProperty.initialize');
		},
		
		
		
		getAll: function(callback){
			console.log('TenantProperty.getAll');
		
			var properties = $.ajax({
        	    url: tenant + '/service/v1/cdata/_message_source',
				type : 'GET'
			});
			properties.done(function(response){
				console.log('TenantProperty.getAll.done');
				// console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('TenantProperty.getAll.fail');
				callback(null);
				return null;
			});
		},
		
		
		getById: function(id, callback){
			console.log('TenantProperty.getById');
			console.log(id);
		
			var properties = $.ajax({
        	    url: tenant + '/service/v1/cdata/_message_source/' + id,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('TenantProperty.getById.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('TenantProperty.getById.fail');
				callback(null);
				return null;
			});
		},
		
		
		
		//Funzione utilizzata per il salvataggio di una nuova property.
		//json={"code":"tenants.settings.default.sitetype","message":"ciccio"}
		//json={"code":"tenants.settings.default.send.email.from","message":"info@frontiere21.it"}
		add: function(code, message, callback){
			console.log('TenantProperty.add');
			
			var data = {};
			var jsonValue = '{"code":"' + code + '","message":"' + message + '"}';
			data.json = jsonValue;
			
			var add = $.ajax({
        	    url: tenant + '/service/v1/cdata/_message_source/',
				data: JSON.stringify(data),
				cache: false,
			    contentType: false,
			    processData: false,
				type: 'POST'
			});
			add.done(function(response){
				console.log('TenantProperty.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('TenantProperty.add.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		//Funzione utilizzata per la modifica di una property esistente.
		//json={"code":"tenants.settings.default.sitetype","message":"ciccio"}
		update: function(id, code, message, callback){
			console.log('TenantProperty.update');
			
			var data = {};
			var jsonValue = '{"code":"' + code + '","message":"' + message + '"}';
			data.json = jsonValue;

			console.log(jsonValue);
			
			var update = $.ajax({
				url: tenant + '/service/v1/cdata/_message_source/' + id,
				data: JSON.stringify(data),
				cache: false,
			    contentType: false,
			    processData: false,
				type: 'PUT'
			});
			update.done(function(response){
				console.log('TenantProperty.update.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('TenantProperty.update.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		//delete tenant property by id.
		deleteById: function(id, callback){
			console.log('TenantProperty.deleteById');
			var del = $.ajax({
        	    url: tenant + '/service/v1/cdata/_message_source/' + id,
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('TenantProperty.deleteById.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('TenantProperty.deleteById.fail');
				callback('fail', jqXHR);
			});
		},
		
			
	});
    
	return TenantProperty;
});