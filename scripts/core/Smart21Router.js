define([
	'spin',
	'bootbox',
	'core/BaseRouter',
	'models/Tenant',
	'models/User',
	'Session',
], function(Spinner, bootbox, BaseRouter, Tenant, User, Session ){

	//Router base da cui estenderanno tutti i successivi router della app.
	//Funzione principale è quella consentire l'accesso solo ad utenti loggati.
	var Smart21Router = BaseRouter.extend({
		
		
//		initialize: function(){
//			console.log('Smart21Router.initialize XXXXXXXXXXXXXX');
//			//Imposto la basicAuth come header per tutte le chiamate.
//			this.headersSetup('admin', 'drsadmin');
//		},
		
		
		// Routes that should not be accessible if user is authenticated
		// for example, login, register, forgetpasword ...
		preventAccessWhenAuth : ['#login', '#signup', '#signupandcreate'],
//		preventAccessWhenAuth : ['#login'],
		

		publicPath : ['/$','index$','/datasets$','/datasets#$','/datasets#ds/.'],
		next: null,

		
		
		//inizializzazione degli headers.
		headersSetup: function(){
			console.log('Smart21Router.headersSetup');
			var basicAuth = (Session.get('basicAuth')) ? 'Basic ' + Session.get('basicAuth') : null;
			console.log('basicAuth = ' + basicAuth);
			//Ajax Request Configuration
			//To Set The Authorization To Request Header
			$.ajaxSetup({
				headers: {
					'Authorization' : basicAuth
				}
			});
		},
		
		
		initSpinner: function(){
			console.log('Smart21Router.initSpinner');
			var target = document.getElementById('loading');
			this.mySpinner = new Spinner();
			$("#loading").fadeOut();
			
			var that = this;
			$(document).ajaxStart(function() {
				console.log('Smart21Router.initSpinner.ajaxStart');
			  	$("#loading").fadeIn();
			  	that.mySpinner.spin(target);
			});
			$(document).ajaxComplete(function() {
				console.log('Smart21Router.initSpinner.ajaxComplete');
			  	$("#loading").fadeOut();
			  	that.mySpinner.stop();
			});
		},
		
		
		// ********************************************************************
		before: function(params, next){
			console.log('Smart21Router.before');
			this.next = next;
			this.headersSetup();
//			console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
//			console.log(tenantName);
//			console.log(window.location.href);
//			console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
			if (tenantName=='apps'){
				var url = window.location.href;
//				if (url.startsWith("http://apps.console.rem21.com/dashboard.php")){
				if (url.startsWith(dashboardDomain + "/dashboard")){
					console.log('apps dashboard == true!');
					this.before4();
				}else{
					console.log('apps dashboard == false!');
//					console.log(url);
					window.location.href = dashboardDomain + "/dashboard";
				}
			}else{
				//this.initTenantDBMySql();
				this.before2();
			}
//			this.initTenantDBMySql();
		},
		
		
		
		before2: function(){
			console.log('Smart21Router.before2');
			var isAuth = Session.get('authenticated') == 'true';
			console.log("before2 isAuth: "+ isAuth);

			_user={};
			_user.isAdministrator=false;
			_user.isAuthenticated=isAuth;

			if (isAuth){
				_user.username=Session.get('username');

				var isAdministrator = Session.getFromLS('isAdministrator');
				_user.isAdministrator=isAdministrator;
				console.log("before2 isAdministrator: "+ isAdministrator);
				if (isAdministrator==null){
					// recupero ruoli dell'utente loggato.
					var username = Session.get('username');
					
					var basicAuth = (Session.get('basicAuth')) ? 'Basic ' + Session.get('basicAuth') : null;
					this.getUserRoles(username, basicAuth);
				}else{
					this.before3();
				}
			}else{
				this.before4();
			}
		},
		
		
		//=================================================================
		//Permessi di un utente.
		getUserRoles: function(username, basicAuth){
			console.log('Smart21Router.getUserRoles');
			//Definizione della callback da richiamare una volta recuperati i permessi.
			var view = this;
			var callback = function(result, username, roles){
				view.userRolesTaken(result, username, roles);
			};
			//Recupero dei permessi dell'utente.
			var userDAO = new User();
			userDAO.getRolesWithBasicAuth(username, basicAuth, callback);
			return this;
		},
		
		
		userRolesTaken: function(result, username, roles){
			console.log('Smart21Router.userRolesTaken');
			console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
			console.log("result :" + result);
			console.log("username: " + username);
			console.log("roles " + roles);
			console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
			var isAdministrator = false;
			if(result=='success'){
				for (i=0; i<roles.length; ++i) {
					role = roles[i];
					if(role.authority=='ROLE_SUPERADMIN' || role.authority=='ROLE_ADMIN' || role.authority==('ROLE_ADMIN@'+tenantName)){
				    	isAdministrator = true;
				    }
				}	
			}
//			console.log('isAdministrator: ' + isAdministrator);
//			Session.set('isAdministrator', isAdministrator);
			Session.setFromLS('isAdministrator', isAdministrator);
			_user.isAdministrator=isAdministrator;

			this.before3();
			return this;
		},
		
		
		before3: function(){
			console.log('Smart21Router.before3');
			var isAdministrator = Session.getFromLS('isAdministrator');
			console.log('Smart21Router.before3 isAdministrator: ' + isAdministrator);

//			if (isAdministrator=='true'){
				this.before4();
//			}else{
				// utente loggato NON amministratore --> lo rimando alla dashboard
//				bootbox.alert({
//					title: "Errore",
//					message: "Utente non abilitato!",
//				});
				//alert('utente loggato NON amministratore --> lo rimando alla dashboard');
				//window.location.href = dashboardDomain + "/dashboard.php";
//				console.log("mio errore");
//			}
		},
		
		//=================================================================
		
		
		checkPublicAccess: function() {			
			
			var locationHref=window.location.href;
			console.log("locationHref : "+ locationHref);
			console.log("this.publicPath : ", this.publicPath);
			ciccio4=this.publicPath;
			for (var publicRegExtKey in this.publicPath) {
//			this.publicPath..forEach(myFunction)
				console.log("publicRegExt: "+ this.publicPath[publicRegExtKey]);
				if (locationHref.match(this.publicPath[publicRegExtKey])) {
					console.log("matched publicRegExt: "+ this.publicPath[publicRegExtKey]);
//					break; 
					return true;
				} else { 
					console.log("not matched  publicRegExt: "+ this.publicPath[publicRegExtKey]);
				}
			}
			return false;
			
		},
		
		
		before4: function(){
			console.log('Smart21Router.before4');
			// Checking if user is authenticated or not
			// then check the path if the path requires authentication 
			var isAuth = Session.get('authenticated') == 'true';
			var path = Backbone.history.location.hash;
			var cancelAccess = _.contains(this.preventAccessWhenAuth, path);
			var isPublicUrl=this.checkPublicAccess();
			console.log("isPublicUrl : "+ isPublicUrl);
			var needAuth = !cancelAccess;
			
			if(needAuth && !isAuth && !isPublicUrl){
//			if(needAuth && !isAuth){
				console.log('Smart21Router.before4: needAuth && !isAuth');
				// If user gets redirect to login because wanted to access
				// to a route that requires login, save the path in session
				// to redirect the user back to path after successful login
				Session.setFromLS('redirectFrom', path);
//				Session.set('redirectFrom', path);
				
//				Backbone.history.stop();
		
//				Backbone.history.navigate('login', { trigger : false });
				Backbone.history.navigate('login', { trigger : true, replace:true });

//				Backbone.history.start();
			}else if(isAuth && cancelAccess){
				console.log('Samrt21Router.before4: isAuth && cancelAccess');
				// User is authenticated and tries to go to login, register ...
				// so redirect the user to home page
				Backbone.history.navigate('', { trigger : true });
			}else{
				console.log('Samrt21Router.before4: No problem handle the route');
				// No problem handle the route
				return this.next();
//				return next();
			}
		},
		
		// ********************************************************************
		
		
		
		
//		before: function(params, next){
//			console.log('Smart21Router.before');
////			console.log('#######################################');
////			console.log(params);
////			console.log(next);
////			console.log('#######################################');
//			
//			this.headersSetup();
//			//Checking if user is authenticated or not
//			//then check the path if the path requires authentication 
////			var isAuth = Session.get('authenticated');
//			var isAuth = Session.get('authenticated') == 'true';
//			var path = Backbone.history.location.hash;
////			var needAuth = _.contains(this.requresAuth, path);
//			var cancelAccess = _.contains(this.preventAccessWhenAuth, path);
//			var needAuth = !cancelAccess;
////			console.log('#######################################');
////			console.log('isAuth');
////			console.log(isAuth);
////			console.log('!isAuth');
////			var notIsAuth = !isAuth;
////			console.log(notIsAuth);
////			console.log('needAuth=' + needAuth);
////			console.log('cancelAccess=' + cancelAccess);
////			console.log('#######################################');
//			
//			if (isAuth) this.initTenantDBMySql();
//			
//			
//			if(needAuth && !isAuth){
//				console.log('Smart21Router.before: needAuth && !isAuth');
//				//If user gets redirect to login because wanted to access
//				// to a route that requires login, save the path in session
//				// to redirect the user back to path after successful login
//				Session.setFromLS('redirectFrom', path);
////				Session.set('redirectFrom', path);
//				Backbone.history.navigate('login', { trigger : true });
//			}else if(isAuth && cancelAccess){
//				console.log('Samrt21Router.before: isAuth && cancelAccess');
//				//User is authenticated and tries to go to login, register ...
//				// so redirect the user to home page
//				Backbone.history.navigate('', { trigger : true });
//			}else{
//				console.log('Samrt21Router.before: No problem handle the route');
//				//No problem handle the route
//				return next();
//			}			
//		},
		
		
		after: function(){
			//empty
		},
		
		
		
		//Utilizzata per il caricamento della vista principale nel container.
		//Questa permette la corretta distruzione della precedente vista + figlie.
		changeView: function(view, container){
			//Close is a method in BaseView
			//that check for childViews and 
			//close them before closing the 
			//parentView
			function setView(view){
				if(this.currentView){
					this.currentView.close();
				}
				this.currentView = view;
				$(container).html(view.render().$el);
			}
			setView(view, container);
		},
		
		
//		//Route utilizzato come passaggio intermedio, al fine di consentire il refresh.
//		none: function(){
//			console.log('Router.none');
//		},


		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
			view.setElement($(selector)).render();
//			$(selector).html(view.render().$el);
		},
		
		
		//Utilizzata per rimuovere tutti i dati memorizzati sul db del browser.
		clear: function(){
			console.log('Smart21Router.clear (clear session)');
			// Rimozione Cookie.
			Session.clear();
			// Rimozione LocalStorage.
			Session.clearFromLS();
		},
		
//		//Utilizzata per rimuovere tutti i dati memorizzati sul db del browser.
//		clear: function(){
//			console.log('Smart21Router.clear (clear session)');
//			if(Session.supportStorage){
//				localStorage.clear();  
//			}else{
//				Backbone.Model.prototype.clear(this);
//			}
//		},
		
		
		fetchError: function(error){
			//If during fetching data from server, session expired
			// and server send 401, call getAuth to get the new CSRF
			// and reset the session settings and then redirect the user
			// to login
			if(error.status === 401){
				Session.getAuth(function(){
					Backbone.history.navigate('showLogin', { trigger : true });
				});
			}
		},
		
		
	});

	return Smart21Router;
});
