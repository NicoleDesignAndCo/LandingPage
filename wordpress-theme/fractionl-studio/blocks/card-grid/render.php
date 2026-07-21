<?php $cards = get_field( 'cards' ) ?: array();
$columns     = min( 4, max( 2, (int) get_field( 'columns' ) ) ); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'cards' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'services audience-section' ) ); ?>"><div class="container">
	<?php fractionl_render_section_heading( (string) get_field( 'eyebrow' ), (string) get_field( 'heading' ), (string) get_field( 'introduction' ) ); ?>
	<div class="services-grid services-grid--<?php echo esc_attr( $columns ); ?> audience-grid">
	<?php
	foreach ( $cards as $index => $card ) :
		?>
		<article class="service-card reveal"><span class="service-index"><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3 class="service-title"><?php echo esc_html( $card['title'] ); ?></h3><p class="service-desc"><?php echo esc_html( $card['description'] ); ?></p><?php fractionl_link( $card['link'] ?? null, 'card-link' ); ?></article><?php endforeach; ?></div>
</div></section>
