<?php
/**
 * Site footer.
 *
 * @package Fractionl_Studio
 */
$team = fractionl_option( 'team_members', array() );
?>
</main>
<button class="tally-floating-button tally-button" type="button" data-tally-open>
	<span class="tally-floating-button__icon" aria-hidden="true">↗</span>
	<span class="tally-floating-button__text"><?php esc_html_e( 'Start an Inquiry', 'fractionl-studio' ); ?></span>
</button>
<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<a class="brand brand--footer" href="<?php echo esc_url( home_url( '/' ) ); ?>"><img class="brand-logo" src="<?php echo esc_url( fractionl_asset_url( 'brand/fractionl-studio-logo-nav.png' ) ); ?>" alt="<?php echo esc_attr( fractionl_option( 'studio_name', 'Fractionl Studio' ) ); ?>"></a>
			<p><?php echo esc_html( fractionl_option( 'footer_description', 'Digital design and development support for founders, growing businesses, agencies, and internal teams.' ) ); ?></p>
			<p class="footer-loc"><?php echo esc_html( fractionl_option( 'studio_location', 'Edmonton, Alberta' ) ); ?></p>
			<a class="footer-mail" href="mailto:<?php echo esc_attr( antispambot( fractionl_option( 'studio_email', 'hello@fractionlstudio.com' ) ) ); ?>"><?php echo esc_html( antispambot( fractionl_option( 'studio_email', 'hello@fractionlstudio.com' ) ) ); ?></a>
		</div>
		<?php foreach ( is_array( $team ) ? $team : array() as $member ) : ?>
			<div class="footer-col">
				<p class="footer-label"><?php echo esc_html( $member['name'] ?? '' ); ?></p>
				<?php
				if ( ! empty( $member['email'] ) ) :
					?>
					<a href="mailto:<?php echo esc_attr( antispambot( $member['email'] ) ); ?>"><?php echo esc_html( antispambot( $member['email'] ) ); ?></a><?php endif; ?>
				<?php
				if ( ! empty( $member['linkedin'] ) ) :
					?>
					<a href="<?php echo esc_url( $member['linkedin'] ); ?>" target="_blank" rel="noopener noreferrer">LinkedIn</a><?php endif; ?>
				<?php
				if ( ! empty( $member['portfolio'] ) ) :
					?>
					<a href="<?php echo esc_url( $member['portfolio'] ); ?>" target="_blank" rel="noopener noreferrer">Portfolio</a><?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="container footer-bottom">
		<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( fractionl_option( 'footer_legal', 'Fractionl Studio. All rights reserved.' ) ); ?></p>
		<p><?php esc_html_e( 'Designed & built in Edmonton, AB.', 'fractionl-studio' ); ?></p>
	</div>
</footer>
<?php
echo wp_kses(
	(string) fractionl_option( 'tally_embed_code' ),
	array(
		'iframe' => array(
			'src'         => true,
			'width'       => true,
			'height'      => true,
			'frameborder' => true,
			'title'       => true,
			'allow'       => true,
			'loading'     => true,
			'style'       => true,
		),
	)
);
?>
<?php wp_footer(); ?>
</body>
</html>
