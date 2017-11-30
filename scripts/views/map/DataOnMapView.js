define([
	'core/BaseView',
	'Session',
	'bootbox',
	'text!templates/map/dataOnMapTemplate.html'
], function(BaseView, Session, bootbox, dataOnMapTemplate){
	
//	Backbone.View.extend
	var DataOnMapView = BaseView.extend({
		template : _.template(dataOnMapTemplate),
		datasetMeta:null,
		data:null,
		header:null,
		totalCount:0,
		currentPage:0,
		numberOfPages:0,
		rowPerPage: 20,
		text:null,
		asLocationData:false,
		position: config.position,
		zoom: 14,
		map: null,
		markers: [],
		
/*		events: {
		   'render': 'afterRender'
		},
*/
		initialize: function(){
			console.log('DataOnMapView.initialize');
//			_(this).bindAll();
			_.bindAll(this);
			
			//Recupero dei parametri passati al costruttore della classe.
			this.data = this.options.data;
			this.asLocationData=this.options.asLocationData;
			console.log("this.asLocationData:"+this.asLocationData);
			this.datasetMeta=this.options.datasetMeta;
			//_g_datasetmeta=this.datasetMeta;
//			this.position = this.options.position;
//			this.zoom = this.options.zoom;
//			this.render();
		},
		
		render: function(){
			console.log('DataOnMapView.render');
			this.$el.html(this.template({asLocationData:this.asLocationData}));
			console.log("rendered");
			if (this.asLocationData) {
				this.initGoogleMap(this.data.records);
				//mymap2=this;
			}
			//setTimeout(this.resize(),100000);
			return this;
		},

		/*afterRender: function(e){
		    alert("render complete")
		},*/

		resize: function(){
			console.log('DataOnMapView.resize');
			//Fonte: http://stackoverflow.com/questions/1746608/google-maps-not-rendering-completely-on-page
			//Developers should trigger this event on the map when the div 
			//changes size: google.maps.event.trigger(map, 'resize').
			google.maps.event.trigger(this.map, 'resize');
			//Riposiziono il centro della mappa sul marker. 
			//var posLatLng = new google.maps.LatLng(this.position.lat, this.position.lon);
			//this.map.setCenter(posLatLng);
		},

		
//		resize: function(){
//			console.log('ContentsOnGoogleMapView.resize');
//			//Fonte: http://stackoverflow.com/questions/1746608/google-maps-not-rendering-completely-on-page
//			//Developers should trigger this event on the map when the div 
//			//changes size: google.maps.event.trigger(map, 'resize').
//			google.maps.event.trigger(this.map, 'resize');
//			//Riposiziono il centro della mappa sul marker. 
//			var posLatLng = new google.maps.LatLng(this.position.lat, this.position.lon);
//			this.map.setCenter(posLatLng);
//		},
		
		
		initGoogleMap: function(data){
			console.log('DataOnMapView.initGoogleMap');
			console.log('data',data);
			var view = this;
			
			var posLatLng = new google.maps.LatLng(this.position.lat, this.position.lon);
//			console.log(posLatLng);
			var mapOptions = {
				center: posLatLng,
				zoom: this.zoom
			};
			this.map = new google.maps.Map(this.$('#map-container').get(0), mapOptions);

			console.log("this.map",this.map);

			//create empty LatLngBounds object
			var bounds = new google.maps.LatLngBounds();
			var infowindow = new google.maps.InfoWindow();    

			var locations = [];
			var location;
			data.forEach(function(singleData){

//			     console.log("singleData",singleData);

				//check if all the records contains latitude e longitude fields. skip if not.
				if (singleData._latitude && singleData._longitude) {
					var lat = singleData._latitude;
					var lon = singleData._longitude;
					var id = singleData.id;
					var title=id;
					if (singleData._title){
						title=singleData._title;
					}
	//			    location = [description, lat, lon, 1];
					location = [id, lat, lon, title];
					locations.push(location);
				}
			});
			
			console.log("locations",locations);
//			var locations = [
//			                 ['DESCRIPTION3', 41.926979,12.517385, 3],
//			                 ['DESCRIPTION2', 41.914873,12.506486, 2],
//			                 ['DESCRIPTION1', 41.918574,12.507201, 1]
//			               ];
			for (i = 0; i < locations.length; i++) {  
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][1], locations[i][2]),
					map: this.map
				});
				console.log("marker",marker);
				this.markers.push(marker);


				//extend the bounds to include each marker's position
				bounds.extend(marker.position);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						var infowindowContent='<a href="#ds/'+view.datasetMeta._slug+'/id/'+locations[i][0]+'"><h3>'+locations[i][3]+'</h3></a>';
						infowindow.setContent(infowindowContent);
						infowindow.open(this.map, marker);
					}
				})(marker, i));
			}

			//now fit the map to the newly inclusive bounds
			this.map.fitBounds(bounds);


			//this.resize();

			return this;
		},
		
		
		
		
		
		
		
	});

	return DataOnMapView;
});
