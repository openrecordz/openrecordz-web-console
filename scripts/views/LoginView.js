define([
	'jquery',
	'core/BaseView',
	'models/Utils',
	'models/User',
	'text!templates/loginTemplate.html',
	'Session',
	'bootbox'
], function($, BaseView, 
		Utils, User, 
		loginTemplate, Session,bootbox){

	var LoginView = BaseView.extend({
		template: _.template(loginTemplate),
		username: null,
		password: null,
		
		events: {
			'click button' : 'submit'
		},

		//it will be called when the view is first created
		initialize: function(){
			console.log('LoginView.initialize');
			this.username = this.getURLParameter('username');
			this.password = this.getURLParameter('password');
//			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
//			console.log('username = ' + this.username);
//			console.log('password = ' + this.password);
//			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
		},
		
		
		//Recupero parametri di ricerca (dall'url)
		getURLParameter: function(name) {
		  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
		},
		
		
		
		
		render: function(){
			if(this.username!=null && this.password!=null){
				//Eseguo autologin
				this.autoLogin();
			}else{
				//Richiedo login
				this.$el.html(this.template());				
			}
			//A good convention is to return this at the end of render to enable chained calls. 
			return this;
		},
		
		
		isFormValid: function() {
			var that = this;
			var valid = true;
			
			//Nascondo tutti gli errori.
			Utils.hideAllError();

			//Validazione dello Username.
			var username = $('#username').val();
			if (username=="") {
				//username is not valid. 
				Utils.showError(that, 'username', 'Inserire lo username!');
				valid = false;
			}
			
			//Validazione della Password.
			var password = $('#password').val();
			if (password=="") {
				//password is not valid. 
				Utils.showError(that, 'password', 'Inserire la password!');
				valid = false;
			}
			
			if(!valid){
				$('#formAlert').show();
			}
			return valid;
		},
		
		
		//Funzione utilizzata per eseguire un auto login.
		//Questo nel caso in cui lo username e la password
		//sono passati come parametri nell'url.
		autoLogin: function(){
			console.log('LoginView.autoLogin');
			var view = this;
			var credentials = {
				username: view.username,
				password: view.password
			};
			var callback = function(result, response){
				view.autoLoginDone(result, response);
			};
			var user = new User();
			user.login(credentials, callback);
		},
		
		
		autoLoginDone: function(result, response){
			console.log('LoginView.autoLoginDone');
			if(result=='success'){
				//Conversione della stringa in json.
				var jsonString = jQuery.parseJSON(response);
				var username = jsonString.username;
				var basicAuth = jsonString.basicAuth;
				Session.set('authenticated', true);
				Session.set('username', username);
				Session.set('basicAuth', basicAuth);
				
				//this.getUserRoles(username, basicAuth);
				Backbone.history.navigate('loginDone', { trigger : true });

//				return this;
			}else{
				var errMessage = Utils.getError(response);
				alert(errMessage);
				this.username = null;
				this.password = null;
				this.render();
			}
		},
		
		
		
		
		
		
		submit: function(e){
			e.preventDefault();
			console.log('LoginView.submit');
			var view = this;
			if(this.isFormValid()){
				console.log('LoginView.submit  -  form IS valid!');
				var credentials = {
					username : $('#username').val(),
					password : $('#password').val()
				};
				var callback = function(result, response){
					view.loginDone(result, response);
				};
//				Session.login(credentials, callback);
				var user = new User();
				user.login(credentials, callback);
			}
		},
		
		
		loginDone: function(result, response){
			console.log('LoginView.loginDone');
			if(result=='success'){
				//Conversione della stringa in json.
//				var jsonString = jQuery.parseJSON(response);
				var jsonString =response;
				var username = jsonString.username;
				var basicAuth = jsonString.basicAuth;
				Session.set('authenticated', true);
				Session.set('username', username);
				Session.set('basicAuth', basicAuth);
				
/*
				var myDate = new Date();
				myDate.setMonth(myDate.getMonth() + 12);
				document.cookie = "username="+username + ";expires=" + myDate +";domain=.smart21.it;path=/";
				document.cookie = "basicAuth="+basicAuth+ ";expires=" + myDate +";domain=.smart21.it;path=/";			
				console.log("cookies: "+ document.cookie);
*/
//				this.getUserRoles(username, basicAuth);
				Backbone.history.navigate('loginDone', { trigger : true });

//				return this;
			}else{
				var errMessage = Utils.getError(response);
				console.log(errMessage);
//				alert(errMessage);
				bootbox.alert({
					title: "Errore",
					message: "Utente non abilitato!",
				});

			}
		},

		
		
		
		
		//=================================================================
		//Permessi di un utente.

/*

		getUserRoles: function(username, basicAuth){
			console.log('LoginView.getUserRoles');
			//Definizione della callback da richiamare una volta recuperati i permessi.
			var view = this;
			var callback = function(username, roles){
				view.userRolesTaken(username, roles);
			};
			//Recupero dei permessi dell'utente.
			var user = new User();
//			user.getRoles(username, callback);
			user.getRolesWithBasicAuth(username, basicAuth, callback);
			return this;
		},
		
		
		userRolesTaken: function(username, roles){
			console.log('LoginView.userRolesTaken');

			console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
			console.log(roles);
			console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
			
			var isAdministrator = false;
			
			for (i=0; i<roles.length; ++i) {
				role = roles[i];
				if(role.authority=='ROLE_SUPERADMIN' || role.authority=='ROLE_ADMIN' || role.authority==('ROLE_ADMIN@'+tenantName)){
			    	isAdministrator = true;
			    }
			}
			console.log('isAdministrator: ' + isAdministrator);
			Session.set('isAdministrator', isAdministrator);

			this.loginComplete();
			
			return this;
		},
		
		
		
		loginComplete: function(){
			console.log('LoginView.loginComplete');
			
			Backbone.history.navigate('loginDone', { trigger : true });
			return this;
		},
*/
		
	
	});

	return LoginView;

});
