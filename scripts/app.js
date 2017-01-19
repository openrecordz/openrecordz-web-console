define([
	'jquery',
	'backbone',
	'routerLogin',
	'router',
	'Session',
], function($, Backbone, 
		RouterLogin, 
		Router, 
		Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			console.log('ApplicationModel.start');
			var router = new Router();
			var routerLogin = new RouterLogin();
			Backbone.history.start();
		}
	
	});
	
	return ApplicationModel;
});