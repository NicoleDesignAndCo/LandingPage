<?php
/** Case study template. @package Fractionl_Studio */
get_header();
while ( have_posts() ) :
	the_post();
	$details  = get_field( 'project_details' ) ?: array();
	$goals    = get_field( 'goals' ) ?: array();
	$approach = get_field( 'approach' ) ?: array();
	$gallery  = get_field( 'project_gallery' ) ?: array();
	$results  = get_field( 'results' ) ?: array();
	$services = get_field( 'services_provided' ) ?: array();
	$related  = get_field( 'related_case_studies' ) ?: array();
	$hero_id  = (int) ( get_field( 'hero_image' ) ?: get_post_thumbnail_id() );
	?>
	<article <?php post_class( 'case-study case-study--' . get_post_field( 'post_name' ) ); ?>>
		<header class="case-hero container"><p class="eyebrow reveal"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h1 class="case-hero__title reveal"><?php the_title(); ?></h1><p class="case-hero__intro reveal"><?php echo esc_html( get_field( 'introduction' ) ); ?></p><p class="case-hero__summary reveal"><?php echo esc_html( get_field( 'summary' ) ?: get_the_excerpt() ); ?></p>
		<?php
		if ( $details ) :
			?>
			<dl class="case-details reveal">
			<?php
			foreach ( $details as $detail ) :
				?>
			<div><dt><?php echo esc_html( $detail['label'] ); ?></dt><dd>
				<?php
				if ( $detail['url'] ) :
					?>
	<a href="<?php echo esc_url( $detail['url'] ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $detail['value'] ); ?> ↗</a>
					<?php
			else :
				echo esc_html( $detail['value'] );
						endif;
			?>
</dd></div><?php endforeach; ?></dl><?php endif; ?></header>
		<?php
		if ( $hero_id ) :
			?>
			<figure class="case-media case-media--wide reveal"><div class="case-art case-art--image">
			<?php
			echo wp_get_attachment_image(
				$hero_id,
				'fractionl-hero',
				false,
				array(
					'loading'       => 'eager',
					'fetchpriority' => 'high',
					'alt'           => get_field( 'hero_image_alt' ) ?: get_post_meta( $hero_id, '_wp_attachment_image_alt', true ),
				)
			);
			?>
			</div><figcaption class="case-caption"><span>01</span><p><strong>Project introduction</strong></p></figcaption></figure><?php endif; ?>
		<?php fractionl_case_section( 'Project overview', (string) get_field( 'overview_heading' ), (string) get_field( 'overview_copy' ) ); ?>
		<?php fractionl_case_section( 'The problem', (string) get_field( 'challenge_heading' ), (string) get_field( 'challenge_copy' ) ); ?>
		<?php
		if ( $goals ) :
			?>
			<section class="case-section"><div class="case-copy reveal"><p class="eyebrow">Project goals</p><h2>What the work needed to accomplish.</h2><ol class="case-numbered">
			<?php
			foreach ( $goals as $index => $goal ) :
				?>
			<li><span><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><?php echo esc_html( $goal['goal'] ); ?></li><?php endforeach; ?></ol></div></section><?php endif; ?>
		<?php
		if ( $approach ) :
			?>
			<section class="case-section"><div class="case-copy reveal"><p class="eyebrow">The approach</p><h2>A considered path from context to execution.</h2><div class="case-phases">
			<?php
			foreach ( $approach as $phase ) :
				?>
			<section><h3><?php echo esc_html( $phase['title'] ); ?></h3><p><?php echo esc_html( $phase['body'] ); ?></p></section><?php endforeach; ?></div></div></section><?php endif; ?>
		<?php fractionl_case_section( 'The solution', (string) get_field( 'solution_heading' ), (string) get_field( 'solution_copy' ), get_field( 'solution_highlights' ) ?: array(), 'highlight' ); ?>
		<?php
		if ( $gallery ) :
			?>
			<section class="case-image-showcase container" aria-label="Project visuals"><div class="case-image-showcase__grid">
			<?php
			foreach ( $gallery as $index => $item ) :
				?>
			<figure class="case-media<?php echo $item['wide'] ? ' case-media--wide' : ''; ?> reveal"><div class="case-art case-art--image">
				<?php
				echo wp_get_attachment_image(
					(int) $item['image'],
					'fractionl-hero',
					false,
					array(
						'loading' => 'lazy',
						'alt'     => $item['alt_text'] ?: get_post_meta( $item['image'], '_wp_attachment_image_alt', true ),
					)
				);
				?>
			</div><figcaption class="case-caption"><span><?php echo esc_html( str_pad( (string) ( $index + 2 ), 2, '0', STR_PAD_LEFT ) ); ?></span><p><strong><?php echo esc_html( $item['title'] ); ?></strong><?php echo $item['caption'] ? ' — ' . esc_html( $item['caption'] ) : ''; ?></p></figcaption></figure><?php endforeach; ?></div></section><?php endif; ?>
		<?php fractionl_case_section( 'The outcome', (string) get_field( 'outcome_heading' ), (string) get_field( 'outcome_copy' ), $results, 'result' ); ?>
		<?php
		if ( get_field( 'testimonial' ) ) :
			?>
			<section class="case-section"><div class="case-copy"><blockquote>“<?php echo esc_html( get_field( 'testimonial' ) ); ?>”<cite><?php echo esc_html( get_field( 'testimonial_attribution' ) ); ?></cite></blockquote></div></section><?php endif; ?>
		<?php
		if ( get_the_content() ) :
			?>
			<section class="case-section"><div class="case-copy"><?php the_content(); ?></div></section><?php endif; ?>
		<?php
		if ( $services ) :
			?>
			<section class="case-services"><div class="case-copy"><p class="eyebrow">Services provided</p><div class="case-services__links">
			<?php
			foreach ( $services as $service_id ) :
				?>
			<a href="<?php echo esc_url( get_permalink( $service_id ) ); ?>"><?php echo esc_html( get_the_title( $service_id ) ); ?><span>↗</span></a><?php endforeach; ?></div></div></section><?php endif; ?>
		<?php
		if ( $related ) :
			?>
			<section class="case-related container"><div class="case-gallery__heading"><p class="eyebrow">Related work</p><h2>More from the studio.</h2></div><div class="case-related__grid">
			<?php
			foreach ( $related as $related_id ) :
				?>
			<a href="<?php echo esc_url( get_permalink( $related_id ) ); ?>"><?php echo get_the_post_thumbnail( $related_id, 'fractionl-card' ); ?><span><?php echo esc_html( get_field( 'eyebrow', $related_id ) ); ?></span><h3><?php echo esc_html( get_the_title( $related_id ) ); ?></h3></a><?php endforeach; ?></div></section><?php endif; ?>
		<section class="case-cta"><div class="case-copy"><p class="eyebrow">Start a project</p><h2><?php echo esc_html( get_field( 'cta_heading' ) ?: 'Have something similar in mind?' ); ?></h2><p><?php echo esc_html( get_field( 'cta_copy' ) ?: 'Tell us what you are building, what needs improvement, or where your team needs experienced support.' ); ?></p><div><?php fractionl_tally_button(); ?><a class="btn btn-ghost" href="<?php echo esc_url( fractionl_get_page_url( 'work', '/work/' ) ); ?>">View More Work</a></div></div></section>
	</article>
	<?php
endwhile;
get_footer();
