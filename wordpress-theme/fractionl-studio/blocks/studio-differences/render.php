<?php $items = get_field( 'items' ) ?: array(); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'differences' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'deliverables-showcase' ) ); ?>" aria-label="<?php esc_attr_e( 'Why work with Fractionl Studio', 'fractionl-studio' ); ?>"><div class="container deliverables-layout">
	<div class="deliverables-copy reveal"><p class="eyebrow"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h2 class="section-title"><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2>
	<?php
	if ( get_field( 'introduction' ) ) :
		?>
		<p class="section-intro"><?php echo esc_html( get_field( 'introduction' ) ); ?></p><?php endif; ?><div class="studio-differences">
		<?php
		foreach ( $items as $index => $item ) :
			?>
		<div class="studio-difference"><span><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3><?php echo esc_html( $item['title'] ); ?></h3><p><?php echo esc_html( $item['body'] ); ?></p></div><?php endforeach; ?></div></div>
	<div class="deliverables-canvas reveal" aria-hidden="true"><div class="deliverable-browser"><div class="mock-browser-bar"><span></span><span></span><span></span><b>yourbrand.com</b></div><div class="deliverable-site"><span class="mini-nav"></span><strong>Make your next<br>move feel simple.</strong><span class="mini-button">Get started</span></div></div><div class="deliverable-phone"><span class="phone-speaker"></span><strong>Today</strong><div class="phone-chart"><i></i><i></i><i></i><i></i></div></div><div class="deliverable-detail"><small>Design system</small><div><i></i><i></i><i></i><i></i></div><span>Aa</span></div></div>
</div></section>
