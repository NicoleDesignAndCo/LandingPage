<?php $members = fractionl_option( 'team_members', array() );
$details       = (bool) get_field( 'show_details' ); ?>
<section id="<?php echo esc_attr( fractionl_block_id( $block, 'team' ) ); ?>" class="<?php echo esc_attr( fractionl_block_classes( $block, 'team team--page page-section' ) ); ?>"><div class="container"><?php fractionl_render_section_heading( (string) get_field( 'eyebrow' ), (string) get_field( 'heading' ), (string) get_field( 'introduction' ) ); ?><div class="team-grid">
<?php
foreach ( is_array( $members ) ? $members : array() as $member ) :
	?>
	<article class="team-card reveal">
	<?php
	if ( ! empty( $member['photo'] ) ) {
		echo wp_get_attachment_image(
			(int) $member['photo'],
			'large',
			false,
			array(
				'class' => 'team-photo',
				'alt'   => $member['photo_alt'] ?? $member['name'],
			)
		); }
	?>
<div class="team-info"><h3 class="team-name"><?php echo esc_html( $member['name'] ?? '' ); ?></h3><p class="team-role"><?php echo esc_html( $member['role'] ?? '' ); ?></p>
	<?php
	if ( $details ) :
		?>
	<p class="team-bio"><?php echo esc_html( $member['bio'] ?? '' ); ?></p><ul class="team-tags">
		<?php
		foreach ( $member['skills'] ?? array() as $skill ) :
			?>
	<li><?php echo esc_html( $skill['skill'] ?? '' ); ?></li><?php endforeach; ?></ul><div class="team-actions">
		<?php
		if ( ! empty( $member['portfolio'] ) ) :
			?>
	<a class="team-link team-link--primary" href="<?php echo esc_url( $member['portfolio'] ); ?>" target="_blank" rel="noopener noreferrer">View Portfolio ↗</a><?php endif; ?>
		<?php
		if ( ! empty( $member['linkedin'] ) ) :
			?>
	<a class="team-link" href="<?php echo esc_url( $member['linkedin'] ); ?>" target="_blank" rel="noopener noreferrer">LinkedIn</a><?php endif; ?>
		<?php
		if ( ! empty( $member['email'] ) ) :
			?>
	<a class="team-link" href="mailto:<?php echo esc_attr( antispambot( $member['email'] ) ); ?>">Email</a><?php endif; ?></div><?php endif; ?></div></article><?php endforeach; ?></div></div></section>
