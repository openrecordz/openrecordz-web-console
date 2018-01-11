<?php
// Load the cache process
//include("cache.php");
?>
<!doctype html>

<!-- Include '__pre-html.php' -->
<?php 
require_once('__pre-html.php'); 
// require_once('functions_blog.php');
// include "functions_blog.php";
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
    // echo "<strong>SONO BLOG</strong><br>";
    // echo "tenant: " .$tenant. "<br>";
    // echo "Server Name:" .$_SERVER['SERVER_NAME']. "<br>";
    // echo "Request Uri: " .$_SERVER['REQUEST_URI']. "<br>";

    /* modifica la prima lettera del tenant in maiuscola
     * lo utilizziamo nell'header (vedi NEW NAV BAR es.: OpenData Matera) */
    $tenantUpperCaseFirst = ucfirst($tenant);
    // echo $tenantUpperCaseFirst;
                                                                      
    /*
    RICAVA CURRENT PAGE DA REQUEST URI (es.: /blog/biblio-rm-4?page=0) */
    $requestUri = $_SERVER['REQUEST_URI'];
    //echo "<br>Request Uri: " .$requestUri."<br>";

    /* Elimina lo slash finale dall'URL*/
    if( ($_SERVER['REQUEST_URI'] != "/") and preg_match('{/$}',$_SERVER['REQUEST_URI']) ) {
        header ('Location: '.preg_replace('{/$}', '', $_SERVER['REQUEST_URI']));
        exit();
    }

    $requestUriNoSlash = trim($requestUri, '/');
    //echo "Request Uri without slash: " .$requestUriNoSlash. "<br>";

    /*
    Creo variabile datasetWithQm ('Dataset Con Question Mark') esplodendo REQUEST URI allo / (slash) e prendendo la parte finale
    es.: biblio-rm-4?page=0 */
    $datasetWithQm = end(explode('/', $requestUri));
     //echo "datasetQm: " .$datasetWithQm.  "<br>";
    
    /*
    Creo PARTS esplodendo datasetWithQm (datasetConQuestionMark) ottenendo due parti es.: 
     - PARTE 0: biblio-rm-4
     - ? 
     - PARTE 1: page=0     */
    $parts = explode("?", $datasetWithQm);

    /*
    Assegno la parte 0 a DATASET es.: biblio-rm-4 */
    $dataset = $parts[0];
    //echo "DATASET: ".$dataset."<br>";

    /*
    Creo partsAfterQm (partsDopoQuestionMark): esplodendo all'= (uguale) la precedente PARTE 1 (page=0)
    ottenendo due parti es.:
     - PARTE 0: page
     - =
     - PARTE 1: 0          */
    $partsAfterQm = explode("=", $parts[1]);

    /*
    Creo partsBeforeEqual assegnandoli la PARTE 0 */
    $partsBeforeEqual = $partsAfterQm[0];
    //echo "<br>PARTE PRIMA DELL'UGUALE: ".$partsBeforeEqual."<br>";

    /**
     * CURRENT PAGE è = 0 se nn e settata partsAfterQm[1] 
     * cioè la parte dopo l'uguale (il numero della pagina)
     */
    $current_page = "0";
    //echo "<br>CURRENT PAGE: ".$current_page."<br>";
    if (isset($partsAfterQm[1])) {
        $current_page = $partsAfterQm[1];
        //echo "<br>CURRENT PAGE: ".$current_page."<br>";
    }   

    /* *
     * QUERY AL SERVIZIO UNICO restituisce:
     * DATI DEL DATASET SELEZIONATO (in index_blog) (i.e., Nome del dataset - Descrizione del dataset - Autore del dataset - Data creazione dataset - Slug del dataset)
     * RECORDS DEL DATASET SELEZIONATO (Post TITLE, Post NAME, Post DESCRIPTION, Post IMAGE ....)
     */ 
     
    // http://matera.api.openrecordz.com/service/v1/datasets/elezione-diretta-del-sindaco-e-del-consiglio-comunale-della-citt-di-matera-31-maggio-2015.map?byslug=true;
    $url= "http://".$tenant.".api.openrecordz.com/service/v1/datasets/".$dataset.".map?byslug=true&page=".$current_page."";
    //echo "URL: " .$url;
    
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
    /* Dump  json */
    //var_dump(json_decode($result, true));

    /* Decodifica dell'array */
    $data = json_decode($result,true);
    //print_r ($data);


    /* NUMERO RECORD TOTALE E PARZIALE (nella pagina) */
    $totalcount = $data['count'];
    //echo "<br>TOTAL: "  .$totalcount. "<br>";

    $total_array_obj = count($data["records"]);
    //echo "<br>TOT parziale records (i.e., RECORD NELLA PAGINA: "  .$total_array_obj. "<br>";

    
    /* SE nell'ARRAY data esiste la key STATUS  ed è VALUE = 404 cambia l'HTTP status code da 200 a 404 */
    if ((array_key_exists('status', $data)) && ($data['status'] == '404')) {
            
        //var_dump(http_response_code());
        /* Get the current response code and set a new one */
        //var_dump(http_response_code(404));
        http_response_code(404);
        /* Get the new response code */
        //var_dump(http_response_code());
        http_response_code();
    } 

    /* PROPRIETA' DI SISTEMA */    
    if (isValidVariable ($data["dataset"]["id"])) {
        $datasetId = $data["dataset"]["id"];
        //echo "<br>Dataset ID: " .$datasetId."<br>";
    }

    if (isValidVariable ($data["dataset"]["_name"])) {
        $datasetName = $data["dataset"]["_name"];
        //echo "<br>Nome Dataset: " .$datasetName."<br>";
    } else {
        $datasetName = "Nome del Dataset non disponibile";
    }

    if (isValidVariable ($data["dataset"]["_description"])) {
        $datasetDescription = $data["dataset"]["_description"];
        //echo "Descrizione Dataset: " .$datasetDescription. "<br>";
    } else {
        $datasetDescription = "Descrizione del Dataset non disponibile";
    }

    if (isValidVariable ($data["dataset"]["_createdby"])) {
        $datasetCreatedBy = $data["dataset"]["_createdby"];
        //echo "Dataset creato da: " .$datasetCreatedBy. "<br>";
    } else {
        $datasetCreatedBy = "Autore del Dataset non disponibile";
    }

    if (isValidVariable ($data["dataset"]["_createdon"])) {    
        $datasetCreatedOnMillSec = $data["dataset"]["_createdon"];
        $seconds = $datasetCreatedOnMillSec / 1000;
        $datasetCreatedOn = date("d-m-Y", $seconds);
        //echo "Dataset creato il: " .$datasetCreatedOn. "<br>";
    } else {
        $datasetCreatedOn = "Data creazione del Dataset non disponibile";
    }

    if (isValidVariable ($data["dataset"]["_slug"])) {    
        $slug = $valueDs["_slug"];
        //echo "Slug: " .$slug;
    }

    if (isValidVariable ($data["dataset"]["_origin"])) {
        $datasetSource = $data["dataset"]["_origin"];
        //echo "Origine Dataset: " .$datasetSource. "<br>";
        $datasetSourceShort = shorturl($datasetSource);
        //echo "Origine Dataset Troncato : " . $datasetSourceShort . "<br>";
    } else {
        $datasetSource = "non disponibile";
        $datasetSourceShort = "non disponibile";
        //echo "Origine Dataset: " .$datasetSource. "<br>";
    }

    /* **********
        * META TITLE nome del dataset nn troncato
        * **********/
    if (isValidVariable($data["dataset"]["_name"])) {
        $metatitle_dsName = $data["dataset"]["_name"]." -";

    } else if ((array_key_exists('status', $data)) && ($data['status'] == '404')) {
        $metatitle_dsName = "Errore 404 - Pagina non trovata -";
    } else {
        $metatitle_dsName = "";
    }

    /* ****************
        * META DESCRIPTION  DS DESCRIPTION (se esiste) altrimenti DS NAME
        * ****************/
    if (isValidVariable($data["dataset"]["_description"])) {
        $_metadescription = $data["dataset"]["_description"];
        $_metadescription_tr = substrwordsNocontinue($_metadescription,140);
        /* SANITIZE la metadescription troncata (elimina gli eventuali apici) */
        $metadescription = str_replace('"', "", $_metadescription_tr);

    } else if (isValidVariable($data["dataset"]["_name"])) {
        $_metadescription = $data["dataset"]["_name"]; 
        $metadescription = str_replace('"', "", $_metadescription); 
    } else  if ((array_key_exists('status', $data)) && ($data['status'] == '404')) {
        $metadescription = "Errore 404 - Pagina non trovata";
    }    
    ?>

