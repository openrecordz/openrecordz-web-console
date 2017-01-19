require.config({
	waitSeconds: 2000,
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
        bootswitch: {
        	exports: 'bootswitch'	//http://www.bootstrap-switch.org/ (Turn checkboxes and radio buttons in toggle switches)
        },

        waitingfor: {
		 deps: [       
                'jquery'
	            ],
        	exports: 'waitingfor'
        },

//	bootstraptagsinput: {
//		deps: [
//       	    'bootstrap','backbone','underscore'
//            ],        	
//		exports: 'bootstraptagsinput'	
 //       },
    },
    paths: {    	
    	jquery: 	'../assets/js/libs/jquery/jquery',
        backbone: 	'../assets/js/libs/backbone/backbone',
        underscore: '../assets/js/libs/underscore/underscore',
        text: 		'../assets/js/libs/requirejs/text',
        bootstrap: 	'../assets/js/libs/bootstrap/bootstrap.min',
        moment: 	'../assets/js/libs/moment/moment',
        select2: 	'../assets/js/libs/select2-4.0.0/js/select2.full',
        spin: 		'../assets/js/libs/spin/spin',
        datepicker:	'../assets/js/libs/datepicker/bootstrap-datepicker',
        datatables:	'../assets/js/libs/datatables/js/dataTables.min',
        bootbox:	'../assets/js/libs/bootbox/bootbox.min',
        bootswitch:	'../assets/js/libs/bootstrap-switch/js/bootstrap-switch.min',
        waitingfor:	'../assets/js/libs/waitingfor/bootstrap-waitingfor',
//        bootstraptagsinput:	'../assets/js/libs/bootstrap-tagsinput/bootstrap-tagsinput.min'
    }
});

require([
    'appDatasets'
], function (App) {
    var app = new App();
    app.start(); 
});
