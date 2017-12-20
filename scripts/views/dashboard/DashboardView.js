define([
	'core/BaseView',
	'Session',
	'views/dashboard/NewTenantModalView',
	'text!templates/dashboard/dashboardTemplate.html',
	'bootbox'
], function(BaseView, Session, NewTenantModalView, dashboardTemplate, bootbox){

	var DashboardView = BaseView.extend({
		template: _.template(dashboardTemplate),
		tenants: null,	//

		events: {
			'click #newTenant' : 	'newTenant',
			
//			'click #btnCategories':	'clickTabCategories',
//			'click #btnPois':		'clickTabPois',
		},

		
		
		initialize: function(){
			console.log('DashboardView.initialize');
			//Recupero dei parametri passati al costruttore della classe.
			this.tenants = this.options.tenants;
		},
		
		
		render: function(){
			console.log('DashboardView.render');
			this.$el.html(this.template({tenants: this.tenants}));
	
/*		
			//=================================================================
			//Creazione tabella relativa alla lista dei contenuti.
			var listUsersView = new ListUsersView({
//				onContentSelectedCallback: this.onContentSelectedModalCallback
			});
			//Inietto la tabella dei contenuti nel template.
			this.assign(listUsersView, '#listUsers');
*/			
			return this;
		},

		

		newTenant : function() {
			console.log('DashboardView.newTenant');
			var view = this;
			var callback = function(){
				view.newTenantAdded();
			};
			var newTenantModalView = new NewTenantModalView({callback:callback}); 
			newTenantModalView.show();
		},


		newTenantAdded: function(){
			console.log('DashboardView.newTenantAdded');

				//Fake hash per forzare il refresh.

			Backbone.history.navigate('none', {trigger: true});
			bootbox.alert({
				title: _label.dashboard_view_app_created_title,
				message: _label.dashboard_view_app_created_message,
			});
			Backbone.history.navigate('', { trigger : true });


		},

/*		
		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		
*/		
		
		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return DashboardView;
});