<head>
    <?php require_once('__headblog.php');  ?>

    <!-- Nome del Dataset + OpenData + Openrecordz -->
    <title><?=$metatitle_dsName;?> OpenData <?=$tenant;?> - Openrecordz</title>

    <meta name="description" content="<?=$metadescription;?> - OpenData <?=$tenant;?>">
    <meta name="author" content="">
  
    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/custom-for-blog.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- OPEN-SANS -->
    <link rel='stylesheet' id='avia-google-webfont' href='//fonts.googleapis.com/css?family=Open+Sans:400,600' type='text/css' media='all'/>  

    <!-- Material ICONS -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="icon" href="http://apps.openrecordz.com/assets/images/openrecordzsmall.png" type="image/png">

<!-- VERIFICA COLONNE BOOTSTRAP -->
<!--
    <style>
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
<main role="main" itemprop="mainContentOfPage" content="<?=$datasetDescription;?>"> 

<?php include_once("analyticstracking.php") ?>

    <!-- start NEW NAV BAR -->
    <div class="navbar navbar-default navbar-fixed-top" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
        <div class="container">

            <div class="row">
                <div class="col-xs-12 col-sm-8 ">

                    <div class="navbar-header pull-left">
                        <a href="http://<?=$tenant;?>.openrecordz.com/blog" class = "navbar-logo"><img src="http://apps.openrecordz.com/assets/images/logo_openrecordz_menu_25.png" alt="logo OpenRecordZ" ></a> 
                        <a href="http://<?=$tenant;?>.openrecordz.com/blog" class ="link-tenant-in-navbar hvr-fade" itemprop="url">OpenData <?=$tenantUpperCaseFirst;?></a> 
                    </div>

                </div>    
                <div class="col-xs-12 col-sm-4 ">    
                    <div class="navbar-header pull-right">

                        <a class="btn btn-success navbar-btn" href="http://apps.openrecordz.com/dashboard.php#signup" style="margin-left: 10px; margin-right: 10px; margin-top: 12px;" itemprop="url">CREA GRATIS IL TUO PORTALE OPENDATA</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /end NEW NAV BAR -->

    <!-- start BREADCRUMB --> 
    <div class="containerafternav-breadcrumb">
        <div class= "container">
            <div itemscope itemtype="http://schema.org/BreadcrumbList" class="breadcrumb">
            
                <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                    <a itemprop="item" href="http://<?=$tenant;?>.openrecordz.com/blog" title="Elenco dei dataset disponibili per l'OpenData <?=$tenantUpperCaseFirst;?>">
                        <span itemprop="name">Dataset <?=$tenantUpperCaseFirst;?></span>
                    </a>
                    <meta itemprop="position" content="1" />
                </span> 
                <span>&nbsp;</span>
      <?php if ((array_key_exists('status', $data)) && ($data['status'] == '404')) { 
                // Al verificarsi di STATUS=404 il breadcrumb nn visualizza NOME DEL DATASET e ID del RECORD
            } else {  ?> 
                <span class="sep">/</span>
                <span>&nbsp;</span>
                <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                    <span itemprop="item" itemprop="name"><?=$datasetName;?></span>
                    <meta itemprop="position" content="2" />
                </span> 
      <?php } ?>
            </div>
        </div>
    </div>
    <!-- /end BREADCRUMB -->

