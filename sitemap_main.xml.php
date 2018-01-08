<?php
header('Content-type: application/xml');
require_once('__pre-html.php'); 

$null_sitemap = '<urlset><url><loc></loc></url></urlset>';
$output = '<?xml version="1.0" encoding="UTF-8"?>'. "\n";
$output .= '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"

         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
echo $output;

// QUERY: TENANT DISPONIBILI

$url= "http://default.api.openrecordz.com/service/v1/gfunctions/g_getalltenants";
// echo "URL: " .$url;
// Initiate curl
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);
//print_r($result);

// Closing
curl_close($ch);
// Dump  json
//var_dump(json_decode($result, true));

// Decodifica dell'array
$data = json_decode($result,true);
//print_r($data);

array_walk_recursive($data, function ($item, $key) {
    //echo "$key holds $item\n";

    $tenantname= $item;
    //echo "Tenant: " .$tenantname. "\n";

      ?>
  <url>
    <loc>http://<?=$tenantname;?>.openrecordz.com/sitemap.xml</loc>
  </url>

    <?php

});

?>

</urlset>


