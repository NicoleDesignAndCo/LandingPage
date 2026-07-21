<?php
/**
 * Front-end assets.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_enqueue_assets(): void {
	wp_enqueue_style( 'fractionl-style', get_stylesheet_uri(), array(), FRACTIONL_VERSION );
	wp_enqueue_style( 'fractionl-main', FRACTIONL_URI . '/assets/css/main.css', array( 'fractionl-style' ), FRACTIONL_VERSION );
	wp_enqueue_script( 'fractionl-theme', FRACTIONL_URI . '/assets/js/theme.js', array(), FRACTIONL_VERSION, true );
	wp_localize_script(
		'fractionl-theme',
		'fractionlSettings',
		array(
			'tallyFormId' => sanitize_text_field( (string) fractionl_option( 'tally_form_id', 'xXzMGr' ) ),
			'tallyUrl'    => esc_url_raw( (string) fractionl_option( 'tally_form_url', 'https://tally.so/r/xXzMGr' ) ),
		)
	);

	if ( fractionl_option( 'tally_form_id', 'xXzMGr' ) || fractionl_option( 'tally_embed_code' ) ) {
		wp_enqueue_script( 'tally-embed', 'https://tally.so/widgets/embed.js', array(), FRACTIONL_VERSION, true );
	}
}
add_action( 'wp_enqueue_scripts', 'fractionl_enqueue_assets' );

function fractionl_defer_tally_script( string $tag, string $handle ): string {
	if ( 'tally-embed' !== $handle ) {
		return $tag;
	}
	return str_replace( ' src=', ' async src=', $tag );
}
add_filter( 'script_loader_tag', 'fractionl_defer_tally_script', 10, 2 );
