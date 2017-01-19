define([
	'jquery',
	'backbone',
	'routerLogin',
	'routerDatasets',
	'Session',
], function($, Backbone, RouterLogin, RouterDatasets, Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			console.log('ApplicationModel.start');
			var routerDatasets = new RouterDatasets();
			var routerLogin = new RouterLogin();
			Backbone.history.start();
		}
	
	});
	
	return ApplicationModel;
});