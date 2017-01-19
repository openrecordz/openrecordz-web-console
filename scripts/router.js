define([
	'jquery',
	'underscore',
//	'backbone',
//	'spin',
	'core/Smart21Router',
	'views/DashboardHeaderView',
	'views/DashboardFooterView',
	'views/HomeView',
//	'views/MoreView',
//	'views/TabTwoView',
//	'views/TabThreeView',
	'Session'
], function(
		$, 
		_, 
//		Backbone, 
//		Spinner, 
		Smart21Router,
		DashboardHeaderView, DashboardFooterView,
		HomeView, 
//		MoreView,
//		TabTwoView, TabThreeView,
		Session){

	var Router = Smart21Router.extend({
		dashboardHeaderView: null,
		dashboardFooterView: null,

		
		initialize: function() {
			console.log('Router.initialize');
			this.initSpinner();
			this.initHeaderAndFooter();
		},
		
		
		routes: {
//			'none': 'none',
//			'tabOne': 'tabOne',
//			'tabTwo': 'tabTwo',
//			'tabThree': 'tabThree',
			
//			'tabMore': 'tabMore',
			
			'*default': 'home',
		},
		
		
		
		//Funzione utilizzata per l'inizializzazione dell'header e del footer della pagina.
		initHeaderAndFooter: function(){
			//=================================================================
			//Creazione dell'header.
			this.dashboardHeaderView = new DashboardHeaderView({
				navBarActiveButton: '_notifications'	//Passare la classe dell'elemento 'li' da rendere attivo.
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
			console.log('Router.home');
			
//			var dashboardHeaderView = new DashboardHeaderView({
//				navBarActiveButton: null	//Passare la classe dell'elemento 'li' da rendere attivo.
//			});
//			this.assign(dashboardHeaderView, '#dashboard_header');
//			
//			var dashboardFooterView = new DashboardFooterView();
//			this.assign(dashboardFooterView, '#dashboard_footer');
			
			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione del contenuto.
			var homeView = new HomeView();
			this.changeView(homeView, '#dashboard_content');
		},
		
		
//		tabMore: function(){
//			console.log('Router.tabMore');
////			var a = Backbone.history.getFragment();
////			console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
////			console.log(a);
////			console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
////			this.dashboardHeaderView.setNavBarActiveButton('_more');
//			
//			this.setHeaderAndFooter();
//			
//			//=================================================================
//			//Creazione del contenuto.
//			var moreView = new MoreView();
//			this.changeView(moreView, '#dashboard_content');
//		},

//		tabOne: function(){
//			console.log('Router.tabOne');
//			var homeView = new homeView();
//			this.changeView(homeView, '#dashboard_content');
//		},
//		
//		tabTwo: function(){
//			console.log('Router.tabTwo');
//			var tabTwoView = new TabTwoView();
//			this.changeView(tabTwoView, '.container');
//		},
//		
//		tabThree: function(){
//			console.log('Router.tabThree');
//			var tabThreeView = new TabThreeView();
//			this.changeView(tabThreeView, '.container');
//		},
		
				
		
		
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

	return Router;
});