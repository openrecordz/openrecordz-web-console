define([
	'jquery',
//	'underscore',
//	'backbone',
//	'spin',
	'core/Smart21Router',
	'views/DashboardHeaderView',
	'views/DashboardFooterView',
	'views/users/UsersView',
	'views/users/UserEditView',
	'views/users/UserRolesView',
	'models/User',
	'Session'
], function($, 
//		_, Backbone, 
//		Spinner, 
		Smart21Router,
		DashboardHeaderView, DashboardFooterView,
		UsersView, UserEditView, UserRolesView,
		User,
		Session){

	var RouterUsers = Smart21Router.extend({

		initialize: function() {
			console.log('RouterUsers.initialize');
			this.initSpinner();
			this.initHeaderAndFooter();
		},
		
		
		routes: {
//			'none': 'none',
			
			'userEdit/:username': 	'userEdit',
			'userRoles/:username':	'userRoles',
			
			'*default': 'home',	//La default route DEVE essere l'ultima!!!
		},
		
		
		
		//Funzione utilizzata per l'inizializzazione dell'header e del footer della pagina.
		initHeaderAndFooter: function(){
			//=================================================================
			//Creazione dell'header.
			this.dashboardHeaderView = new DashboardHeaderView({
				navBarActiveButton: '_users'	//Passare la classe dell'elemento 'li' da rendere attivo.
			});
			//=================================================================
			//Creazione del footer.
			this.dashboardFooterView = new DashboardFooterView();
		},
		
		//Funzione utilizzata per l'impostazione dell'header e del footer della pagina.
		setHeaderAndFooter: function(){
			//=================================================================
			//Impostazione dell'header.
			this.assign(this.dashboardHeaderView, '#dashboard_header');
			//=================================================================
			//Impostazione del footer.
			this.assign(this.dashboardFooterView, '#dashboard_footer');
		},
		
		
		home: function(){
			console.log('RouterUsers.home');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var usersView = new UsersView();
			this.changeView(usersView, '#dashboard_content');
		},
		
		
		//=================================================================
		//Edit di un utente.
		userEdit: function(username){
			console.log('RouterUsers.userEdit');
			//Definizione della callback da richiamare una volta recuperato l'utente.
			var view = this;
			var callback = function(user){
				view.userToEditTaken(user);
			};
			//Recupero l'utente da editare.
			var user = new User();
			user.getByUsername(username, callback);
			return this;
		},
		
		userToEditTaken: function(user){
			console.log('RouterUsers.userToEditTaken');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var userEditView = new UserEditView({user: user});
			this.changeView(userEditView, '#dashboard_content');
			return this;
		},
		
		
		
		//=================================================================
		//Permessi di un utente.
		userRoles: function(username){
			console.log('RouterUsers.userRoles');
			//Definizione della callback da richiamare una volta recuperati i permessi.
			var view = this;
			var callback = function(username, roles){
				view.userRolesTaken(username, roles);
			};
			//Recupero dei permessi dell'utente.
			var user = new User();
			user.getRoles(username, callback);
			return this;
		},
		
		userRolesTaken: function(username, roles){
			console.log('RouterUsers.userRolesTaken');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var userRolesView = new UserRolesView({
				username: 	username,
				roles: 		roles
			});
			this.changeView(userRolesView, '#dashboard_content');
			return this;
		},
		
		
		
//		fetchError : function(error){
//			//If during fetching data from server, session expired
//			// and server send 401, call getAuth to get the new CSRF
//			// and reset the session settings and then redirect the user
//			// to login
//			if(error.status === 401){
//				Session.getAuth(function(){
//					Backbone.history.navigate('showLogin', { trigger : true });
//				});
//			}
//		}
		
	});

	return RouterUsers;
});