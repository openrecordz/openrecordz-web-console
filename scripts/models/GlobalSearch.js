define([
	'jquery',
	'backbone',
], function($, Backbone){
	
	var GlobalSearch = Backbone.Model.extend({
		
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(attributes, options){
			console.log('GlobalSearch.initialize');
		},

		// @TODO rimuovi parametro dsId
		textAsMap: function(dsId,text,page, callback){
			console.log('Data.search'); 
			console.log('Data.textAsMap: '+ text);
			var data = {
					page: page,
					text: text, 
			};

			var Datas = $.ajax({
				// example url:
				// @TODO rimuovi // url : 'http://tenant1.api.openrecordz.com/service/v1/datasets/59b95378e4b0a018d1a61896.map',
				// http://apps.api2.openrecordz.com/service/v1/search?text=lecce
        	    // url:  tenant + '/service/v1/datasets/'+ dsId +".map",
        	    url:  tenant + '/service/v1/search?pagesize=200&text='+ text +"&crossdomainsearch=true",
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
