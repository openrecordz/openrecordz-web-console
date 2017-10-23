define([
	'jquery',
	'backbone',
	'Session',
], function($, Backbone, Session){
	
	
	var CustomFunction = Backbone.Model.extend({

		
		initialize : function(){
			console.log('CustomFunction.initialize');
		},
		
		
		call: function(functionName, queryString, data, callback){
			console.log('CustomFunction.call');
//			globCFCallBack=callback;

			//var data = new FormData();
			if (queryString==null)
				queryString="";

			var callFn = $.ajax({
        	        url: tenant + '/service/v1/functions/'+ functionName + queryString,
//		       url: 'http://localhost:8880/smart21-server/service/v1/functions/'+ functionName + queryString,
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'POST'
			});
			callFn.done(function(response){
				console.log('CustomFunction.call.done');
				callback(response,'success');
			});
			callFn.fail(function(jqXHR, textStatus, errorThrown){
				console.log('CustomFunction.call.fail');
				callback(jqXHR,'fail' );
			});
		},

		callCSV: function(functionName, queryString, data, callback){
			console.log('callCSV.call');
//			globCFCallBack=callback;

			//var data = new FormData();
			if (queryString==null)
				queryString="";

			var callFn = $.ajax({
        	        url: tenant + '/service/v1/csv/'+ functionName + queryString,
//		       url: 'http://localhost:8880/smart21-server/service/v1/functions/'+ functionName + queryString,
				data : data,
				cache: false,
			    	contentType: false,
				processData: false,
				type : 'POST'
			});
			callFn.done(function(response){
				console.log('callCSV.call.done');
				callback(response,'success');
			});
			callFn.fail(function(jqXHR, textStatus, errorThrown){
				console.log('callCSV.call.fail');
				callback(jqXHR,'fail' );
			});
		},

		
		
		
	});

	return CustomFunction;
});
