<!doctype html>

<?php
$id_OpenRecordZ=$_GET["id"];
//echo "OpenRecorZ_id: ".$id_OpenRecordZ. "<br>";
?>

<?php
$dataset=$_GET["ds"];
//echo "<br>dataset: ".$dataset. "<br>";
?>
<!-- Include '__pre-html.php' -->
<?php

require_once('__pre-html.php'); 

/* ***
 * QUERY AL SERVIZIO: con l'ID e il DATASET passato da BLOG seleziona l'oggetto CON L'ID DATO
 * da Json creo ARRAY dei DATI dell'oggetto con l'id e il dataset passato da blog.php
 */
$url= "http://".$tenant.".api.openrecordz.com/service/v1/cdata/".$dataset."/".$id_OpenRecordZ."";

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

    //echo "RESULT: ".$result;

    // Dump  json
    //  var_dump(json_decode($result, true));

    // Decodifica dell'array
    $value = json_decode($result,true);
    //print_r($value);

    $total=count($value);
    // echo "<br>TOTAL: "  .$total. "<br>";

    /*
     * SE nell'ARRAY value esiste la key staus ed è uguale a 404 cambia l'HTTP status code da 200 a 404 */
    if ((array_key_exists('status', $value)) && ($value[status] == '404')) {
          
        
        
        //var_dump(http_response_code());
        /* Get the current response code and set a new one */
        //var_dump(http_response_code(404));
        http_response_code(404);
        /* Get the new response code */
        //var_dump(http_response_code());
        http_response_code();
    } 
?>

<html class="no-js" lang="en">
<?php
/*
 * DISPLAY ERRORS
 *
   ini_set('display_errors', 1);
   ini_set('display_startup_errors', 1);
   error_reporting(E_ALL);
*/
// echo "<strong>SONO CONTENT</strong><br>";
// echo "tenant: " .$tenant. "<br>";
// echo "Server Name:" .$_SERVER['SERVER_NAME']. "<br>";

// echo "Request Uri: " .$_SERVER['REQUEST_URI']. "<br>";
$RequestUri = $_SERVER['REQUEST_URI'];

$RequestUriNoSlash = trim($RequestUri, '/');
// echo "Request Uri without slash: " .$RequestUriNoSlash. "<br>";

// $datasetUpper = strtoupper($dataset);

/* 
 * QUERY AL SERVIZIO: DATI DEL DATASET SELEZIONATO (in index_blog)
 * Risultati della query utilizzati in:  breadcrumb - metadescription
 
 * PROCESSING - Nota: la variabile dataset viene passata da blog.php e GET in questa (content.php)
 * Da Json creo array FILTRANDO I DATASET DISPONIBILI x la variabile dataset
 * per li dataset richiesto itero (5):
 * Nome del dataset - Descrizione del dataset - Autore del dataset - Data creazione dataset - Slug del dataset */

$url= "http://".$tenant.".api.openrecordz.com/service/v1/datasets?q={\"_slug\":\"".$dataset."\"}";
//$url= "http://".$tenant.".api.openrecordz.com/service/v1/datasets?q={\"_slug\":\"defibrillatori_nk\"}";
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

//echo "RESULT: ".$result;

/* Dump json */
// var_dump(json_decode($result, true));

/* Decodifica dell'array json ed assegnazione dell'oggetto a data */
$data = json_decode($result,true);

/* Count */
$total=count($data);
// echo "<br>TOTAL: "  .$total. "<br>";

