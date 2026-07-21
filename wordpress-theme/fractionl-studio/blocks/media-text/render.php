<?php $image = (int) get_field( 'image' );
$position    = 'left' === get_field( 'image_position' ) ? 'left' : 'right'; ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'media-text' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'media-text media-text--' . $position ) ); ?>"><div class="container media-text__grid"><div class="media-text__copy reveal"><p class="eyebrow"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h2 class="section-title"><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2>
<?php
if ( get_field( 'introduction' ) ) :
	?>
	<p class="section-intro"><?php echo esc_html( get_field( 'introduction' ) ); ?></p><?php endif; ?><div class="about-text"><?php echo wp_kses_post( get_field( 'body' ) ); ?></div></div>
	<?php
	if ( $image ) :
		?>
	<figure class="media-text__media reveal"><?php echo wp_get_attachment_image( $image, 'fractionl-hero', false, array( 'alt' => get_field( 'image_alt' ) ?: get_post_meta( $image, '_wp_attachment_image_alt', true ) ) ); ?></figure><?php endif; ?></div></section>
