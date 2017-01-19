define([
	'backbone',
], function(Backbone){


	/**
	 * Classe utilizzata per la gestione delle custom properties.
	 * 
	 * ========================  INSTRUCTIONS  ========================
	 * var properties = new Properties();
	 * ************************  Callback define  ************************
	 * var that = this;
	 * var callback = function(result, response){
	 * 		that.testDone(result, response);
	 * };
	 * ************************  Add new Properties  	************************
	 * var phoneValues = [ '123777' ];
	 * properties.addProperty('phone', 'telefono', phoneValues);
	 */
	var PropertiesModel = Backbone.Model.extend({
		propertiesMap : {},

		defaults : {
			properties: ''
		},
		
		initialize : function(){
			console.log('PropertiesModel.initialize');
		},

		addProperty: function(id, displayName, values){
		    prop = {};
		    prop["_id"] = id;
		    prop["displayName"] = displayName;
		    prop["values"] = values;
		    this.propertiesMap[id] = prop;
			this.attributes.properties = JSON.stringify(this.propertiesMap);
		},
		
//		getAll: function(){
//			return JSON.stringify(this.propertiesMap);
//		},
		
	});
	
	return PropertiesModel;
});