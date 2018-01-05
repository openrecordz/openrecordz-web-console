<!doctype html>

<!-- Include '__pre-html.php' -->
<?php 
require_once('__pre-html.php'); 
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

// echo "tenant: " .$tenant. "<br>";
// echo "Server Name:" .$_SERVER['SERVER_NAME']. "<br>";

// echo "Request Uri: " .$_SERVER['REQUEST_URI']. "<br>";
$RequestUri = $_SERVER['REQUEST_URI'];

$RequestUriNoSlash = trim($RequestUri, '/');
// echo "Request Uri without slash: " .$RequestUriNoSlash. "<br>";

$dataset = end(explode('/', $RequestUri));
// echo "dataset: " .$dataset;

// datasetupper viene utilizzato per il titolo generale del Blog
$datasetUpper = strtoupper($dataset);

/* QUERY:
 * DATASET DISPONIBILI X IL TENANT passato in URL */
$url= "http://".$tenant.".api2.openrecordz.com/service/v1/datasets";
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
//var_dump(json_decode($result, true));

// Decodifica dell'array
$data = json_decode($result,true);
///Count
$total=count($data);
 //echo "<br>TOTAL: "  .$total. "<br>";

/*
foreach ($data as $key => $valueDs) {

    if (isset($valueDs["_name"])) {
        $datasetName = $valueDs["_name"];
        echo "<br>Nome Dataset: " .$datasetName."<br>";
    } else {
        $datasetName = "Nome del Dataset non disponibile";
    }

    if (isset($valueDs["_description"])) {
        $datasetDescription = $valueDs["_description"];
        echo "Descrizione Dataset: " .$datasetDescription. "<br>";
    } else {
        $datasetDescription = "Descrizione del Dataset non disponibile";
    }

    if (isset($valueDs["_createdby"])) {
        $datasetCreatedBy = $valueDs["_createdby"];
        echo "Dataset creato da: " .$datasetCreatedBy. "<br>";
    } else {
        $datasetCreatedBy = "Autore del Dataset non disponibile";
    }

    if (isset($valueDs["_createdon"])) {
        $datasetCreatedOnMillSec = $valueDs["_createdon"];
        $seconds = $datasetCreatedOnMillSec / 1000;
        $datasetCreatedOn = date("d-m-Y", $seconds);
        echo "Dataset creato il: " .$datasetCreatedOn. "<br>";
    } else {
        $datasetCreatedOn = "Data creazione del Dataset non disponibile";
    }   
}
*/

?>

<head>
    <?php require_once('__headblog.php');  ?>
    
    <title>OpenData <?=$tenant;?> - Dataset disponibili - Openrecordz</title>

    <meta name="description" content="Elenco dei dataset disponibili per l'OpenData <?=$tenant;?>">
    <meta name="author" content="">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://apps.openrecordz.com/assets/css/custom-blog-home.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <!-- Material icons (utilizzata nell scroll-up) -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- OPEN-SANS -->
    <link rel='stylesheet' id='avia-google-webfont' href='//fonts.googleapis.com/css?family=Open+Sans:400,600' type='text/css' media='all'/> 

    <link rel="icon" href="http://apps.openrecordz.com/assets/images/openrecordzsmall.png" type="image/png">

    <script type='application/ld+json'> 
    {
      "@context": "http://www.schema.org",
      "@type": "WebSite",
      "@id": "#website",
      "name": "OpenRecordz - OpenData <?=$tenant;?>",
      "url": "http://<?=$tenant;?>.openrecordz.com/blog"
    }
     </script>

