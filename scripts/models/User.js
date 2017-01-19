define([
	'jquery',
	'backbone',
	'Session',
	'models/Properties'
], function($, Backbone, Session, Properties){
	
	
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
	var User = Backbone.Model.extend({
//		propertiesMap : {},
		
		defaults: {
			username: '',
			password: '',
			fullName: '',
			email: '',
			photo: '',
			file: null,
			productsCreatedByCount: '0',
			productsLikesCount: '0',
			properties: '',
			propertiesObject: new Properties()
        },
		
		
		initialize : function(){
			console.log('User.initialize');
		},
		
		
		getByUsername: function(username, callback){
			console.log('User.getByUsername');
//			var that = this;
			var users = $.ajax({
        	    url: tenant + '/service/v1/people/' + username,
				type : 'GET'
			});
			users.done(function(response){
				console.log('User.getByUsername.done');
//				callback('success', response);
				//Conversione della stringa in json.
				//var json_string = jQuery.parseJSON(response);
				var json_string = response;
				var user = json_string.people;
//				var user = items.length>0 ? items[0] : null;
				console.log(user);
				if(callback){
					callback(user);
					return user;	
				}
			});
			users.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.getByUsername.fail');
//				callback('fail', jqXHR);
				callback(null);
				return null;
			});
		},
		
		
		search: function(params, callback){
			console.log('Users.searchFullText');
//			var that = this;
//			var searchFor = params.searchFor;
//			console.log('Users.searchFullText - query=' + searchFor + ', page=' + params.page + ', pageSize=' + params.pageSize);
			console.log(params);
			var users = $.ajax({
        	    url: tenant + '/service/v1/people?text=' + params.searchFor + '&page=' + params.page + '&pageSize=' + params.pageSize,
				type : 'GET'
			});
			users.done(function(response){
				console.log('Users.searchFullText.done');
				callback('success', response, params);
			});
			users.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Users.searchFullText.fail');
				callback('fail', response, params);
			});
			
		},
		
		
		update: function(callback){
			console.log('User.update');
//			var that = this;
			
			var userDetails = {
				username: 				this.attributes.username,
				fullName: 				this.attributes.fullName,
				email: 					this.attributes.email,
				photo: 					this.attributes.photo,
				productsCreatedByCount:	this.attributes.productsCreatedByCount,
				productsLikesCount: 	this.attributes.productsLikesCount,
				properties: 			this.attributes.properties
			};
			console.log(userDetails);
			
			var update = $.ajax({
        	    url: tenant + '/service/v1/people/update',
        	    data: userDetails,
				type: 'POST'
			});
			update.done(function(response){
				console.log('User.update.done');
				callback('success', response);
			});
			update.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.update.fail');
				callback('fail', jqXHR);
			});
		},
		
//		update: function(user, callback){
//			console.log('User.update');
////			var that = this;
//			
//			var userDetails = {
//				username: user.attributes.username,
//				fullName: user.attributes.fullName,
//				email: user.attributes.email,
//				photo: user.attributes.photo,
//				productsCreatedByCount: user.attributes.productsCreatedByCount,
//				productsLikesCount: user.attributes.productsLikesCount,
//				properties: user.attributes.properties
//			};
//			console.log(userDetails);
//			
//			var update = $.ajax({
//        	    url: tenant + '/service/v1/people/update',
////				data : userDetails,
//        	    data: userDetails,
//				type: 'POST'
//			});
//			update.done(function(response){
//				console.log('User.update.done');
//				callback('success', response);
//			});
//			update.fail(function(jqXHR, textStatus, errorThrown){
//				console.log('User.update.fail');
//				callback('fail', jqXHR);
//			});
//		},
		

