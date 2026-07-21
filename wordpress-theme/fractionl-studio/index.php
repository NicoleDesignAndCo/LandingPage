<?php
/** Fallback index. @package Fractionl_Studio */
get_header();
?>
<section class="page-hero"><div class="container"><p class="eyebrow"><?php esc_html_e( 'Fractionl Studio', 'fractionl-studio' ); ?></p><h1 class="page-title"><?php echo esc_html( single_post_title( '', false ) ?: get_bloginfo( 'name' ) ); ?></h1></div></section>
<section class="work-preview page-section"><div class="container"><div class="insight-grid">
<?php
while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/cards/card', get_post_type() );
endwhile;
?>
</div><?php the_posts_pagination( array( 'class' => 'pagination' ) ); ?></div></section>
<?php get_footer(); ?>