/* Iterazione oggetto data e assegnazione dei valori alle variabili */
foreach ($data as $key => $valueDs) {

    if (isset($valueDs["_name"])) {
        $datasetName = $valueDs["_name"];
        //echo "<br>Nome Dataset: " .$datasetName."<br>";
    } else {
        $datasetName = "Nome del Dataset non disponibile";
    }

    if (isset($valueDs["_description"])) {
        $datasetDescription = $valueDs["_description"];
        //echo "Descrizione Dataset: " .$datasetDescription. "<br>";
    } else {
        $datasetDescription = "Descrizione del Dataset non disponibile";
    }

    if (isset($valueDs["_createdby"])) {
        $datasetCreatedBy = $valueDs["_createdby"];
        //echo "Dataset creato da: " .$datasetCreatedBy. "<br>";
    } else {
        $datasetCreatedBy = "Autore del Dataset non disponibile";
    }

    if (isset($valueDs["_createdon"])) {
        $datasetCreatedOnMillSec = $valueDs["_createdon"];
        $seconds = $datasetCreatedOnMillSec / 1000;
        $datasetCreatedOn = date("d-m-Y", $seconds);
        //echo "Dataset creato il: " .$datasetCreatedOn. "<br>";
    } else {
        $datasetCreatedOn = "Data creazione del Dataset non disponibile";
    } 

    $slug = $valueDs["_slug"];
    //echo "Slug: " .$slug;
}

   
    /*
     * Creazione Oggetti Proprietà di sistema/variabili (ALL'INIZIO esercizio per Andrea S)
     */
    // iterando sulle righe del dataset
    // echo "<br>KEY:" .$key."<br>";
    // echo "<br>VALUE: " .$value."<br>";

     //echo "<br>ARRAY SISTEM (FIXED) KEY <br>";
    foreach($value as $fieldKey => $fieldValue){
       
        if($fieldKey[0] == '_'){
            $arr_fixed_key[$fieldKey] = $fieldValue;
            //echo "<br>".$fieldKey.":" .$fieldValue."<br>";
        }
    }

    if(isset($arr_fixed_key)) {
        //print_r($arr_fixed_key);
    }

    //echo "<br>ARRAY VARIABLE KEY <br>";
    foreach($value as $fieldKey => $fieldValue){

        if ($fieldKey[0] != "_") {
           $arr_variable_key[$fieldKey] = $fieldValue;
        }
    }

    if(isset($arr_variable_key)) {
         //print_r($arr_variable_key);
         //echo "<br>";
    }

  

    /*  PROPRIETA' DI SISTEMA - LA QUERY AL SERVIZIO è ALL'INIZIO DELLA PAGINA 
     * NOTA  (in content.php accedo direttamente ai campi dell'array, 
     * e.g non uso il foreach come in blog.php in quanto qui il json passato nn è 
     * racchiuso delle parentesi quadre)
     */

    /* TITOLO */
    if (isset($value["_title"])) {
        $titolo = $value["_title"];
        // echo "Titolo: " .$titolo. "<br>";
    } else {
       $titolo = "Titolo non disponibile";
    }

    if (empty($titolo)) {
        $titolo = "Titolo non disponibile";
    }
                     
    /* DESCRIZIONE */
    if (isset($value["_description"])) {
        $descrizione = $value["_description"];
        // $descrizioneUcFirst = ucwords(strtolower($descrizione));
        //echo "Descrizione: " .$descrizione. "<br>";
    } else {
        $descrizione = "Descrizione non disponibile";
        //echo "Descrizione: " .$descrizione. "<br>";
    }

    if (empty($descrizione)) {
        $descrizione = "Descrizione non disponibile";
    }    

    /* STATUS */ 
    if (isset($value["_status"])) {
        $stato = $value["_status"];
        // echo "Stato: " .$stato. "<br>";
    } else {
        $stato = "Stato non disponibile";
    }

    /* CREATO DA */
    if (isset($value["_createdby"])) {
        $creatoDa = $value["_createdby"];
        // echo "Creato da: " .$creatoDa. "<br>";
    } else {
        $creatoDa = "Autore non disponibile";
    }    

    if (empty($creatoDa)) {
        $creatoDa = "Autore non disponibile";
    }

    /* DATA CREAZIONE */ 
    if (isset($value["_createdon"])) { 
        $dataMilsec = $value["_createdon"];
        $seconds = $dataMilsec / 1000;
        $dataCreazione = date("d-m-Y", $seconds);
        // echo "Data creazione: ".$dataCreazione. "<br>";
    }

    if (empty($dataCreazione)) {
        $dataCreazione = "Data creazione non disponibile";
    }

    /* MODIFICATO DA */
    if (isset($value["_modifiedby"])) {
        $modificatoDa = $value["_modifiedby"];
        // echo "Modificato da: " .$modificatoDa. "<br>";
    }
 

    /* DATA MODIFICA */
    if (isset($value["_modifiedon"])) {    
        $dataModificaMill =  $value["_modifiedon"];
        $seconds = $dataModificaMill / 1000;
        $dataModifica = date("d-m-Y", $seconds);
        // echo "Data Modifica: " .$dataModifica. "<br>";
    }
  
    /* LATIDUDINE - LONGITUDINE */
    if (isset($value["_latitude"])) {
        $_lat = $value["_latitude"];
        //echo "Latidudine: " .$_lat. "<br>";
        // se il valore Latidudine contiene la virgola
        if (strpos($_lat, ',') !== false) {
            //echo 'true';
            // cambia la virgola in punto
            $lat = str_replace(",",".",$_lat);
            //echo "<br>lat replace: ".$lat."<br>";
        } else {
            $lat = $value["_latitude"];
        }
          
        $_log = $value["_longitude"];
        //echo "Longitudine: ".$_log. "<br>";

        if (strpos($_log, ',') !== false) {
            // echo 'true';
            $log = str_replace(",",".",$_log);
            // echo "log Replace: ".$log."<br>";
        } else {
            $log = $value["_longitude"];
        }

    } else {
        //echo "No Map";
    }


    if (isset($value["_main_image"])) {   
        $img = $value["_main_image"];
        //echo "Img src: ".$img. "<br>";
    } 
    

    if (isset($value["_website"])) {
        $web_site = ($value["_website"]);
        //echo "Sito Web: " .$web_site;
    } 

    if (isset($value["_email"])) {
        $email = ($value["_email"]);
        //echo "Email: " .$email;
    } 

    if (isset($value["_phone"])) {
        $phone = ($value["_phone"]);
        //echo "Telefono: " .$phone;
    } 


    $id_OpenRecordZ = $value["id"];
    //echo "<br>ID OpenRecordZ: ".$id_OpenRecordZ."<br>";

    /* **********
     * META TITLE  titolo del post o (se nn è disponibile) nome del dataset o (se error 404) Errore 404
     * **********/
    if (isValidVariable($value["_title"])) {
        $metatitle_postTitle = $value["_title"];
        //$metatitle_postTitle_tr = substrwords($titolo,30);

    } else if (isValidVariable($valueDs["_name"])) {
        $metatitle_postTitle = $valueDs["_name"];
       
    } else if ((array_key_exists('status', $value)) && ($value[status] == '404')) {
        $metatitle_postTitle = "Errore 404 - Pagina non trovata"; 

    } 
   


    /* metadescription_tr è = 
     - alla descrizione del Post o (se questa nn esiste) 
     - al titolo del Post */
    //if ((isset($value["_description"])) && (!empty($value["_description"]))) {
    if (isValidVariable($value["_description"])) {    
        $metadescription = $value["_description"];

        //echo "metadescription " .$metadescription;

        $metadescription_tr = substrwords($metadescription,80);
        //echo "Meta description truncate: ".$metadescription_tr;

        /* sanitize metadescription_tr: eliiminazione delle double quotes */
        $metadescription_tr_san = str_replace('"', "", $metadescription);

        //echo "metadescription sanitize " .$metadescription_tr_san;

    //} else if ((isset($value["_title"])) && (!empty($value["_title"]))) {
    } else if (isValidVariable($value["_title"])) {    

        $metadescription = $value["_title"];

        $metadescription_tr_san = str_replace('"', "", $metadescription);
    } else if ((array_key_exists('status', $value)) && ($value[status] == '404')) {
        $metadescription_tr_san = "Errore 404, pagina non trovata";

    }   
    


    /* Nome del dataset nella meta description */
    $metadescription_dsName_tr = substrwords($datasetName,90);

    /* sanitize metadescription_dsName_tr */
    $metadescription_dsName_tr_san = str_replace('"', "", $metadescription_dsName_tr);

        /* Nome del dataset nel meta title */  
    $metatitle_dsName_tr = substrwords($datasetName,25);
    //echo "dataset Name Truncate: ".$metatitle_dsName_tr;

    ?>
