define([
	'jquery',
	'backbone',
	'models/Utils',
], function($, Backbone, Utils){
	
	
	var Dataset = Backbone.Model.extend({
		
//		defaults: {
//			id: '',
//			code: '',
//			message: '',
//        },
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(attributes, options){
			console.log('Dataset.initialize');
		},
		
		
		
		getAll: function(callback){
			console.log('Dataset.getAll');
			
			var datasets = $.ajax({
        	    url: tenant + '/service/v1/datasets?pagesize=100',
//        	    url: 'http://localhost:8880/smart21-server/service/v1/datasets',
				type : 'GET'
			});
			datasets.done(function(response){
				console.log('Dataset.getAll.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			datasets.fail(function(){
				console.log('Dataset.getAll.fail');
				callback(null);
				return null;
			});
		},


		search: function(query,callback){
			console.log('Dataset.search');
			console.log('Dataset.query: '+ query);
//			var queryString = '{"name":""}',
			var data = {
					q: query, 
//					pageSize: pageSize,
			};

			var datasets = $.ajax({
        	    url: tenant + '/service/v1/datasets',
//        	    url: 'http://localhost:8880/smart21-server/service/v1/datasets',
			data: data,
				type : 'GET'
			});
			datasets.done(function(response){
				console.log('Dataset.search.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			datasets.fail(function(){
				console.log('Dataset.search.fail');
				callback(null);
				return null;
			});
		},
		


		text: function(text,callback){
			console.log('Dataset.text');
			console.log('Dataset.text: '+ text);
			var data = {
					text: text, 
			};

			var datasets = $.ajax({
        	    url: tenant + '/service/v1/datasets',
//        	    url: 'http://localhost:8880/smart21-server/service/v1/datasets',
			data: data,
				type : 'GET'
			});
			datasets.done(function(response){
				console.log('Dataset.text.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			datasets.fail(function(){
				console.log('Dataset.text.fail');
				callback(null);
				return null;
			});
		},
		
		
			
		getById: function(id, callback, byslug, countr, countb){
			console.log('Dataset.getById',id);
			console.log('Dataset.getById.byslug',byslug);
			console.log('Dataset.getById.countr',countr);
			console.log('Dataset.getById.countb',countb);
		
			var searchBySlug=false;
			var countRecords=false;
			var countBinary=false;

			if (byslug)
				searchBySlug=byslug;

			if (countr)
			countRecords=countr;

			if (countb)
			countBinary=countb;


			var properties = $.ajax({
        	    url: tenant + '/service/v1/datasets/' + id+'/meta?byslug='+searchBySlug+'&countr='+countRecords+'&countb='+countBinary,
        	  //  url: 'http://localhost:8880/smart21-server/service/v1/datasets/'+id,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('Dataset.getById.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('Dataset.getById.fail');
				callback(null);
				return null;
			});
		},
		add: function(json, callback){
			console.log('Dataset.add');
			
			console.log(json);
//			var jsonString = JSON.stringify(json);
//			console.log(jsonString);
			
//			var data = new FormData();
//			var jsonValue = '{"code":"' + code + '","message":"' + message + '"}';
//			data.append('json', JSON.stringify(json));
			
			var add = $.ajax({
        	  	url: tenant + '/service/v1/datasets',
			 // url: 'http://localhost:8880/smart21-server/service/v1/datasets/',
//				data: data,
				data: json,

				cache: false,
			    contentType: false,
			    processData: false,
				type: 'POST'
			});
			add.done(function(response){
				console.log('Dataset.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Dataset.add.fail');
				callback('fail', jqXHR);
			});
		},


		update: function(id,json, callback){
			console.log('Dataset.update');
			console.log(id);			
			console.log(json);
			
			var add = $.ajax({
        	  	url: tenant + '/service/v1/datasets/'+id,
			 // url: 'http://localhost:8880/smart21-server/service/v1/datasets/',
//				data: data,
				data: json,

				cache: false,
			    contentType: false,
			    processData: false,
				type: 'PUT'
			});
			add.done(function(response){
				console.log('Dataset.update.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Dataset.update.fail');
				callback('fail', jqXHR);
			});
		},

		patch: function(id,json, callback){
			console.log('Dataset.patch');
			console.log(id);			
			console.log(json);
			
			var add = $.ajax({
        	  	url: tenant + '/service/v1/datasets/'+id,		
				data: json,

				cache: false,
			    contentType: false,
			    processData: false,
				type: 'PATCH'
			});
			add.done(function(response){
				console.log('Dataset.patch.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Dataset.patch.fail');
				callback('fail', jqXHR);
			});
		},

			
		//delete tenant property by id.
		deleteById: function( id, callback){
			console.log('Dataset.deleteById');
			var del = $.ajax({
        	    url: tenant + '/service/v1/datasets/'+ id,
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('Dataset.deleteById.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Dataset.deleteById.fail');
				callback('fail', jqXHR);
			});
		},			
	});
    
	return Dataset;
});
