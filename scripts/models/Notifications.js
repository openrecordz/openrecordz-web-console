define([
	'jquery',
	'backbone',
	'Session'
], function($, Backbone, Session){
	
	var Notifications = Backbone.Model.extend({
		
		initialize : function(){
			console.log('Notifications.initialize');
		},
		
		send : function(notification, callback){
			console.log('Notifications.send');
			var that = this;
		
			var send = $.ajax({
				beforeSend: function (xhr){
        	        var basicAuth = 'Basic ' + Session.get('basicAuth');
					console.log("BasicAuth = " + basicAuth);
					xhr.setRequestHeader("Authorization", basicAuth);
//        	        xhr.setRequestHeader("Authorization", 'Basic YWRtaW46ZHJzYWRtaW4='); 	//Default - user: 'admin'
//    	        	xhr.setRequestHeader("Authorization", 'YWRtaW46YWRtaW44M0xFTyw=');		//Ciaotrip - user 'admin'
//        	        xhr.setRequestHeader("Authorization", make_base_auth(username, password));
        	    },
        	    url: tenant + '/service/v1/notifications/send',
//        	    url: 'http://192.168.1.213:8880/smart21-server/service/v1/notifications/send',
//				url: 'http://default.frontiere21.it/service/v1/notifications/send',
////    	    url: 'http://www.ciaotrip.it/service/v1/notifications/send',
				data : notification,
				type : 'POST',
//				timeout: 8*60*60*1000 // sets timeout to 8 hours.
//				timeout: 1*1000 // sets timeout to 1 seconds.
				timeout: 3*60*1000 // sets timeout to 3 minutes.
			});
			send.done(function(response){
				console.log('Notifications.send.done');
				//Conversione della stringa in json.
				var json_string = jQuery.parseJSON( response );
				console.log('NotificationsModel.send.done: response = ' + response);
				callback('success', response);
			});
			send.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Notifications.send.fail');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				callback('fail', jqXHR);
			});
			
		}
		
	});

	return new Notifications();
});