<head>
<?php require_once('__headblog.php');  ?>
    
    <!-- Titolo del post () + OpenData + Openrecordz -->
    <title><?=$metatitle_postTitle;?> - OpenData <?=$tenant;?> - Openrecordz</title>

    <!-- titolo o descrizione (80) del Post + Nome del Dataset (50) + OpenData -->
    <meta name="description" content="<?=$metadescription_tr_san;?> - Dato del dataset: <?=$metadescription_dsName_tr_san;?> - OpenData <?=$tenant;?>">
    
    <meta name="author" content="">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/custom-blog-home.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- OPEN-SANS -->
    <link rel='stylesheet' id='avia-google-webfont' href='//fonts.googleapis.com/css?family=Open+Sans:400,600' type='text/css' media='all'/>  

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="icon" href="http://apps.openrecordz.com/assets/images/openrecordzsmall.png" type="image/png">

    <!--<style>
    [class^="col-"] {
      background-color: rgba(86, 61, 124, 0.15);
      border: 1px solid rgba(86, 61, 124, 0.2);
      padding-bottom: 20px;
      padding-top: 120px;
    }
    </style> -->
    <script type='application/ld+json'> 
    {
      "@context": "http://www.schema.org",
      "@type": "WebSite",
      "name": "OpenRecordz - OpenData <?=$tenant;?>",
      "url": "http://<?=$tenant;?>.openrecordz.com/blog"
    }
     </script>
