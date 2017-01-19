define([
	'core/BaseView',
//	'Session',
	'text!templates/dashboard/dashboarddashboardFooterTemplate.html'
], function(BaseView, 
//		Session, 
		dashboarddashboardFooterTemplate){

	var DashboardDashboardFooterView = BaseView.extend({
//		el: $("#dashboard_header"),
		template : _.template(dashboarddashboardFooterTemplate),
		

		
//		events : {
//			'click #tabOne' : 'tabOne',
//			'click #tabTwo' : 'tabTwo',
//			'click #tabThree' : 'tabThree',
//		},

		
		
		initialize: function(){
			console.log('DashboardDashboardFooterView.initialize');
		},
		
		
		render: function(){
			console.log('DashboardDashboardFooterView.render');
			this.$el.html(this.template());
//			var authenticated = Session.get('authenticated');
//			this.$el.html(this.template({
//				authenticated: authenticated
//			}));
			return this;
		},
		
		
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
////		tabThree: function(e) {
////			console.log('TabOneView.tabThree');
////			Backbone.history.navigate('tabThree', { trigger : true });
////		},
//		
//		tabThree: function(e) {
//			console.log('TabOneView.tabThree');
////			Backbone.history.navigate('tabThree', { trigger : true });
//			this.navigate('tabThree.php');
//		},
//		
//		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return DashboardDashboardFooterView;
});
