<?php $options = get_field( 'options' ) ?: array(); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'contact-options' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'services contact-page-section contact-page-section--tint' ) ); ?>"><div class="container"><?php fractionl_render_section_heading( (string) get_field( 'eyebrow' ), (string) get_field( 'heading' ), (string) get_field( 'introduction' ) ); ?><div class="services-grid contact-options-grid">
<?php
foreach ( $options as $option ) :
	?>
	<article class="service-card contact-option-card reveal"><h3 class="service-title"><?php echo esc_html( $option['title'] ); ?></h3><p class="service-desc"><?php echo esc_html( $option['description'] ); ?></p><?php fractionl_tally_button( 'Start an Inquiry', 'card-link contact-card-cta' ); ?></article><?php endforeach; ?></div></div></section>
