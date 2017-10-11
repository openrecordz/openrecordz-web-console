define([
	'jquery',
	'backbone',
], function($, Backbone){
	
	var GlobalSearch = Backbone.Model.extend({
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(attributes, options){
			console.log('GlobalSearch.initialize');
		},

		textAsMap: function(dsId,text,page, callback){
			console.log('Data.search'); 
			console.log('Data.textAsMap: '+ text);
			var data = {
					page: page,
					text: text, 
			};

			var Datas = $.ajax({
        	    url:  tenant + '/service/v1/datasets/'+ dsId +".map",
			data: data,
				type : 'GET'
			});
			Datas.done(function(response){
				console.log('Data.textAsMap.done');
				console.log(response);
				if(callback){
					callback(response);
					return response;	
				}
			});
			Datas.fail(function(){
				console.log('Data.textAsMap.fail');
				callback(null);
				return null;
			});
		},		
	});
    
	return GlobalSearch;
});