<!-- start GESTISCE VIEW per il verificarsi condizione STATUS=404 e NUM RECORD NELLA PAG=0 (MOSTRA SOLO MSG DI ERRORE E IL FOOTER -->    
<?php 
// STATUS=404    
if ((array_key_exists('status', $data)) && ($data['status'] == '404')) { ?>
    <div class= "container">
        <div class="jumbotron" style="margin-top: 20px; padding-top: 50px; padding-bottom: 60px; margin-bottom: 50px;">

            <!-- Msg per la pagina il cui DATASET NOT FOUND -->
            <p class="lead" style="margin-top: 15px;" align="center"><strong>Spiacenti, la pagina che stai cercando non esiste!</strong></p>
            <a class="btn-lg btn-primary-errorview center-block" href="http://<?=$tenant;?>.openrecordz.com/blog" style="margin-bottom: 30px; margin-top: 35px;">Vai all'elenco dei dataset disponibili</a>
       </div> 
<?php
} else if ($total_array_obj == 0)  { ?>
   
    <?php
    // SE IL NUMERO DEI RECORD NELLA PAGINA è = 0 VISUALIZZA MSG ALTRIMENTI IL CONTENUTO DELLA PAGINA
     ?>
    <!-- Page Content -->
    <div class="container">    
        <!-- JUMBOTRON se Totale elementi per pagina è UGUALE a 0-->  
        <div class="jumbotron" style="margin-top: 20px; padding-top: 50px; padding-bottom: 60px; margin-bottom: 50px;">

            <!-- Msg per la pagina che nn contiene record da visualizzare -->
            <p class="lead" style="margin-top: 15px; padding-bottom: 25px;" align="center"><strong>Non sono disponibili dati da visualizzare per il dataset <?=$datasetName;?></strong></p>
            
            <a class="btn-lg btn-primary-errorview center-block" href="http://<?=$tenant;?>.openrecordz.com/blog">Vai all'elenco dei dataset disponibili</a>

        </div>
        <!-- /end jumbotron totale x pagina UGUALE a 0 -->
        <?php
} else {
        // MOSTRA IL CONTENUTO DELLA PAGINA SE NN SI VERIFICANO LE CONDIZIONI DI ERRORE
          
        ?>
                  
        <!--
    /start DIV AFTER NAVBAR 
    contiene valori dalla prima query al sevizio: DATI DEL DATASET SELEZIONATO in index_blog.php -->
    <div class="container">     
        <div class="containerafternav" itemscope="itemscope" itemtype="http://schema.org/Dataset">
            <div class="row">
                <div class="col-md-12">

                    <!-- Dataset TITLE -->
                    <div class="dSname-in-containerafternav" align="center" >

                        <h1 class="heading_nohome" style="margin-bottom: 0px;">
                            <strong><span itemprop="name"><?=$datasetName;?></span></strong>
                            <meta itemprop="description" content="<?=$datasetDescription;?>"/>
                            <meta itemprop="url" content="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>"/>
                        </h1>

                    </div>
                </div>
            </div> 

            <!-- Dataset DESCRIPTION -->
            <div class="dSdescription-in-containerafternav">
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="margin-top: 0px;"><em><?=$datasetDescription;?></em></h4>
                    </div>
                 </div> 
            </div> 

            <!--autore - origine - btn VISUALIZZA IN CONSOLE-->
            <div class="dSauthor-in-containerafternav">
                <div class="row">
                    <div class="col-md-10">
                        <!-- Dataset AUTORE E DATA CREAZIONE + microdata --> 
                    
                            <h5 style="margin-top: 5px;">
                                <span itemprop="publisher" itemscope="" itemtype="http://schema.org/Person">
                                    Creato da 
                                    <span itemprop="name">    
                                        <a href="https://ionic3chat.firebaseapp.com/?recipient=QkTk3zJUGIW7XWmqUv29p6DeHR32" target="_blank"> <?=$datasetCreatedBy;?> </a>
                                    </span>
                                </span>
                               <span>&nbsp;</span>
                                <span class="glyphicon glyphicon-calendar"></span>
                                <span datetime="<?=$datasetCreatedOn;?>" itemprop="dateCreated">
                                    <?=$datasetCreatedOn;?>
                                </span>
                            <!--</h5>    
                    </div>        
                    <div class="col-sm-5">
                            <h5 style="margin-top: 5px;">            -->
                                <span class="dataset-origin-blog-content"> - Origine: 
                                    <a class="dataset-origin" href="<?=$datasetSource;?>" target="_blank"><?=$datasetSourceShort;?></a>
                                </span>
                            </h5>
                    </div>
                
                 
                    <div class="col-md-2">  
                        <!--Btn VISUALIZZA IN CONSOLE -->
                        <div class="div-btn-show-console">
                            <!--<div class="container">-->
                                <?php 
                                // if STATUS=404 DISABLED BUTTON  VISUALIZZA IN CONSOLE  
                                if ((array_key_exists('status', $data)) && ($data['status'] == '404')) { ?>
                                    <a class="btn btn_show_console disabled" href="http://<?=$tenant;?>.openrecordz.com/datasets#ds/<?=$dataset;?>"  itemprop="url">Visualizza in console</a>
                                        <?php
                                } else { ?>
                                    <a class="btn btn_show_console" href="http://<?=$tenant;?>.openrecordz.com/datasets#ds/<?=$dataset;?>"  itemprop="url">Visualizza in console</a>
                                <?php
                                } ?>
                            <!--</div>-->
                        </div>
                    </div>

                </div>
            </div>  
          
            


             <!--origine  -->
            <!--<div class="dataset-origin-blog-content">
                <div class="row">
                    <div class="col-xs-12">
                            <span>Origine: 
                                <a class="dataset-origin" href="<?=$datasetSource;?>" target="_blank"><?=$datasetSourceShort;?></a>
                            </span>
                    </div>
                </div>
            </div>-->
             
                
       
            <?php
   // } 
        ?> 

        <!-- CREAZIONE DELLE SCHEDE --> 
        <div itemscope itemtype="http://schema.org/Blog" class="row">
            <!-- Blog Entries Column -->
            <div class="col-md-12">

                  <?php
                //Itera il nested array 'records'
                foreach ($data["records"] as $key => $value) {    
                    
                    /* Proprietà di Sistema */
                                       
                    if (isValidVariable($value["_title"])) {    
                        $titolo = $value["_title"];
                        // echo "Titolo: " .$titolo. "<br>";
                    } else if ((isValidVariable ($value["_type"])) && ($value["_type"])== "binary") {
                        /* per il record con il FILE da scaricare*/
                        $titolo  = $value["_name"];
                    } else {
                        $titolo = "Titolo non disponibile";
                    }

                    //if (isset($value["_description"])) {
                    if (isValidVariable($value["_description"])) {     
                        $descrizione = $value["_description"];
                        //$descrizioneUcFirst = ucwords(strtolower($descrizione));
                        //echo "Descrizione: " .$descrizione. "<br>";
                    } else {
                        $descrizione = "Descrizione non disponibile";
                    }

                    //if (isset($value["_status"])) {
                    if (isValidVariable($value["_status"])) {    
                        $stato = $value["_status"];
                        //echo "Stato: " .$stato. "<br>";
                    } else {
                        $stato = "Stato non disponibile";
                    }

                    //if (isset($value["_createdby"])) {
                    if (isValidVariable($value["_createdby"])) {      
                        $creatoDa = $value["_createdby"];
                        //echo "Creato da: " .$creatoDa. "<br>";
                    } else {
                        $creatoDa = "Autore non disponibile";
                    }

                    //if (isset($value["_createdon"])) {
                    if (isValidVariable($value["_createdon"])) {      
                        $dataMilsec = $value["_createdon"];
                        $seconds = $dataMilsec / 1000;
                        $dataCreazione = date("d-m-Y", $seconds);
                        //echo "Data creazione: ".$dataCreazione. "<br>";
                    } else {
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
  
                    //$value["_main_image"] = 1;
                    if (isset($value["_main_image"])) {   
                        $img = $value["_main_image"];
                        //echo "Img src: ".$img. "<br>";
                    } else {
                       //echo "No Image";
                    }

                    $id_OpenRecordZ = $value["id"];
                    //echo "ID OpenRecordZ: ".$id_OpenRecordZ."<br>";

                    ?>

                    <!-- START MATERIAL DESIGN CARD FOR BLOG -->
                    <div class="wrapper">
                    
                        <div itemprop="blogpost" itemscope itemtype="http://schema.org/BlogPosting" class="card radius shadowDepth1">
                            <meta itemscope itemprop="mainEntityOfPage"  itemType="https://schema.org/WebPage" itemid="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>"/>

                            <!--
                            Post title -->
                            <h2 itemprop="headline" style="padding-top: 15px; padding-left:15px; padding-right: 15px;">
                                <a href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>"><?=$titolo;?></a>
                            </h2>


                            <!--
                            Image (with condition)-->
                            <?php
                            //if (isset($value["_main_image"])) {
                            if (!empty($img)) {
                                 ?>
                                <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject" class="card__image border-tlr-radius">
                                    <img src="<?=$img;?>" alt="<?=$titolo;?>" class="border-tlr-radius" itemprop="url" width="900" height="300">
                                    <meta itemprop="width" content="900">
                                    <meta itemprop="height" content="300">
                                </div>
                                <!-- Test visualizzazione dell'immagine (imposta _main_image = 1 x la verifica)  -->
                                <!-- <div class="card__image border-tlr-radius">
                                    <img src="http://apps.openrecordz.com/assets/images/imgph900x300.jpg" alt="image" class="border-tlr-radius">
                                </div> -->
                                 <?php
                            } else {
                                 ?>
                                <hr>
                                <!-- Link ad immagine non disponibile - nascosta perchè utilizzata solo x i microdata -->
                                <div  itemprop="image" itemscope itemtype="http://schema.org/ImageObject" class="card__image border-tlr-radius" style="display:none">
                                    <img src="http://apps.openrecordz.com/assets/images/image_no_available.png" alt="Immagine non disponibile" class="border-tlr-radius" itemprop="url">
                                    <meta itemprop="width" content="900">
                                    <meta itemprop="height" content="300">
                                </div> 
                                 <?php
                            }
                            ?>

                            <!--
                            OpenRecordz id --> 
                            <div class="openrecordzid">
                                <p> id: <?=$id_OpenRecordZ;?></p>
                            </div>

                            <!--
                            Description -->
                            <div class="card__content card__padding">
                                <article class="card__article">
                                    <p itemprop="description" class="lead"><?=$descrizione;?></p>
                                </article>
                            </div>

                            <div class="card__action">

                                <!--
                                Google Map -->
                                <div class="row"> 
                                  <div class="col-md-12">
                                        <?php
                                        if ((!empty($lat)) && (!empty($log))) {
                                            $geocoordinates = $lat.",".$log;
                                            //echo "<br>Geo Coord: " .$geocoordinates. "<br>";
                    
                                            ?>
                                            <div id="map">
                                                <a href="https://www.google.com/maps/place/<?=$geocoordinates;?>/" target="_blank">
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
                                <!-- End Mappa ./end ROW -->          

                                <!-- 
                                Created by and Created on -->
                                <div class="metainfo">
                                <div class="row"> 
                                    <div class="col-xs-9"> 
                                        <div class="card__meta">
                                            <div class="card__author" style="margin-top: 10px;  margin-bottom: 10px;">
                                                <img src="http://apps.openrecordz.com/assets/images/icon-user-default_60x60.png" alt="<?=$creatoDa;?>">
                                                <div class="card__author-content">
                                                    Creato da
                                                     <span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
                                                     
                                                        <a href="https://ionic3chat.firebaseapp.com/?recipient=QkTk3zJUGIW7XWmqUv29p6DeHR32" target="_blank" rel="author">
                                                            <span itemprop="name"><?=$creatoDa;?> </span> <br>
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
                                                    <?=$dataCreazione;?>
                                                    </time>
                                                    <meta itemprop="dateModified" content="<?=$dataModifica;?>"/>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">    

                                        <!-- ********************
                                        ***** BUTTON Leggi Tutto 
                                        ************************* -->
                                        <p><a class="btn btn-primary" href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" style="margin-top: 15px;">Leggi tutto <span class="glyphicon glyphicon-chevron-right"></span></a></p>
                                    </div>
                                </div>
                                </div>

                                <!-- Visualizza il pulsante download CSV se esiste il campo type ed è = a binary 
                                il nome del file del file viene preso dal valore della key file del json -->
                                <div class="row">
                                    <div class="col-md-12 text-center" style="margin-top: 15px; margin-bottom: 25px;">
                                        <?php        
                                        if (isset($value["file"])) {
                                            $file = $value["file"];
                                            //echo "File CSV: " .$file. "<br>";
                                        }   

                                        if ((isset($value["_type"])) && ($value["_type"]) == "binary") {
                                            $type = $value["_type"];
                                            //echo "Type: " .$type. "<br>";
                                            ?>
                                            <a class="btn btn-custom btn-md" href="http://<?=$tenant;?>.api.openrecordz.com/service/v1/files/download?path=<?=$file;?>">
                                                Download &nbsp; <span class="glyphicon glyphicon-save"></span>
                                            </a>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                </div>        

                                 
                                <!-- start SOCIAL -->
                                <div class="row">
                                    <div class="col-md-12 text-center">
                                        <div class="btn-group">

                                            <a href="https://www.facebook.com/sharer.php?u=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank" class="btn btn-default">
                                                <i class="fa fa-facebook"></i>
                                            </a>

                                            <a href="https://twitter.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank" class="btn btn-default">
                                                <i class="fa fa-twitter"></i>
                                            </a>

                                            <a href="https://plus.google.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>/<?=$id_OpenRecordZ;?>" target="_blank" class="btn btn-default">
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
                    </div> <!-- /end wrapper -->
                    <?php   
                } 
                // /end foreach    
                ?>    
                <!-- END  MATERIAL DESIGN CARD FOR BLOG -->

                <!-- Pager -->
                <ul class="pager">
                    <?php
                    $next_page = $current_page + 1;
                    $prev_page = $current_page - 1;
                    
                    if ($current_page != 0) { ?>

                        <li class="previous">
                            <a href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>?page=<?=$prev_page;?>">&larr; Prev</a>
                        </li>

                      <?php 
                    } ?>

                        <?php
                    if ($total_array_obj == 20) {
                        ?>
                        <li class="next">
                            <a href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$dataset;?>?page=<?=$next_page;?>">Next &rarr;</a>
                        </li>
                      <?php 
                    } ?>
                </ul>
            </div>
            <!-- /end .col-md 12 -->
        </div>
         <!-- /end .row --> 



        <!-- SCROLL UP --> 
        <a href="#" class="scrollup"><i class="material-icons">arrow_upward</i></a>
        <script type="text/javascript">
        $(document).ready(function () {

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollup').fadeIn();
                } else {
                    $('.scrollup').fadeOut();
                }
            });

            $('.scrollup').click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });

        });
        </script>
 <?php
} // Chiude la condizione  STAUTUS=404
?>
        <!-- Footer -->
        <footer class="footer" style="right: 0px; left: 0px;" role="contentinfo" itemscope="itemscope" itemtype="https://schema.org/WPFooter">
            <div class="container">
                <p class="text-left text-muted">
                    <span class="first_footer_link">
                    <a href="http://www.openrecordz.com/" itemprop="url" >openrecordz.com</a>
                        <span>&nbsp; · &nbsp;</span>
                    </span>
                    <span class="second_footer_link">    
                    <a href="http://www.openrecordz.com/#features" itemprop="url" >Funzionalità</a>
                        <span>&nbsp; · &nbsp;</span>
                    </span>
                    <span class="third_footer_link">    
                    <a href="http://www.openrecordz.com/documentazione/" itemprop="url" >Documentazione</a>
                        <span class="sep_footer_link">&nbsp; · &nbsp;</span>
                    </span>
                    <span class="fourth_footer_link">
                        <a href="http://apps.openrecordz.com/dashboard.php#signup" itemprop="url" >Costruisci l'opendata della tua smartcity</a>
                    </span>
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


function substrwordsNocontinue($text, $maxchar, $end='') {
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

function shorturl($url){
    $length = STRLEN($url);
    if ($length > 20){
        $length = $length -15;
        $first = SUBSTR($url, 0, -$length);
        $last = SUBSTR($url, -15);
        $new = $first."[ ... ]".$last;
        return $new;
    } else {
        return $url;
    }
}
 
?>

<?php
// SAVE THE CACHE
//include("cache_footer.php");
?>

