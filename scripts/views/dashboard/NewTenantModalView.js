define([
//	'jquery',
	'core/BaseView',
//	'views/GoogleMapView',
	'models/Tenant',
	'Session',
	'models/Utils',
	'text!templates/dashboard/newTenantModalTemplate.html',
//	'async!http://maps.google.com/maps/api/js?sensor=false'
//], function(BaseView, Poi, Session, addPoiModalTemplate){
], function(BaseView, Tenant, Session, Utils, newTenantModalTemplate){
	
	//Fonte: https://gist.github.com/andrewshatnyy/6126879
	//Fonte: http://stackoverflow.com/questions/16085852/rendering-bootstrap-modal-using-backbone
	var NewTenantModalView = BaseView.extend({
		id: 'base-modal',
		className: 'modal fade',
		template : _.template(newTenantModalTemplate),
		callback: null,
//		googleMapView: null,
//		namePoi: null,
//		query: null,
//		pois: null,
		
		events: {
			'click #btnClose' : 'clickClose',
			'click #btnCloseX' : 'clickClose',
			'click #btnSave' : 'clickSave',
			'keyup #newTenantName' : 'onkeyUpTenantName',
//			'click #btnSearchPoi': 'searchPoi',
//			'click .rowItem' : 'selectPoi',
			'hidden.bs.modal': 'teardown',	//This event is fired when the modal has finished being hidden from the user.
//			'shown.bs.modal': 'resizeMap',
		},
		 
/*
		resizeMap: function(){
			console.log('AddPoiModalView.resizeMap');
			//Fonte: http://stackoverflow.com/questions/1746608/google-maps-not-rendering-completely-on-page
			//Developers should trigger this event on the map when the div 
			//changes size: google.maps.event.trigger(map, 'resize').
			this.googleMapView.resize();
		},
*/

		
		initialize: function() {
			console.log('NewTenantModalView.initialize');
//			_(this).bindAll();
//			_.bindAll(this);
			
			//Recupero dell'eventuale nome del poi passato come parametro al costruttore della classe.
//			this.namePoi = this.options.namePoi;
			this.callback=this.options.callback;
			this.render();
		},
		
		
		render : function(){
			console.log('NewTenantModalView.render');
			this.$el.html(this.template());
/*			this.googleMapView = new GoogleMapView({
				position: Session.getPosition(),
				zoom: 14
			});
			this.assign(this.googleMapView, '#google-map-container');
*/
			return this;
		},
		
/*		
		assign : function (view, selector) {
			view.setElement(this.$(selector)).render();
		},
		
*/		
		isFormValid : function() {
			var valid = true;
			var that = this;

			if($('#newTenantName').val()==''){
				//alert('Inserire un nome per la nuova app!');
				Utils.showError(that, 'newTenantName', _label.new_tenant_modal_template_app_validation_title);
				valid = false;
			}
			return valid;
		},



		parameterizeNameField: function(string) {
		  var sep = "";
		  // Turn unwanted chars into the separator
		  var safeStr = string.replace(/[^-\w]+/gi, sep);

		  // No more than one of the separator in a row.
		//  safeStr = safeStr.replace(/-{2,}/gi, sep);

		  // Remove leading/trailing separator.
		  //safeStr = safeStr.replace(/^-|-$/gi, "");

		  return safeStr.toLowerCase();
		},

		onkeyUpTenantName: function(e) {
			console.log("e.target.value : "+e.target.value);
			$("#tenantUrl").val(this.parameterizeNameField(e.target.value));
			return this;
		},


		clickSave: function(e) {
			e.preventDefault();
			console.log('NewTenantModalView.clickSave');
			var view = this;						
			
			if(this.isFormValid()){
				var tenantName = $('#tenantUrl').val();
//				var tenantName = $('#newTenantName').val();
				 
				var params = {
					name: tenantName					
				};

				console.log(params);
				 
				var callbackNewTenant = function(result, response, status){
					view.tenantAdded(result, response, status);
				};
				var tenant = new Tenant();
				tenant.create(params, callbackNewTenant);
			 }
		},
		 
		tenantAdded: function(result, response, status){
			var that=this;
			console.log('NewTenantModalView.tenantAdded');
			console.log("result : " + result);
			
			if(result=='success'){
				this.teardown();
				this.callback(result, response);	 //call the callback of dashboardview
			}else  if (response.status=="406") {
				Utils.showError(that, 'newTenantName', 'Nome già in uso. Scegliere uno diverso!!');
//				alert("tenant gia in uso");
			}
			else {
				var errMessage = Utils.getError(response);
				alert(errMessage);
			}
			return this;
		},

		clickClose: function() {
			console.log('NewTenantModalView.clickClose');
			this.teardown();
			//this.callback(null);
		},
		 
		  
		show: function() {
			console.log('NewTenantModalView.show');
			//this.callback = callback;
			this.$el.modal('show');
		},
		  
		teardown: function() {
			console.log('NewTenantModalView.teardown');
			this.$el.data('modal', null);
			$("body").attr("class","");
//			$(".modal-backdrop").attr("class","");
			$(".modal-backdrop").remove();
			this.remove();
		},
		 
	 });
	 
	 return NewTenantModalView;
});
