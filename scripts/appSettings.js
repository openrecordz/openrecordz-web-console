define([
	'jquery',
	'backbone',
	'routerLogin',
	'routerSettings',
	'Session',
], function($, Backbone, 
		RouterLogin, RouterSettings, 
		Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			console.log('ApplicationModel.start');
			var routerSettings = new RouterSettings();
			var routerLogin = new RouterLogin();
			Backbone.history.start();
		}
	
	});
	
	return ApplicationModel;
});