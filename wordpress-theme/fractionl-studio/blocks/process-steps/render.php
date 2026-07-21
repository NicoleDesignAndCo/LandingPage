<?php $steps = get_field( 'steps' ) ?: array(); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'process' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'process page-section' ) ); ?>"><div class="container"><?php fractionl_render_section_heading( (string) get_field( 'eyebrow' ), (string) get_field( 'heading' ), (string) get_field( 'introduction' ) ); ?><ol class="process-list<?php echo count( $steps ) >= 4 ? ' process-list--four' : ''; ?>">
<?php
foreach ( $steps as $index => $step ) :
	?>
	<li class="process-step reveal"><span class="process-num"><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><div class="process-body"><h3 class="process-title"><?php echo esc_html( $step['title'] ); ?></h3><p class="process-desc"><?php echo esc_html( $step['description'] ); ?></p></div></li><?php endforeach; ?></ol></div></section>
