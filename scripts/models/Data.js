define([
	'jquery',
	'backbone',
	'models/Utils',
], function($, Backbone, Utils){
	
	
	var Data = Backbone.Model.extend({
		
//		defaults: {
//			id: '',
//			code: '',
//			message: '',
//        },
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(attributes, options){
			console.log('Data.initialize');
		},
		
		
				
		add: function(dsId, json, callback, type){
			console.log('Data.add');
			
			
//			var jsonString = JSON.stringify(json);
//			console.log(jsonString);
			
			var typeParam='';
			if (type){
				console.log("type" +type);
				typeParam='?type='+type;
				
			}
			
			console.log(json);
			
//			var data = new FormData();
//			var jsonValue = '{"code":"' + code + '","message":"' + message + '"}';
//			data.append('json', JSON.stringify(json));
			
			var add = $.ajax({
        	  	url: tenant+'/service/v1/datasets/'+ dsId+'/'+typeParam,
			 // url: 'http://localhost:8880/smart21-server/service/v1/datasets/',
//				data: data,
				data: json,

				cache: false,
			    contentType: false,
			    processData: false,
				type: 'POST'
			});
			add.done(function(response){
				console.log('Data.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Data.add.fail');
				callback('fail', jqXHR);
			});
		},




		search: function(dsId,query,callback){
			console.log('Data.search'); 
			console.log('Data.query: '+ query);
//			var queryString = '{"name":""}',
			var data = {
					q: query, 
//					pageSize: pageSize,
			};

			var Datas = $.ajax({
        	    url:  tenant + '/service/v1/datasets/'+ dsId ,
			data: data,
				type : 'GET'
			});
			Datas.done(function(response){
				console.log('Data.search.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			Datas.fail(function(){
				console.log('Data.search.fail');
				callback(null);
				return null;
			});
		},


		searchAsMap: function(dsId,query,page,callback, pageSize, type){
			console.log('Data.searchAsMap'); 
			console.log('Data.query: '+ query);
//			var queryString = '{"name":""}',
			var data = {
					q: query, 
					page: page,
//					pageSize: pageSize,
			};

			if (pageSize)
				data.pagesize=pageSize;

			if (type)
				data.type=type;
					
			var Datas = $.ajax({
        	    url:  tenant + '/service/v1/datasets/'+ dsId+'.map' ,
			data: data,
				type : 'GET'
			});
			Datas.done(function(response){
				console.log('Data.searchAsMap.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			Datas.fail(function(){
				console.log('Data.searchAsMap.fail');
				callback(null);
				return null;
			});
		},


		text: function(dsIs,text,callback){
			console.log('Data.search'); 
			console.log('Data.text: '+ text);
			var data = {
					text: text, 
			};

			var Datas = $.ajax({
        	    url:  tenant + '/service/v1/datasets/'+ dsId ,
			data: data,
				type : 'GET'
			});
			Datas.done(function(response){
				console.log('Data.text.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			Datas.fail(function(){
				console.log('Data.text.fail');
				callback(null);
				return null;
			});
		},


		textAsMap: function(dsId,text,page, callback){
			console.log('Data.search'); 
			console.log('Data.textAsMap: '+ text);
			var data = {
					page: page,
					text: text, 
			};

			var Datas = $.ajax({
        	    url:  tenant + '/service/v1/datasets/'+ dsId +".map",
			data: data,
				type : 'GET'
			});
			Datas.done(function(response){
				console.log('Data.textAsMap.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			Datas.fail(function(){
				console.log('Data.textAsMap.fail');
				callback(null);
				return null;
			});
		},
		
		
		getById: function(dsId, id, callback){
			console.log('Data.getById');
			console.log(id);
		
			var properties = $.ajax({
		    url: tenant+'/service/v1/datasets/'+ dsId+'/'+id ,
				type : 'GET'
			});
			properties.done(function(response){
				console.log('Data.getById.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			properties.fail(function(){
				console.log('Data.getById.fail');
				callback(null);
				return null;
			});
		},
		//delete tenant property by id.
		deleteById: function(dsId, id, callback){
			console.log('Data.deleteById');
			var del = $.ajax({
        	    url: tenant + '/service/v1/datasets/' + dsId + '/' + id,
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('Data.deleteById.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Data.deleteById.fail');
				callback('fail', jqXHR);
			});
		},
		//delete tenant property by id.
		deleteAll: function(dsId, callback){
			console.log('Data.deleteAll');
			var del = $.ajax({
        	    url: tenant + '/service/v1/datasets/' + dsId+'/onlyrecord',
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('Data.deleteAll.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Data.deleteAll.fail');
				callback('fail', jqXHR);
			});
		},

		
			
	});
    
	return Data;
});
