/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'datatables',
	'text!templates/datasets/listDataDetailTemplate.html',
//	'models/Content',
	'models/Utils',
	'bootbox',
	'moment',
], function(BaseView, Session, 
		DataTable, listDataDetailTemplate, Utils, bootbox, moment){
	
	var ListDataDetailView = BaseView.extend({
		template : _.template(listDataDetailTemplate),		
		
		table: null,	//Oggetto DataTables che conterrà la tabella contenuti.
//		onContentSelectedCallback: null,
//		callback: null,
		
		events : {
//			'click #btnSearch': 'search',
//			'click #btnMap':	'btnMap',
//			'click #btnAdd':	'contentAdd',
		},
		

		
		initialize: function() {
			console.log('ListDataDetailView.initialize');
//			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
//			this.onContentSelectedCallback = this.options.onContentSelectedCallback;
		},

		
		
		render: function(){
			console.log('ListDataDetailView.render');
			this.$el.html(this.template());
			var that = this;
			
			
			
			//blocco1			
			this.table = this.$el.find('#tableContents').DataTable({
				serverSide: true,
				processing: true,
				searching: false,
				ordering: false,
//				pageLength: 10,
				pageLength: config.contentsListPageSize,
				lengthChange: false,
			    

//				https://datatables.net/reference/option/ajax
				//Data to send to the server
//				Callback function that must be executed when the required data has been obtained. That data should be passed into the callback as the only parameter

				 //blocco2
			        ajax: function(data, callback, settings) {
						 //blocco3
						$.get(tenant + '/service/v1/cdata/centri-socio-educativi-diurni-per-minori-ex-art-105.map', 
								{						
										//fquery: that.getFqueryString(),						
										page: function(){
											var page = data.start/data.length;
											return page;
										},
										pagesize: data.length
								}, 
								function(res) {
										//var jsonString = jQuery.parseJSON(res);
										var jsonString = res;
										var items = jsonString.items;
										console.log("items",items);
										var count = jsonString.count;
										console.log("count",count);
								    // map your server's response to the DataTables format and pass it to
								    // DataTables' callback
								    callback({
								    	recordsTotal: count,
									recordsFiltered: count,
									data: items,
									//columns: 
								    });

								}
						 //chiudo blocco3
						);

				 //chiudo blocco2
			        },
			
			
	
//			'columns': [
//					
//					{"data": "COMUNE"}
//				]

				
			//chiudo blocco1
			});
			
		
			return this;
		},
		
		
		
		//Utilizzata per il caricamento di una determinata vista nel contenitore
		//identificato dal selettore.
		assign: function (view, selector) {
		    view.setElement(this.$(selector)).render();
		},
		
		
		
		
	});

	return ListDataDetailView;
});
