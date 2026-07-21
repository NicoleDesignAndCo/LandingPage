<?php
$post_type = sanitize_key( get_field( 'content_type' ) ?: 'case_study' );
$selected  = array_map( 'absint', get_field( 'selected_items' ) ?: array() );
$count     = min( 12, max( 1, (int) ( get_field( 'item_count' ) ?: 3 ) ) );
$args      = array(
	'post_type'      => $post_type,
	'posts_per_page' => $count,
	'post_status'    => 'publish',
	'orderby'        => 'menu_order date',
	'order'          => 'ASC',
);
if ( $selected ) {
	$args['post__in'] = $selected;
	$args['orderby']  = 'post__in'; }
$listing = new WP_Query( $args );
?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'listing' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'work-preview page-section' ) ); ?>"><div class="container">
	<?php fractionl_render_section_heading( (string) get_field( 'eyebrow' ), (string) get_field( 'heading' ), (string) get_field( 'introduction' ) ); ?>
	<?php
	if ( $listing->have_posts() ) :
		?>
		<div class="<?php echo 'service' === $post_type ? 'services-grid' : ( 'post' === $post_type ? 'insight-grid' : 'work-grid work-grid--editorial' ); ?>">
		<?php
		while ( $listing->have_posts() ) :
				$listing->the_post();
				get_template_part( 'template-parts/cards/card', $post_type );
endwhile;
		?>
</div>
		<?php
else :
	?>
	<p class="listing-empty"><?php esc_html_e( 'Select or publish content to populate this section.', 'fractionl-studio' ); ?></p>
	<?php
endif;
wp_reset_postdata();
?>
	<?php
	$archive_link = get_field( 'archive_link' ); if ( $archive_link ) :
		?>
		<div class="section-action"><?php fractionl_link( $archive_link, 'text-link' ); ?></div><?php endif; ?>
</div></section>
