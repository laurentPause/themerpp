<?php
/** On indique qu'il faut charger notre feuille de style du thème enfant**/
function my_enqueue_styles(){
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_styles' );

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