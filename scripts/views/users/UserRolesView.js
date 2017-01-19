define([
	'bootbox',
	'bootswitch',
//	'datepicker',
//	'moment',
	'core/BaseView',
	'Session',
	'models/User',
//	'models/Properties',
	'models/Utils',
	'text!templates/users/userRolesTemplate.html'
], function(bootbox, bootswitch, 
//		datepicker, moment,
		BaseView, Session,
		User, 
//		Properties, 
		Utils,
		userRolesTemplate){

	var UserRolesView = BaseView.extend({
		template: _.template(userRolesTemplate),
		username: null,	//Username.
		roles: null, 	//Permessi utente.
		chkAdministrator: null,
		chkAuthorWeb: null,
		chkAuthorRest: null,
		chkAdministratorValue: false,
		chkAuthorWebValue: false,
		chkAuthorRestValue: false,
		
		events: {
			'click #btnSave': 	'btnSave',
			'click #btnCancel': 'btnCancel',
		},

		
		
		initialize: function(){
			console.log('UserRolesView.initialize');
			_.bindAll(this);
			//Recupero dei parametri passati al costruttore della classe.
			this.username = this.options.username;
			this.roles = this.options.roles;
			
			for (i=0; i<this.roles.length; ++i) {
				role = this.roles[i];
				if(role.authority=='ROLE_ADMIN' || role.authority==('ROLE_ADMIN@'+tenantName)){
			    	this.chkAdministratorValue = true;
			    }else if(role.authority=='ROLE_USER' || role.authority==('ROLE_USER@'+tenantName)){
			    	this.chkAuthorWebValue = true;
			    }else if(role.authority=='ROLE_RESTUSER' || role.authority==('ROLE_RESTUSER@'+tenantName)){
			    	this.chkAuthorRestValue = true;
			    }
			}
		},
		
		
		render: function(){
			console.log('UserRolesView.render');
			this.$el.html(this.template({
				username: 	this.username,
				roles:		this.roles
			}));
			
			//http://www.bootstrap-switch.org/options.html
			this.chkAdministrator = this.$el.find('#chkAdministrator');
			this.chkAdministrator.bootstrapSwitch();
			this.chkAdministrator.bootstrapSwitch('state', this.chkAdministratorValue);
			
			this.chkAuthorWeb = this.$el.find('#chkAuthorWeb');
			this.chkAuthorWeb.bootstrapSwitch();
			this.chkAuthorWeb.bootstrapSwitch('state', this.chkAuthorWebValue);
//			var chk1Val = this.chkAuthor.bootstrapSwitch('state');
//			console.log(chk1Val);
			
			this.chkAuthorRest = this.$el.find('#chkAuthorRest');
			this.chkAuthorRest.bootstrapSwitch();
			this.chkAuthorRest.bootstrapSwitch('state', this.chkAuthorRestValue);
			
//			_userEditView_afterRender(this);
			return this;
		},

		
		
		//=================================================================
		//Funzione di validazione del form.
		validationForm: function(){
			var that = this;
			var valid = true;
			
//			//Nascondo tutti gli errori.
//			Utils.hideAllError();
			
//			if(!valid){
//				$('#formAlert').show();
//			}
			
//			this.chkAdministratorValue = this.chkAdministrator.bootstrapSwitch('state');
//			this.chkAuthorWebValue = this.chkAuthorWeb.bootstrapSwitch('state');
//			this.chkAuthorRestValue = this.chkAuthorRest.bootstrapSwitch('state');

//			var roles = [];
//			for(var i in response){
//			     var roleName = response[i].authority;
//			     console.log(roleName);
//			     roles.push(roleName); // insert as last item
//			}
			var newRoles = []; //del tipo ['ROLE_USER', 'ROLE_RESTUSER', 'ROLE_ADMIN'].
			if (this.chkAdministrator.bootstrapSwitch('state')==true){
				newRoles.push('ROLE_ADMIN');
			}
			if (this.chkAuthorWeb.bootstrapSwitch('state')==true){
				newRoles.push('ROLE_USER');
			}
			if (this.chkAuthorRest.bootstrapSwitch('state')==true){
				newRoles.push('ROLE_RESTUSER');
			}
			
			var validation = {
				result: valid,
				data: 	newRoles
			};
			
			return validation;
		},
		
		
		//=================================================================
		//Click sul bottone 'Salva'.
		btnSave: function(e){
			e.preventDefault();
			console.log('UserRolesView.btnSave');
			var view = this;
			
			var validation = this.validationForm();
			if(validation.result==true){
				console.log('Form is valid!');
				//Definizione della callback da eseguire al termine dell'update del contenuto.
				var callback = function(result, response){
					view.userRolesSaved(result, response);
				};
				
				var roles = validation.data;
//				console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
//				console.log(roles);
//				console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
				var user = new User();
				
//				_userEditView_beforeSave(user);
				
				user.saveRoles(this.username, roles, callback);
			}
		},
		
		
		userRolesSaved: function(result, response){
			console.log('UserRolesView.userRolesSaved');
			if(result=='success'){
				bootbox.alert({
					title: 		'Esito operazione',
					message:	'Utente aggiornato!',
				});
//				var route = ''; //Default route.
//				Backbone.history.navigate(route, { trigger : true });
			}else{
				var errMessage = Utils.getError(response);
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

	return UserRolesView;
});