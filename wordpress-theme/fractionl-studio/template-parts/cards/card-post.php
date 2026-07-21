<article <?php post_class( 'insight-card reveal' ); ?> data-insight-category="<?php echo esc_attr( wp_get_post_categories( get_the_ID(), array( 'fields' => 'slugs' ) )[0] ?? '' ); ?>"><a href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( sprintf( 'Read %s', get_the_title() ) ); ?>">
<?php
if ( has_post_thumbnail() ) {
	the_post_thumbnail( 'fractionl-card', array( 'loading' => 'lazy' ) ); }
?>
<div class="insight-card__body"><p class="eyebrow"><?php echo esc_html( get_the_category()[0]->name ?? 'Insight' ); ?></p><h3><?php the_title(); ?></h3><p><?php echo esc_html( get_the_excerpt() ); ?></p><div class="insight-meta"><time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time><span><?php echo esc_html( fractionl_reading_time() ); ?></span></div><span class="text-link"><?php esc_html_e( 'Read Insight', 'fractionl-studio' ); ?> <span aria-hidden="true">↗</span></span></div></a></article>
