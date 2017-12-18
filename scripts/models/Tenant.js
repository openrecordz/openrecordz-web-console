define([
	'jquery',
	'backbone',
	'Session'
], function($, Backbone, Session){
	
	var Tenant = Backbone.Model.extend({
		
		defaults: {
			name: ''
        },
		
		
		initialize : function(){
			console.log('Tenant.initialize');
		},
		
		
		getAll: function(callback){
			console.log('Tenant.getAll');
			var tenants = $.ajax({
	        	    url: tenant + '/service/v1/tenants/me',
				type : 'GET'
			});
			console.log('AAAAAAAA');
			console.log(url);
			tenants.done(function(response){
				console.log('Tenant.getAll.done');
//				callback('success', response);
				console.log("response: " + response);
				//Conversione della stringa in json.
//				var tenantsres = $.parseJSON(response);
				var tenantsres = response;

				console.log(tenantsres);
				if(callback){
					callback(tenantsres);
					return tenantsres;	
				}
			});
			tenants.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Tenant.getAll.fail');
//				callback('fail', jqXHR);
				callback(null);
				return null;
			});
		},
		create: function(params, callback){
			console.log('Tenant.create');
			console.log("params: "+ params);
			var tenants = $.ajax({
	        	   url: tenant + '/service/v1/tenants',
				type : 'POST',
				data : params,
				headers: {'Authorization' : 'Basic ' + Session.get("basicAuth")}		
			});
			tenants.done(function(response){
				console.log('Tenant.create.done');
//				callback('success', response);
				console.log("response: " + response);
				//Conversione della stringa in json.
//				var tenantsres = $.parseJSON(response);
//				var tenantsres = response;

//				console.log(tenantsres);
				callback('success', response);
			});
			tenants.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Tenant.create.fail');

				callback('fail', jqXHR, textStatus);
				return null;
			});
		}


		
		
		
		
	});

	return Tenant;
});
