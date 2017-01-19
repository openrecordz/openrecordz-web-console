define([
	'core/BaseView',
	'Session',
	'text!templates/googleMapTemplate.html'
], function(BaseView, Session, googleMapTemplate){
	
//	Backbone.View.extend
	var GoogleMapView = BaseView.extend({
		template : _.template(googleMapTemplate),
		position: config.position,
		zoom: 14,
		map: null,
		
		
		initialize: function(){
			console.log('GoogleMapView.initialize');
//			_(this).bindAll();
			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
			this.position = this.options.position;
			this.zoom = this.options.zoom;
//			this.render();
		},
		
		render: function(){
			console.log('GoogleMapView.render');
			this.$el.html(this.template());
			this.initGoogleMap();
			return this;
		},

		
		resize: function(){
			console.log('GoogleMapView.resize');
			//Fonte: http://stackoverflow.com/questions/1746608/google-maps-not-rendering-completely-on-page
			//Developers should trigger this event on the map when the div 
			//changes size: google.maps.event.trigger(map, 'resize').
			google.maps.event.trigger(this.map, 'resize');
			//Riposiziono il centro della mappa sul marker. 
			var posLatLng = new google.maps.LatLng(this.position.lat, this.position.lon);
			this.map.setCenter(posLatLng);
		},
		
		
		initGoogleMap: function(){
			console.log('GoogleMapView.initGoogleMap');
			var view = this;
			//Init map.
			var posLatLng = new google.maps.LatLng(this.position.lat, this.position.lon);
			console.log(posLatLng);
			var mapOptions = {
				center: posLatLng,
				zoom: this.zoom
			};
			
			this.map = new google.maps.Map(this.$('#map-container').get(0), mapOptions);
			
			this.marker = new google.maps.Marker({
				map: this.map,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: posLatLng
			});
			//This event listener will call addMarker() when the map is clicked.
			google.maps.event.addListener(this.map, 'click', function(event){
				view.clickOnMap(event.latLng);
			});
//			google.maps.event.addListener(this.map, 'click', this.clickOnMap);
			
			return this;
		},
		
		clickOnMap: function(location){
			console.log('GoogleMapView.clickOnMap');
			
			//Rimozione vecchio marker dalla mappa.
			this.marker.setMap(null);
			
			//Aggiunta del nuovo marker sulla mappa.
			this.marker = new google.maps.Marker({
				map: this.map,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: location
			});
			
//			this.map.setCenter(location);
		},
		
		
		getMarkerPosition: function(){
			console.log('GoogleMapView.getMarkerPosition');
			var lat = this.marker.getPosition().lat();
			var lng = this.marker.getPosition().lng();
			var pos = {lat: lat, lon: lng};
			return pos;
		},
		
	});

	return GoogleMapView;
});