//		update: function(userDetails, callback){
//			console.log('User.update');
////			console.log(userDetails.username);
////			var that = this;
//			
//			var userDetails1 = {
//				username: userDetails.username,
//				fullName: userDetails.fullName,
//				email: userDetails.email,
//				photo: userDetails.photo,
//				productsCreatedByCount: userDetails.productsCreatedByCount,
//				productsLikesCount: userDetails.productsLikesCount,
//				properties: userDetails.properties
//			};
//			console.log(userDetails1);
//			
//			var update = $.ajax({
//        	    url: tenant + '/service/v1/people/update',
////				data : userDetails,
//        	    data: userDetails1,
//				type: 'POST'
//			});
//			update.done(function(response){
//				console.log('User.update.done');
//				callback('success', response);
//			});
//			update.fail(function(jqXHR, textStatus, errorThrown){
//				console.log('User.update.fail');
//				callback('fail', jqXHR);
//			});
//		},
		
		
		uploadPhoto: function(username, file, callback){
			console.log('User.uploadPhoto');
//			var image = this.attributes.file;
			var data = new FormData();
			data.append('username', username);
//			data.append('photo_file', file);
			data.append('photo_file', file);
			var upload = $.ajax({
        	    url: tenant + '/service/v1/people/updatephoto',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			upload.done(function(response){
				console.log('User.uploadPhoto.done');
				callback('success', response);
			});
			upload.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.uploadPhoto.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		login: function(credentials, callback){
			console.log('User.login');
			var that = this;

//			var credentials = {
//				username : this.username,
//				password : this.password
//			};
			
			var login = $.ajax({
				url : tenant + '/service/v1/signin',
				data : credentials,
				type : 'POST'
			});
			login.done(function(response){
				console.log('User.login.done');
				//Risposta tipo in caso di successo:
				//{"status":"success", "channel":"signin", "username":"admin", "basicAuth":"YWRtaW46ZHJzYWRtaW4="}
				//in caso di fail:
				//{"status":401,"code":401,"message":"Authentication failure with username : admin and password : drsadminf"
				//,"developerMessage":"Authentication failure with username : admin and password : drsadminf","moreInfoUrl"
				//:"mailto:info@ciaotrip.it"}
				
				callback('success', response);
			});
			login.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.login.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		getRoles: function(username, callback){
			console.log('User.getRoles');
//			var that = this;
			var roles = $.ajax({
				//http://default.frontiere21.it/service/v1/users/getroles?username=alessiacarratta
        	    url: tenant + '/service/v1/users/getroles',
        	    data: {username: username},
				type : 'GET'
			});
			roles.done(function(response){
				console.log('User.getRoles.done');
				//'[{"authority":"ROLE_RESTUSER"},{"authority":"ROLE_USER"}]';
//				console.log(response);
	
				var roles = response;
//				var roles = [];
//				for(var i in response){
//				     var roleName = response[i].authority;
//				     console.log(roleName);
//				     roles.push(roleName); // insert as last item
//				}
				
				if(callback){
					callback(username, roles);
					return roles;
				}
			});
			roles.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.getRoles.fail');
				callback(username, null);
				return null;
			});
		},
		
		
		
		
		
		//Utilizzata in alcuni casi quando non si passa da un router,
		//e quindi non è presente l'header 'Authorization'.
		getRolesWithBasicAuth: function(username, basicAuth, callback){
			console.log('User.getRolesWithBasicAuth');
//			var that = this;
			var roles = $.ajax({
				//http://default.frontiere21.it/service/v1/users/getroles?username=alessiacarratta
        	    url: tenant + '/service/v1/users/getroles',
        	    data: {username: username},
        	    headers: {'Authorization': basicAuth},
//        	    headers: {'Authorization' : 'Basic ' + basicAuth},
				type : 'GET'
			});
			
			roles.done(function(response){
				console.log('User.getRoles.done');
				var roles = response;
				
				if(callback){
					callback('success', username, roles);
//					callback(username, roles);
					return roles;
				}
			});
			roles.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.getRoles.fail');
				callback('fail', username, null);
				return null;
			});
		},
		
		
		
		
		saveRoles: function(username, roles, callback){
			console.log('User.saveRoles');
			
//			var data = {
//				username: 	username,
//				roles:		['ROLE_USER', 'ROLE_RESTUSER', 'ROLE_ADMIN'].toString()
//			};
			
//			console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
//			console.log(roles.toString());
//			console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
			
			var data = {
				username: 	username,
				roles:		roles.toString()
			};
			
			var save = $.ajax({
        	    url: tenant + '/service/v1/users/saveroles',
        	    data: data,
				type: 'POST'
			});
			save.done(function(response){
				console.log('User.saveRoles.done');
				callback('success', response);
			});
			save.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.saveRoles.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		getProperties: function(){
			console.log('getProperties');
//			return this.attributes.properties;
			return this.attributes.propertiesObject;
		},
		
		
		
		signup: function(fullName, username, email, password, callback){
			console.log('User.signup');
			
			
			var data = new FormData();
			data.append('fullName', fullName);
			data.append('username', username);
			data.append('email', email);
			data.append('password', password);
//			data.append('tenant', newtenant);
			data.append('acceptTermsOfService',true);
			
			/*var data = {
					fullName: 	fullName,
					username: 	username,
					email: 	email,
					password: 	password,
					tenant: 	tenant
				};
				*/
		
			
			var save = $.ajax({
        	    //url: tenant + '/service/v1/signupwithphoto',
				url: tenant + '/service/v1/signup',
				//url: "http://www.dressique.localhost.com:8880/smart21-server/service/v1/tenants/registerapp",
        	  		data: data,
				type: 'POST',
				cache: false,
				contentType: false,
				processData: false,
			});
			save.done(function(response){
				console.log('User.signup.done');
//				console.log('User.signup.response', response);
				callback('success', response);
			});
			save.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.signup.fail');
				callback('fail', jqXHR);
			});
		},


		signupAndCreateTenant: function(fullName, username, email, password, newtenant, callback){
			console.log('User.signupAndCreateTenant');
			
			
			var data = new FormData();
			data.append('fullName', fullName);
			data.append('username', username);
			data.append('email', email);
			data.append('password', password);
			data.append('tenant', newtenant);
			data.append('acceptTermsOfService',true);
			
			/*var data = {
					fullName: 	fullName,
					username: 	username,
					email: 	email,
					password: 	password,
					tenant: 	tenant
				};
				*/
		
			 
			var save = $.ajax({
        	    //url: tenant + '/service/v1/signupwithphoto',
				url: tenant + '/service/v1/tenants/registerapp',
				//url: "http://www.dressique.localhost.com:8880/smart21-server/service/v1/tenants/registerapp",
        	    data: data,
				type: 'POST',
				cache: false,
				contentType: false,
				processData: false,
			});
			save.done(function(response){
				console.log('User.signupAndCreateTenant.done');
				callback('success', response);
			});
			save.fail(function(jqXHR, textStatus, errorThrown){
				console.log('User.signupAndCreateTenant.fail');
				callback('fail', jqXHR);
			});
		},
		
		
		
		
	});

	return User;
});
