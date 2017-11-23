define([
	'jquery',
//	'underscore',
//	'backbone',
//	'spin',
	'bootbox',
	'core/Smart21Router',
	'views/DashboardHeaderView',
	'views/DashboardFooterView',
	'views/settings/SettingsView',
//	'models/Utils',
	'Session'
], function($, 
//		_, Backbone, 
//		Spinner,
		bootbox,
		Smart21Router,
		DashboardHeaderView, DashboardFooterView, 
		SettingsView,
//		Utils,
		Session){

	var RouterSettings = Smart21Router.extend({
		dashboardHeaderView: null,
		dashboardFooterView: null,

		
		initialize: function() {
			console.log('RouterSettings.initialize');
			this.initSpinner();
			this.initHeaderAndFooter();
		},
		
		
		routes: {
			'none': 	'none',
			'*default': 'home',	//La default route DEVE essere l'ultima!!!
		},
		
		
		//Funzione utilizzata per l'inizializzazione dell'header e del footer della pagina.
		initHeaderAndFooter: function(){
			//=================================================================
			//Creazione dell'header.
			this.dashboardHeaderView = new DashboardHeaderView({
				navBarActiveButton: '_settings'	//Passare la classe dell'elemento 'li' da rendere attivo.
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
			console.log('RouterSettings.home');

			this.setHeaderAndFooter();
			
			//=================================================================
			//Creazione della view settings.
			var settingsView = new SettingsView();
			this.changeView(settingsView, '#dashboard_content');
		},
		
		
		//=================================================================
		//Fake hash per forzare il refresh.
		none: function(){
			console.log('RouterSettings.none');
		},
		
		
	});

	return RouterSettings;
});