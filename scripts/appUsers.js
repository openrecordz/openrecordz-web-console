define([
	'jquery',
	'backbone',
	'routerLogin',
	'routerUsers',
	'Session',
], function($, Backbone, 
		RouterLogin, RouterUsers, 
		Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			console.log('ApplicationModel.start');
			var routerUsers = new RouterUsers();
			var routerLogin = new RouterLogin();
			Backbone.history.start();
		}
	
	});
	
	return ApplicationModel;
});