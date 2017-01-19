define([
	'jquery',
	'backbone',
	'Session',
	'models/Properties'
], function($, Backbone, Session, Properties){
	
	
	var File = Backbone.Model.extend({

		
		initialize : function(){
			console.log('File.initialize');
		},
		
		
		save: function(name, path, file, callback){
			console.log('File.save');
			var data = new FormData();

			if (name!=null)
				data.append('name', name);

			if (path!=null)
			data.append('path',	path);
	
			data.append('file', file);
			var add = $.ajax({
        	    url: tenant + '/service/v1/files?rfullpath=true',
		      // url: 'http://localhost:8880/smart21-server/service/v1/files/',
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'POST'
			});
			add.done(function(response){
				console.log('File.save.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('File.save.fail');
				callback('fail', jqXHR);
			});
		},

		
		deleteByPath: function(path, callback){
			console.log('File.deleteByPath');
			var del = $.ajax({
        	    url: tenant + '/service/v1/files',
        	    data : {path: path},
				type : 'DELETE'
			});
			del.done(function(response){
				console.log('File.deleteByPath.done');
				callback('success', response);
			});
			del.fail(function(jqXHR, textStatus, errorThrown){
				console.log('File.deleteByPath.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		getByPath: function(path, callback){
			console.log('File.getByPath');
			var getFile = $.ajax({
        	    url: tenant + '/service/v1/files',
        	    data : {path: path},        	    
				type : 'GET'
			});
			getFile.done(function(response){
				console.log('File.getByPath.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			getFile.fail(function(){
				console.log('File.getByPath.fail');
				callback(null);
				return null;
			});
		},
		
		
	});

	return File;
});
