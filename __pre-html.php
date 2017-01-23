<?php
// $site='http://default.devconsole.smart21.it';	//Remoto
// $site = '/smart21-new-devconsole';			//Locale
//echo $site;

//Indirizzo della console del tipo: 
// * sviluppo 	--> 'http://nome_tenant.devconsole.smart21.it'
// * produzione --> 'http://nome_tenant.console.smart21.it'
//Recupero il nome del tenant e il domain dall'indirizzo.
$s = $_SERVER['HTTP_HOST'];
$a = explode(".", $s);
// echo 'tenant: ' . $a[0];
// echo '<br>';
$tenant = $a[0];
// echo 'domain: ' . $a[1];
// echo '<br>';

// $domain = $a[1];
// if ($domain=='console') 
// 	$hostmane = 'smart21.it';
// else
// 	$hostmane = 'frontiere21.it';
//$hostmane = 'v2.smart21.it';
$hostmane = 'api.openrecordz.com';
//$hostmane = 'api.openrecordz.local:8880/smart21-server';
?>
