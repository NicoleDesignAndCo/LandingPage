<?php $items = get_field( 'items' ) ?: array(); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'engagements' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'engagements' ) ); ?>"><div class="container"><div class="engagements__heading reveal"><p class="eyebrow"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h2><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2>
<?php
if ( get_field( 'introduction' ) ) :
	?>
	<p><?php echo esc_html( get_field( 'introduction' ) ); ?></p><?php endif; ?></div><div class="engagements__track">
	<?php
	foreach ( $items as $index => $item ) :
		?>
	<article class="engagements__item reveal"><span><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3><?php echo esc_html( $item['title'] ); ?></h3><p><?php echo esc_html( $item['description'] ); ?></p></article><?php endforeach; ?></div></div></section>
