define([
	'jquery',
	'backbone'
], function($, Backbone){
	
	var Utils = Backbone.Model.extend({
		errors: {
			en: {
				'000': 'Generic error',						//Default.
				'500': 'Generic error',						//Generic exception.
				'401': 'Username and/or Password invalid', 	//Authentication exception.
				'403': 'Access denied',						//AccessDenied Exception
				'404': 'Unknown Resource',					//UnknownResource Exception
				'406': 'Validation error',					//Validation Exception
				'409': 'Username already in use',			//UsernameAlreadyInUse Exception
				'410': 'Email already in use',				//EmailAlreadyInUse Exception
				'429': 'You have already sent a notification with the same message in the last 5 hours',
			},
			it: {
				'000': 'Errore generico',
				'500': 'Errore generico',
				'401': 'Nome utente e/o Password non validi', 	//Authentication exception.
				'403': 'Accesso negato',						
				'404': 'Risorsa non trovata',					//UnknownResource Exception
				'406': 'Errore di validazione',					//Validation Exception
				'409': 'Username già in uso',					//UsernameAlreadyInUse Exception
				'410': 'Email già in uso',						//EmailAlreadyInUse Exception
				'429': 'Hai già mandato una richiesta con lo stesso messaggio nelle ultime 5 ore',
			},
		},
		
		
		
		initialize : function(){
			console.log('Utils.initialize');
		},
		
		isNormalInteger: function(str) {
			// ^: Match start of string
			// \+?: Allow a single, optional + (remove this if you don't want to)
			// (?:...|...): Allow one of these two options (without creating a capture group):
			//	  (0|...): Allow 0 on its own...
			//	  (...|[1-9]\d*): ...or a number starting with something other than 0 and followed by any number of decimal digits.
			// $: Match end of string.
//			return /^\+?(0|[1-9]\d*)$/.test(str);
		    return /^(0|[1-9]\d*)$/.test(str);
		},
		
		isPhoneNumber: function(str) {
			//Validazione del numero di telefono.
			return /^\d+$/.test(str);
//			var reg = /^\d+$/;
		},
		
		isPrice: function(value){
			//Validazione superata anche nel caso di stringa vuota.
			var valid = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(value);
			//Validazione non superata nel caso di stringa vuota.
//			var valid = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(value);
			return valid;
		},
		
		isLatitude: function(value){
//			var value = parseFloat(value).toFixed(6);
			//It valids lat -90.XXXXXX to 90.XXXXXX.
//			var valid = /^-?([0-8]?[0-9]|90)\.[0-9]{1,6}$/.test(value);
			var valid = /^-?([0-8]?[0-9]|90)?(?:\.\d+)?$/.test(value);
			return valid;
//			var reg = new RegExp("^-?([0-8]?[0-9]|90)\.[0-9]{1,6}");
//			if( reg.exec(value) ) {
//			   console.log('Valida!');
//			} else {
//			   console.log('Non Valida!');
//			}
		},
		
		isLongitude: function(value){
//			var value = parseFloat(value).toFixed(6);
			//It valids lon -180.XXXXXX to 180.XXXXXX.
//			var valid = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,6}$/.test(value);
			var valid = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)?(?:\.\d+)?$/.test(value);
			return valid;
//			var reg = new RegExp("^-?([0-8]?[0-9]|90)\.[0-9]{1,6}");
//			if( reg.exec(value) ) {
//			   console.log('Valida!');
//			} else {
//			   console.log('Non Valida!');
//			}
		},
		
		
		showError: function(view, attr, error){
//			var $el = view.$('[name=' + attr + ']'),
			var $el = view.$('[id=' + attr + ']');
            var $group = $el.closest('.form-group');
	        $group.addClass('has-error');
	        $group.find('.help-block').html(error).removeClass('hidden');
		},
		
		hideAllError: function(){
			//Nascondo il box di errore generico validazione.
			$('#formAlert').hide();
			//Rimuovo tutti i messaggi di errore
			$(".help-block").html('').addClass('hidden');
			//Rimuovo tutte le classi di errore
			$(".form-group").removeClass('has-error');
		},
		
//		hideError: function(view, attr){
//			var $el = view.$('[name=' + attr + ']'), 
//            $group = $el.closest('.form-group');
//		    $group.removeClass('has-error');
//		    $group.find('.help-block').html('').addClass('hidden');
//		},
		
		
//		getError: function(response){
//			json_string = jQuery.parseJSON( response.responseText );
////			alert(json_string.developerMessage);
//			var status = json_string.status;
//			var message = this.errors.it[status] ? this.errors.it[status] : this.errors.it['000']; 
////			alert(message);
//			return message;
//		}
		
		getError: function(response){
			console.log('Utils.getError');
			var status = response.status;
			console.log('status = ' + status);
			var message = this.errors.it[status] ? this.errors.it[status] : this.errors.it['000'];
			console.log('message = ' + message);
			return message;
		},
		
//		getError: function(response){
//			console.log('Utils.getError');
//			json_string = jQuery.parseJSON( response.responseText );
//			console.log('json_string = ' + json_string);
////			alert(json_string.developerMessage);
//			var status = json_string.status;
//			console.log('status = ' + status);
//			var message = this.errors.it[status] ? this.errors.it[status] : this.errors.it['000'];
//			console.log('message = ' + message);
//			return message;
//		},
		
		
		//ANDREA LEO: problema ricerca "q=crocchette OR crocchette*".
		cleanAndProcessQuery: function(query){
			var returnQuery = query;
			//clean
			if (returnQuery.indexOf("!") > -1) {
//			if (returnQuery.contains("!")){
				returnQuery = returnQuery.replace("!", "");
			}
			if (!returnQuery=="") {
				var starredQuery = returnQuery +"*";
				if (starredQuery.indexOf(" ") > -1) {
//				if (starredQuery.contains(" ")){
					starredQuery = starredQuery.replace(" ", "* ");
				}
				returnQuery = returnQuery + " OR " + starredQuery;
				return returnQuery;
			}else{
				return "";
			}
		},
		
		
		


		timeConverter: function(timestamp){
//			var a = new Date(timestamp * 1000);
			var a = new Date(timestamp);
//			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var months = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			return time;
		},


		
			
	});

	return new Utils();
});