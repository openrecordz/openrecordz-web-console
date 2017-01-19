<?php
header('Content-type: application/xml');
require_once('__pre-html.php'); 

$null_sitemap = '<urlset><url><loc></loc></url></urlset>';
$output = '<?xml version="1.0" encoding="UTF-8"?>'. "\n";
$output .= '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"

         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
echo $output;
?>



<url>
  <loc>http://<?=$tenant;?>.openrecordz.com/blog</loc>
</url>
<url>
  <loc>http://<?=$tenant;?>.openrecordz.com/datasets</loc>
</url>

<?php
// QUERY: DATASET DISPONIBILI
$url= "http://".$tenant.".api.openrecordz.com/service/v1/datasets?pagesize=100000";
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
// Closing
curl_close($ch);
// Dump  json
// var_dump(json_decode($result, true));

// Decodifica dell'array
$data = json_decode($result,true);
//print_r($data);

foreach ($data as $key => $valueDs) {
    if (isset($valueDs["_slug"])) {
        $_slug = $valueDs["_slug"];
        $slug = htmlspecialchars($_slug);
        //echo "<br>Nome Dataset: " .$datasetName."<br>";
    }

    if (isset($valueDs["_createdon"])) {
        $datasetCreatedOnMillSec = $valueDs["_createdon"];
        $seconds = $datasetCreatedOnMillSec / 1000;
        $datasetCreatedOn = date("Y-m-d", $seconds);
        //echo "Dataset creato il: " .$datasetCreatedOn. "<br>";
    }

    ?>

	<url>
	  <loc>http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?></loc>
	  <lastmod><?=$datasetCreatedOn;?></lastmod>
	</url>

	<?php


				
		// QUERY: DATI DEI DATASET DISPONIBILI    	
	 	
	    //$url= "http://".$tenant.".api.openrecordz.com/service/v1/cdata/".$slug."";
	    //$url= "http://".$tenant.".api.openrecordz.com/service/v1/cdata/".$slug."?page=".$current_page."";
	    $url= "http://".$tenant.".api.openrecordz.com/service/v1/cdata/".$slug."?pagesize=100000";

	    //echo "URL: " .$url."\n";

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
	    // Closing
	    curl_close($ch);
	    // echo "RESULT: ".$result;

	    /* Dump  json */
	    // var_dump(json_decode($result, true));

	    /* Decodifica dell'array */
	    $data_rows = json_decode($result,true);
	     
	    //print_r($data_rows);

		    foreach ($data_rows as $key => $value) {
		    	if (isset($value["id"])) {
       		    	$openrecordzID = $value["id"];
       		    	//echo "OpenRecordzID " .$openrecordzID. "\n";	
    		    }


				if (isset($value["_createdon"])) {      
                        $dataMilsec = $value["_createdon"];
                        $seconds = $dataMilsec / 1000;
                        $dataCreazione = date("Y-m-d", $seconds);
                }        
				   ?>
				<url>
					<loc>http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>/<?=$openrecordzID;?></loc>
					<lastmod><?=$dataCreazione;?></lastmod>
				</url>
				<?php
			}

			$len = count($data_rows);
			//echo "TOTALE RECORD NELLA PAGINA: ".$len. "\n";
	//}
		
}

?>


</urlset>


