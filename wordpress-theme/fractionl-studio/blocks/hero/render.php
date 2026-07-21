<?php
$eyebrow     = (string) get_field( 'eyebrow' );
$heading     = (string) get_field( 'heading' );
$intro       = (string) get_field( 'introduction' );
$tally       = (bool) get_field( 'primary_opens_tally' );
$label       = (string) get_field( 'primary_label' );
$primary     = get_field( 'primary_link' );
$secondary   = get_field( 'secondary_link' );
$disciplines = get_field( 'disciplines' );
?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'hero' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'hero' ) ); ?>">
	<div class="container hero-layout">
		<div class="hero-copy reveal">
			<?php
			if ( $eyebrow ) :
				?>
				<p class="eyebrow"><?php echo esc_html( $eyebrow ); ?></p><?php endif; ?>
			<h1 class="hero-title"><?php echo wp_kses_post( $heading ); ?></h1>
			<?php
			if ( $intro ) :
				?>
				<p class="hero-sub"><?php echo esc_html( $intro ); ?></p><?php endif; ?>
			<div class="hero-actions">
				<?php
				if ( $tally ) {
					fractionl_tally_button( $label ?: 'Start a Project' );
				} elseif ( $primary ) {
					fractionl_link( $primary, 'btn btn-primary' ); }
				?>
				<?php fractionl_link( $secondary, 'btn btn-ghost' ); ?>
			</div>
		</div>
		<?php if ( 'none' !== get_field( 'visual_style' ) ) : ?>
		<div class="hero-stage reveal" aria-label="<?php esc_attr_e( 'Product strategy, design, and development working together', 'fractionl-studio' ); ?>">
			<div class="stage-orbit stage-orbit--one"></div><div class="stage-orbit stage-orbit--two"></div><div class="stage-note stage-note--top">Strategy → shipped</div>
			<div class="product-window"><div class="product-window__bar"><span></span><span></span><span></span><b>north / workspace</b></div><div class="product-window__body"><aside class="product-sidebar"><i class="product-logo">N</i><span class="active"></span><span></span><span></span><span></span></aside><div class="product-dashboard"><div class="dashboard-top"><small>Overview</small><i></i></div><h2>Good morning, Maya.</h2><p>Here’s what’s moving today.</p><div class="dashboard-metrics"><span><b>18</b><small>Active tasks</small></span><span><b>84%</b><small>On track</small></span></div><div class="dashboard-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div></div>
			<div class="stage-card stage-card--left"><span>Launch velocity</span><strong>+38%</strong><i></i></div><div class="stage-card stage-card--right"><span>Built together</span><div><b>N</b><b>N</b><b>+</b></div></div><div class="stage-note stage-note--bottom">Design · Build · Grow</div>
		</div>
		<?php endif; ?>
	</div>
	<?php
	if ( $disciplines ) :
		?>
		<div class="container hero-meta"><div class="meta-rule"></div><ul class="hero-disciplines">
		<?php
		foreach ( $disciplines as $item ) :
			?>
		<li><?php echo esc_html( $item['label'] ); ?></li><?php endforeach; ?></ul></div><?php endif; ?>
</section>
