define([
	'jquery',
//	'underscore',
//	'backbone',
//	'spin',
	'core/Smart21Router',
//	'core/BaseRouter',
	'views/LoginView',
	'views/SignupView',
	'Session'
], function($, 
//		_, 
//		Backbone, 
//		Spinner, 
		Smart21Router,
//		BaseRouter,
		LoginView,
		SignupView,
		Session){

	var RouterLogin = Smart21Router.extend({

		routes: {
//			'none': 'none',
			'login': 'login',
			'logout': 'logout',
			
			'loginDone': 'loginDone',
			'signup': 'signup',
			'signupandcreate': 'signupandcreate',
			'signupDone': 'signupDone',
//			'*default': 'home',
		},
		
		
		initialize: function() {
			console.log('RouterLogin.initialize');
			this.initSpinner();
		},
		
	
//		//Route utilizzato come passaggio intermedio, al fine di consentire il refresh.
//		none: function(){
//			console.log('RouterLogin.none');
//		},

		
		login: function(){
			console.log('RouterLogin.login');
//			alert('login');
			
			$('#dashboard_header').hide();
			$('#dashboard_footer').hide();
			
			var loginView = new LoginView();
			this.changeView(loginView, '#dashboard_content');
		},
		
		
		logout: function(){
			console.log('RouterLogin.logout');
			//Clear all session data
			this.clear();
			this.initialize();
			//Rimando alla homepage.
//			Backbone.history.navigate('', { trigger : true });

//			window.location.href = "index.php";
//			window.location.href = dashboardDomain + "/dashboard.php";
			window.location.href = dashboardDomain + "/dashboard";
		},
		

		loginDone: function(){
			console.log('RouterLogin.loginDone for tenantName : '+ tenantName);			
			this.headersSetup();
			$('#dashboard_header').show();
			$('#dashboard_footer').show();
//			if(Session.get('redirectFrom') && Session.get('redirectFrom')!='#logoutDone'){
			if(Session.getFromLS('redirectFrom')){
				var path = Session.getFromLS('redirectFrom');
				console.log('RouterLogin.loginDone - redirectFrom = ' + path);
				Session.unsetFromLS('redirectFrom');
				Backbone.history.navigate(path, { trigger : true });
			}else if (tenantName=="apps"){
				//window.location.href = dashboardDomain+"/dashboard.php";
				window.location.href = dashboardDomain+"/dashboard";
				//window.location.href = "http://apps.devconsole.smart21.it/dashboard.php";
			
			}else{
				console.log('RouterLogin.loginDone - redirectFrom is null');
				Backbone.history.navigate('', { trigger : true , replace: true});
			}
//			return this;
		},
		
		signupandcreate: function(){
			console.log('RouterLogin.signupandcreate');
			
			$('#dashboard_header').hide();
			$('#dashboard_footer').hide();
			
			var signupView = new SignupView({showTenantField:true});
			this.changeView(signupView, '#dashboard_content');
		},


		
		signup: function(){
			console.log('RouterLogin.signup');
			
			$('#dashboard_header').hide();
			$('#dashboard_footer').hide();
			
			var signupView = new SignupView();
			this.changeView(signupView, '#dashboard_content');
		},


		signupDone: function(){
			console.log('RouterLogin.signupDone');

			this.headersSetup();
			$('#dashboard_header').show();
			$('#dashboard_footer').show();
//			if(Session.get('redirectFrom') && Session.get('redirectFrom')!='#logoutDone'){
			if(Session.getFromLS('redirectFrom')){
				var path = Session.getFromLS('redirectFrom');
				console.log('RouterLogin.signupDone - redirectFrom = ' + path);
				Session.unsetFromLS('redirectFrom');
				Backbone.history.navigate(path, { trigger : true });
			}else {
				console.log('RouterLogin.signupDone - redirectFrom is null');
				//window.location.href = "http://"+tenant+".devconsole.smart21.it";
				window.location.href = "http://"+tenant+domainConsole;
				//Backbone.history.navigate('', { trigger : true , replace: true});
			}
//			return this;
		},
		
		
	});

	return RouterLogin;
});
