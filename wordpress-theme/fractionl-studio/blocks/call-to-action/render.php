<?php $tally = (bool) get_field( 'primary_opens_tally' );
$primary     = get_field( 'primary_link' ); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'cta' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'contact' ) ); ?>"><div class="container contact-inner reveal"><p class="eyebrow"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><h2 class="contact-title"><?php echo wp_kses_post( get_field( 'heading' ) ); ?></h2>
<?php
if ( get_field( 'introduction' ) ) :
	?>
	<p class="contact-text"><?php echo esc_html( get_field( 'introduction' ) ); ?></p><?php endif; ?><div class="contact-actions">
	<?php
	if ( $tally ) {
		fractionl_tally_button( get_field( 'primary_label' ) ?: 'Start a Project', 'btn btn-primary btn-lg' );
	} else {
		fractionl_link( $primary, 'btn btn-primary btn-lg' ); }
	?>
<?php fractionl_link( get_field( 'secondary_link' ), 'btn btn-ghost btn-lg' ); ?></div></div></section>
