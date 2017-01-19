define([
	'jquery',
	'backbone',
	'routerLogin',
	'routerDashboard',
	'Session',
], function($, Backbone, 
		RouterLogin, RouterDashboard, 
		Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			console.log('ApplicationModel.start');
			var routerDashboard = new RouterDashboard();
			var routerLogin = new RouterLogin();
			Backbone.history.start();
		}
	
	});
	
	return ApplicationModel;
});
