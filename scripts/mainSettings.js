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
        datepicker: {
        	//http://bootstrap-datepicker.readthedocs.org/en/release/
        	deps: [
        	    'jquery'
            ],
        	exports: 'datepicker'
        },
        datatables: {
        	exports: 'datatables'
        },
        bootbox: {
        	exports: 'bootbox'	//http://bootboxjs.com (Utilizzato per messaggi alert, confirmation, ecc)
        },
    },
    paths: {    	
    	jquery: 	'../assets/js/libs/jquery/jquery',
        backbone: 	'../assets/js/libs/backbone/backbone',
        underscore: '../assets/js/libs/underscore/underscore',
        text: 		'../assets/js/libs/requirejs/text',
        bootstrap: 	'../assets/js/libs/bootstrap/bootstrap.min',
        moment: 	'../assets/js/libs/moment/moment',
        select2: 	'../assets/js/libs/select2-4.0.0/js/select2.min',
        spin: 		'../assets/js/libs/spin/spin',
        datepicker:	'../assets/js/libs/datepicker/bootstrap-datepicker',
        datatables:	'../assets/js/libs/datatables/js/dataTables.min',
        bootbox:	'../assets/js/libs/bootbox/bootbox.min',
    }
});

require([
    'appSettings'
], function (App) {
    var app = new App();
    app.start(); 
});