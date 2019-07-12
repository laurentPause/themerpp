<?php
/** On indique qu'il faut charger notre feuille de style du thème enfant**/
function my_enqueue_styles(){
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'bootstrapRppCss', get_stylesheet_directory_uri() . '/inc/bootstrap/css/bootstrap.css' );
    //wp_enqueue_script('jqueryRpp',get_stylesheet_directory_uri().'/inc/js/jquery-3.4.1.min.js',false,true);
    wp_enqueue_script( 'bootstrapRppjs', get_stylesheet_directory_uri(). '/inc/bootstrap/js/bootstrap.min.js', array('jquery'),'1',true);
    wp_enqueue_style( 'rppCss', get_stylesheet_directory_uri() . '/inc/css/rpp.css' );
    wp_enqueue_script( 'scriptRpp', get_stylesheet_directory_uri(). '/inc/js/script.js', array('jquery'),'1',true);
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_styles' );

add_filter('rest_url', function($url) {
    $url = str_replace(home_url(), site_url(), $url);
    return $url;
});
// enregistrement de ma seconde navigation
function register_my_menu() {
    register_nav_menu('rpp-menu',__( 'Menu R2P' )); // mon nouveau menu s'appellera "'Menu R2P" dans mon back-office
}
add_action( 'init', 'register_my_menu' );

/* Ajout du fichier css personnalisé pour le login */
function custom_login(){
    echo '<link rel="stylesheet" href="' . get_bloginfo('stylesheet_directory') . '/login_admin.css" type="text/css" media="all" />';
}
add_action( 'login_head', 'custom_login' );

function slider(){
    $htm = '';
    $htm .= '<div id="myCarousel" class="carousel slide" data-ride="carousel">';
        $htm .= '<ol class="carousel-indicators">';
            $htm .= '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
            $htm .= '<li data-target="#myCarousel" data-slide-to="1"></li>';
            $htm .= '<li data-target="#myCarousel" data-slide-to="2"></li>';
            $htm .= '<li data-target="#myCarousel" data-slide-to="3"></li>';
        $htm .= '</ol>';
        $htm .= '<div class="carousel-inner" id="notreCarrousel">';
        $htm .= '</div>';
        $htm .= '<a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">';
            $htm .= '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
            $htm .= '<span class="sr-only">Suivant</span>';
        $htm .= '</a>';
        $htm .= '<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">';
            $htm .= '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
            $htm .= '<span class="sr-only">Précédent</span>';
        $htm .= ' </a>';
    $htm .= '</div>';
    return $htm;
}
function shortCodeSlideMenu(){
    return slider();
}
add_shortcode('sliderMenu','shortCodeSlideMenu');

function carteMenu(){
    $htm = '';
    $htm .= '<div class="row" id="carteenbas">';
    $htm .= '</div>';
    return $htm;
}
function shortCodeCarteMenu(){
    return carteMenu();
}
add_shortcode('carteMenu','shortCodeCarteMenu');

function btnInscription(){
    $btnIns = '';
    if(!is_user_logged_in()){
        $btnIns .= '<p>OU</p>';
        $btnIns .= '<a href="http://localhost/formation/inscription/" class="btn btn-success rppBtnIns">S\'INSCRIRE</a>';
    }
    return $btnIns;
    
}
function shortCodeBtnIns(){
    return btnInscription();
}
add_shortcode('btnIns','shortCodeBtnIns');

/* Personnalisation du lien de la page de connexion */ 
function my_login_logo_url() {
	return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );
function my_login_logo_url_title() {
	return 'R2P';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );


