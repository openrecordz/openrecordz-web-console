define([
	'core/BaseView',
	'Session',
	'text!templates/homeTemplate.html'
], function(BaseView, Session, homeTemplate){

	var HomeView = BaseView.extend({
		template : _.template(homeTemplate),

		
		events : {
			'click #tabOne' : 'tabOne',
			'click #tabTwo' : 'tabTwo',
			'click #tabThree' : 'tabThree',
		},

		
		
		initialize: function(){
			console.log('HomeView.initialize');
		},
		
		
		render: function(){
			console.log('HomeView.render');
			this.$el.html(this.template());
//			var authenticated = Session.get('authenticated');
//			this.$el.html(this.template({
//				authenticated: authenticated
//			}));
			return this;
		},
		
		
		tabOne: function(e) {
			console.log('HomeView.tabOne');
			Backbone.history.navigate('tabOne', { trigger : true });
		},
		
		
		tabTwo: function(e) {
			console.log('HomeView.tabTwo');
			Backbone.history.navigate('tabTwo', { trigger : true });
		},
		
		
//		tabThree: function(e) {
//			console.log('TabOneView.tabThree');
//			Backbone.history.navigate('tabThree', { trigger : true });
//		},
		
		tabThree: function(e) {
			console.log('HomeView.tabThree');
//			Backbone.history.navigate('tabThree', { trigger : true });
			this.navigate('tabThree.php');
		},
		
		
		navigate: function(url) { 
			window.location = url; 
		},
		
		
	});

	return HomeView;
});