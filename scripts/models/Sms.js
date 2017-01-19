define([
	'jquery',
	'backbone',
	'Session'
], function($, Backbone, Session){
	
	var Sms = Backbone.Model.extend({
		
		
		initialize: function(){
			console.log('Sms.initialize');
		},
		
		
		send: function(data, callback){
			console.log('Sms.send');
			var that = this;
			var send = $.ajax({
				beforeSend: function (xhr){
        	        var basicAuth = 'Basic ' + Session.get('basicAuth');
					console.log("BasicAuth = " + basicAuth);
					xhr.setRequestHeader("Authorization", basicAuth);
//        	        xhr.setRequestHeader("Authorization", 'Basic YWRtaW46ZHJzYWRtaW4='); 	//Default - user: 'admin'
//    	        	xhr.setRequestHeader("Authorization", 'YWRtaW46YWRtaW44M0xFTyw=');		//Ciaotrip - user 'admin'
        	    },
        	    url: tenant + '/service/v1/functions/sendsms',
				data: data,
				type: 'POST',
//				timeout: 8*60*60*1000 // sets timeout to 8 hours.
//				timeout: 1*1000 // sets timeout to 1 seconds.
				timeout: 3*60*1000 // sets timeout to 3 minutes.
			});
			send.done(function(response){
				console.log('Sms.send.done');
				console.log(response);
				callback('success', response);
			});
			send.fail(function(jqXHR, textStatus, errorThrown){
				console.log('Sms.send.fail');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				callback('fail', jqXHR);
			});
		},
		
	});

	return new Sms();
});