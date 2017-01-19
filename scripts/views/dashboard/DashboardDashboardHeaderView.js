define([
	'jquery',
	'underscore',
	'core/BaseView',
	'Session',
	'text!templates/dashboard/dashboarddashboardHeaderTemplate.html'
], function(
		$, 
		_,
		BaseView,
		Session, 
		dashboarddashboardHeaderTemplate){

	var DashboardDashboardHeaderView = BaseView.extend({
//		el: $("#dashboard_header"),
		template : _.template(dashboarddashboardHeaderTemplate),
		navBarActiveButton: null, 	//classe dell'elemento 'li' da rendere attivo.
		

		
//		events : {
//			'click #tabMore': 'clickTabMore',
//			'click #tabOne' : 'tabOne',
//			'click #tabTwo' : 'tabTwo',
//			'click #tabThree' : 'tabThree',
//		},

		
		
		initialize: function(){
			console.log('DashboardDashboardHeaderView.initialize');
			//Recupero degli eventuali parametri passati come parametro al costruttore della classe.
			this.navBarActiveButton = this.options.navBarActiveButton;
		},
		
		
		render: function(){
			console.log('DashboardDashboardHeaderView.render');
			var username = Session.get('username');
			var isAdministrator = (Session.get('isAdministrator') === "true");
			this.$el.html(this.template({
				username: username,
				isAdministrator: isAdministrator,
			}));
//			this.$el.html(this.template());
			this.setNavBarActiveButton(this.navBarActiveButton);
			return this;
		},
		
		
		//liClass == classe dell'elemento 'li' da rendere attivo.
		setNavBarActiveButton: function(liClass){
			console.log('DashboardDashboardHeaderView.setNavBarActiveButton');
			
			if(this.navBarActiveButton){
				//Rimuovo la classe active da tutti i bottoni della navigation tab.
				var	$group = $('#navbar').find('li');
				$group.removeClass('active');
				
				//Aggiungo la classe active solo al bottone cliccato.
//				var	$el = $('#navbar').find('li._data');
				var	$el = $('#navbar').find('li.'+liClass);
//				console.log($el);
				$el.addClass('active');
			}
		},

		
//		clickTabMore: function(e) {
//			e.preventDefault();
//			e.stopPropagation();
//			console.log('DashboardHeaderView.clickTabMore');
//			Backbone.history.navigate('tabMore', { trigger : true });
//		},
		
		
//		tabOne: function(e) {
//			console.log('DashboardHeaderView.tabOne');
//			Backbone.history.navigate('tabOne', { trigger : true });
//		},
//		
//		
//		tabTwo: function(e) {
//			console.log('TabOneView.tabTwo');
//			Backbone.history.navigate('tabTwo', { trigger : true });
//		},
//		
//		
//		tabThree: function(e) {
//			console.log('TabOneView.tabThree');
////			Backbone.history.navigate('tabThree', { trigger : true });
//			this.navigate('tabThree.php');
//		},
		
		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return DashboardDashboardHeaderView;
});