</head>

<body id="top" itemscope="itemscope" itemtype="https://schema.org/WebPage">
<meta itemprop="headline" content="<?=$datasetName;?>"/>
<main role="main" itemprop="mainContentOfPage" content="<?=$titolo;?> - id: <?=$id_OpenRecordZ;?>">

<?php include_once("analyticstracking.php") ?>
    <!-- start/ NEW NAV BAR -->
        <div class="navbar navbar-default navbar-fixed-top" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
        <div class="container">
            <div class="navbar-header pull-left">
                <a href="http://<?=$tenant;?>.openrecordz.com/blog" class = "navbar-logo"><img src="http://apps.openrecordz.com/assets/images/logo_openrecordz_menu_25.png" alt="logo OpenRecordZ" ></a> 
                <a href="http://<?=$tenant;?>.openrecordz.com/blog" class ="link-tenant-in-navbar hvr-fade" itemprop="url"><?=$tenant;?></a> 
            </div>
            <div class="navbar-header pull-right">
                <a class="btn btn-success navbar-btn" href="http://<?=$tenant;?>.openrecordz.com/datasets#ds/<?=$dataset;?>/id/<?=$id_OpenRecordZ;?>" style="margin-left: 10px; margin-right: 10px; margin-top: 8px;" itemprop="url">Visualizza in console</a>
            
            </div>
        </div>
    </div>
    <!-- /end NEW NAV BAR -->

           <div class="containerafternav-breadcrumb">
            <div class= "container">
                <div itemscope itemtype="http://schema.org/BreadcrumbList" class="breadcrumb">
                
                    <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <a itemprop="item" href="http://<?=$tenant;?>.openrecordz.com/blog" title="Elenco dei datasets disponibili">
                            <span itemprop="name">Datasets</span>
                        </a>
                        <meta itemprop="position" content="1" />
                    </span> 
                    
                    <span>&nbsp;</span>

                    <span class="sep">/</span> 

                    <span>&nbsp;</span>
                    
                    <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                      <a itemprop="item" href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>" title="Visualizza dataset <?=$datasetName;?>">
                        <span itemprop="name"><?=$datasetName;?></span>
                      </a>
                      <meta itemprop="position" content="2" />  
                    </span> 

                    <span>&nbsp;</span>

                    <span class="sep">/</span>

                    <span>&nbsp;</span>
                   
                    <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <span itemprop="item" itemprop="name"><?=$id_OpenRecordZ;?></span>
                        <meta itemprop="position" content="3" />
                    </span> 
                </div>
            </div>
        </div>
        <!-- /end BREADCRUMB -->

<?php  

/* !!! SE NELL'ARRAY ESISTE KEY=STATUS E VALUE=404  */

