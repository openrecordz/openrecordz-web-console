<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">
<title>OpenRecordz</title>
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    
<script src="config/config-dev.js"></script>
<script src="config/config-<?=$tenant?>-dev.js"></script>
    
<script type="text/javascript">
//hostmane is defined into __pre_html.php
	var hostname = "<?=$hostmane?>";
	
	var poiId = null;
	if ((typeof config!=='undefined')){
		poiId = (config.poiId!=null) ? config.poiId : null;
	}

    var tenant = "http://<?=$tenant?>." + hostname;
    // var tenant = "http://localhost:8880/smart21-server";
	var tenantName = "<?=$tenant?>";

	//development 
	//var domainConsole = ".localhost";
	var domainConsole = "localhost";
	//production
	var domainConsole = ".v2.openrecordz.com";

	// check if the domain console starts with ".". if not add it
	if(domainConsole.charAt(0) !== ".") {
		domainConsole = "." + domainConsole;
	}

	var dashboardDomain = "http://apps"+domainConsole;
</script>
    
<!--Start of Tawk.to Script-->
<!--
<script type="text/javascript">
var $_Tawk_API={},$_Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/552d338a1a2edd466dde111a/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
-->
<!--End of Tawk.to Script-->
    
    

<!-- Bootstrap core CSS -->
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/bootstrap.min.css">

<!-- Custom styles for this template -->
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/sticky-footer-navbar.css">
    
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/signin.css">
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/datepicker3.css" id="bsdp-css">
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/smart21.css">
<link rel="stylesheet" href="http://apps.openrecordz.com/assets/js/libs/select2-4.0.0/css/select2.css"/>
<!--<link rel="stylesheet" href="assets/js/libs/bootstrap-tagsinput/bootstrap-tagsinput.css"/>-->
    
<link rel="stylesheet" href="http://apps.openrecordz.com/config/custom-<?=$tenant?>-dev.css">

<!-- DataTables CSS -->
<!-- <link rel="stylesheet" type="text/css" href="assets/js/libs/datatables/css/jquery.dataTables.css"> -->
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.7/css/jquery.dataTables.css">

<!-- Bootstrap Switch CSS -->
<link rel="stylesheet" type="text/css" href="http://apps.openrecordz.com/assets/js/libs/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css">

<!-- font awesome -->
<!-- <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"> -->
<!-- <link href="assets/css/font-awesome/font-awesome.css" rel="stylesheet"> -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
    
<script src="http://maps.google.com/maps/api/js?key=AIzaSyAoa-0e0nutKrgdsswJE6UGFhatldRPYjg"></script>


<!-- Init Backbone -->
<script data-main="<?=$scriptMain?>" src="assets/js/libs/requirejs/require.js"></script>

<!-- vocabularies -->
<script src="assets/labels_it.js"> </script>   
<script src="assets/labels_en.js"> </script>



<script>

function changeLan() {
	// javascript
    //var lanSelected = document.getElementById("language").value;
    // jQuery
    var lanSelected = $("#language").val();
    //document.getElementById("demo").innerHTML = "You selected: " + x;
    console.log("You selected: " + lanSelected);

    //memorizza il valore della variabile lanSelected nella chiave lan
    localStorage.setItem('lan', lanSelected);

    // restituisce il nome della chiave
    console.log(localStorage.key('lan')); 

    // legge il valore contenuto nella chiave
    console.log(localStorage.getItem('lan'));

    /* CANCELLA il contenuto della chiave */
    // localStorage.removeItem('lan');
	// console.log(localStorage.getItem('lan')); // null

    var lanStored = localStorage.getItem('lan');

    console.log("Lan in localStorage: " +lanStored);

    location.reload();

}

</script>


<script type="text/javascript">

_label=_label_it;

if ((localStorage.getItem('lan')) =="IT") {

	_label=_label_it;

} else if ((localStorage.getItem('lan')) =="EN") {

	_label=_label_en;

}

</script>


<!-- chat21 -->
<app-root></app-root>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/inline.bundle.js"></script>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/polyfills.bundle.js"></script>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/scripts.bundle.js"></script>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/styles.bundle.js"></script>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/vendor.bundle.js"></script>
<script type="text/javascript" src="https://chat21-web.firebaseapp.com/main.bundle.js">
</script>

<script type="text/javascript">
	chat21_tenant="openrecordz";
	chat21_agentId="support";
</script>


