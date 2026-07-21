<?php
/** 404 template. @package Fractionl_Studio */
get_header();
?>
<section class="page-hero"><div class="container"><p class="eyebrow">404</p><h1 class="page-title">This page has moved—or never existed.</h1><p class="page-hero-sub">Try returning home or exploring the studio’s services and selected work.</p><div class="hero-actions"><a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Return Home</a><a class="btn btn-ghost" href="<?php echo esc_url( fractionl_get_page_url( 'work', '/work/' ) ); ?>">Explore Our Work</a></div></div></section>
<?php get_footer(); ?>