if (($fieldKey[0] != "_") && (array_key_exists('status', $arr_variable_key)) && ($arr_variable_key[status] == '404')) {
//if ((array_key_exists('status', $value)) && ($value[staus] == '404')) {      
    // Get the current response code and set a new one
    //http_response_code(404);
   //var_dump(http_response_code());

    //var_dump(http_response_code(404));
    // Get the new response code
    //var_dump(http_response_code());

     ?>
    <div class= "container">
      <!-- <div class="jumbotron" style="margin-top: 20px; padding-top: 15px; padding-bottom: 15px; margin-bottom: 100px;"> -->

            <!-- Msg per la pagina il cui  record nn esiste -->
            <p class="lead" style="margin-top: 15px;" align="center"><strong>Spiacenti, la pagina che stai cercando non esiste!</strong></p>
            
            <a class="btn-lg btn-primary center-block" href="http://<?=$tenant;?>.openrecordz.com/blog" style="margin-bottom: 30px; margin-top: 35px;">Vai all'elenco dei dataset disponibili</a>
             <div class="wrapper">
                 <div class="card radius shadowDepth1">
                    <div id="no-more-tables">
                        <table class="col-md-12 table-bordered table-striped table-condensed cf" style="padding-left: 0px; padding-right: 0px;">
                            <thead class="cf">
                            <!-- <tr>
                            <th>Key</th>
                            <th>Value</th>
                            </tr> -->
                            </thead>
                            <tbody>

                                <?php
                                foreach ($value as $fieldKey => $fieldValue) {
                                                         ?>
                                    <tr>
                                        <td data-title="Key"><strong><?=$fieldKey;?></strong></td> 
                                        <td data-title="Value"><?=$fieldValue;?></td>
                                    </tr>

                                    <?php
                               
                                }     ?>

                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>


         <!--   </div>  -->
        </div>


  <?php
} else {
 ?>
        <!-- ***************
        /start DIV AFTER NAVBAR *** -->
        <div class="containerafternav">
            <div class= "container">

                <div class="row">
                    <div class="col-md-12">

                        <!-- 
                        Dataset TITLE -->
                        <div class="dSname-in-containerafternav" align="center" itemscope="itemscope" itemtype="http://schema.org/Dataset">
                            <h1 class="heading_nohome">
                                <strong><span itemprop="name"><?=$datasetName;?></span></strong>
                                <meta itemprop="description" content="<?=$datasetDescription;?>"/>
                                <meta itemprop="url" content="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>"/>
                            </h1>
                        </div>

                        <!-- 
                        Sottotitolo: id del dato visualizzato -->
                         
                        <div class="dSname-in-containerafternav" align="center">
                            <h1 class="subheading">Visualizza il dato con id: <?=$id_OpenRecordZ;?></h1>
                        </div>
              
  
                    </div>
                </div> 
            </div>    
        </div>    

    <!-- Page Content  -->
    <div class="container" itemscope itemtype="http://schema.org/Blog">

        <div class="row">

            <!-- Blog Entries Column -->
            <div class="col-md-12">

                <!-- MATERIAL DESIGN CARD FOR BLOG -->
                <div class="wrapper">
                    <div itemprop="blogpost" itemscope itemtype="http://schema.org/BlogPosting" class="card radius shadowDepth1">
                        <meta itemscope itemprop="mainEntityOfPage"  itemType="https://schema.org/WebPage" itemid="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>"/>

                        <!-- Post title -->  
                        <h2 itemprop="headline" style="padding-top: 15px; padding-left: 15px; padding-right: 15px;">
                            <a href="#"><?=$titolo;?></a>
                        </h2>

                        <!-- Image (with condition)-->
                        <?php
                        // if (isset($value["_main_image"])) {
                        if (!empty($img)) {
                             ?>
                            <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject" class="card__image border-tlr-radius">
                                <img src="<?=$img;?>" alt="<?=$titolo;?>" itemprop="url" class="border-tlr-radius">
                                <meta itemprop="width" content="900">
                                <meta itemprop="height" content="300">
                            </div>
                             <?php
                        //} else if (!empty($geocoordinates)) {
                        } else if ((!empty($lat)) && (!empty($log))) {
                            $geocoordinates = $lat.",".$log;
                            // echo "<br>Geo Coord: " .$geocoordinates. "<br>";
                              
                            //$geocoordinates = $lat.",".$log;
                            //echo "Coordinate Geografiche: ".$geocoordinates;
                             ?>

                            <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject" class="card__image border-tlr-radius">
                                <img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=<?=$geocoordinates;?>&heading=151.78&pitch=-0.76&key=AIzaSyD6AbPa1pPA3L6rk0p9i94daMA7eh-7aXQ" alt="Google immagine di <?=$geocoordinates;?>" class="border-tlr-radius" itemprop="url">
                                <meta itemprop="width" content="600">
                                <meta itemprop="height" content="300">
                            </div>
                             <?php
                            
                        } else {
                            ?>
                            <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject" class="card__image border-tlr-radius">
                                <img src="http://apps.openrecordz.com/assets/images/image_no_available.png" alt="Immagine non disponibile" class="border-tlr-radius" itemprop="url">
                                <meta itemprop="width" content="900">
                                <meta itemprop="height" content="300">
                            </div>
                            <?php
                        }
                        ?>

                        <!-- OpenRecordz id --> 
                        <div class="openrecordzid">
                        <p> id: <?=$id_OpenRecordZ;?> </p>
                        </div>

                        <!-- Descrizione -->
                        <div class="card__content card__padding">
                           <article class="card__article">
                                <p itemprop="description" class="lead"><?=$descrizione;?></p>
                            </article>
                        </div>

                        <div class="card__action">

                         <!-- Google Maps -->
                            <div class="row"> 
                                <div class="col-md-12">

                                    <?php

                                    if ((!empty($lat)) && (!empty($log))) {
                                        $geocoordinates = $lat.",".$log;
                                        // echo "<br>Geo Coord: " .$geocoordinates. "<br>";
                                        ?>
                                        <div id="map">
                                            <a href="https://www.google.com/maps/place/<?=$lat;?>,<?=$log;?>/" target="_blank">
                                                <img class="img-responsive" src="http://maps.googleapis.com/maps/api/staticmap?center=<?=$geocoordinates;?>&zoom=13&scale=false&size=900x200&maptype=roadmap&key=AIzaSyD6AbPa1pPA3L6rk0p9i94daMA7eh-7aXQ&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C<?=$geocoordinates;?>" alt="Google Map di <?=$geocoordinates;?>">
                                            </a>
                                        </div>
                                    <?php
                                    } else {
                                        ?>
                                       <!-- <h2>Mappa non disponibile</h2> -->
                                        <?php 
                                    }
                                    ?>
                                </div>

                            </div>
                            <!-- /end Google Map /end .row --> 

                            <div class="row">
                                  <div class="col-md-12">
                                      <div class="card__meta">
                                      
                                        <div class="card__author" style="margin-top: 25px;  margin-bottom: 10px;">
                                            <img src="http://apps.openrecordz.com/assets/images/icon-user-default_60x60.png" alt="<?=$creatoDa;?>">
                                            <div class="card__author-content">
                                              <br> Creato da 

                                              <span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
                                                  <a href="#" rel="author">
                                                  <span itemprop="name"><?=$creatoDa;?></span>
                                                  </a> 
                                              </span>

                                            <span itemprop="publisher" itemscope itemtype="http://schema.org/Organization">
                                                <meta itemprop="name" content="OpenRecordz.com"/>
                                                
                                                <span itemprop="logo" itemscope itemtype="http://schema.org/ImageObject">
                                                    <img itemprop="url" src="http://apps.openrecordz.com/assets/images/logo_openrecordz_fgb.png" alt="Logo OpenRecordz" style="display:none"/>
                                                </span>
                                            </span>

                                               in data
                                               <time datetime="<?=$dataCreazione;?>" itemprop="datePublished">
                                                <?=$dataCreazione;?><br>
                                               </time>
                                                <meta itemprop="dateModified" content="<?=$dataModifica;?>"/>

                                              <small> Modificato da <a href="#"><?=$modificatoDa;?></a> in data <?=$dataModifica;?> </small>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                 <!--  <div class="col-md-12">
                                 <p> Modificato da <a href="#"><?=$modificatoDa;?></a> il <?=$dataModifica;?> </p>
                                 <p>Status: <?=$stato;?> </p>
                                 </div>-->
                            </div> 
                           <!-- <div class="row">
                                <div class="col-md-12">
                               
                                <span class = "url-icon"><i class="fa fa-globe"></i></span>
                                &nbsp;&nbsp;
                                <span class = "url-text"><a href="<?=$url;?>" target="_blank"><?=$url;?></a></span>
                                </div>
                            </div> -->
                            <?php
                            //if (isset($value["_website"])) {
                            if (!empty($web_site)) {
                                ?>
                                <div class = "variable-field"> 
                                    <div class="row">
                                    
                                        <div class="col-md-12">
                                            <span class = "variable-field-icon"><i class="material-icons">language</i></span>
                                            &nbsp;&nbsp;
                                            <span class = "variable-field-text"><a href="<?=$web_site;?>" target="_blank"><?=$web_site;?></a></span>
                                        </div>
                                    </div>    
                                </div>
                                <?php
                            }
                            ?>

                            <?php
                            //if (isset($value["_email"])) {
                            if (!empty($email)) {
                                    ?>
                                <div class = "variable-field">     
                                    <div class="row">
                                    
                                        <div class="col-md-12">
                                            <span class = "variable-field-icon"><i class="material-icons">mail_outline</i></span>
                                            &nbsp;&nbsp;
                                            <!--  <span class = "fixed-field-text"><?=$email;?></span> -->
                                            <span class = "variable-field-text"><a href="mailto:<?=$email;?>"><?=$email;?></a></span>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                            ?>

                            <?php
                            //if (isset($value["_phone"])) {
                            if (!empty($phone)) {
                                        ?>
                                <div class = "variable-field">        
                                    <div class="row">
                                    
                                        <div class="col-md-12">
                                            <span class = "variable-field-icon"><i class="material-icons">phone</i></span>
                                            &nbsp;&nbsp;
                                            <span class = "variable-field-text"><?=$phone;?></span>
                                        </div>
                                    </div>
                                </div>
                                    <?php
                                }

                            ?>
                               

                            <!-- Foreach dati variabili in tabella responsiva -->
                            <div class="row" style="margin-left: 0px; margin-right: 0px;">
                                <div class="col-md-12">
                                    <h3 class="text-center">
                                        Altre informazioni
                                    </h3>
                                </div>
                                <div id="no-more-tables">
                                    <table class="col-md-12 table-bordered table-striped table-condensed cf" style="padding-left: 0px; padding-right: 0px;">
                                        <thead class="cf">
                                        <!-- <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                          </tr> -->
                                        </thead>
                                        <tbody>
                                    
                                        <?php
                                        foreach ($value as $fieldKey => $fieldValue) {
                                            if (($fieldKey[0] != "_") && ($fieldKey != 'id')) {
                                                
                                                $len = strlen($fieldValue);
                                                if ($len === 0) {
                                                    $fieldValue = "n.d.";
                                                }  ?>
                                                <tr>
                                                    <td data-title="Key"><strong><?=$fieldKey;?></strong></td> 
                                                    <td data-title="Value"><?=$fieldValue;?></td>
                                                </tr>

                                              <?php
                                            }
                                        }     ?>
                  
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- start social -->
                            <div class="row">
                                <div class="col-md-12 text-center" style="margin-top: 15px;">
                                    <div class="btn-group">
                                    
                                     <a href="https://www.facebook.com/sharer.php?u=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank"class="btn btn-default">
                                            <i class="fa fa-facebook"></i>
                                     </a>

                                     <a href="https://twitter.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank" 
                                        class="btn btn-default">
                                            <i class="fa fa-twitter"></i>
                                     </a>

                                     <a href="https://plus.google.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank" 
                                         class="btn btn-default">
                                            <i class="fa fa-google-plus"></i>
                                     </a>

                                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" class="btn btn-default" target="_blank">
                                            <i class="fa fa-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div> <!-- /end social -->

                        </div> <!-- /end card action -->
                        
                    </div> <!-- /end shadowDepth1 -->
               
                </div>
               <!-- /end MATERIAL DESIGN CARD FOR BLOG -->

            </div>
            <!-- /end .col-md-12 -->
        </div>
        <!-- /end .row -->

  <?php
}
  ?>

        <!-- Footer -->
        <footer class="footer" style="right: 0px; left: 0px;" role="contentinfo" itemscope="itemscope" itemtype="https://schema.org/WPFooter">
            <div class="container">
                <p class="text-left text-muted">
                    <a href="http://www.openrecordz.com/" itemprop="url">openrecordz.com</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://www.openrecordz.com/#features" itemprop="url">Funzionalità</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://www.openrecordz.com/documentazione/" itemprop="url" >Documentazione</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://apps.openrecordz.com/dashboard.php#signup" itemprop="url" >Costruisci l'opendata della tua smartcity</a>
                </p>
            </div>
        </footer>


    </div>
    <!-- /.container -->


</body>
</html>

<?php
function substrwords($text, $maxchar, $end='...') {
    if (strlen($text) > $maxchar || $text == '') {
        $words = preg_split('/\s/', $text);      
        $output = '';
        $i      = 0;
        while (1) {
            $length = strlen($output)+strlen($words[$i]);
            if ($length > $maxchar) {
                break;
            } 
            else {
                $output .= " " . $words[$i];
                ++$i;
            }
        }
        $output .= $end;
    } 
    else {
        $output = $text;
    }
    return $output;
}


function isValidVariable($variable) {
    if(isset($variable) && !empty($variable) && strlen($variable) !== 0) {
        $isValid = true;
    } else {
        $isValid = false;
    }
    return $isValid;
}
?>