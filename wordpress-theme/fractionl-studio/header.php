<?php
/**
 * Site header.
 *
 * @package Fractionl_Studio
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#FBFAF6">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content"><?php esc_html_e( 'Skip to content', 'fractionl-studio' ); ?></a>
<?php if ( fractionl_option( 'announcement_enabled' ) && fractionl_option( 'announcement_text' ) ) : ?>
	<aside class="site-announcement" aria-label="<?php esc_attr_e( 'Announcement', 'fractionl-studio' ); ?>">
		<div class="container"><?php echo esc_html( fractionl_option( 'announcement_text' ) ); ?> <?php fractionl_link( fractionl_option( 'announcement_link' ), 'text-link' ); ?></div>
	</aside>
<?php endif; ?>
<header class="site-header" id="siteHeader">
	<div class="container header-inner">
		<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( fractionl_option( 'studio_name', 'Fractionl Studio' ) ); ?>">
			<?php
			$logo_id = (int) fractionl_option( 'studio_logo', 0 );
			if ( $logo_id ) {
				echo wp_get_attachment_image(
					$logo_id,
					'medium',
					false,
					array(
						'class' => 'brand-logo',
						'alt'   => fractionl_option( 'studio_name', 'Fractionl Studio' ),
					)
				);
			} else {
				printf( '<img class="brand-logo" src="%1$s" alt="%2$s">', esc_url( fractionl_asset_url( 'brand/fractionl-studio-logo-nav.png' ) ), esc_attr( fractionl_option( 'studio_name', 'Fractionl Studio' ) ) );
			}
			?>
		</a>
		<nav class="nav-desktop" aria-label="<?php esc_attr_e( 'Primary', 'fractionl-studio' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'fallback_cb'    => 'fractionl_primary_menu_fallback',
					'depth'          => 1,
				)
			);
			?>
			<button class="nav-cta tally-button" type="button" data-tally-open><?php esc_html_e( 'Start a Project', 'fractionl-studio' ); ?></button>
		</nav>
		<button class="nav-toggle" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'fractionl-studio' ); ?>" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span></button>
	</div>
	<div class="nav-mobile" id="mobileMenu" aria-hidden="true">
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'container'      => false,
				'fallback_cb'    => 'fractionl_primary_menu_fallback',
				'depth'          => 1,
			)
		);
		?>
		<button class="nav-cta tally-button" type="button" data-tally-open><?php esc_html_e( 'Start a Project', 'fractionl-studio' ); ?></button>
	</div>
</header>
<main id="main-content" class="site-main" tabindex="-1">
