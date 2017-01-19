define([
	'core/BaseView',
	'Session',
	'select2',
	'text!templates/select/selectVisibilityTemplate.html'
], function(BaseView, Session, select2, selectVisibilityTemplate){
	
	var SelectVisibilityView = BaseView.extend({
		template : _.template(selectVisibilityTemplate),
		select: null, 	//Oggetto select corrente.
//		onChangeCallback: null,	//Callback da eseguire al cambio di tipo.
		
		
		initialize: function() {
			console.log('SelectVisibilityView.initialize');
			_.bindAll(this);
			//Recupero eventuali parametri passati al costruttore della classe.
//			this.onChangeCallback = this.options.onChangeCallback;
		},
		
		
		
		render: function(){
			console.log('SelectVisibilityView.render');
			
			this.$el.html(this.template());
			
			//Fonte: https://select2.github.io/examples.html
			this.select = this.$el.find('#selectVisibility');
			
			var data = [
			             {id: 'all', 		text: 'tutti'},
			             {id: 'enabled', 	text: 'abilitati'},
			             {id: 'disabled', 	text: 'disabilitati'},
			           ];

			this.select.select2({
//				placeholder: "Seleziona almeno un utente",
//				allowClear: false,
				width: '100%',
				minimumResultsForSearch: Infinity, //Hiding the search box
				data: data
			});
			
//			var view = this;
//			//Definizione della callback da eseguire al cambio di valore.
//			this.select.on('change', function(e){
//				console.log('SelectVisibilityView.change');
//				view.onChangeCallback(view.select.select2("val"));
//			});
			
			return this;
		},

		
		getValue: function(){
			console.log('SelectVisibilityView.getValue');
			return this.select.select2("val");
		},
		
		
	});

	return SelectVisibilityView;
});