define([
	'jquery',
	'backbone'
], function($, Backbone){
	
	var Category = Backbone.Model.extend({
		
		defaults: {
			id: '',
			file: null,
			name: '',
			label: '',
			parent: '',
			path: '',
			otype: '',
			visibility: '',
			order: '',
			allowUserContentCreation: false
        },
		
        
		//initialize() is triggered whenever you create a new instance of a model.
		initialize: function(){
			console.log('Category.initialize');
		},

		
		getAll: function(callbackIn, callbackOut){
			console.log('Category.getAll');
			var categories = $.ajax({
        	    url: tenant + '/service/v1/categories?locale=IT',
//        	    async: false,
				type: 'GET'
			});
			categories.done(function(response){
				console.log('Category.getAll.done');
				callbackIn('success', response, callbackOut);
			});
			categories.fail(function(){
				console.log('Category.getAll.fail');
				callbackIn('fail', response, callbackOut);
			});
		},
		
//		getAll: function(callback){
//			console.log('Category.getAll');
//			var categories = $.ajax({
//        	    url: tenant + '/service/v1/categories?locale=IT',
////        	    async: false,
//				type: 'GET'
//			});
//			categories.done(function(response){
//				console.log('Category.getAll.done');
//				callback('success', response);
//			});
//			categories.fail(function(){
//				console.log('Category.getAll.fail');
//				callback('fail', response);
//			});
//		},
		
		
		getByPath: function(path, callback){
			console.log('Category.getByPath');
			console.log(path);
			//final String GET_BY_ID_URL_SERVICE = "%s/v1/categories?path={id}";
			
			var categories = $.ajax({
        	    url: tenant + '/service/v1/categories?path=' + path,
				type : 'GET'
			});
			categories.done(function(response){
				console.log('Category.getByPath.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON(response);
				var items = json_string.items;
				var item = items.length>0 ? items[0] : null;
				console.log(item);
				if(callback){
					callback(item);
					return item;	
				}
			});
			categories.fail(function(){
				console.log('Category.getByPath.fail');
				callback(null);
				return null;
			});
		},
		
		
		add: function(callback){
			console.log('Category.add');
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			console.log(this.attributes);
//			console.log('+++++++++++++++++++++++++++++++++++++++++');
			
			var data = new FormData();
			data.append('label', this.attributes.label);
			data.append('path', this.attributes.path);
			data.append('otype', this.attributes.otype);
			data.append('visibility', this.attributes.visibility);
			data.append('order', this.attributes.order);
			data.append('allowUserContentCreation', this.attributes.allowUserContentCreation);
			data.append('refresh', true);	//Per forzare il refresh delle categorie.
			var add = $.ajax({
        	    url: tenant + '/service/v1/categories/add',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			add.done(function(response){
				console.log('Category.add.done');
				callback('success', response);
			});
			add.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Category.add.fail');
				callback('fail', jqXHR);
			});
		},
		
//		add: function(category, callback){
//			console.log('Category.add');
////			console.log('+++++++++++++++++++++++++++++++++++++++++');
////			console.log(category);
////			console.log('+++++++++++++++++++++++++++++++++++++++++');
//			
//			var data = new FormData();
//			data.append('label', category.attributes.label);
//			data.append('path', category.attributes.path);
//			data.append('otype', category.attributes.otype);
//			data.append('order', category.attributes.order);
//			data.append('refresh', true);	//Per forzare il refresh delle categorie.
//			var add = $.ajax({
//        	    url: tenant + '/service/v1/categories/add',
//				data : data,
//				cache: false,
//			    contentType: false,
//			    processData: false,
//				type : 'POST'
//			});
//			add.done(function(response){
//				console.log('Category.add.done');
//				callback('success', response);
//			});
//			add.fail(function(jqXHR, textStatus, errorThrown){
//				console.log('Category.add.fail');
//				callback('fail', jqXHR);
//			});
//		},
		
		
		
		deleteByPath: function(path, callback){
			console.log('Category.deleteByPath');
			console.log(path);
			//http://testtenant.ciaotrip.it/service/v1/categories/delete?path=/yousnow/events
			
			var deleteCategory = $.ajax({
        	    url: tenant + '/service/v1/categories/delete?refresh=true&path=' + path,
				type : 'DELETE'
			});
			deleteCategory.done(function(response){
				console.log('Category.deleteByPath.done');
				callback('success', response);
			});
			deleteCategory.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Category.deleteByPath.fail');
				callback('fail', jqXHR);
			});
		},
		

		updateImage: function(id, file, callback){
			console.log('Category.updateImage');
			var data = new FormData();
//			data.append('id', id);
//			data.append('file', file);
			var path = '/' + tenantName + '/category' + id;
			data.append('path', path);
			data.append('name', 'icon.png');
			data.append('file', file);
			
//			[04/06/15 16:19:42] andrea leo: name=icon.png
//			[04/06/15 16:19:49] andrea leo: path=
//			[04/06/15 16:22:17] andrea leo: /ginosa/category/pa/viaggi
//			http://default.frontiere21.it/imagerepo/images/add.json
//			http://default.frontiere21.it/imagerepo/service/images/add
			
			var upload = $.ajax({
        	    url: tenant + '/imagerepo/service/images/add.json',
				data : data,
				cache: false,
			    contentType: false,
			    processData: false,
				type : 'POST'
			});
			upload.done(function(response){
				console.log('Category.updateImage.done');
				console.log(response);
				callback('success', response);
			});
			upload.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Category.updateImage.fail');
				callback('fail', jqXHR);
			});
		},
		
		
//		refreshAll: function(callback){
//			console.log('Categories.refreshAll');
////			http://test.frontiere21.it/?refreshallcategories
//			
//			var refresh = $.ajax({
//        	    url: tenant + '?refreshallcategories',
//				type : 'GET'
//			});
//			refresh.done(function(response){
//				console.log('Categories.refreshAll.done');
//				if(callback){
//					callback(true);
//				}
//			});
//			refresh.fail(function(){
//				console.log('Categories.refreshAll.fail');
//				callback(false);
//			});
//		},
		
		
	});

//	return new Categories();
	return Category;
});