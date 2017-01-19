define([
	'core/BaseView',
	'Session',
	'views/tables/ListUsersView',
	'text!templates/users/usersTemplate.html'
], function(BaseView, Session, ListUsersView, usersTemplate){

	var UsersView = BaseView.extend({
		template: _.template(usersTemplate),
		

//		events: {
//			'click #btnContents' : 	'clickTabContents',
//			'click #btnCategories':	'clickTabCategories',
//			'click #btnPois':		'clickTabPois',
//		},

		
		
		initialize: function(){
			console.log('UsersView.initialize');
		},
		
		
		render: function(){
			console.log('UsersView.render');
			this.$el.html(this.template());
			
			//=================================================================
			//Creazione tabella relativa alla lista dei contenuti.
			var listUsersView = new ListUsersView({
//				onContentSelectedCallback: this.onContentSelectedModalCallback
			});
			//Inietto la tabella dei contenuti nel template.
			this.assign(listUsersView, '#listUsers');
			
			return this;
		},
		
		
		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		
		
		
		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return UsersView;
});