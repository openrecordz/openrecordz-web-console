define([
	'jquery',
	'core/BaseView',
	'models/Utils',
	'models/User',
	'text!templates/signupTemplate.html',
	'Session'
], function($, BaseView, 
		Utils, User, 
		signupTemplate, Session){

	var SignupView = BaseView.extend({
		template: _.template(signupTemplate),
		showTenantField:false,
//		username: null,
//		password: null,
//		
		events: {
			'click button' : 'submit'
		},

		//it will be called when the view is first created
		initialize: function(){
			console.log('SignupView.initialize');
			this.showTenantField=this.options.showTenantField;
//			this.username = this.getURLParameter('username');
//			this.password = this.getURLParameter('password');
//			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
//			console.log('username = ' + this.username);
//			console.log('password = ' + this.password);
//			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
		},
		
		
//		//Recupero parametri di ricerca (dall'url)
//		getURLParameter: function(name) {
//		  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
//		},
		
		
		
		
		render: function(){
//			if(this.username!=null && this.password!=null){
//				//Eseguo autologin
//				this.autoLogin();
//			}else{
//				//Richiedo login
			this.$el.html(this.template({showTenantField: this.showTenantField}));				
//			}
			//A good convention is to return this at the end of render to enable chained calls. 
			return this;
		},
		
		
		isFormValid: function() {
			var that = this;
			var valid = true;
			
			//Nascondo tutti gli errori.
			Utils.hideAllError();

			//Validazione dell fullname.
			var fullName= $('#fullName').val();
			if (fullName=="") {
				//username is not valid. 
				Utils.showError(that, 'fullName', 'Inserire il nome completo!');
				valid = false;
			}
			
			
			//Validazione dell email.
			var email= $('#email').val();
			if (email=="") {
				//username is not valid. 
				Utils.showError(that, 'email', 'Inserire l\' indirizzo email!');
				valid = false;
			}else {
//			Utils.isValidEmail
			}

			
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
			

			if (this.showTenantField) {
				//Validazione del nome della app
				var tenantName = $('#tenant').val();
				if (tenantName=="") {
					//tenantName is not valid. 
					Utils.showError(that, 'tenant', _label.new_tenant_modal_template_app_validation_title);
					valid = false;
				}
			}

			var termsConditions = $("#termsConditions").is(":checked");
			// var termsConditions = $('#termsConditions').val();
			if (!termsConditions) {
				//termsConditions is not valid.
				// Utils.showError(that, 'termsConditions', _label.signup_view_terms_conditions_error);
				alert(_label.signup_view_terms_conditions_error);
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
//		autoLogin: function(){
//			console.log('LoginView.autoLogin');
//			var view = this;
//			var credentials = {
//				username: view.username,
//				password: view.password
//			};
//			var callback = function(result, response){
//				view.autoLoginDone(result, response);
//			};
//			var user = new User();
//			user.login(credentials, callback);
//		},
		
		
//		autoLoginDone: function(result, response){
//			console.log('LoginView.autoLoginDone');
//			if(result=='success'){
//				//Conversione della stringa in json.
//				var jsonString = jQuery.parseJSON(response);
//				var username = jsonString.username;
//				var basicAuth = jsonString.basicAuth;
//				Session.set('authenticated', true);
//				Session.set('username', username);
//				Session.set('basicAuth', basicAuth);
//				
//				this.getUserRoles(username, basicAuth);
//				
////				Backbone.history.navigate('loginDone', { trigger : true });
////				return this;
//			}else{
//				var errMessage = Utils.getError(response);
//				alert(errMessage);
//				this.username = null;
//				this.password = null;
//				this.render();
//			}
//		},
		
		
		
		
		
		
		submit: function(e){
			e.preventDefault();
			//e.target.checkValidity();
			console.log('SignupView.submit');
			var view = this;
			if(this.isFormValid()){
				console.log('LoginView.submit  -  form IS valid!');
				
//				Session.login(credentials, callback);
				var user = new User();
				
				var fullname=$('#fullName').val();
				var username=$('#username').val();
				var password=$('#password').val();
				var email=$('#email').val();
				var newtenant=$('#tenant').val();
				
				var callbackSignUp = function(result, response){
					view.signupDone(result, response);
				};
				
				if (this.showTenantField) {
					user.signupAndCreateTenant(fullname,username, email,password, newtenant, callbackSignUp);
				}else {
					user.signup(fullname,username, email,password, callbackSignUp);
				}

				/*
				var credentials = {
						username : username,
						password : password
				};
				var callback = function(result, response){
					view.loginDone(result, response);
				};
				
				user.login(credentials, callback);
				*/
			}else {
				return false;		
			}
		},
		
		signupDone: function(result, response){
			console.log('LoginView.signupDone');
			console.log('LoginView.response: '+ response);
			if(result=='success'){
				//Conversione della stringa in json.
				//var jsonString = jQuery.parseJSON(response);
				var jsonString =response;
				var username = jsonString.username;
				var basicAuth = jsonString.basicAuth;
				Session.set('authenticated', true);
				Session.set('username', username);
				Session.set('basicAuth', basicAuth);
				
//				document.cookie = "username="+username+ ";domain=.example.com;path=/";
//				document.cookie = "basicAuth="+basicAuth+ ";domain=.example.com;path=/";

//				this.getUserRoles(username, basicAuth);
				Backbone.history.navigate('loginDone', { trigger : true });
				
//				Backbone.history.navigate('loginDone', { trigger : true });
//				return this;
			}else{
				var that=this;
				//vito=response;
				if (response.status==410){
					Utils.showError(that, 'email', 'Indirizzo email già in uso!');
				}else if (response.status==406){
//					gresponse=response;
					if (response.responseText.indexOf("username.notvalid")!== -1){					
						Utils.showError(that, 'username', 'Username non valido! Può contenere solo lettere minuscole e punti');
					}else if (response.responseText.indexOf("notemail")!== -1){
						Utils.showError(that, 'email', 'Indirizzo email non valido!');
					}
				}else if (response.status==409){
					Utils.showError(that, 'username', 'Username già in uso!');
				} else {
					var errMessage = Utils.getError(response);
					alert(errMessage);
				}
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

	return SignupView;

});
