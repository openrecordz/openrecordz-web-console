define([
    'bootbox',
	'core/BaseView',
	'Session',
	'models/TenantProperty',
	'models/Utils',
	'text!templates/settings/new_settingsTemplate.html'
], function(bootbox, BaseView, Session, 
		TenantProperty, Utils,
		settingsTemplate){

	var SettingsView = BaseView.extend({
		template: _.template(settingsTemplate),
		tenantProperties: null,
		

		events: {
			"submit": "btnSave",
//			'click #btnSave': 'btnSave',
			//  "change #imageFile": "contentImageChanged",
		},

		
		
		initialize: function(){
			console.log('SettingsView.initialize');
		},
		
		
		render: function(){
			console.log('SettingsView.render');
//			this.$el.html(this.template({settings: config.settings}));
			
			var view = this;
			
			//Definizione della callback da eseguire al termine del download delle properties.
			var callback = function(properties){
				
				// console.log("render");
				// console.log(properties);
				view.propertiesTaken(properties);
			};
			
			//Recupero della lista delle property del tenant.
			var tenantProperty = new TenantProperty();
			tenantProperty.getAll(callback);
			
			return this;
		},
		
		
		
		propertiesTaken: function(properties){
			console.log('SettingsView.propertiesTaken');
//			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//			console.log(properties);
//			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
			this.tenantProperties = properties;
			this.myRender();
		},
		
		
		myRender: function(){
			console.log('SettingsView.myRender');
			var view = this;

			// console.log("tenantProperties");
			// console.log(this.tenantProperties);
			
			this.$el.html(this.template({
				settings: config.settings,
				tenantProperties: this.tenantProperties}));
			
			return this;
		},
		
		
		btnSave: function(event){
			event.preventDefault();
			console.log('SettingsView.btnSave');
			var view = this;

			var indexSetting = $(event.target).find('#indexSetting').val();
			var indexProperty = $(event.target).find('#indexProperty').val();

			//Recupero il code della property di cui fare add/update.
			var codeProperty = config.settings[indexSetting].properties[indexProperty].code.replace("<TENANT>", tenantName);
			console.log(codeProperty);

			var idTenantProperty = this.getTenantPropertyId(codeProperty);
        
//			var property = config.settings[indexSetting].properties[indexProperty];
//			console.log(property);
			
			//Recupero il valore della property.
			var message = $(event.target).find('#message').val();
//			console.log(message);

			if (config.settings[indexSetting].properties[indexProperty].typecontrol == 'image') {
				var mImage = $("#imageFile").prop('files')[0]
				// console.log('mImage');
				// console.log(mImage);
				this.contentImageChanged(mImage, idTenantProperty);
			} else if (config.settings[indexSetting].properties[indexProperty].typecontrol == 'text' 
				|| config.settings[indexSetting].properties[indexProperty].typecontrol == 'textarea') {

				// //Recupero il code della property di cui fare add/update.
				// var codeProperty = config.settings[indexSetting].properties[indexProperty].code.replace("<TENANT>", tenantName);
				// console.log(codeProperty);

				//Definizione della callback da eseguire al termine dell' INSERT/UPDATE della property.
				var callback = function(result, response){
					view.propertySaved(result, response);
				};
				
				// var idTenantProperty = this.getTenantPropertyId(codeProperty);
				if (idTenantProperty==null){
					//Property non esistente --> Salvo la nuova tenantProperty.
					if (!message || message.length===0){
						this.propertySaved('success', null);
					}else{
						console.log('Salvo la nuova tenantProperty');
						var tenantProperty = new TenantProperty();
						tenantProperty.add(codeProperty, message, callback);					
					}
				}else{
					//Property esistente --> Aggiorno la tenantProperty.
					var tenantProperty = new TenantProperty();
					if (!message || message.length===0){
						console.log('Cancello la tenantProperty');
						tenantProperty.deleteById(idTenantProperty, callback);
					}else{
						console.log('Aggiorno la tenantProperty');
						tenantProperty.update(idTenantProperty, codeProperty, message, callback);	
					}
				}
			}
		},

		
		
		propertySaved: function(result, response){
			console.log('SettingsView.propertySaved');
			var view = this;
			if(result=='success'){
				this.refreshTenantProperties();
				bootbox.alert({
					title: 		'Esito operazione',
					message:	'Property salvata!',
				});
			}else{
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: 		'Esito operazione',
					message:	errMessage,
				});
			}
		},
		
		
		refreshTenantProperties: function(){
			console.log('SettingsView.refreshTenantProperties');
			var view = this;
			
			//Definizione della callback da eseguire al termine del download delle properties.
			var callback = function(properties){
				view.tenantPropertiesTaken(properties);
			};
			
			//Recupero della lista delle property del tenant.
			var tenantProperty = new TenantProperty();
			tenantProperty.getAll(callback);
		},
		
		
		tenantPropertiesTaken: function(properties){
			console.log('SettingsView.tenantPropertiesTaken');
			this.tenantProperties = properties;
		},
		
		
		
		
		
		
		//Verifica tra le TenantProperties la presenza di una property
		//avente un dato 'code'. Se presente viene ne restituito l'id. 
		getTenantPropertyId: function(code){
			var id = null;
			for(var i in this.tenantProperties){
				var json = JSON.parse(this.tenantProperties[i].json);
				if (json.code==code){
					id = this.tenantProperties[i].id;
					break;
				}
			}
			return id;
		},


		//=================================================================
		//L'immagine del contenuto è cambiata.
		contentImageChanged: function (image, contentImageChanged) {
			console.log('ContentEditView.contentImageChanged');
			var that = this;
			bootbox.dialog({
				message: "L'attuale immagine del contenuto verrà definitivamente cancellata. Continuare?",
				title: "Attenzione",
				buttons: {
					cancel: {
						label: "Cancel",
						className: "btn-default",
						callback: function () {
							console.log('Cancel');
						}
					},
					ok: {
						label: "OK",
						className: "btn-primary",
						callback: function () {
							console.log('OK');

							//Upload della nuova immagine.
							that.updateNewContentImage(image, contentImageChanged);
						}
					}
				}
			});
		},

		//Upload della nuova immagine.
		updateNewContentImage: function (image, contentImageChanged) {
			var view = this;
			var callback = function (result, response) {

				console.log('result: ');
				console.log(result);

				console.log('response: ');
				console.log(response);

				//view.contentImageUpdated(result, response);
			};

			
			var tenantProperty = new TenantProperty();
			tenantProperty.uploadImage(contentImageChanged, image, callback);
		},
		
		
//		navigate: function(url) { 
//			window.location = url; 
//		},
		
		
	});

	return SettingsView;
});