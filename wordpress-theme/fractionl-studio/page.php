<?php
/** Standard block-built page. @package Fractionl_Studio */
get_header();
while ( have_posts() ) :
	the_post();
	if ( has_blocks( get_the_content() ) ) {
		the_content();
	} else {
		?>
		<article <?php post_class( 'content-entry' ); ?>><header class="page-hero"><div class="container"><p class="eyebrow"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p><h1 class="page-title"><?php the_title(); ?></h1></div></header><div class="container content-entry__body"><?php the_content(); ?></div></article>
		<?php
	}
endwhile;
get_footer();
