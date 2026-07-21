<?php
/** Insight article template. @package Fractionl_Studio */
get_header();
while ( have_posts() ) :
	the_post();
	$content = apply_filters( 'the_content', get_the_content() );
	preg_match_all( '/<h2[^>]*id=["\']([^"\']+)["\'][^>]*>(.*?)<\/h2>/i', $content, $toc_matches, PREG_SET_ORDER );
	$related_services = get_field( 'related_services' ) ?: array();
	$related_posts    = get_field( 'related_insights' ) ?: array();
	?>
	<article <?php post_class( 'single-insight' ); ?>>
		<header class="insight-header"><div class="container insight-header__inner"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li><li><a href="<?php echo esc_url( fractionl_get_page_url( 'insights', '/insights/' ) ); ?>">Insights</a></li><li aria-current="page"><?php the_title(); ?></li></ol></nav><p class="eyebrow"><?php echo esc_html( get_the_category()[0]->name ?? 'Insight' ); ?></p><h1><?php the_title(); ?></h1><p class="insight-header__excerpt"><?php echo esc_html( get_the_excerpt() ); ?></p><div class="insight-byline"><span>By <?php the_author(); ?></span><time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">Published <?php echo esc_html( get_the_date() ); ?></time>
		<?php
		if ( get_the_modified_date( 'Y-m-d' ) !== get_the_date( 'Y-m-d' ) ) :
			?>
			<time datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>">Updated <?php echo esc_html( get_the_modified_date() ); ?></time><?php endif; ?><span><?php echo esc_html( fractionl_reading_time() ); ?></span></div></div>
			<?php
			if ( has_post_thumbnail() ) :
				?>
			<div class="container insight-hero-image">
						<?php
						the_post_thumbnail(
							'fractionl-hero',
							array(
								'loading'       => 'eager',
								'fetchpriority' => 'high',
							)
						);
						?>
			</div><?php endif; ?></header>
		<div class="container insight-reading-layout">
		<?php
		if ( count( $toc_matches ) >= 3 ) :
			?>
			<nav class="insight-toc" aria-label="Table of contents"><details open><summary>In this insight</summary><ol>
			<?php
			foreach ( $toc_matches as $heading ) :
				?>
			<li><a href="#<?php echo esc_attr( $heading[1] ); ?>"><?php echo esc_html( wp_strip_all_tags( $heading[2] ) ); ?></a></li><?php endforeach; ?></ol></details></nav><?php endif; ?><div class="insight-body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Filtered by the_content. ?><?php get_template_part( 'template-parts/insight/inline-cta', null, array( 'variant' => get_field( 'cta_variant' ) ) ); ?></div></div>
		<?php
		if ( $related_services ) :
			?>
			<section class="insight-related"><div class="container"><p class="eyebrow">Related services</p><h2>Support for putting the ideas into practice.</h2><div class="insight-related__grid">
			<?php
			foreach ( $related_services as $service_id ) :
				?>
			<article><h3><?php echo esc_html( get_the_title( $service_id ) ); ?></h3><a class="text-link" href="<?php echo esc_url( get_permalink( $service_id ) ); ?>">Explore <?php echo esc_html( get_the_title( $service_id ) ); ?></a></article><?php endforeach; ?></div></div></section><?php endif; ?>
		<?php
		if ( $related_posts ) :
			?>
			<section class="insight-related insight-related--reading"><div class="container"><p class="eyebrow">Keep reading</p><h2>Related insights.</h2><div class="insight-grid">
			<?php
			foreach ( $related_posts as $post_id ) :
						$GLOBALS['post'] = get_post( $post_id );
						setup_postdata( $GLOBALS['post'] );
						get_template_part( 'template-parts/cards/card', 'post' );
endforeach;
			wp_reset_postdata();
			?>
</div></div></section><?php endif; ?>
		<section class="insight-final-cta"><div class="container"><p class="eyebrow">Work with Fractionl</p><h2>Ready to move the work forward?</h2><p>Tell us what you are building, improving, or trying to solve.</p><div class="insights-cta__actions"><?php fractionl_tally_button(); ?><a class="btn btn-ghost" href="<?php echo esc_url( fractionl_get_page_url( 'work', '/work/' ) ); ?>">Explore Our Work</a></div></div></section>
	</article>
	<?php
endwhile;
get_footer();
