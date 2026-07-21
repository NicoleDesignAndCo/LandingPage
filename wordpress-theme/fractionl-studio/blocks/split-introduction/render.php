<?php $link = get_field( 'link' ); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'introduction' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'about' ) ); ?>">
	<div class="container about-grid">
		<p class="eyebrow reveal"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p>
		<div class="about-body reveal"><h2 class="about-lead"><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2><div class="about-text"><?php echo wp_kses_post( get_field( 'body' ) ); ?></div><?php fractionl_link( $link, 'text-link' ); ?></div>
	</div>
</section>
