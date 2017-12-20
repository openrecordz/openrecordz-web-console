define([
	'jquery',
//	'underscore',
//	'backbone',
//	'spin',
	'core/Smart21Router',
	'views/dashboard/DashboardDashboardHeaderView',
	'views/dashboard/DashboardDashboardFooterView',
	'views/dashboard/DashboardView',
	'views/datasets/GlobalSearchView',
	'Session',
	'models/Tenant',
	'models/GlobalSearch'
], function($, 
//		_, Backbone, 
//		Spinner, 
		Smart21Router,
		DashboardDashboardHeaderView, DashboardDashboardFooterView,
		DashboardView, 
		GlobalSearchView,
		Session,
		Tenant,
		GlobalSearch
	){

	var RouterDashboard = Smart21Router.extend({

		initialize: function() {
			console.log('RouterDashboard.initialize');
			this.initSpinner();
			this.initHeaderAndFooter();
		},
		
		
		routes: {
//			'none': 'none',	
			
			'globalSearch/:text': 'globalSearch',
			'*default': 'home',	//La default route DEVE essere l'ultima!!!
			
		},
		
		
		
		//Funzione utilizzata per l'inizializzazione dell'header e del footer della pagina.

		initHeaderAndFooter: function(){
			//=================================================================
			//Creazione dell'header.
			this.dashboarddashboardHeaderView = new DashboardDashboardHeaderView({
				//navBarActiveButton: '_users'	//Passare la classe dell'elemento 'li' da rendere attivo.
			});
			//=================================================================
			//Creazione del footer.
			this.dashboarddashboardFooterView = new DashboardDashboardFooterView();
		},

		
		//Funzione utilizzata per l'impostazione dell'header e del footer della pagina.

		setHeaderAndFooter: function(){
			//=================================================================
			//Impostazione dell'header.
			this.assign(this.dashboarddashboardHeaderView, '#dashboard_header');
			//=================================================================
			//Impostazione del footer.
			this.assign(this.dashboarddashboardFooterView, '#dashboard_footer');
		},

		
		home: function(){
			console.log('RouterDashboard.home');
			
			//$('#dashboard_header').hide();
			//$('#dashboard_footer').hide();

			this.setHeaderAndFooter();

			//Definizione della callback da richiamare una volta recuperato l'utente.

			var view = this;
			var callback = function(user){
				view.homeLoaded(user);
			};
			//Recupero l'utente da editare.
			var tenant = new Tenant();
			tenant.getAll(callback);
			return this;
			
		},
		homeLoaded : function(tenantsRes) {
			console.log('RouterDashboard.homeLoaded');
			//=================================================================
			//Creazione del contenuto.
			var dashboardView = new DashboardView({tenants:tenantsRes});
			this.changeView(dashboardView, '#dashboard_content');
		},

		globalSearch: function (text) {
			console.log('RouterDashboard.globalSearch');
			console.log("text", text);

			var view = this;
			var callback = function (data) {
				console.log('data :' + data);
				view.globalSearchDataTaken(data, text);
			};

			var globalSearch = new GlobalSearch();
			//console.log('dsSlug :' + dsSlug);

			globalSearch.textAsMap("59b95378e4b0a018d1a61896", text, 0, callback, 10);


			return this;

		},

		globalSearchDataTaken: function (data, text) {
			console.log('RouterDashboard.globalSearchDataTaken');
			console.log("data", data);
			console.log("text", text);
			this.setHeaderAndFooter();

			var globalSearchView = new GlobalSearchView({ data: data, text: text });

			this.changeView(globalSearchView, '#dashboard_content');
			return this;
		}

			
		
	});

	return RouterDashboard;
});
