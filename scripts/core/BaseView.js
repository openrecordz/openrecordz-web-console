define([
	'underscore',
	'backbone',
	'bootstrap',	//Necessario per il caricamento di bootstrap.min.js
], function(_, Backbone, Bootstrap){

	var BaseView = Backbone.View.extend({
	
		close: function(){
			console.log('BaseView.close');
			if(this.childViews){
				this.childViews.close();
			}
			this.remove();
		},
		
	});

	return BaseView;

});