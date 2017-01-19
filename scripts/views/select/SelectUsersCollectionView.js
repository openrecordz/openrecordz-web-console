define([
	'core/BaseView',
	'Session',
	'select2',
	'text!templates/select/selectUsersCollectionTemplate.html'
], function(BaseView, Session, select2, selectUsersCollectionTemplate){
	
	var SelectUsersCollectionView = BaseView.extend({
		template: _.template(selectUsersCollectionTemplate),
		selectUsers: null,
		single: false,	//Se 'true' permette di eseguire una sola scelta. 
		
//		events : {
//			'click .dropdownCategories li a': 'clickDropdownCategories'
//		},
		
		initialize: function() {
			console.log('SelectUsersCollectionView.initialize');
			_.bindAll(this);
			//Recupero dell'eventuale lista di item passata comen parametro al costruttore della classe.
			this.single = this.options.single ? true : false;
//			console.log('|||||||||||||||||||||||||||||||||||||||||||');
//			console.log('SINGLE: ' + this.single);
//			console.log('|||||||||||||||||||||||||||||||||||||||||||');
		},
		
		
		
		render: function(){
			console.log('SelectUsersCollectionView.render');
			
			this.$el.html(this.template({single: this.single}));
//			this.$el.html(this.template({single: true}));
			
			//Fonte: https://select2.github.io/examples.html
			this.selectUsers = this.$el.find('#selectUsers');
			
//			this.$el.select2({
			this.selectUsers.select2({
				//minimumInputLength: 1,
//				maximumSelectionSize: 1,
				placeholder: "Seleziona...",
//				allowClear: true,
				width: '100%',
				ajax: {
					url: tenant + '/service/v1/search/people/',
					type : 'GET',
					//url: "http://default.ciaotrip.it/service/v1/search/people/?q=a&page=0&pageSize=10",
					dataType: 'json',
					delay: 250,
					data: function (params) {
						console.log('select2.data');
						console.log(params);
						return {
							q: (typeof (params.term) === "undefined" || params.term=="") ? '*' : params.term,
							pageSize: 10,
							page: (typeof (params.page) === "undefined" || params.page=="") ? 0 : params.page-1,
						};
					},
					processResults: function (data, params) {
						console.log('select2.processResults');
//						console.log(data);
//						page = params.page || 0;
						page = params.page ? params.page-1 : 0;
//						console.log('===========================================');
//						console.log('params');
//						console.log(params);
//						console.log('===========================================');
//						console.log(page);
						
						// parse the results into the format expected by Select2.
						// since we are using custom formatting functions we do not need to
						// alter the remote JSON data
						var items = data.items;
						var jsonItems = [];

//						//Aggiungo la voce 'Qualsiasi'.
//						var jsonAnyItem = {};
//						jsonAnyItem["id"] = "any";
//						jsonAnyItem["text"] = 'Qualsiasi';
//						jsonItems.push(jsonAnyItem);
						
						items.forEach(function(item) {
							var jsonItem = {};
							jsonItem["id"] = item.username;
							jsonItem["text"] = item.fullName + ' ('+ item.username + ')';
							jsonItems.push(jsonItem);
						});
						return {
							results: jsonItems,
							pagination: {
//								more: true,
								more: ((page+1) * 10) < data.count
							}
						};
		    		},
			    	cache: true
		  		},
			});
//			}).on("select2:selecting", function(e) {
//		  		console.log("select2:selecting");
//		  		console.log(e);
//
//		  		var val = e.params.args.data.id;
//		  		var text = e.params.args.data.text;
//		  		//console.log('val  = ' + val);
//		  		//console.log('text = ' + text);
//	  		});
		  	
			
			
//			console.log('=========================================');
			return this;
		},

		
		getValues: function(){
			console.log('SelectUsersCollectionView.getValues');
//			var selectUsers = this.$el.find('#selectUsers');
//			return selectUsers.select2("val");
			return this.selectUsers.select2("val");
		},
		
		clearSelection: function(){
			console.log('SelectUsersCollectionView.clearSelection');
//			var selectUsers = this.$el.find('#selectUsers');
//			console.log(selectUsers);
//			selectUsers.val("");
//			selectUsers.select2('val', '');
//			this.selectUsers.select2("val", "");
//			this.selectUsers.val('').trigger('change');
//			var view = this;
//			$(function() {
//				view.selectUsers.select2('data', null).trigger('change');
//			})
		},
		
		
	});

	return SelectUsersCollectionView;
});