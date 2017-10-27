define([
	'jquery',
	'backbone',
	'Session',
], function($, Backbone, Session){
	
	
	var CSV = Backbone.Model.extend({

		
		initialize : function(){
			console.log('CSV.initialize');
		},
		
		
	

		preview: function(queryString, data, callback){
			console.log('callCSV.preview');

			if (queryString==null)
				queryString="";

			var callFn = $.ajax({
        	        url: tenant + '/service/v1/csv/preview' + queryString,
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'GET'
			});
			callFn.done(function(response){
				console.log('callCSV.preview.done');
				callback(response,'success');
			});
			callFn.fail(function(jqXHR, textStatus, errorThrown){
				console.log('callCSV.preview.fail');
				callback(jqXHR,'fail' );
			});
		},

		getHeaders: function(queryString, data, callback){
			console.log('callCSV.getHeaders');

			if (queryString==null)
				queryString="";

			var callFn = $.ajax({
        	        url: tenant + '/service/v1/csv/headers' + queryString,
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'GET'
			});
			callFn.done(function(response){
				console.log('callCSV.getHeaders.done');
				callback(response,'success');
			});
			callFn.fail(function(jqXHR, textStatus, errorThrown){
				console.log('callCSV.getHeaders.fail');
				callback(jqXHR,'fail' );
			});
		},


		import: function(queryString, data, callback){
			console.log('callCSV.getHeaders');

			if (queryString==null)
				queryString="";

			var callFn = $.ajax({
        	        url: tenant + '/service/v1/csv/import' + queryString,
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'GET'
			});
			callFn.done(function(response){
				console.log('callCSV.import.done');
				callback(response,'success');
			});
			callFn.fail(function(jqXHR, textStatus, errorThrown){
				console.log('callCSV.import.fail');
				callback(jqXHR,'fail' );
			});
		},
		
		
		
	});

	return CSV;
});
