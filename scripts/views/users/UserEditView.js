define([
	'bootbox',
//	'datepicker',
//	'moment',
	'core/BaseView',
	'Session',
	'models/User',
	'models/Properties',
	'models/Utils',
	'text!templates/users/userEditTemplate.html'
], function(bootbox, 
//		datepicker, moment,
		BaseView, Session,
		User, Properties, 
		Utils,
		userEditTemplate){

	var UserEditView = BaseView.extend({
		template: _.template(userEditTemplate),
		user: null,	//Utente da editare.
//		category: null,	//Categoria del contenuto da editare.
//		selectCategoryView: null,	//Select delle categorie.
//		selectPoiView: null,		//Select dei punti di interesse.
		imageFile: null,
		
		events: {
			'click #btnRoles': 'userRoles',
			'change #imageFile': 'userImageChanged',
			'click #btnRemoveImg': 'removeImg',
//			'hover #datepicker': 'onDatapickerClick',
			'click #btnSave': 	'btnSave',
			'click #btnCancel': 'btnCancel',
		},

		
		
		initialize: function(){
			console.log('UserEditView.initialize');
			_.bindAll(this);
			//Recupero dei parametri passati al costruttore della classe.
			this.user = this.options.user;
		},
		
		
		render: function(){
			console.log('UserEditView.render');
			this.$el.html(this.template({user: this.user}));
			_userEditView_afterRender(this);
			return this;
		},

		
		
//		//Utilizzata per il caricamento di una determinata vista nel contenitore
//		//identificato dal selettore.
//		assign: function (view, selector) {
//		    view.setElement(this.$(selector)).render();
//		},
		
		
		
		//=================================================================
		//L'immagine del contenuto è cambiata.
		userImageChanged: function(e){
			console.log('UserEditView.userImageChanged');
			var that = this;
			bootbox.dialog({
				message: "L'attuale immagine verrà definitivamente cancellata. Continuare?",
				title: "Attenzione",
				buttons: {
					cancel: {
						label: "Cancel",
						className: "btn-default",
						callback: function() {
							console.log('Cancel');
						}
					},
					ok: {
						label: "OK",
						className: "btn-primary",
						callback: function() {
							console.log('OK');
							that.imageFile = $(e.currentTarget);
							var image = that.imageFile.prop('files')[0];
							//Upload della nuova immagine.
							that.updateNewUserImage(image);
						}
					}
				}
			});
		},

		//Upload della nuova immagine.
		updateNewUserImage: function(image){
			var view = this;
			var callback = function(result, response){
				view.userImageUpdated(result, response);
			};
			var user = new User();
			user.uploadPhoto(this.user.username, image, callback);
		},
		
		
		userImageUpdated: function(result, response){
			console.log('UserEditView.userImageUpdated');
			if(result=='success'){
				bootbox.alert({
					title: "Esito operazione",
					message: 'Immagine aggiornata!',
				});
				//Refresh immagine profilo nella vista.
				this.showImage();
			}else{
				var errMessage = Utils.getError(response);
				bootbox.alert({
					title: "Esito operazione",
					message: errMessage,
				});
			}
		},
		
		
//		showImage: function(){
//			//Aggiorno l'immagine del profilo nella vista.
//			if (this.imageFile!=null){
//				var inputFileList = this.imageFile.prop('files');
//		        if (inputFileList && inputFileList[0]) {
//		          var reader = new FileReader();
//		          reader.onload = function (e) {
//		            $('#userImage').attr('src', reader.result);
//		          };
//		          reader.readAsDataURL(inputFileList[0]);
//		        }
//			}
//		},
		
		showImage: function(){
			//Aggiorno l'immagine del profilo nella vista.
			if (this.imageFile!=null){
				var inputFileList = this.imageFile.prop('files');
		        if (inputFileList && inputFileList[0]) {
		          var reader = new FileReader();
		          reader.onload = function (e) {
		            $('#userImage').attr('src', reader.result);
		          };
		          reader.readAsDataURL(inputFileList[0]);
		        }
			}else{
				//Imposto l'immagine del profilo utente a quella di default.
				urlDefaultImage = tenant + "/imagerepo/service/images/search?url=/default/avatar/avatar.png"
				$('#userImage').attr('src', urlDefaultImage);
			}
		},
		
		
		removeImg: function() {
			console.log('UserEditView.removeImg');
			var that = this;
			bootbox.dialog({
				message: "L'attuale immagine verrà definitivamente cancellata. Continuare?",
				title: "Attenzione",
				buttons: {
					cancel: {
						label: "Cancel",
						className: "btn-default",
						callback: function() {
							console.log('Cancel');
						}
					},
					ok: {
						label: "OK",
						className: "btn-primary",
						callback: function() {
							console.log('OK');
							that.imageFile = null;
							//Reset immagine del profilo utente.
							that.updateNewUserImage(null);
						}
					}
				}
			});
		},
		
		
		
		//=================================================================
		//Funzione di validazione del form.
		validationForm: function(){
			var that = this;
			var valid = true;
			
			//Nascondo tutti gli errori.
			Utils.hideAllError();
			
//			//Validazione della Immagine.
//			if (!this.imageFile) {
//				//image is not selected. 
//				Utils.showError(that, 'contentImage', 'Selezionare una immagine!');
//				valid = false;
//			}
			
//			//Validazione della Descrizione.
//			var fullname = $('#fullname').val();
//			if (fullname=='') {
//				//fullname is not valid. 
//				Utils.showError(that, 'fullname', 'Inserire il nome completo!');
//				valid = false;
//			}
			
			var properties = new Properties();
			properties.addProperty('myLink', 'I miei documenti', [$('#myLink').val()]);
			
			if(!valid){
				$('#formAlert').show();
			}
			
			var userDetails = {
				username: 				this.user.username,
				fullName: 				$('#fullname').val(),
				email: 					$('#email').val(),
				photo: 					this.user.photo,
				productsCreatedByCount:	this.user.productsCreatedByCount,
				productsLikesCount:		this.user.productsLikesCount,
				properties: 			properties.get("properties"),
				propertiesObject: 		properties
			};

			var validation = {
				result: valid,
				data: userDetails
			};
			
//			return valid;
			return validation;
		},
		
		
		//=================================================================
		//Click sul bottone 'Gestione permessi'
		userRoles: function() {
			console.log('ListUsersView.userRoles');
//			console.log('Roles of user: ' + data.id);
//			bootbox.alert({
//				title: "Attenzione",
//				message: 'Funzionalità non ancora impelmentata!',
//			});
			Backbone.history.navigate('userRoles/' + this.user.username, { trigger : true });
		},
		
		
		
		
		
		//Click sul bottone 'Salva'.
		btnSave: function(e){
			e.preventDefault();
			console.log('UserEditView.btnSave');
			var view = this;
			
			var validation = this.validationForm();
			if(validation.result==true){
				console.log('Form is valid!');
				//Definizione della callback da eseguire al termine dell'update del contenuto.
				var callback = function(result, response){
					view.userUpdated(result, response);
				};
				
				var userDetails = validation.data;
//				console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
//				console.log(contentDetails);
//				console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
				var user = new User(userDetails);
				
				_userEditView_beforeSave(user);
				
				user.update(callback);
			}
		},
		
		
		userUpdated: function(result, response){
			console.log('UserEditView.userUpdated');
			if(result=='success'){
				bootbox.alert({
					title: 		'Esito operazione',
					message:	'Utente aggiornato!',
				});
				var route = ''; //Default route.
				Backbone.history.navigate(route, { trigger : true });
			}else{
				var errMessage = Utils.getError(response);
//				alert(errMessage);
				bootbox.alert({
					title: 		'Esito operazione',
					message:	errMessage,
				});
			}
		},
		
		
		//=================================================================
		//Click sul bottone 'Annulla'.
		btnCancel: function(){
//			var route = 'itemsList/*/category/_none/state/all/page/0/pageSize/' + config.contentsListPageSize;
//			Backbone.history.navigate(route, { trigger : true });
			var route = ''; //Default route.
			Backbone.history.navigate(route, { trigger : true });
		}
		
		
		
	});

	return UserEditView;
});