<!-- <style>
[class^="col-"] {
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
  padding-bottom: 20px;
  padding-top: 120px;
}
</style> -->
</head>
<body id="top" itemscope="itemscope" itemtype="https://schema.org/WebPage">
<?php include_once("analyticstracking.php") ?>
    <!-- start/ NEW NAV BAR -->


        <div class="navbar navbar-default navbar-fixed-top" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
            <div class="container">
                <div class="navbar-header pull-left">
                    <a href="http://<?=$tenant;?>.openrecordz.com/blog" class = "navbar-logo"><img src="http://apps.openrecordz.com/assets/images/logo_openrecordz_menu_25.png" alt="logo OpenRecordZ" ></a> 
                    <a href="http://<?=$tenant;?>.openrecordz.com/blog" class ="link-tenant-in-navbar hvr-fade" itemprop="url"><?=$tenant;?></a>
                    
                </div>
                <div class="navbar-header pull-right">
                    <a class="btn btn-success navbar-btn" href="http://<?=$tenant;?>.openrecordz.com/datasets" style="margin-left: 10px; margin-right: 10px; margin-top: 8px;" itemprop="url">Visualizza in console</a>
                
                </div>
            </div>
        </div>
  
    <!-- /end NEW NAV BAR -->


        <!-- ***************
        /start DIV AFTER NAVBAR *** -->
        <div class="containerafternav">
            <div class= "container">

                <div class="row">
                    <div class="col-md-12">

                          <!-- ***********
                        Dataset TITLE *** -->
                        <div class="dSname-in-containerafternav" align="center">
                            <h1 class="heading" itemprop="headline">
                              <strong>OpenData <?=$tenant;?></strong>
                            </h1>
                            
                            <main  role="main" itemprop="mainContentOfPage" content="Elenco dei dataset disponibili per l'OpenData <?=$tenant;?>">
                            <p class="subheading">Elenco dei dataset disponibili</p>
                        </div>

                    </div>
                </div> 
            </div>
        </div>


    <!-- Page Content -->

    <div itemscope itemtype="http://schema.org/DataCatalog" class="container">
      <meta itemprop="name" content="OpenRecordz - OpenData <?=$tenant;?>"/>
      <meta itemprop="url" content="http://<?=$tenant;?>.openrecordz.com/blog"/> 
       <div class="row">
            <!-- Blog Entries Column -->
            <div class="col-md-12">


            <?php
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

                   if (isset($valueDs["_origin"])) {
                        $datasetSource = $valueDs["_origin"];
                   //echo "Origine Dataset: " .$datasetSource. "<br>";
                    } else {
                       $datasetSource = "non disponibile";
                    }

                    $slug = $valueDs["_slug"];
                    // echo "Slug: " .$slug;

                    ?>
                    <!-- START MATERIAL DESIGN CARD FOR BLOG -->
                    <div class="wrapper">
                    
                        <div itemscope="itemscope" itemtype="http://schema.org/Dataset"  class="card radius shadowDepth1">
                        
                            <!-- Post title -->    
                            <h2 itemprop="name" style="padding-top: 15px; padding-left: 15px; padding-right: 15px;">
                                <a href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>"><?=$datasetName;?></a>
                            </h2>
                            <meta itemprop="url" content="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>"/>
                            <hr>
                            <!-- Description -->
                            <div class="card__content card__padding" style="padding-bottom: 10px;  padding-top: 5px;">
                               <article class="card__article">
                                    <p itemprop="description" style="margin-bottom: 0px;" class="lead"><?=$datasetDescription;?></p>
                                </article>
                            </div>

                            <div class="card__action">

                                <!-- Created by and Created on --> 
                                <div class="card__meta">
                                   <div class="card__author">
                                    
                                        <div class="card__author-content">
                                            Creato da 
                                            <span itemprop="publisher" itemscope="" itemtype="http://schema.org/Person">
                                                <span itemprop="name">
                                                    <a href="#"><?=$datasetCreatedBy;?></a>
                                                </span>
                                            </span>
                                            in data 
                                            <span datetime="<?=$datasetCreatedOn;?>" itemprop="dateCreated"> <?=$datasetCreatedOn;?></span> 
                                        </div>
                                    </div>
                                    <div class="dataset-origin">
                                        <span>Origine: <a class="dataset-origin" href="<?=$datasetSource;?>" target="_blank"><?=$datasetSource;?></a></span>
                                    </div>
                                </div>
                                   

                                <!-- button Visualizza in blog -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <p>
                                        <a class="btn btn-primary pull-right" href="http://<?=$tenant;?>.openrecordz.com/blog/<?=$slug;?>" style="margin-top: 5px;">Visualizza Blog <span class="glyphicon glyphicon-chevron-right"></span></a>
                                        </p>
                                    </div>
                                </div>

                                <!-- start social -->
                                <div class="row">
                                    <div class="col-md-12 text-center" style="margin-top: 15px;">
                                        <div class="btn-group">
                                        
                                         <a href="https://www.facebook.com/sharer.php?u=http://<?=$tenant;?>.openrecordz.com/blog" target="_blank"class="btn btn-default">
                                                <i class="fa fa-facebook"></i>
                                         </a>

                                         <a href="https://twitter.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog" target="_blank" 
                                            class="btn btn-default">
                                                <i class="fa fa-twitter"></i>
                                         </a>

                                         <a href="https://plus.google.com/share?url=http://<?=$tenant;?>.openrecordz.com/blog" target="_blank" 
                                             class="btn btn-default">
                                                <i class="fa fa-google-plus"></i>
                                         </a>

                                            <a href="https://www.linkedin.com/shareArticle?mini=true&url=http://<?=$tenant;?>.openrecordz.com/blog" class="btn btn-default" target="_blank">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div> <!-- /end social -->

                            </div> <!-- /end card__action -->
                        </div> <!-- /end shadowDepth1 -->
                    </div> <!-- /end wrapper -->
                    <?php   
                }  
                ?>    
               <!-- END  MATERIAL DESIGN CARD FOR BLOG -->

            </div>
            <!-- /end .col-md 12 -->
        </div>
         <!-- /end .row -->   

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


        <!-- Footer -->
        <footer class="footer" style="right: 0px; left: 0px;" role="contentinfo" itemscope="itemscope" itemtype="https://schema.org/WPFooter">
            <div class="container">
                <p class="text-left text-muted">
                    <a href="http://www.openrecordz.com/" itemprop="url" >openrecordz.com</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://www.openrecordz.com/#features" itemprop="url" >Funzionalità</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://www.openrecordz.com/documentazione/" itemprop="url" >Documentazione</a>
                        <span>&nbsp; · &nbsp;</span>
                    <a href="http://apps.openrecordz.com/dashboard.php#signup" itemprop="url" >Costruisci l'opendata della tua smartcity</a>
                </p>
            </div>
        </footer>

    </div>
    <!-- /.container -->
    <!-- questo è inutile -->
 <!-- <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>  -->

<!-- questo è NECESSARIO -->
<!-- <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script> -->
</body>
</html>
