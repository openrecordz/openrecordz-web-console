define([
	'jquery',
	'backbone',
	'models/Category',
	'models/Utils',
], function($, Backbone, Category, Utils){

	var Session = Backbone.Model.extend({
		categories: null,
		position: config.position,
		

		initialize: function(){
			console.log('Session.initialize');
			_.bindAll(this);

//			//Inizializzazione della posizione corrente.
//			if (navigator.geolocation) {
//	            navigator.geolocation.getCurrentPosition(this.onSuccessUpdatePosition, this.onFailUpdatePosition);
//	        }else{
//	        	console.log('Geolocation is not supported by this browser.');
//	        	this.position = config.position;
//	        }
			
			//Check for sessionStorage support
			if(Storage && localStorage){
				this.supportStorage = true;
			}
			
//			//Download della lista delle categorie e salvataggio come attributo della Session.
//			this.getAllCategories(null);
			
//			//Per recuperare la lista delle categorie appena scaricate utilizzare: Session.getCategories();
//			console.log('GetAllCategories');
//			var that = this;
//			var callback = function(result, response){
//				that.categoriesTaken(result, response);
//			};
//			var category = new Category();
//			category.getAll(callback);
		},

		
//		onSuccessUpdatePosition: function(position) {
//			console.log('Session.onSuccessUpdatePosition');
//			console.log(position);
//			this.position = {lat:position.coords.latitude, lon:position.coords.longitude};
//			return this;
//		},
//		
//		onFailUpdatePosition: function(error) {
//			console.log('Session.onFailUpdatePosition');
//			console.log(error);
//			return this;
//		},
		
		
		//=================================================================
		//Download lista delle Categorie.
		getAllCategories: function(callbackOut){
			//Download della lista delle categorie e salvataggio come attributo della Session.
			//Per recuperare la lista delle categorie appena scaricate utilizzare: Session.getCategories();
			//	- callbackIn: funzione di Session a cui restituire il risultato dopo il recupero delle categorie.
			//	- callbackOut: indica il chiamante.
			console.log('GetAllCategories');
			var that = this;
			var callbackIn = function(result, response, callbackOut){
				that.categoriesTaken(result, response, callbackOut);
			};
			var category = new Category();
			category.getAll(callbackIn, callbackOut);
		},
		
		
		categoriesTaken: function(result, response, callbackOut){
			console.log('Session.categoriesTaken');
			if(result=='success'){
				//Conversione della stringa in json.
				var jsonString = jQuery.parseJSON(response);
				var items = jsonString.items;
				var jsonItems = [];
				items.forEach(function(item) {
					var jsonItem = {};
					jsonItem["id"] = item.id;
					jsonItem["name"] = item.name;
					jsonItem["label"] = item.label;
					jsonItem["parent"] = item.parent;
					jsonItem["path"] = item.path;
					jsonItem["otype"] = item.otype;
					jsonItem["order"] = item.order;
					jsonItem["allowUserContentCreation"] = item.allowUserContentCreation;
					jsonItem["text"] = item.label;	//Necessario per 'select2'.
					jsonItems.push(jsonItem);
				});
				this.categories = jsonItems;
				if (callbackOut!=null){
//					callbackOut(this.categories);
					//Restituisco una copia dell'array delle categorie (in quanto di default 
					//viene eseguito il passaggio per reference).
					callbackOut(this.categories.slice());
//					return this.categories.slice();
				}
			}else{
				var errMessage = Utils.getError(response);
				alert(errMessage);
				if (callbackOut!=null){
					callbackOut(null);
				}
			}
			return this;
		},
		
//		categoriesTaken: function(result, response){
//			console.log('Session.categoriesTaken');
//			if(result=='success'){
//				//Conversione della stringa in json.
//				var json_string = jQuery.parseJSON(response);
//				this.categories = json_string.items;
//			}else{
//				var errMessage = Utils.getError(response);
//				alert(errMessage);
//			}
//			return this;
//		},
		
		
//		getCategories: function(){
//			//Restituisco una copia dell'array delle categorie (in quanto di default 
//			//viene eseguito il passaggio per reference).
//			return this.categories.slice();
////			return this.categories;
//		},
		
//		getCategories: function(){
//			if (this.categories!=null){
//				//Restituisco una copia dell'array delle categorie (in quanto di default 
//				//viene eseguito il passaggio per reference).
//				return this.categories.slice();				
//			}else{
//				return null;				
//			}
////			return this.categories;
//		},
		
		
		//Restituisce le ultime categorie scaricate, se non ancora
		//scaricate allora viene fatto il download e dopo eseguita 
		//una callback.
		getCategories: function(callback){
			if (this.categories!=null){
				callback(this.categories.slice());
			}else{
				//Download della lista delle categorie e salvataggio come attributo della Session.
				this.getAllCategories(callback);
			}
		},
		
		
		
//		setCategories: function(categories){
//			this.categories = categories;
//		},
		
		
	
		
		getPosition: function(){
			return this.position;
		},
		





		getCookieByName: function(nameToFind){
		   var  cookieString = document.cookie;

		    // Separate cookies
		   var cookies = cookieString.split( ";" );

		  if (cookies && cookies!="") {
		   for ( var i in cookies ) {
			//console.log("cookies:" +cookies);

			    // Separate name and value
//			    var nameVal = cookies[ i ].split( "=" );
			  
			    // Separate name and value
//			    var nameVal = cookies[ i ].split( "=" ); //problem with  basicauth that ends with ==
			var equalSymbolIndex=cookies[ i ].indexOf( "=" );
			 



			//console.log("nameVal:" +nameVal);
			   // var name = nameVal[ 0 ].trim();
		           var name = cookies[ i ].substring(0,equalSymbolIndex).trim();
			//console.log("name:" +name);
			   // var value = nameVal[ 1 ].trim();
		           var value = cookies[ i ].substring(equalSymbolIndex+1, cookies[i].length).trim();
			//console.log("value:" +value);
	
			if (name==nameToFind)
				return value;
			}
		  }
		  return null;
		},


		get: function(key){
			return this.getCookieByName(key);
		},


		set: function(key, value){
			console.log('Session.set - (key, value) = (' + key + ', ' + value + ')');
			var myDate = new Date();
			myDate.setMonth(myDate.getMonth() + 12);
			document.cookie = key+"="+value + ";expires=" + myDate +";domain=.openrecordz.local;path=/";
			//document.cookie = key+"="+value + ";expires=" + myDate +";domain=.openrecordz.com;path=/";
			//document.cookie = "basicAuth="+basicAuth+ ";expires=" + myDate +";domain=.smart21.it;path=/";			
			console.log("cookies: "+ document.cookie);

			return this;
		},

		unset : function(key){
			//document.cookie = key+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.openrecordz.com;path=/";
			document.cookie = key+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.openrecordz.local;path=/";
			return this;	
		},

		clear: function(){
			console.log('Session.clear');
			this.unset("username");
			this.unset("basicAuth");
			this.unset("authenticated");
			this.unset("isAdministrator");


		},





//localstorage 


		getFromLS: function(key){
			if(this.supportStorage){
				var data = localStorage.getItem(key);
				if(data && data[0] === '{'){
					return JSON.parse(data);
				}else{
					return data;
				}
			}else{
				return Backbone.Model.prototype.get.call(this, key);
			}
		},


		setFromLS: function(key, value){
			console.log('Session.set - (key, value) = (' + key + ', ' + value + ')');
			if(this.supportStorage){
				localStorage.setItem(key, value);
			}else{
				Backbone.Model.prototype.set.call(this, key, value);
			}
			return this;
		},

		unsetFromLS : function(key){
			if(this.supportStorage){
				localStorage.removeItem(key);
			}else{
				Backbone.Model.prototype.unset.call(this, key);
			}
			return this;	
		},

		clearFromLS: function(){
			console.log('Session.clear');
			if(this.supportStorage){
				localStorage.clear();  
			}else{
				Backbone.Model.prototype.clear(this);
			}
		},
		
		
	});

	return new Session();
});
