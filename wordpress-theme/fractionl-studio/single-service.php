<?php
/** Service detail template. @package Fractionl_Studio */
get_header();
while ( have_posts() ) :
	the_post();
	$capabilities = get_field( 'capabilities' ) ?: array();
	$steps        = get_field( 'process_steps' ) ?: array();
	$related      = get_field( 'related_services' ) ?: array();
	?>
	<article <?php post_class( 'single-service' ); ?>>
		<section class="single-service__hero"><div class="container single-service__hero-grid"><div class="single-service__hero-copy reveal"><p class="eyebrow">Service · <?php echo esc_html( get_field( 'display_number' ) ); ?></p><h1><?php the_title(); ?></h1><p class="single-service__statement"><?php echo esc_html( get_field( 'short_statement' ) ); ?></p><p class="single-service__description"><?php echo esc_html( get_field( 'service_description' ) ?: get_the_excerpt() ); ?></p><div class="hero-actions"><?php fractionl_tally_button( 'Start a conversation ↗' ); ?></div></div><div class="single-service__hero-visual reveal"><?php get_template_part( 'template-parts/service/visual', null, array( 'type' => get_field( 'visual_treatment' ) ) ); ?></div></div></section>
		<?php
		if ( get_field( 'problem_heading' ) || get_field( 'problem_copy' ) ) :
			?>
			<section class="single-service__problem"><div class="container single-service__problem-grid"><div><p class="eyebrow">The opportunity</p><h2><?php echo esc_html( get_field( 'problem_heading' ) ); ?></h2></div><div class="single-service__problem-copy"><?php echo wp_kses_post( get_field( 'problem_copy' ) ); ?></div></div></section><?php endif; ?>
		<?php
		if ( $capabilities ) :
			?>
			<section class="single-service__capabilities"><div class="container"><div class="single-service__cap-head"><p class="eyebrow">Capabilities</p><h2>What this service can include.</h2></div><div class="single-service__cap-list">
			<?php
			foreach ( $capabilities as $index => $capability ) :
				?>
			<article class="single-service__cap reveal"><span><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3><?php echo esc_html( $capability['title'] ); ?></h3><p><?php echo esc_html( $capability['description'] ); ?></p></article><?php endforeach; ?></div></div></section><?php endif; ?>
		<?php
		if ( get_the_content() ) :
			?>
			<section class="single-service__feature"><div class="container"><div class="content-entry__body"><?php the_content(); ?></div></div></section><?php endif; ?>
		<?php
		if ( $steps ) :
			?>
			<section class="single-service__process"><div class="container"><div class="single-service__process-head"><p class="eyebrow">How we work</p><h2>A connected path from context to delivery.</h2></div><ol class="single-service__process-list">
			<?php
			foreach ( $steps as $index => $step ) :
				?>
			<li><span><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3><?php echo esc_html( $step['title'] ); ?></h3><p><?php echo esc_html( $step['description'] ); ?></p></li><?php endforeach; ?></ol></div></section><?php endif; ?>
		<?php
		if ( $related ) :
			?>
			<section class="single-service__related"><div class="container"><div class="single-service__related-head"><p class="eyebrow">Related services</p><h2>Support around the edges, too.</h2></div><div class="single-service__related-list">
			<?php
			foreach ( $related as $related_id ) :
				?>
			<article><span><?php echo esc_html( get_field( 'display_number', $related_id ) ); ?></span><h3><?php echo esc_html( get_the_title( $related_id ) ); ?></h3><a href="<?php echo esc_url( get_permalink( $related_id ) ); ?>">Explore ↗</a></article><?php endforeach; ?></div></div></section><?php endif; ?>
		<section class="single-service__cta"><div class="container"><div><p class="eyebrow">Start a conversation</p><h2><?php echo esc_html( get_field( 'cta_heading' ) ?: 'Ready to move the work forward?' ); ?></h2><p><?php echo esc_html( get_field( 'cta_copy' ) ?: 'Tell us where you are, what is getting in the way, and what a better outcome would look like.' ); ?></p><?php fractionl_tally_button( 'Discuss your project ↗', 'btn single-service__cta-button' ); ?></div></div></section>
	</article>
	<?php
endwhile;
get_footer();
