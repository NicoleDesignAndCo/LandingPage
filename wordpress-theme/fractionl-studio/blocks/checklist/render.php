<?php $items = get_field( 'items' ) ?: array(); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'checklist' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'checklist-block' ) ); ?>"><div class="container checklist-block__grid"><div class="reveal"><p class="eyebrow"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h2 class="section-title"><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2>
<?php
if ( get_field( 'introduction' ) ) :
	?>
	<p class="section-intro"><?php echo esc_html( get_field( 'introduction' ) ); ?></p><?php endif; ?></div><ul class="compact-list contact-checklist reveal">
	<?php
	foreach ( $items as $item ) :
		?>
	<li><?php echo esc_html( $item['text'] ); ?></li><?php endforeach; ?></ul></div></section>
