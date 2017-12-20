require.config({
	waitSeconds: 200,
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
        	deps: [
                   'jquery'
               ],
            exports: 'Bootstrap'
        },
        moment: {
        	exports: 'moment'
        },
        select2: {
        	exports: 'select2'
        },
        spin: {
        	exports: 'spin'
        },
	bootbox: {
        	exports: 'bootbox'	//http://bootboxjs.com (Utilizzato per messaggi alert, confirmation, ecc)
        },
        datepicker: {
        	//http://bootstrap-datepicker.readthedocs.org/en/release/
        	deps: [
        	    'jquery'
            ],
        	exports: 'datepicker'
        }
    },
    paths: {
//    	jquery: 'vendor/jquery/jquery',
//    	backbone: 'vendor/backbone/backbone',
//      underscore: 'vendor/underscore/underscore',
//      text: 'vendor/requirejs/text',
//      bootstrap: 'vendor/bootstrap/bootstrap.min',
//      moment: 'vendor/moment/moment',
//      select2: 'vendor/select2-4.0.0/js/select2.min',
//      spin: 'vendor/spin/spin',
//      datepicker: 'vendor/datepicker/bootstrap-datepicker'
    	
//    	jquery: '/smart21-new-devconsole/assets/js/libs/jquery/jquery',
//        backbone: '/smart21-new-devconsole/assets/js/libs/backbone/backbone',
//        underscore: '/smart21-new-devconsole/assets/js/libs/underscore/underscore',
//        text: '/smart21-new-devconsole/assets/js/libs/requirejs/text',
//        bootstrap: '/smart21-new-devconsole/assets/js/libs/bootstrap/bootstrap.min',
//        moment: '/smart21-new-devconsole/assets/js/libs/moment/moment',
//        select2: '/smart21-new-devconsole/assets/js/libs/select2-4.0.0/js/select2.min',
//        spin: '/smart21-new-devconsole/assets/js/libs/spin/spin',
//        datepicker: '/smart21-new-devconsole/assets/js/libs/datepicker/bootstrap-datepicker'
    	
//    	jquery: 	'../assets/js/libs/jquery/jquery',
//        backbone: 	'../assets/js/libs/backbone/backbone',
//        underscore: '../assets/js/libs/underscore/underscore',
//        text: 		'../assets/js/libs/requirejs/text',
//        bootstrap: 	'../assets/js/libs/bootstrap/bootstrap.min',
//        moment: 	'../assets/js/libs/moment/moment',
//        select2: 	'../assets/js/libs/select2-4.0.0/js/select2.min',
//        spin: 		'../assets/js/libs/spin/spin',
//        datepicker:	'../assets/js/libs/datepicker/bootstrap-datepicker'
        	
    	jquery: 	'../assets/js/libs/jquery/jquery',
        backbone: 	'../assets/js/libs/backbone/backbone',
        underscore: '../assets/js/libs/underscore/underscore',
        text: 		'../assets/js/libs/requirejs/text',
        bootstrap: 	'../assets/js/libs/bootstrap/bootstrap.min',
        // moment: 	'../assets/js/libs/moment/moment',
        moment: '../assets/js/libs/moment/moment-with-locales',
        select2: 	'../assets/js/libs/select2-4.0.0/js/select2.min',
        spin: 		'../assets/js/libs/spin/spin',
        datepicker:	'../assets/js/libs/datepicker/bootstrap-datepicker',
 	bootbox:	'../assets/js/libs/bootbox/bootbox.min'
    }
});

require([
    'app'
], function (App) {
    var app = new App();
    app.start(); 
});
