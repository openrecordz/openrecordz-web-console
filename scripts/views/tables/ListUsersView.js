/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'datatables',
	'text!templates/tables/listUsersTemplate.html',
	'models/User',
	'models/Utils',
	'moment',
	'bootbox',
], function(BaseView, Session, 
		DataTable, listUsersTemplate, User, Utils, moment, bootbox){
	
	var ListUsersView = BaseView.extend({
		template : _.template(listUsersTemplate),
		
		table: null,	//Oggetto DataTables che conterrà la tabella utenti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
//			"submit #searchForm" : "search",
			'click #btnSearch': 'search',
			
			'click #btnAdd':	'userAdd',
		},
		

		
		initialize: function() {
			console.log('ListUsersView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
//			this.onContentSelectedCallback = this.options.onContentSelectedCallback;
		},

		
		
		render: function(){
			console.log('ListUsersView.render');
			var username = Session.get('username');
			this.$el.html(this.template());
			var that = this;
			
			//DataTables: fonte "https://datatables.net/reference/option/".
			//Esempio: Server-side processing "http://www.datatables.net/examples/data_sources/server_side.html".
			//Stackoverflow: "http://stackoverflow.com/questions/25211553/datatables-custom-response-handling".
			this.table = this.$el.find('#tableUsers').DataTable({
				serverSide: true,
				processing: true,
				searching: false,
				ordering: false,
				pageLength: 10,
				lengthChange: false,
			    ajax: function(data, callback, settings) {
			        // make a regular ajax request using data.start and data.length
//			        $.get('http://default.frontiere21.it/service/v1/search/people', {
			    	$.get(tenant + '/service/v1/people', {
			        	q: function(){
			    			var text = ($('#text').val()!=null && $('#text').val()!='') ? $('#text').val() : '';
			    			return text;
			    		},
						page: function(){
							var page = data.start/data.length;
							return page;
						},
						pageSize: data.length
			        }, function(res) {
//						var jsonString = jQuery.parseJSON(res);
						var jsonString = res;
						var items = jsonString.people;
						var count = jsonString.count;
			            // map your server's response to the DataTables format and pass it to
			            // DataTables' callback
			            callback({
			            	recordsTotal: count,
			                recordsFiltered: count,
			                data: items
			            });
			        });
			    },

				'columns': [
					{
						"data": "imageURL",
//						"orderable": false,
//		                "searchable": false,
						"render": function (data, type, row) {
							var imageUrl = tenant + '/service/v1/people/' + row.username + '/photo';
							return '<img src="' + imageUrl + '" class="userImageRounded" />';
						}
					},
					{"data": "username"},
					{"data": "fullName"},
					{
						"data": "createdOn",
						"render": function(data, type, row){
							//Formatto correttamente la data.
							var createdOnDate = moment(row.createdOnRFC822, "ddd, DD MMM YYYY HH:mm:ss Z", 'en');
							var strCreatedOn = moment(createdOnDate).format('DD/MM/YYYY HH:mm');
							return strCreatedOn;
						}
					},
		            {	
						"data": null,
						"mRender": function(data, type, row){
							var html = '';
							html += '<button type="button" id="btnEdit" class="btn btn-default btn-xs" title="Visualizza/Modifica dati"><span class="glyphicon glyphicon-edit"></span></button>&nbsp;';
							html += '<button type="button" id="btnDelete" class="btn btn-default btn-xs" title="Elimina"><span class="glyphicon glyphicon-trash"></span></button>&nbsp;';
							if (username=='admin'){
								html += '<button type="button" id="btnRoles" class="btn btn-default btn-xs" title="Gestione permessi"><span class="glyphicon glyphicon-cog"></span></button>&nbsp;';								
							}
							return html;
						}
		            }
				],
			});
			
			
			this.table.on( 'click', 'tr', function () {
				var data = that.table.row(this).data();
				that.userEdit(data);
			});
			
			
			this.table.on( 'click', 'button', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var action = $(this).prop('id');
		        var data = that.table.row($(this).parents('tr')).data();
		        if (action=='btnEdit'){
		        	that.userEdit(data);
		        }else if (action=='btnDelete'){
		        	that.userDelete(data);
		        }else if (action=='btnRoles'){
		        	that.userRoles(data);
		        }
		    } );
			return this;
		},
		
		
		
//		//Utilizzata per il caricamento di una determinata vista nel contenitore
//		//identificato dal selettore.
//		assign: function (view, selector) {
//		    view.setElement(this.$(selector)).render();
//		},
		
		
		
		
		
		search: function(e){
			console.log('ListUsersView.search');
			e.preventDefault();
			e.stopPropagation();
			//Forzo una nuova ricerca.
			this.table.search('').draw();
//			this.table.search(text).draw();
		},
		
		
		userAdd: function(e) {
			console.log('ListUsersView.userAdd');
//			e.preventDefault();
//			e.stopPropagation();
			bootbox.alert({
				title: "Attenzione",
				message: 'Funzionalità non ancora impelmentata!',
			});
//			Backbone.history.navigate('contentAdd', { trigger : true });
			return this;
		},
		
		
		userEdit: function(data) {
			console.log('ListUsersView.userEdit');
			console.log('Edit user: ' + data.id);
//			bootbox.alert({
//				title: "Attenzione",
//				message: 'Funzionalità non ancora impelmentata!',
//			});
			Backbone.history.navigate('userEdit/' + data.username, { trigger : true });
			return this;
		},
		
		userDelete: function(data) {
			console.log('ListUsersView.userDelete');
			console.log('Delete user: ' + data.id);
			bootbox.alert({
				title: "Attenzione",
				message: 'Funzionalità non ancora impelmentata!',
			});
//			Backbone.history.navigate('contentDelete/' + data.username, { trigger : true });
		},
		
		userRoles: function(data) {
			console.log('ListUsersView.userRoles');
			console.log('Roles of user: ' + data.id);
//			bootbox.alert({
//				title: "Attenzione",
//				message: 'Funzionalità non ancora impelmentata!',
//			});
			Backbone.history.navigate('userRoles/' + data.username, { trigger : true });
		},
		
	});

	return ListUsersView;
});
