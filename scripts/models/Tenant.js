define([
	'jquery',
	'backbone',
	'Session'
], function($, Backbone, Session){
	
	
	/**
	 * Per creare una nuova istanza User procedere nel seguente modo:
	 * 1) definire le proprietà
	 * 		var user = {
	 * 			username: username,
	 * 			fullName: fullname,
	 * 			email: email,
	 * 			photo: photo,
	 * 			productsCreatedByCount: productsCreatedByCount,
	 * 			productsLikesCount: productsLikesCount
	 * 		};
	 * 2) creare la nuova istanza
	 * 		var u = new User(user);
	 * 3) settare le eventuali custom properties nel seguente modo
	 * 		p.addProperty(id, displayName, value);
	 * Per recuperare una proprietà dell'istanza create:
	 * 		p.get("username");
	 * Per impostare/modificare una proprietà dell'istanza create:
	 * 		p.set({ fullname: 'newFullname' });
	 */
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
	        	    url: tenant + '/service/v1/tenants',
				//url: 'http://dressique.localhost.com:8880/smart21-server/service/v1/tenants',
				type : 'GET'
			});
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
